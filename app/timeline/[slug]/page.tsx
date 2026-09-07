import Link from "next/link";
import { notFound } from "next/navigation";
import { timeline } from "../../data";

export function generateStaticParams() { return timeline.map(({ slug }) => ({ slug })); }

export default function Story({ params }: { params: { slug: string } }) {
  const item = timeline.find((entry) => entry.slug === params.slug);
  if (!item) notFound();
  return <main className={`story ${item.color}`}>
    <Link href="/" className="back">← BACK TO THE TIMELINE</Link>
    <section className="story-hero"><div><p className="date">{item.date}</p><p className="tag">{item.period}</p><h1>{item.title}</h1><p className="role">{item.role} <i>at</i> {item.organization}</p></div><div className="story-photo" style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={item.alt} /></section>
    <section className="story-body"><p className="lede">{item.detail}</p><h2>What I&apos;ll carry forward</h2><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{item.link && <a className="external" target="_blank" rel="noreferrer" href={item.link}>VISIT {item.organization.toUpperCase()} ↗</a>}</section>
  </main>;
}
