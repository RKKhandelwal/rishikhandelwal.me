import Link from "next/link";
import { timeline } from "./data";
import CampusExplorer from "./components/campus-explorer";

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#timeline">
        Skip to all stories
      </a>
      <CampusExplorer />
      <section id="timeline" className="timeline-section">
        <div className="section-heading">
          <h2>
            Different places.
            <br />
            <em>The same curiosity.</em>
          </h2>
          <p>
            On the court, in the classroom, and somewhere between a question and
            an answer. Here&apos;s the path so far.
          </p>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className={`timeline-card ${item.color}`} key={item.slug}>
              <div className="card-copy">
                <p className="date">
                  {item.date} <span> / {item.period}</span>
                </p>
                <h3>
                  <Link href={`/timeline/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="role">
                  {item.role} · {item.organization}
                </p>
                <p className="summary">{item.summary}</p>
              </div>
              <Link
                href={`/timeline/${item.slug}`}
                className="read-more"
                aria-label={`Read the ${item.title} story`}
              >
                ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <h2>
          Let&apos;s make
          <br />
          <em>something curious.</em>
        </h2>
        <a href="mailto:rkrishikhandelewal@gmail.com">Say hello ↗</a>
        <div className="footer-bottom">
          <span>Rishi Khandelwal</span>
        </div>
      </footer>
    </main>
  );
}
