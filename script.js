// ------------ DATA ---------------

const skills = {
  programming: ["C", "C++", "Python", "Java (basics)"],
  aiMl: ["Machine Learning basics", "Azure AI-900", "NPTEL ML"],
  tools: ["DBMS / SQL", "Excel (Data Viz)", "Git & GitHub", "Windows", "Ubuntu", "Canva"]
};

const projects = [
  {
    id: 1,
    title: "Race Car Optimization using Simulation",
    category: "AI-ML",
    short: "Simulation-based optimization to improve race car performance using ML analysis.",
    long:
      "Built a simulation pipeline to model race car performance under different configurations. Applied ML-inspired analysis to evaluate parameter changes, compare outcomes, and suggest more optimal setups.",
    tech: ["Python", "Simulation", "Machine Learning"],
    github: "",
    demo: ""
  },
  {
    id: 2,
    title: "Student Management System",
    category: "Academic",
    short: "System to manage student records with full CRUD operations and database integration.",
    long:
      "Designed and implemented a student management system supporting create, read, update, and delete operations. Structured relational tables, wrote SQL queries, and built user flows to manage student information efficiently.",
    tech: ["C / C++", "DBMS", "SQL"],
    github: "",
    demo: ""
  },
  {
    id: 3,
    title: "Data Visualization Dashboard in Excel",
    category: "Data",
    short: "Interactive dashboard showcasing insights using charts, slicers, and formatted visuals.",
    long:
      "Used Excel to clean and organize raw data, derive KPIs, and build charts and pivot tables. Created an interactive dashboard with slicers and conditional formatting to highlight trends and insights quickly.",
    tech: ["Excel", "Data Visualization"],
    github: "",
    demo: ""
  }
];

const certifications = [
  {
    title: "Microsoft Azure AI-900 Fundamentals",
    org: "Microsoft",
    year: "2024",
    desc: "AI workloads, ML concepts, and responsible AI on Microsoft Azure."
  },
  {
    title: "NPTEL – Introduction to Machine Learning",
    org: "NPTEL",
    year: "2024",
    desc: "Supervised/unsupervised learning, model evaluation, core ML algorithms."
  },
  {
    title: "NPTEL – Database Management Systems",
    org: "NPTEL",
    year: "2023",
    desc: "Relational models, SQL queries, normalization, and transactions."
  },
  {
    title: "Deloitte – Data Analytics Job Simulation",
    org: "Deloitte",
    year: "2023",
    desc: "Data cleaning, exploratory analysis, and communicating business insights."
  }
];

const hobbies = [
  {
    key: "classical",
    emoji: "🩰",
    title: "Classical Dancing",
    sub: "Classical dance keeps me grounded and creative, and has been a part of my life for years.",
    softSkill: "It’s taught me discipline, grace under pressure, and how to express ideas without words."
  },
  {
    key: "badminton",
    emoji: "🏸",
    title: "Badminton",
    sub: "On most good days you’ll find me on a badminton court instead of a chair.",
    softSkill: "Fast rallies sharpen my reflexes, focus, and sense of teamwork."
  },
  {
    key: "chess",
    emoji: "♟️",
    title: "Occasional Chess",
    sub: "I’m not a pro, but I enjoy slow chess games with friends or online.",
    softSkill: "Chess helps me think a few moves ahead and be patient with complex problems."
  }
];

// ------------ RENDER FUNCTIONS ---------------

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const groups = [
    { title: "Programming", items: skills.programming },
    { title: "AI / ML & Data", items: skills.aiMl },
    { title: "Tools & Platforms", items: skills.tools }
  ];

  groups.forEach((group) => {
    const div = document.createElement("div");
    div.className = "skills-group";

    const h3 = document.createElement("h3");
    h3.textContent = group.title;
    div.appendChild(h3);

    const pills = document.createElement("div");
    pills.className = "pill-group";

    group.items.forEach((item) => {
      const span = document.createElement("span");
      span.className = "pill";
      span.textContent = item;
      pills.appendChild(span);
    });

    div.appendChild(pills);
    grid.appendChild(div);
  });
}

let activeFilter = "All";
let expandedProjectId = null;

function renderProjectFilters() {
  const container = document.getElementById("project-filters");
  if (!container) return;

  const categories = ["All", "AI-ML", "Data", "Academic"];
  container.innerHTML = "";

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === activeFilter ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeFilter = cat;
      renderProjectFilters();
      renderProjects();
    });
    container.appendChild(btn);
  });
}

