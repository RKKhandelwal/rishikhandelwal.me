import Link from "next/link";
import { timeline } from "./data";
import CampusExplorer from "./components/campus-explorer";
import Reveal from "./components/reveal";

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#timeline">
        Skip to all stories
      </a>
      <CampusExplorer />
      <section id="timeline" className="timeline-section">
        <Reveal className="section-heading">
          <h2>
            Different places.
            <br />
            <em>The same curiosity.</em>
          </h2>
          <p>
            On the court, in the classroom, and somewhere between a question and
            an answer. Here&apos;s the path so far.
          </p>
        </Reveal>
        <Reveal className="timeline">
          {timeline.map((item, index) => (
            <article className={`timeline-card ${item.color}`} key={item.slug}>
              <div className="card-copy">
                <p className="date">
                  {item.date} <span> / {item.period}</span>
                </p>
                <h3>
                  <Link href={`/timeline/${item.slug}`}>{item.title}</Link>{index < 3 && <span className="activity-star" role="img" aria-label="Top three activity"> ★</span>}
                </h3>
                <p className="role">
                  {item.role} · {item.organization}
                </p>
                <p className="summary">{item.summary}</p>
                {item.callout && <aside className="publication-callout">{item.callout}</aside>}
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
        </Reveal>
      </section>
      <footer>
        <h2>
          Let&apos;s make
          <br />
          <em>something curious.</em>
        </h2>
        <a href="mailto:rkrishikhandelwal@gmail.com">Say hello ↗</a>
        <div className="footer-bottom">
          <span>Rishi Khandelwal</span>
          <div className="footer-social">
            <a
              href="https://github.com/RKKhandelwal"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.74 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
