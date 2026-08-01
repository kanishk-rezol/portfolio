import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Server,
  TerminalSquare,
  ArrowUp,
  X,
} from 'lucide-react'
import ScrollHero from './components/ScrollHero'
import PortfolioTerminal from './components/PortfolioTerminal'
import './App.css'

const experience = [
  {
    company: 'Stitch',
    role: 'Backend Engineer',
    period: 'Dec 2025 — Present',
    summary:
      'Building independent fintech services for loans, transactions, ledgers, cards, and payments.',
    points: [
      'Develop Go microservices with the Kratos framework and REST APIs for core financial workflows.',
      'Maintain reliable ledger and transaction records across PostgreSQL-backed services.',
      'Run large-scale migrations with Python and FastAPI, and support analytics through ClickHouse and Metabase.',
      'Deploy and maintain services on GCP Compute Engine with Nginx and optimize SQL-heavy workflows.',
    ],
    stack: ['Go', 'Kratos', 'PostgreSQL', 'ClickHouse', 'GCP', 'Nginx'],
  },
  {
    company: 'HAWC',
    role: 'Application Developer · Part-time',
    period: 'Jul 2025 — Present',
    summary:
      'Shipping backend services, applications, automation, and reporting workflows across the product stack.',
    points: [
      'Develop Python and Node.js backend services alongside React and React Native interfaces.',
      'Integrate REST APIs and automation features for dashboards and reporting workflows.',
      'Support stable application releases through Docker-based deployments and technical documentation.',
    ],
    stack: ['Python', 'Node.js', 'React', 'React Native', 'Docker'],
  },
  {
    company: 'WovvTech',
    role: 'Data Science Intern',
    period: 'Jun 2025 — Nov 2025',
    summary:
      'Created dependable data-collection pipelines for structured downstream analysis.',
    points: [
      'Built Python scraping scripts to collect structured data from multiple external sources.',
      'Automated dataset cleaning, organization, and storage while improving collection reliability.',
    ],
    stack: ['Python', 'Data scraping', 'Automation', 'Data pipelines'],
  },
]

const projects = [
  {
    index: '01',
    title: 'AI-Powered Course Enrollment',
    category: 'AI automation · Backend platform',
    description:
      'Backend APIs and automation workflows that simplify course discovery and enrollment operations.',
    stack: ['Python', 'JavaScript', 'REST APIs', 'Automation'],
    accent: 'cyan',
    image: '/assets/case-course-enrollment.webp',
  },
  {
    index: '02',
    title: 'Real-Time Chatbot System',
    category: 'Conversational AI · Real-time systems',
    description:
      'A FastAPI-powered chatbot backend connected to a responsive interface for real-time communication.',
    stack: ['FastAPI', 'Python', 'React', 'NLP'],
    accent: 'violet',
    image: '/assets/case-chatbot.webp',
  },
  {
    index: '03',
    title: 'IoT Accessibility Tool',
    category: 'Computer vision · Award-winning project',
    description:
      'An object-detection system designed to support real-time environmental interaction and accessibility.',
    stack: ['Python', 'Object detection', 'IoT', 'Computer vision'],
    accent: 'amber',
    image: '/assets/case-accessibility.webp',
  },
  {
    index: '04',
    title: 'NLP Research Project',
    category: 'Machine learning · Research',
    description:
      'Transformer-based NLP models with optimized training workflows for practical text-analysis tasks.',
    stack: ['Transformers', 'Python', 'NLP', 'Model training'],
    accent: 'blue',
    image: '/assets/case-nlp.webp',
  },
]

const archiveProjects = [
  { title: 'Miles Morales 3D Webpage', type: '3D Web Experience', image: '/assets/archive-3d-web.webp', href: 'https://github.com/kanishk-rezol/Spiderman' },
  { title: 'Anime Watching App', type: 'React Application', image: '/assets/archive-anime-app.webp', href: 'https://github.com/kanishk-rezol/animeapp' },
  { title: 'Recipe Finder', type: 'API Product', image: '/assets/archive-recipe-finder.webp', href: 'https://github.com/kanishk-rezol/Recipe-finder' },
  { title: 'Instagram Clone', type: 'Frontend Study', image: '/assets/archive-ui-studies.webp', href: 'https://github.com/kanishk-rezol/insta-clone' },
  { title: 'Chatbot', type: 'Python Project', image: '/assets/archive-chatbot.webp', href: 'https://github.com/kanishk-rezol/ChatBot' },
  { title: 'LGBTQ+ Survey Analysis', type: 'Data Analysis', image: '/assets/archive-survey-analysis.webp', href: 'https://github.com/kanishk-rezol/LGBTQ-Review-analysis' },
]