function getFilteredProjects() {
  if (activeFilter === "All") return projects;
  return projects.filter((p) => p.category === activeFilter);
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const list = getFilteredProjects();

  list.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card project-card";

    const header = document.createElement("div");
    header.className = "project-header";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = project.category;

    header.appendChild(title);
    header.appendChild(badge);
    card.appendChild(header);

    const shortP = document.createElement("p");
    shortP.className = "project-short";
    shortP.textContent = project.short;
    card.appendChild(shortP);

    if (expandedProjectId === project.id) {
      const longP = document.createElement("p");
      longP.className = "project-long";
      longP.textContent = project.long;
      card.appendChild(longP);
    }

    const techDiv = document.createElement("div");
    techDiv.className = "tech-stack";
    project.tech.forEach((t) => {
      const span = document.createElement("span");
      span.className = "pill pill-small";
      span.textContent = t;
      techDiv.appendChild(span);
    });
    card.appendChild(techDiv);

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn ghost small";
    toggleBtn.textContent =
      expandedProjectId === project.id ? "Show less" : "Show details";
    toggleBtn.addEventListener("click", () => {
      expandedProjectId =
        expandedProjectId === project.id ? null : project.id;
      renderProjects();
    });
    actions.appendChild(toggleBtn);

    const links = document.createElement("div");
    links.className = "project-links";

    if (project.github) {
      const aGit = document.createElement("a");
      aGit.href = project.github;
      aGit.target = "_blank";
      aGit.rel = "noreferrer";
      aGit.textContent = "GitHub ↗";
      links.appendChild(aGit);
    }

    if (project.demo) {
      const aDemo = document.createElement("a");
      aDemo.href = project.demo;
      aDemo.target = "_blank";
      aDemo.rel = "noreferrer";
      aDemo.textContent = "Demo ↗";
      links.appendChild(aDemo);
    }

    actions.appendChild(links);
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

function renderCertifications() {
  const grid = document.getElementById("certs-grid");
  if (!grid) return;

  grid.innerHTML = "";

  certifications.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card small";

    const header = document.createElement("div");
    header.className = "cert-header";

    const title = document.createElement("h3");
    title.textContent = c.title;

    const year = document.createElement("span");
    year.className = "cert-year";
    year.textContent = c.year;

    header.appendChild(title);
    header.appendChild(year);

    const org = document.createElement("p");
    org.className = "cert-org";
    org.textContent = c.org;

    const desc = document.createElement("p");
    desc.className = "cert-desc";
    desc.textContent = c.desc;

    card.appendChild(header);
    card.appendChild(org);
    card.appendChild(desc);

    grid.appendChild(card);
  });
}

function renderHobbies() {
  const grid = document.getElementById("hobbies-grid");
  if (!grid) return;

  grid.innerHTML = "";

  hobbies.forEach((hobby) => {
    const card = document.createElement("article");
    card.className = `hobby-card hobby-${hobby.key}`;

    const emoji = document.createElement("div");
    emoji.className = "hobby-emoji";
    emoji.textContent = hobby.emoji;

    const title = document.createElement("div");
    title.className = "hobby-title";
    title.textContent = hobby.title;

    const sub = document.createElement("div");
    sub.className = "hobby-sub";
    sub.textContent = hobby.sub;

    const softSkill = document.createElement("div");
    softSkill.className = "hobby-soft-skill";
    softSkill.textContent = hobby.softSkill;

    card.appendChild(emoji);
    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(softSkill);

    grid.appendChild(card);
  });
}

// ------------ SCROLL + THEME + MISC ---------------

function setupSmoothScroll() {
  const clickable = document.querySelectorAll(
    "[data-scroll], .nav-links button, .hero-actions .btn"
  );

  clickable.forEach((el) => {
    el.addEventListener("click", (e) => {
      const targetSelector = el.getAttribute("data-scroll");
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupScrollAnimations() {
  const sections = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Load stored theme
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
    btn.textContent = stored === "dark" ? "🌙" : "☀️";
  }

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "dark" ? "🌙" : "☀️";
  });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
}

// ------------ INIT ---------------

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjectFilters();
  renderProjects();
  renderCertifications();
  renderHobbies();
  setupSmoothScroll();
  setupScrollAnimations();
  setupThemeToggle();
  setYear();
});
