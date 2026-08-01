import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Maximize2, Minus, RotateCcw, TerminalSquare, X } from 'lucide-react'

type Line = {
  id: number
  kind: 'command' | 'output' | 'error' | 'success'
  content: string
}

const commands = [
  'help', 'about', 'whoami', 'skills', 'experience', 'projects', 'education', 'contact',
  'resume', 'github', 'linkedin', 'ls', 'pwd', 'cd', 'cat', 'date', 'echo', 'history',
  'clear', 'neofetch', 'sudo',
]

const files: Record<string, string> = {
  'about.txt': 'Backend Engineer building reliable systems for fintech, AI, and data-intensive products.',
  'skills.txt': 'Go · Python · Kratos · FastAPI · Node.js · PostgreSQL · ClickHouse · GCP · AWS · Docker · Nginx · React',
  'experience.txt': 'Stitch — Backend Engineer\nHAWC — Application Developer\nWovvTech — Data Science Intern',
  'education.txt': 'B.E. Computer Science — Kongu Engineering College\nDiploma in Computer Science — PSG Polytechnic College',
  'contact.txt': 'Email: kanishkpalanisamy002@gmail.com\nLinkedIn: linkedin.com/in/kanishk-p-185256287\nGitHub: github.com/kanishk-rezol',
}

const introLines: Line[] = [
  { id: 1, kind: 'success', content: 'Welcome to Kanishk OS 1.0 LTS' },
  { id: 2, kind: 'output', content: "Type 'help' to explore the portfolio. Try 'neofetch' first." },
]

