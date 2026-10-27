export type Source = { label: string; url: string };

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
  /** Photographer / rights holder, as required by the image's license. */
  imageCredit?: string;
  /** Page documenting the photo's license (e.g., the Wikimedia Commons file page). */
  imageCreditUrl?: string;
  summary: string;
  detail: string;
  highlights: string[];
  hint?: string;
  callout?: string;
  link?: string;
  linkLabel?: string;
  highlightsTitle?: string;
  campus?: boolean;
  /** References backing the facts on the story page. */
  sources?: Source[];
};

export const timeline: TimelineItem[] = [
  {
    slug: "promys", date: "JUN 2025 → AUG 2025", period: "Mathematics", title: "PROMYS", role: "First-Year Participant", organization: "Boston University", icon: "π", color: "mint", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Boston%20University%20East%20Campus%20May%202014.jpg?width=1400", alt: "Boston University's East Campus along Commonwealth Avenue, home of PROMYS", imageCredit: "4300streetcar, CC BY 4.0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Boston_University_East_Campus_May_2014.jpg", summary: "Six summer weeks of number theory, long proof attempts, new friends, and the joy of finding a path through a hard problem.", detail: "At Boston University’s Program in Mathematics for Young Scientists, I spent six weeks exploring number theory through proof-based problem sets and collaborative inquiry. For six weeks at 744 Commonwealth Avenue, alongside roughly 90 students and a staff of mathematicians, there were no lectures and no worked examples — just conjectures, failed proofs, office-hour arguments, and theorems we proved and presented ourselves. The experience made sustained mathematical discovery part of my daily routine.", highlights: ["Six-week immersive number theory program on BU's campus", "Admitted on a proof-based problem set of eight open-ended questions", "Lecture-free pedagogy: students discover, prove, and defend results daily", "Built collaboration and mathematical research skills with ~90 motivated peers"], link: "https://www.promys.org",
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
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rosenbrockfunction2.jpg",
    alt: "Three-dimensional surface of the Rosenbrock function — the ill-conditioned landscape gradient descent must navigate",
    imageCredit: "Public domain, via Wikimedia Commons",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Rosenbrockfunction2.jpg",
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
    sources: [
      { label: "The Oxford Journal of Student Scholarship, Vol. 11, Issue 6 (Sep 28, 2026) — published paper", url: "https://www.oxfordjss.org/sep-2026-vol-11-issue-6/why-feature-scaling-works-condition-number-as-the-key-to-gradient-descent-convergence" },
    ],
  },
  {
    "slug": "courtbook",
    "callout": "Pending publication in the Los Altos Crier.",
    "date": "GRADES 11 → NOW",
    "period": "Technology & Community",
    "title": "CourtBook, LLC",
    "role": "Founder & Developer",
    "organization": "CourtBook, LLC",
    "icon": "◉",
    "color": "blue",
    "campus": false,
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Empty%20clay%20tennis%20court%20in%20Melbourne%20Australia%20looking%20down%20the%20middle.jpg?width=1400",
    "alt": "An empty public tennis court seen down the center line",
    "imageCredit": "KeepActive Australia, CC BY-SA 4.0, via Wikimedia Commons",
    "imageCreditUrl": "https://commons.wikimedia.org/wiki/File:Empty_clay_tennis_court_in_Melbourne_Australia_looking_down_the_middle.jpg",
    "summary": "Turning the search for an open tennis court into a computer-vision project with the City of Los Altos.",
    "detail": "I founded CourtBook, LLC to help communities understand how their courts are used. I built a computer-vision platform and weatherproof camera system for real-time court occupancy data, and after piloting with the Los Altos Parks and Recreation Department — including work with Manny Hernandez and Jaime Chew — we are moving forward with six parks and recreation departments on court usage data services. The work has grown from a McKenzie Court dashboard proposal into equipment preparation and discussions about service scope, installation, and privacy.",
    "highlightsTitle": "Building with the community",
    "highlights": [
        "Developed a computer-vision platform and weatherproof camera system",
        "Moving forward with six parks and recreation departments on court usage data services",
        "Prepared equipment for the agreed courts while coordinating approval and installation",
        "Designed the proposed service around occupancy data and numerical analysis, with no stored video"
    ]
},
  {
    slug: "advanced-student-investigation", date: "GRADES 11–12", period: "Research", title: "Alzheimer’s Research", role: "Student Researcher", organization: "ASI · UCSF & Duygu Lab · ASDRP", icon: "⌬", color: "pink", image: "https://commons.wikimedia.org/wiki/Special:FilePath/5eli%20assembly-1.jpg", alt: "Crystal structure of the TREM2 ectodomain (PDB entry 5ELI), the docking target of the project", imageCredit: "Render of RCSB PDB entry 5ELI, CC0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:5eli_assembly-1.jpg", summary: "Using Python and molecular design to explore Alzheimer’s trial data and potential TREM2 agonists.", detail: "My research spans analysis of Alzheimer’s trial data with Python and the design of TREM2 agonists through computational and experimental work. Through ASI and research experiences with UCSF, Duygu Lab, and ASDRP, I have developed and presented findings to faculty and at the Synopsys science fair. On the TREM2 project — a microglial receptor whose activation promotes clearance of amyloid-β plaques — we designed 232 analogs of the C1 small-molecule agonist scaffold and docked every one with SwissDock and AutoDock Vina against chain A of the 5ELI crystal structure, profiling ADMET properties with SwissADME. Two leads emerged: A4M (−7.0/−7.1 kcal/mol, strong drug-like profile) and A58M (−7.7/−7.8 kcal/mol via a hydrogen bond with Ser65). Synthesis for that junior-year project has now been completed — from the 91%-yield condensation to the A1 starting material and the Suzuki–Miyaura couplings through to the final target compounds. A second research project is currently underway, with compound synthesis in progress.", highlights: ["Poster: Targeting TREM2: In Silico Design of a Small Molecule Agonist", "Docked 232 C1 analogs (SwissDock + AutoDock Vina vs. TREM2 structure 5ELI); leads A4M and A58M beat both controls, VG-3927 and C1", "Junior-year TREM2 project completed end to end — synthesis of the target compounds finished", "Second research project currently underway, with synthesis in progress", "Presented findings to faculty and at the Synopsys science fair", "SCVSEFA Honorable Mention", "Top 25 recognition from CENIC / UC San Diego Supercomputer Center"], link: "https://science-fair.org/",
    sources: [
      { label: "Cho et al., Structure-Based Virtual Screening Identifies TREM2-Targeted Small Molecules that Enhance Microglial Phagocytosis (bioRxiv, 2025) — source of the C1 scaffold", url: "https://doi.org/10.1101/2025.08.23.671917" },
      { label: "RCSB PDB entry 5ELI — the TREM2 crystal structure used for docking", url: "https://www.rcsb.org/structure/5ELI" },
    ],
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
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Conservation%20Virtual%20Office%20Hours%20(20121129-OSEC-LSC-0053).jpg?width=1400",
    "alt": "A team collaborating at computers in a modern office setting",
    "imageCredit": "U.S. Department of Agriculture, public domain, via Wikimedia Commons",
    "imageCreditUrl": "https://commons.wikimedia.org/wiki/File:Conservation_Virtual_Office_Hours_(20121129-OSEC-LSC-0053).jpg",
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
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Los%20Altos%20High%20School%20(Los%20Altos,%20California).jpg?width=1400",
    "alt": "Los Altos High School, where the student clubs are based",
    "imageCredit": "Ixfd64, CC BY-SA 4.0, via Wikimedia Commons",
    "imageCreditUrl": "https://commons.wikimedia.org/wiki/File:Los_Altos_High_School_(Los_Altos,_California).jpg",
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
    slug: "buddies4math", date: "FEB 2023 → MAR 2025", period: "Community", title: "Buddies4Math", role: "Volunteer Math Tutor", organization: "Buddies4Math", icon: "∑", color: "yellow", image: "https://commons.wikimedia.org/wiki/Special:FilePath/PANCHAYATH%20LEVEL%20SPECIFIC%20LEARNING%20DISABILITY%20SUPPORT%20CENTRE%2CCHERUPUZHA.jpg", alt: "Children working through a hands-on learning activity together", imageCredit: "Radhakrishnan Kannur, CC0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:PANCHAYATH_LEVEL_SPECIFIC_LEARNING_DISABILITY_SUPPORT_CENTRE,CHERUPUZHA.jpg", summary: "Making room for the small, confidence-building breakthroughs that happen when math feels friendly.", detail: "With Buddies4Math, I prepared algebra lessons for three cohorts of 20 students and coordinated with two fellow tutors. Alongside everyday problem-solving, I helped students explore AMC preparation, guest lectures, and the Purple Comet competition.", highlights: ["Prepared lessons for three cohorts of 20 students", "Coordinated teaching with two other tutors", "Supported AMC preparation, guest lectures, and Purple Comet participation"], link: "https://buddies4math.org/",
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
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/58%20032179%20University%20of%20Chicago%20quad.jpg?width=1400",
    alt: "The University of Chicago quad, site of the summer mathematics program",
    imageCredit: "Downtowngal, CC BY-SA 4.0, via Wikimedia Commons",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:58_032179_University_of_Chicago_quad.jpg",
    "summary": "Exploring advanced mathematics through coursework and research seminars.",
    "detail": "Through the UChicago summer experience, I participated in six weeks of advanced mathematics coursework and research seminars, earning a certificate of achievement. It was another opportunity to work beyond the familiar classroom syllabus and follow mathematical questions in greater depth.",
    "highlights": [
        "Advanced mathematics coursework",
        "Participation in research seminars",
        "Certificate of achievement"
    ]
},
  {
    slug: "varsity-tennis", date: "GRADES 10–12", period: "Athletics", title: "Varsity Tennis", role: "Co-Captain", organization: "LAHS Tennis Team", icon: "◉", color: "coral", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tennis%20Player%20in%20Action.jpg?width=1400", alt: "A tennis player mid-swing on the court", imageCredit: "Johnnybam, CC BY-SA 4.0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Tennis_Player_in_Action.jpg", summary: "Showing up, rallying hard, and leading by the example set during the quiet hours of the off-season.", detail: "As co-captain of the Los Altos High School varsity tennis team, I led a group of 18 student-athletes through daily after-school practices and represented our school in doubles during league and postseason competition.", highlights: ["Co-captain of 18 student-athletes", "Daily after-school practices and team leadership", "Doubles competition in league and postseason play"], hint: "Campus easter egg: double-click either player on the tennis court to swap in a legend — or type a name anywhere ('federer', 'nadal', 'djokovic', 'serena', 'agassi'). 'deuce' shuffles the lineup; 'rishi' calls it back.",
  },
  {
    slug: "hiller-aviation", date: "JUL 2023 → AUG 2023", period: "Community", title: "Hiller Aviation", role: "Aviation & Aircraft Maintenance Volunteer", organization: "Hiller Aviation Museum", icon: "✈", color: "blue", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hiller%20Aviation%20Museum%20front.JPG?width=1400", alt: "The front entrance of the Hiller Aviation Museum in San Carlos, California", imageCredit: "BrokenSphere, CC BY-SA 3.0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Hiller_Aviation_Museum_front.JPG", summary: "Helping young visitors get their imaginations off the ground—one exhibit, question, and paper airplane at a time.", detail: "At the Hiller Aviation Museum in San Carlos, I supported hands-on aviation activities, helped visitors engage with the museum's collection of historic aircraft, and assisted with upkeep and restoration work. Working with campers and museum staff brought the mechanics and history of flight to life.", highlights: ["Supported campers and hands-on aviation education", "Helped maintain exhibits and historic aircraft", "Explained foundational concepts in aeronautics and flight"], link: "https://www.hiller.org",
  },
  {
    slug: "los-altos-high-school", date: "AUG 2022 → NOW", period: "Education", title: "Los Altos High School", role: "Student", organization: "Los Altos High School", icon: "✦", color: "lavender", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Los%20altos%20high%20school%20may%202020.jpg?width=1400", alt: "Los Altos High School campus on Almond Avenue, Los Altos, California", imageCredit: "Ovinus Real, CC BY-SA 4.0, via Wikimedia Commons", imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Los_altos_high_school_may_2020.jpg", summary: "Learning broadly, building deeply, and following the questions that make class spill into the rest of the day.", detail: "I study at Los Altos High School, a comprehensive public school of about 2,170 students in the heart of Silicon Valley. I have loaded my schedule with the hardest courses I can find — from Algebra II Honors as a ninth-grader to a run of AP classes across disciplines — and my classes regularly spill into the rest of the day: research at the school's Advanced Scientific Investigation capstone, meetings for the student TEDx chapter, and late rallies on the tennis courts.", highlights: ["3.98 unweighted GPA · 4.5+ weighted GPA through junior year", "Seven AP courses: Computer Science A, Human Geography, Calculus BC, Chemistry, Physics 1, English Language, and US History", "Four years of Mandarin Chinese alongside the math and science sequence", "ACT: 35"],
    sources: [
      { label: "LAHS 2025–26 School Profile (Mountain View-Los Altos Union High School District)", url: "https://www.mvla.net" },
    ],
  },
];
