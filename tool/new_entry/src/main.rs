use serde::{Deserialize, Serialize, Serializer};
use std::{
    io::{self, stdout, Write},
    time::UNIX_EPOCH,
};
use url::Url;

#[derive(Debug)]
enum Course {
    // 表現
    Expr,
    // 学習
    Learn,
    // 開発
    Dev,
    // 思索
    Think,
    // 研究
    Research,
}

impl Serialize for Course {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = match self {
            Course::Expr => "expr",
            Course::Learn => "learn",
            Course::Dev => "dev",
            Course::Think => "think",
            Course::Research => "research",
        };
        serializer.serialize_str(s)
    }
}

impl Course {
    fn from_str(s: &str) -> Option<Self> {
        match s {
            "1" => Some(Course::Expr),
            "2" => Some(Course::Learn),
            "3" => Some(Course::Dev),
            "4" => Some(Course::Think),
            "5" => Some(Course::Research),
            _ => None,
        }
    }
}

#[derive(Debug, Serialize)]
struct Achivement {
    title: String,
    href: String,
}

#[derive(Debug, Serialize)]
struct Entry {
    course: Course,
    author: String,
    title: String,
    #[serde(rename = "blogHRef")]
    blog_href: String,
    #[serde(rename = "blogHostedAt")]
    blog_hosted_at: String,
    achivements: Vec<Achivement>,
    // 日付でソートする？
    #[serde(rename = "inputDate")]
    input_date: u64,
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
    let course = loop {
        let input_course = get_input_with_question(
            "あなたの所属していたコースは？
表現 -> 1
学習 -> 2
開発 -> 3
思索 -> 4
研究 -> 5
> ",
        )?;
        if let Some(course) = Course::from_str(&input_course) {
            break course;
        } else {
            println!("想定外の入力がされました、もう1回！");
        }
    };
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
        course,
        author,
        title,
        blog_href,
        blog_hosted_at,
        achivements,
        input_date: std::time::SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs()
            .into(),
    };
    let j = serde_json::to_string(&entry)?;
    println!("{}", j);
    Ok(())
}
