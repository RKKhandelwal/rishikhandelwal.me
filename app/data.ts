export type TimelineItem = {
  slug: string;
  date: string;
  period: string;
  title: string;
  role: string;
  organization: string;
  icon: string;
  color: string;
  image: string;
  alt: string;
  summary: string;
  detail: string;
  highlights: string[];
  link?: string;
};

export const timeline: TimelineItem[] = [
  {
    slug: "los-altos-high-school", date: "AUG 2022 → NOW", period: "Education", title: "Los Altos High School", role: "Student", organization: "Los Altos High School", icon: "✦", color: "lavender", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85", alt: "Students gathered in a school hallway", summary: "Learning broadly, building deeply, and following the questions that make class spill into the rest of the day.", detail: "I am a student at Los Altos High School, where I enjoy pursuing a rigorous course load and making room for the people and projects that keep me curious.", highlights: ["3.98 unweighted GPA · 4.64 weighted GPA", "AP coursework across computer science, math, science, history, and language", "ACT: 35"],
  },
  {
    slug: "buddies4math", date: "FEB 2023 → MAR 2025", period: "Community", title: "Buddies4Math", role: "Student Volunteer", organization: "Buddies4Math", icon: "∑", color: "yellow", image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=85", alt: "Child working with colorful learning materials", summary: "Making room for the small, confidence-building breakthroughs that happen when math feels friendly.", detail: "With Buddies4Math, I tutored elementary school students from underrepresented communities in arithmetic and introductory algebra through one-on-one and small-group sessions.", highlights: ["Tutored arithmetic and introductory algebra", "Worked one-on-one and in small groups", "Practiced communication, leadership, and patient problem-solving"], link: "https://buddies4math.org/",
  },
  {
    slug: "hiller-aviation", date: "JUL 2023 → AUG 2023", period: "Community", title: "Hiller Aviation", role: "Summer Camp Volunteer", organization: "Hiller Aviation Museum", icon: "✈", color: "blue", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85", alt: "Airplane flying above clouds", summary: "Helping young visitors get their imaginations off the ground—one exhibit, question, and paper airplane at a time.", detail: "At Hiller Aviation's summer camp, I supported campers as they explored aviation exhibits and learned the fundamentals of aeronautics and flight.", highlights: ["Helped campers engage with aviation exhibits", "Explained foundational flight concepts", "Worked with children, families, and a range of learning styles"],
  },
  {
    slug: "varsity-tennis", date: "FEB 2023 → MAY 2025", period: "Athletics", title: "Varsity Tennis", role: "Co-Captain", organization: "LAHS Tennis Team", icon: "◉", color: "coral", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=85", alt: "Tennis player preparing to hit a ball", summary: "Showing up, rallying hard, and leading by the example set during the quiet hours of the off-season.", detail: "I played for the Los Altos High School tennis team and served as a co-captain, supporting teammates as a role-model player and maintaining a year-round practice routine.", highlights: ["Co-captain of the LAHS tennis team", "Off-season: 6 hours/week for 41 weeks", "Season: 12 hours/week for 11 weeks"],
  },
  {
    slug: "promys", date: "JUN 2025 → AUG 2025", period: "Mathematics", title: "PROMYS", role: "Camp Attendee", organization: "Boston University", icon: "π", color: "mint", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85", alt: "Mathematical equations on a chalkboard", summary: "Six summer weeks of number theory, long proof attempts, new friends, and the joy of finding a path through a hard problem.", detail: "I attended the Program in Mathematics for Young Scientists at Boston University alongside 90 other students, exploring number theory through deep, collaborative mathematical discovery.", highlights: ["Six-week immersive mathematics program", "Explored rigorous proof-based number theory", "Built collaboration and mathematical research skills"],
  },
  {
    slug: "advanced-student-investigation", date: "AUG 2025 → NOW", period: "Research", title: "Advanced Student Investigation", role: "Student Attendee", organization: "ASI", icon: "⌬", color: "pink", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85", alt: "Scientist working in a laboratory", summary: "Following a molecule-sized question through chemical engineering, data analysis, and a research poster.", detail: "In ASI, I am learning chemical engineering and data analysis in a 36-week program. With mentorship from Stanford assistant professor Andy Tsai, I am developing research on in-silico design targeting TREM2.", highlights: ["36-week chemical engineering and data analysis program", "Research: Targeting TREM2: In Silico Design of a Small Molecule Agonist", "Formatted findings into a poster and presented at SYNOPSYS"], link: "https://science-fair.org/",
  },
];
