import Link from "next/link";
import { timeline } from "./data";

export default function Home() {
  return <main>
    <section className="hero">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <p className="eyebrow">HELLO, WORLD! I&apos;M</p>
      <h1>Rishi<br /><em>Khandelwal.</em></h1>
      <p className="intro">A student, problem-solver, and enthusiastic collector of <span>big questions.</span> Here&apos;s the winding path so far.</p>
      <a href="#timeline" className="scroll">SCROLL TO EXPLORE <b>↓</b></a>
    </section>
    <section id="timeline" className="timeline-section">
      <div className="section-heading"><p className="eyebrow">MY ADVENTURE LOG</p><h2>Every stop<br />tells a story.</h2><p>Tap into any moment for the longer version.</p></div>
      <div className="timeline">
        {timeline.map((item, index) => <article className={`timeline-card ${item.color}`} key={item.slug}>
          <div className="line-dot"><span>{item.icon}</span></div>
          <div className="card-image" style={{ backgroundImage: `url(${item.image})` }} aria-label={item.alt} role="img" />
          <div className="card-copy">
            <p className="date">{item.date}</p><p className="tag">{item.period}</p>
            <h3>{item.title}</h3><p className="role">{item.role} <i>at</i> {item.organization}</p>
            <p className="summary">{item.summary}</p>
            <Link href={`/timeline/${item.slug}`} className="read-more">READ THE STORY <span>→</span></Link>
          </div>
          <div className="card-number">0{index + 1}</div>
        </article>)}
      </div>
    </section>
    <footer><p>MORE STORIES AHEAD...</p><h2>Let&apos;s make something<br /><em>curious.</em></h2><a href="mailto:rkrishikhandelewal@gmail.com">SAY HELLO ↗</a></footer>
  </main>;
}
