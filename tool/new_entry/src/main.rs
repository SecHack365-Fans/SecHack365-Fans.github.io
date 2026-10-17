use serde::Serialize;
use std::io::{self, BufRead, Write};
use url::Url;

#[derive(Debug, Serialize)]
struct Achievement {
    title: String,
    href: String,
}

#[derive(Debug, Serialize)]
struct Entry {
    author: String,
    title: String,
    #[serde(rename = "blogHRef")]
    blog_href: String,
    #[serde(rename = "blogHostedAt")]
    blog_hosted_at: String,
    // Existing data uses this misspelled key, so keep it for compatibility.
    #[serde(rename = "achivements")]
    achievements: Vec<Achievement>,
}

fn ask<R: BufRead, W: Write>(
    reader: &mut R,
    writer: &mut W,
    question: &str,
    allow_empty: bool,
) -> io::Result<String> {
    loop {
        write!(writer, "> {question}: ")?;
        writer.flush()?;

        let mut buffer = String::new();
        if reader.read_line(&mut buffer)? == 0 {
            return Err(io::Error::new(
                io::ErrorKind::UnexpectedEof,
                "入力が途中で終了しました",
            ));
        }

        let answer = buffer.trim().to_owned();
        if allow_empty || !answer.is_empty() {
            return Ok(answer);
        }

        writeln!(writer, "空欄にはできません。")?;
    }
}

fn ask_yes_no<R: BufRead, W: Write>(
    reader: &mut R,
    writer: &mut W,
    question: &str,
) -> io::Result<bool> {
    loop {
        match ask(reader, writer, &format!("{question} (y/n)"), false)?
            .to_ascii_lowercase()
            .as_str()
        {
            "y" | "yes" => return Ok(true),
            "n" | "no" => return Ok(false),
            _ => writeln!(writer, "y または n で回答してください。")?,
        }
    }
}

fn blog_host(url: &str) -> Result<String, &'static str> {
    let parsed = Url::parse(url).map_err(|_| "URLの形式が正しくありません。")?;
    if !matches!(parsed.scheme(), "http" | "https") {
        return Err("http または https のURLを入力してください。");
    }

    parsed
        .host_str()
        .map(str::to_owned)
        .ok_or("ホスト名を含むURLを入力してください。")
}

fn ask_blog<R: BufRead, W: Write>(reader: &mut R, writer: &mut W) -> io::Result<(String, String)> {
    loop {
        let href = ask(reader, writer, "ブログのURLは？", false)?;
        match blog_host(&href) {
            Ok(host) => return Ok((href, host)),
            Err(message) => writeln!(writer, "{message}")?,
        }
    }
}

fn run<R: BufRead, W: Write>(reader: &mut R, writer: &mut W) -> io::Result<Entry> {
    let author = ask(reader, writer, "あなたの名前は？", false)?;
    let title = ask(reader, writer, "参加記のタイトルは？", false)?;
    let (blog_href, blog_hosted_at) = ask_blog(reader, writer)?;
    let mut achievements = Vec::new();

    if ask_yes_no(reader, writer, "作品はありますか？")? {
        loop {
            achievements.push(Achievement {
                title: ask(reader, writer, "作品のタイトルは？", false)?,
                href: ask(reader, writer, "作品へのリンクは？", false)?,
            });

            if !ask_yes_no(reader, writer, "他の作品はありますか？")? {
                break;
            }
            writeln!(writer, "次の作品を入力してください。")?;
        }
    }

    Ok(Entry {
        author,
        title,
        blog_href,
        blog_hosted_at,
        achievements,
    })
}

fn main() -> io::Result<()> {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let entry = run(&mut stdin.lock(), &mut stdout.lock())?;
    println!("{}", serde_json::to_string(&entry)?);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Cursor;

    #[test]
    fn rejects_empty_required_input_and_allows_zero_achievements() {
        let input = b"\nAlice\nReport\nhttps://example.com/posts/1\nn\n";
        let mut output = Vec::new();
        let entry = run(&mut Cursor::new(input), &mut output).unwrap();

        assert_eq!(entry.author, "Alice");
        assert!(entry.achievements.is_empty());
        assert!(
            String::from_utf8(output)
                .unwrap()
                .contains("空欄にはできません")
        );
    }

    #[test]
    fn retries_an_invalid_blog_url() {
        let input = b"Alice\nReport\nnot-a-url\nhttps://blog.example/path\nn\n";
        let mut output = Vec::new();
        let entry = run(&mut Cursor::new(input), &mut output).unwrap();

        assert_eq!(entry.blog_hosted_at, "blog.example");
        assert!(
            String::from_utf8(output)
                .unwrap()
                .contains("URLの形式が正しくありません")
        );
    }

    #[test]
    fn preserves_the_existing_json_key() {
        let entry = Entry {
            author: "Alice".into(),
            title: "Report".into(),
            blog_href: "https://example.com".into(),
            blog_hosted_at: "example.com".into(),
            achievements: Vec::new(),
        };

        let json = serde_json::to_value(entry).unwrap();
        assert!(json.get("achivements").is_some());
        assert!(json.get("achievements").is_none());
    }
}
