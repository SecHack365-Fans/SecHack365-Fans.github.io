use serde::Serialize;
use std::io::{self, stdout, Write};
use url::Url;

#[derive(Debug, Serialize)]
struct Achivement {
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
    achivements: Vec<Achivement>,
}

fn get_input_with_question(question: &str) -> io::Result<String> {
    let stdin = io::stdin();
    let mut buffer = String::new();
    print!("> {}: ", question);
    stdout().flush().unwrap();
    stdin.read_line(&mut buffer)?;
    if &buffer == "" {
        std::process::exit(1)
    }
    Ok(buffer.trim_end().into())
}

fn main() -> io::Result<()> {
    let author = get_input_with_question("あなたの名前は？")?;
    let title = get_input_with_question("参加記のタイトルは？")?;
    let blog_href = get_input_with_question("ブログのURLは？")?;
    let blog_hosted_at = Url::parse(&blog_href);
    let blog_hosted_at: String =
        blog_hosted_at.map_or("".into(), |blog| blog.domain().unwrap_or_default().into());
    let mut achivements = vec![];

    loop {
        let title = get_input_with_question("作品のタイトルは？")?;
        let href = get_input_with_question("作品へのリンクは？")?;
        achivements.push(Achivement { title, href });
        let should_quit =
            get_input_with_question("他の作品はありますか？ ある場合: (y/Y)es | ない場合: (n/N)o")?;
        if !should_quit.starts_with("y") && !should_quit.starts_with("Y") {
            break;
        } else {
            println!("次の作品を入力してください")
        }
    }
    let entry = Entry {
        author,
        title,
        blog_href,
        blog_hosted_at,
        achivements,
    };
    let j = serde_json::to_string(&entry)?;
    println!("{}", j);
    Ok(())
}
