import Link from "next/link";

const tabs = [
  "Latest",
  "Lok Sabha",
  "Supreme Court",
  "Memes",
  "Market",
  "Sports",
  "Agriculture",
  "Updates"
];

export default function Header() {
  return (
    <>
      <div className="topline" />

      <header className="masthead">
        <div className="container brand">

          <img
            className="logo"
            src="/logo.svg"
            alt="The Anapa logo"
          />

          <div>
            <div className="brandname serif">
              The Anapa
            </div>

            <div className="tag">
              Medius & Verax · Truth, questioned.
            </div>
          </div>

        </div>
      </header>

      <nav className="nav">
        <div className="container navinner">

          {tabs.map((tab) => (
            <Link
              key={tab}
              href={
                tab === "Latest"
                  ? "/"
                  : `/?category=${encodeURIComponent(tab)}`
              }
            >
              {tab}
            </Link>
          ))}

          <Link href="/admin">
            Editor
          </Link>

        </div>
      </nav>

      <div className="ticker">
        <div className="container">

          <span>
            <b>THE ANAPA</b>
          </span>

          <span>
            Independent reporting · Source-first journalism
          </span>

          <span>
            Every claim deserves a question.
          </span>

        </div>
      </div>
    </>
  );
}
