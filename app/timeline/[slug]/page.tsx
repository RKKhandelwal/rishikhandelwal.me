import Link from "next/link";
import { notFound } from "next/navigation";
import { timeline } from "../../data";

export function generateStaticParams() { return timeline.map(({ slug }) => ({ slug })); }

export default function Story({ params }: { params: { slug: string } }) {
  const item = timeline.find((entry) => entry.slug === params.slug);
  if (!item) notFound();
  return <main className={`story ${item.color}`}>
    <Link href="/" className="back">← BACK TO THE TIMELINE</Link>
    <section className="story-hero"><div><p className="date">{item.date}</p><p className="tag">{item.period}</p><h1>{item.title}</h1><p className="role">{item.role} <i>at</i> {item.organization}</p></div><figure className="story-photo-frame"><div className="story-photo" style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={item.alt} />{item.imageCredit && <figcaption className="photo-credit">Photo: <a href={item.imageCreditUrl ?? item.link ?? "/"} target="_blank" rel="noreferrer">{item.imageCredit}</a></figcaption>}</figure></section>
    <section className="story-body">{item.callout && <aside className="publication-callout">{item.callout}</aside>}<p className="lede">{item.detail}</p><h2>{item.highlightsTitle ?? "What I’ll carry forward"}</h2><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{item.hint && <p className="story-hint">{item.hint}</p>}{item.link && <a className="external" target="_blank" rel="noreferrer" href={item.link}>{item.linkLabel ?? `VISIT ${item.organization.toUpperCase()}`} ↗</a>}{item.sources && item.sources.length > 0 && <><h2>Sources</h2><ul className="source-list">{item.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></>}</section>
  </main>;
}