export default function PortfolioTerminal() {
  const [lines, setLines] = useState<Line[]>(introLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cwd, setCwd] = useState('~')
  const [maximized, setMaximized] = useState(false)
  const [closed, setClosed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lineId = useRef(3)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const addLines = (newLines: Omit<Line, 'id'>[]) => {
    setLines((current) => [...current, ...newLines.map((line) => ({ ...line, id: lineId.current++ }))])
  }

  const navigate = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

  const runCommand = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    const [command, ...args] = trimmed.split(/\s+/)
    const cmd = command.toLowerCase()
    addLines([{ kind: 'command', content: `kanishk@portfolio:${cwd}$ ${trimmed}` }])

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const output = (content: string, kind: Line['kind'] = 'output') => addLines([{ kind, content }])

    switch (cmd) {
      case 'help':
        output('PORTFOLIO COMMANDS\n  about       Professional summary\n  skills      Technical toolkit\n  experience  Work history\n  projects    Selected projects\n  education   Education & award\n  contact     Contact information\n  resume      Open résumé\n  github      Open GitHub\n  linkedin    Open LinkedIn\n\nSHELL COMMANDS\n  ls  pwd  cd  cat  date  echo  history  clear  neofetch')
        break
      case 'whoami':
        output('kanishk — backend-engineer')
        break
      case 'about':
        output(files['about.txt'])
        break
      case 'skills':
        output(files['skills.txt'])
        break
      case 'experience':
        output('● STITCH · Backend Engineer · Dec 2025 — Present\n  Go microservices, fintech APIs, PostgreSQL, ClickHouse, GCP\n\n● HAWC · Application Developer · Jul 2025 — Present\n  Python, Node.js, React, React Native, Docker\n\n● WOVVTECH · Data Science Intern · Jun — Nov 2025\n  Python scraping, automation, and data pipelines')
        break
      case 'projects':
        output('01  AI-Powered Course Enrollment\n02  Real-Time Chatbot System\n03  IoT Accessibility Tool [Best Project Award]\n04  NLP Research Project\n05  Creative Code Archive [6 projects]\n\nUse the Work section below to explore every project.')
        break
      case 'education':
        output(`${files['education.txt']}\nBest Project Award — IoT Accessibility System`)
        break
      case 'contact':
        output(files['contact.txt'])
        break
      case 'resume':
        output('Opening résumé…', 'success')
        navigate('/assets/Kanishk-P-Resume.pdf')
        break
      case 'github':
        output('Opening GitHub…', 'success')
        navigate('https://github.com/kanishk-rezol')
        break
      case 'linkedin':
        output('Opening LinkedIn…', 'success')
        navigate('https://www.linkedin.com/in/kanishk-p-185256287/')
        break
      case 'pwd':
        output(cwd === '~' ? '/home/kanishk' : `/home/kanishk/${cwd.replace('~/', '')}`)
        break
      case 'ls':
        output(cwd === '~' ? 'about.txt  skills.txt  experience.txt  education.txt  contact.txt  projects/' : 'course-enrollment/  chatbot/  accessibility/  nlp-research/  archive/')
        break
      case 'cd': {
        const destination = args[0] ?? '~'
        if (destination === '~' || destination === '..' || destination === '/home/kanishk') setCwd('~')
        else if (destination.replace(/\/$/, '') === 'projects') setCwd('~/projects')
        else output(`cd: ${destination}: No such directory`, 'error')
        break
      }
      case 'cat': {
        const filename = args[0]
        if (!filename) output('cat: missing file operand', 'error')
        else if (files[filename]) output(files[filename])
        else output(`cat: ${filename}: No such file`, 'error')
        break
      }
      case 'date':
        output(new Date().toString())
        break
      case 'echo':
        output(args.join(' '))
        break
      case 'history':
        output(history.map((item, index) => `${String(index + 1).padStart(3, ' ')}  ${item}`).join('\n') || 'No commands in history.')
        break
      case 'neofetch':
        output('        .-/+oossssoo+/-.          kanishk@portfolio\n    `:+ssssssssssssssssss+:`      -----------------\n  -+ssssssssssssssssssyyssss+-    Role: Backend Engineer\n .ossssssssssssssssssdMMMNysssso.  Location: Chennai, India\n/ssssssssssshdmmNNmmyNMMMMhssssss/ Stack: Go, Python, Cloud, Data\n+ssssssssshmydMMMMMMMNddddyssssssss+ Cloud: GCP, AWS\n/sssssssshNMMMyhhyyyyhmNMMMNhssssss/ Focus: Fintech, AI, Infrastructure\n .osssssssdMMMNhsssssssshNMMMdssss. Status: Open to opportunities\n  -+ssssssshNMMMyssssssydMMMNs+-\n    `:+ssssssssssssssssss+:`\n        .-/+oossssoo+/-.')
        break
      case 'sudo':
        output('kanishk is already trusted with production. No sudo required.', 'success')
        break
      default:
        output(`${command}: command not found. Type 'help' for available commands.`, 'error')
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    setHistory((current) => [...current, input.trim()])
    setHistoryIndex(-1)
    runCommand(input)
    setInput('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      if (next >= 0) {
        setHistoryIndex(next)
        setInput(history[history.length - 1 - next])
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = historyIndex - 1
      setHistoryIndex(next)
      setInput(next >= 0 ? history[history.length - 1 - next] : '')
    } else if (event.key === 'Tab') {
      event.preventDefault()
      const matches = commands.filter((command) => command.startsWith(input.toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
      else if (matches.length > 1) addLines([{ kind: 'output', content: matches.join('  ') }])
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setLines([])
    }
  }

  if (closed) {
    return (
      <section className="terminal-section section-wrap">
        <button className="terminal-reopen" type="button" onClick={() => setClosed(false)}><TerminalSquare size={20} /> Reopen portfolio terminal</button>
      </section>
    )
  }

  return (
    <section id="terminal" className={`terminal-section section-wrap ${maximized ? 'terminal-section--maximized' : ''}`}>
      <div className="terminal-intro reveal">
        <p className="eyebrow"><span />Interactive profile</p>
        <h2>Don’t just read it.<br />Run it.</h2>
        <p>Explore my background through a familiar command line. Everything runs safely in your browser.</p>
      </div>
      <div className="ubuntu-terminal reveal" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-titlebar">
          <div className="terminal-controls">
            <button type="button" className="terminal-close" aria-label="Close terminal" onClick={(event) => { event.stopPropagation(); setClosed(true) }}><X size={13} /></button>
            <button type="button" className="terminal-minimize" aria-label="Clear terminal" onClick={(event) => { event.stopPropagation(); setLines([]) }}><Minus size={13} /></button>
            <button type="button" className="terminal-maximize" aria-label={maximized ? 'Restore terminal' : 'Maximize terminal'} onClick={(event) => { event.stopPropagation(); setMaximized((value) => !value) }}><Maximize2 size={12} /></button>
          </div>
          <span>kanishk@portfolio: {cwd}</span>
          <button type="button" className="terminal-reset" aria-label="Reset terminal" onClick={(event) => { event.stopPropagation(); setLines(introLines); setCwd('~') }}><RotateCcw size={14} /></button>
        </div>
        <div className="terminal-body" ref={bodyRef} role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((line) => <pre className={`terminal-line terminal-line--${line.kind}`} key={line.id}>{line.content}</pre>)}
          <form className="terminal-prompt" onSubmit={submit}>
            <label htmlFor="terminal-command"><span className="prompt-user">kanishk@portfolio</span><span>:</span><span className="prompt-path">{cwd}</span><span>$</span></label>
            <input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal command" />
          </form>
        </div>
        <div className="terminal-hints"><span>↑↓ history</span><span>Tab autocomplete</span><span>Ctrl+L clear</span></div>
      </div>
    </section>
  )
}