const skillGroups = [
  {
    icon: Server,
    title: 'Backend',
    description: 'Services designed for reliability, clear boundaries, and real-world operations.',
    skills: ['Go', 'Python', 'Kratos', 'FastAPI', 'Node.js', 'REST APIs', 'Microservices'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'Deployments and infrastructure that keep applications secure and maintainable.',
    skills: ['GCP', 'AWS', 'Docker', 'Nginx', 'Linux', 'Git'],
  },
  {
    icon: Database,
    title: 'Data Systems',
    description: 'Transactional, analytical, and migration workflows with data integrity in mind.',
    skills: ['PostgreSQL', 'ClickHouse', 'SQL', 'Metabase', 'Data migration'],
  },
  {
    icon: Code2,
    title: 'Product Engineering',
    description: 'Supporting interfaces and tools that make backend capabilities useful to people.',
    skills: ['TypeScript', 'JavaScript', 'React', 'React Native', 'Java'],
  },
]

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['home', 'work', 'experience', 'stack', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60%', threshold: [0, 0.2, 0.6] },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const links = [['Work', '#work'], ['Experience', '#experience'], ['Stack', '#stack'], ['About', '#about']]

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <div className="m3-toolbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Kanishk P, home">
          <span className="brand-mark">KP</span>
          <span className="brand-name"><b>Kanishk</b><small>Backend Engineer</small></span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => {
            const id = href.slice(1)
            return <a key={href} href={href} onClick={closeMenu} aria-current={activeSection === id ? 'page' : undefined}>{label}</a>
          })}
          <a className="nav-contact" href="#contact" onClick={closeMenu} aria-current={activeSection === 'contact' ? 'page' : undefined}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>

        <div className="toolbar-actions">
          <a className="toolbar-icon" href="/assets/Kanishk-P-Resume.pdf" target="_blank" rel="noreferrer" aria-label="Open Kanishk's résumé" title="Résumé"><Download size={19} /></a>
          <button className="menu-button toolbar-icon" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}

