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
  hint?: string;
  callout?: string;
  link?: string;
  linkLabel?: string;
  highlightsTitle?: string;
  campus?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    slug: "promys", date: "JUN 2025 → AUG 2025", period: "Mathematics", title: "PROMYS", role: "First-Year Participant", organization: "Boston University", icon: "π", color: "mint", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85", alt: "Mathematical equations on a chalkboard", summary: "Six summer weeks of number theory, long proof attempts, new friends, and the joy of finding a path through a hard problem.", detail: "At Boston University’s Program in Mathematics for Young Scientists, I spent six weeks exploring number theory through proof-based problem sets and collaborative inquiry. The experience made sustained mathematical discovery part of my daily routine.", highlights: ["Six-week immersive mathematics program", "Explored rigorous proof-based number theory", "Built collaboration and mathematical research skills"],
  },
  {
    slug: "why-feature-scaling-works",
    date: "SEP 28, 2026",
    period: "Publication",
    title: "Why Feature Scaling Works",
    role: "Author",
    organization: "The Oxford Journal of Student Scholarship",
    icon: "∇",
    color: "mint",
    campus: false,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85",
    alt: "Mathematical equations on a chalkboard",
    summary: "My published paper explores how feature scaling shapes the path gradient descent takes toward a solution.",
    detail: "In Why Feature Scaling Works: Condition Number as the Key to Gradient Descent Convergence, I study how the condition number of the Hessian helps explain why scaling choices affect convergence. The paper compares standardisation, min-max scaling, robust scaling, and PCA whitening through experiments with different dataset sizes and feature imbalances.",
    highlightsTitle: "About the paper",
    highlights: [
      "Published September 28, 2026 · Volume 11, Issue 6",
      "Connects feature scaling, numerical conditioning, and gradient descent convergence",
      "Examines the limits of whitening when data contains outliers",
      "DOI: 10.65161/recxYS7FqdJd63gJy",
    ],
    link: "https://www.oxfordjss.org/sep-2026-vol-11-issue-6/why-feature-scaling-works-condition-number-as-the-key-to-gradient-descent-convergence",
    linkLabel: "READ THE PAPER",
  },
  {
    "slug": "courtbook",
    "callout": "Pending publication in the Los Altos Crier.",
    "date": "GRADES 10–11 → NOW",
    "period": "Technology & Community",
    "title": "CourtBook, LLC",
    "role": "Founder & Developer",
    "organization": "CourtBook, LLC",
    "icon": "◉",
    "color": "blue",
    "campus": false,
    "image": "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=85",
    "alt": "A player on a tennis court",
    "summary": "Turning the search for an open tennis court into a computer-vision project with the City of Los Altos.",
    "detail": "I founded CourtBook, LLC to help communities understand how their courts are used. I built a computer-vision platform and weatherproof camera system for real-time court occupancy data, and have been collaborating with the Los Altos Recreation Department, including Manny Hernandez and Jaime Chew, on court usage data services. The work has grown from a McKenzie Court dashboard proposal into equipment preparation and discussions about service scope, installation, and privacy.",
    "highlightsTitle": "Building with the community",
    "highlights": [
        "Developed a computer-vision platform and weatherproof camera system",
        "Collaborating with Los Altos staff on court usage data services",
        "Prepared equipment for the agreed courts while coordinating approval and installation",
        "Designed the proposed service around occupancy data and numerical analysis, with no stored video"
    ]
},
  {
    slug: "advanced-student-investigation", date: "GRADES 11–12", period: "Research", title: "Alzheimer’s Research", role: "Student Researcher", organization: "ASI · UCSF & Duygu Lab · ASDRP", icon: "⌬", color: "pink", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85", alt: "Scientist working in a laboratory", summary: "Using Python and molecular design to explore Alzheimer’s trial data and potential TREM2 agonists.", detail: "My research spans analysis of Alzheimer’s trial data with Python and the design of TREM2 agonists through computational and experimental work. Through ASI and research experiences with UCSF, Duygu Lab, and ASDRP, I have developed and presented findings to faculty and at the Synopsys science fair.", highlights: ["Poster: Targeting TREM2: In Silico Design of a Small Molecule Agonist", "Presented findings to faculty and at the Synopsys science fair", "SCVSEFA Honorable Mention", "Top 25 recognition from CENIC / UC San Diego Supercomputer Center"], link: "https://science-fair.org/",
  },
  {
    "slug": "trellis-ai-internship",
    "date": "GRADE 11 · SIX WEEKS",
    "period": "Internship",
    "title": "Building at Trellis AI",
    "role": "Research Engineer Intern",
    "organization": "Trellis AI",
    "icon": "✦",
    "color": "lavender",
    "campus": false,
    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85",
    "alt": "A collaborative technology workspace",
    "summary": "Shipping developer tools and AI workflows to help infusion patients reach treatment sooner.",
    "detail": "During a six-week research engineering internship at Trellis AI, I built developer tools, including a Slack–Claude codebase integration, and shipped four end-to-end features. I contributed to LLM-powered automation across more than 15,000 workflows, learning how engineering decisions translate into practical improvements in patient operations.",
    "highlights": [
        "Shipped four end-to-end features",
        "Built a Slack–Claude integration for working with the codebase",
        "Contributed to automation of more than 15,000 workflows",
        "Trellis AI Hackathon Best Hack for a CEO Video Clone"
    ]
},
  {
    "slug": "school-club-leadership",
    "date": "GRADES 10–12",
    "period": "Leadership",
    "title": "Ideas into School Communities",
    "role": "Co-President & School Clubs Leader",
    "organization": "TEDxLAHS · AMDC · BEAM · TACER · STATS Club",
    "icon": "✦",
    "color": "yellow",
    "campus": false,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    "alt": "Students collaborating at school",
    "summary": "Organizing talks, competitions, and student projects that give shared interests room to grow.",
    "detail": "Across TEDxLAHS, AMDC, BEAM, TACER, and STATS Club, I have helped bring students together around ideas and practical projects. My work includes organizing a TEDx conference with PTSA grant support, leading competition and startup activities, and extending community emergency preparedness through TACER.",
    "highlights": [
        "Organized a TEDx conference with PTSA grant support",
        "Led AMDC participation in an HCSSIM data-science competition",
        "Worked on FoodRight through BEAM",
        "Led TACER, a TEEN CERT extension, and STATS Club"
    ]
},
  {
    slug: "buddies4math", date: "FEB 2023 → MAR 2025", period: "Community", title: "Buddies4Math", role: "Volunteer Math Tutor", organization: "Buddies4Math", icon: "∑", color: "yellow", image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=85", alt: "Child working with colorful learning materials", summary: "Making room for the small, confidence-building breakthroughs that happen when math feels friendly.", detail: "With Buddies4Math, I prepared algebra lessons for three cohorts of 20 students and coordinated with two fellow tutors. Alongside everyday problem-solving, I helped students explore AMC preparation, guest lectures, and the Purple Comet competition.", highlights: ["Prepared lessons for three cohorts of 20 students", "Coordinated teaching with two other tutors", "Supported AMC preparation, guest lectures, and Purple Comet participation"], link: "https://buddies4math.org/",
  },
  {
    "slug": "uchicago-summer-mathematics",
    "date": "GRADE 11 · SIX WEEKS",
    "period": "Mathematics",
    "title": "UChicago Summer Mathematics",
    "role": "Summer REU Participant",
    "organization": "UChicago REU / UChicago Experience",
    "icon": "π",
    "color": "coral",
    "campus": false,
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85",
    "alt": "Mathematical equations on a chalkboard",
    "summary": "Exploring advanced mathematics through coursework and research seminars.",
    "detail": "Through the UChicago summer experience, I participated in six weeks of advanced mathematics coursework and research seminars, earning a certificate of achievement. It was another opportunity to work beyond the familiar classroom syllabus and follow mathematical questions in greater depth.",
    "highlights": [
        "Advanced mathematics coursework",
        "Participation in research seminars",
        "Certificate of achievement"
    ]
},
  {
    slug: "varsity-tennis", date: "GRADES 10–12", period: "Athletics", title: "Varsity Tennis", role: "Co-Captain", organization: "LAHS Tennis Team", icon: "◉", color: "coral", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=85", alt: "Tennis player preparing to hit a ball", summary: "Showing up, rallying hard, and leading by the example set during the quiet hours of the off-season.", detail: "As co-captain of the Los Altos High School varsity tennis team, I led a group of 18 student-athletes through daily after-school practices and represented our school in doubles during league and postseason competition.", highlights: ["Co-captain of 18 student-athletes", "Daily after-school practices and team leadership", "Doubles competition in league and postseason play"], hint: "Campus easter egg: double-click either player on the tennis court to swap in a legend — or type a name anywhere ('federer', 'nadal', 'djokovic', 'serena', 'agassi'). 'deuce' shuffles the lineup; 'rishi' calls it back.",
  },
  {
    slug: "hiller-aviation", date: "JUL 2023 → AUG 2023", period: "Community", title: "Hiller Aviation", role: "Aviation & Aircraft Maintenance Volunteer", organization: "Hiller Aviation Museum", icon: "✈", color: "blue", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85", alt: "Airplane flying above clouds", summary: "Helping young visitors get their imaginations off the ground—one exhibit, question, and paper airplane at a time.", detail: "At Hiller Aviation Museum, I supported hands-on aviation activities, helped visitors engage with exhibits, and assisted with upkeep and restoration of historic aircraft. Working with campers and museum staff brought the mechanics and history of flight to life.", highlights: ["Supported campers and hands-on aviation education", "Helped maintain exhibits and historic aircraft", "Explained foundational concepts in aeronautics and flight"],
  },
  {
    slug: "los-altos-high-school", date: "AUG 2022 → NOW", period: "Education", title: "Los Altos High School", role: "Student", organization: "Los Altos High School", icon: "✦", color: "lavender", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85", alt: "Students gathered in a school hallway", summary: "Learning broadly, building deeply, and following the questions that make class spill into the rest of the day.", detail: "I am a student at Los Altos High School, where I enjoy pursuing a rigorous course load and making room for the people and projects that keep me curious.", highlights: ["3.98 unweighted GPA · 4.64 weighted GPA", "AP coursework across computer science, math, science, history, and language", "ACT: 35"],
  },
];