function ExpressiveDock() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <aside className="expressive-dock" aria-label="Quick actions">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" title="Back to top"><ArrowUp size={19} /></button>
      <button type="button" onClick={() => scrollTo('terminal')} aria-label="Go to terminal section" title="Terminal"><TerminalSquare size={19} /></button>
      <a className="expressive-dock__primary" href="mailto:kanishkpalanisamy002@gmail.com" aria-label="Email Kanishk" title="Email"><Mail size={20} /></a>
    </aside>
  )
}

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.m3-depth'))
    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        card.style.setProperty('--rx', `${(0.5 - y) * 5}deg`)
        card.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
        card.style.setProperty('--mx', `${x * 100}%`)
        card.style.setProperty('--my', `${y * 100}%`)
      }
      const leave = () => {
        card.style.setProperty('--rx', '0deg')
        card.style.setProperty('--ry', '0deg')
      }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      return () => {
        card.removeEventListener('pointermove', move)
        card.removeEventListener('pointerleave', leave)
      }
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return (
    <div className="site-shell">
      <Navigation />
      <main>
        <ScrollHero />

        <section className="snapshot section-wrap" aria-label="Engineering snapshot">
          <div className="snapshot-intro reveal">
            <p className="eyebrow"><span />Engineering snapshot</p>
            <p className="snapshot-lead">
              From financial ledgers to AI workflows, I turn complex requirements into dependable systems.
            </p>
          </div>
          <div className="snapshot-grid">
            {[
              [BriefcaseBusiness, 'Fintech systems', 'APIs and services across loans, payments, transactions, cards, and ledgers.'],
              [Cloud, 'Cloud infrastructure', 'Production deployments on GCP and AWS with Docker, Nginx, and Linux.'],
              [BrainCircuit, 'AI & data workflows', 'Practical automation, migration pipelines, NLP, analytics, and computer vision.'],
            ].map(([Icon, title, copy], index) => {
              const ItemIcon = Icon as typeof Server
              return (
                <article className="snapshot-card m3-depth reveal" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties} key={title as string}>
                  <span className="icon-box"><ItemIcon size={22} /></span>
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="experience" className="experience section-wrap">
          <SectionHeading
            eyebrow="Experience"
            title="Building systems that carry real responsibility."
            copy="Hands-on work across fintech infrastructure, application engineering, and dependable data pipelines."
          />
          <div className="timeline">
            {experience.map((job, index) => (
              <article className="timeline-item reveal" key={job.company} style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div className="timeline-meta">
                  <p><CalendarDays size={15} />{job.period}</p>
                  <h3>{job.role}</h3>
                  <h4>{job.company}</h4>
                </div>
                <div className="timeline-body">
                  <p className="job-summary">{job.summary}</p>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <div className="tag-list">{job.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="section-wrap">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects shaped around useful outcomes."
              copy="A selection of backend, AI, and accessibility work. Detailed architecture and live links will be added as each case study is documented."
            />
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card project-card--${project.accent} m3-depth reveal`} key={project.title} style={{ '--delay': `${(index % 2) * 100}ms` } as React.CSSProperties}>
                  <div className="project-topline"><span>{project.index}</span><span>CASE STUDY</span></div>
                  <div className="project-visual">
                    <img src={project.image} alt={`3D concept artwork for ${project.title}`} loading="lazy" />
                    <span className="project-image-shade" />
                  </div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
            <a className="text-link reveal" href="https://github.com/kanishk-rezol" target="_blank" rel="noreferrer">
              Explore more on GitHub <ArrowUpRight size={17} />
            </a>

            <div className="archive-heading reveal">
              <div><p className="eyebrow"><span />From the old portfolio</p><h3>Creative code archive.</h3></div>
              <p>Earlier experiments that shaped how I think about interfaces, APIs, data, and interactive experiences.</p>
            </div>
            <div className="archive-grid">
              {archiveProjects.map((project, index) => (
                <a className="archive-card m3-depth reveal" href={project.href} target="_blank" rel="noreferrer" key={project.title} style={{ '--delay': `${(index % 3) * 70}ms` } as React.CSSProperties}>
                  <div className="archive-image"><img src={project.image} alt={`${project.title} project preview`} loading="lazy" /></div>
                  <div className="archive-info"><div><span>{project.type}</span><h4>{project.title}</h4></div><ArrowUpRight size={18} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="stack section-wrap">
          <SectionHeading
            eyebrow="Technical stack"
            title="The tools behind the systems."
            copy="I choose technologies for clarity, reliability, and maintainability—not for novelty."
          />
          <div className="stack-grid">
            {skillGroups.map(({ icon: Icon, title, description, skills }, index) => (
              <article className="stack-card m3-depth reveal" key={title} style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}>
                <div className="stack-card-heading"><span className="icon-box"><Icon size={22} /></span><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-wrap about-grid">
            <div className="about-copy reveal">
              <p className="eyebrow"><span />About me</p>
              <h2>Curious by nature.<br />Reliable by design.</h2>
              <p>
                I’m a software engineer based in Chennai, focused on backend systems, cloud infrastructure, and AI-powered products. My work has moved from data automation and application development into financial microservices—giving me a practical view of how data, infrastructure, and product decisions connect.
              </p>
              <p>
                I enjoy untangling complex workflows, designing clean service boundaries, and making systems easier to operate. I’m currently open to opportunities across Backend, AI, Infrastructure, and Cloud Engineering.
              </p>
              <div className="location"><MapPin size={18} />Chennai, Tamil Nadu, India</div>
            </div>
            <div className="credential-list">
              <article className="credential reveal">
                <GraduationCap size={24} />
                <div><span>2022 — 2025</span><h3>B.E. Computer Science</h3><p>Kongu Engineering College, Erode</p></div>
              </article>
              <article className="credential reveal">
                <GraduationCap size={24} />
                <div><span>2019 — 2022</span><h3>Diploma in Computer Science</h3><p>PSG Polytechnic College, Coimbatore</p></div>
              </article>
              <article className="credential credential--award reveal">
                <Award size={24} />
                <div><span>Achievement</span><h3>Best Project Award</h3><p>IoT Accessibility System</p></div>
              </article>
            </div>
          </div>
        </section>

        <PortfolioTerminal />

        <section id="contact" className="contact section-wrap">
          <div className="contact-panel reveal">
            <div className="contact-glow" />
            <p className="eyebrow"><span />Let's build something useful</p>
            <h2>Have a hard problem<br />worth solving?</h2>
            <p className="contact-copy">I’m open to backend, AI, infrastructure, and cloud engineering opportunities.</p>
            <div className="contact-actions">
              <a className="button button--primary" href="mailto:kanishkpalanisamy002@gmail.com">Start a conversation <Mail size={18} /></a>
              <a className="button button--ghost" href="/assets/Kanishk-P-Resume.pdf" target="_blank" rel="noreferrer">View résumé <Download size={18} /></a>
            </div>
            <div className="social-links">
              <a href="https://github.com/kanishk-rezol" target="_blank" rel="noreferrer"><Github size={18} />GitHub <ArrowUpRight size={14} /></a>
              <a href="https://www.linkedin.com/in/kanishk-p-185256287/" target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn <ArrowUpRight size={14} /></a>
              <a href="mailto:kanishkpalanisamy002@gmail.com"><Mail size={18} />Email <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>

      <ExpressiveDock />

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">KP</span><span className="brand-name">Kanishk P</span></a>
        <p>Designed and engineered with intention.</p>
        <a href="#home">Back to top <ArrowDown className="footer-arrow" size={15} /></a>
      </footer>
    </div>
  )
}

export default App
