import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Download, Github, Linkedin, LoaderCircle, MapPin } from 'lucide-react'

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function layerOpacity(progress: number, start: number, peakStart: number, peakEnd: number, end: number) {
  if (progress < start || progress >= end) return 0
  if (progress < peakStart) return (progress - start) / (peakStart - start)
  if (progress <= peakEnd) return 1
  return 1 - (progress - peakEnd) / (end - peakEnd)
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressTarget = useRef(0)
  const progressCurrent = useRef(0)
  const renderedProgress = useRef(-1)
  const lastSeekAt = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0.08)
      return
    }

    const updateTarget = () => {
      if (!sectionRef.current) return
      const start = sectionRef.current.offsetTop
      const distance = sectionRef.current.offsetHeight - window.innerHeight
      progressTarget.current = clamp((window.scrollY - start) / Math.max(distance, 1))
    }

    const tick = (time: number) => {
      progressCurrent.current += (progressTarget.current - progressCurrent.current) * 0.12
      const next = progressCurrent.current
      const video = videoRef.current
      if (video?.duration && Number.isFinite(video.duration) && !video.seeking && time - lastSeekAt.current > 32) {
        const targetTime = next * Math.max(video.duration - 0.08, 0)
        if (Math.abs(video.currentTime - targetTime) > 0.035) {
          video.currentTime = targetTime
          lastSeekAt.current = time
        }
      }
      if (Math.abs(renderedProgress.current - next) > 0.002) {
        renderedProgress.current = next
        setProgress(next)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    updateTarget()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  const layerStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    const opacity = reducedMotion && start === 0 ? 1 : layerOpacity(progress, start, peakStart, peakEnd, end)
    return {
      opacity,
      transform: `translate3d(0, ${(1 - opacity) * 30}px, 0) scale(${0.98 + opacity * 0.02})`,
      pointerEvents: opacity > 0.6 ? ('auto' as const) : ('none' as const),
    }
  }

  return (
    <section ref={sectionRef} id="home" className={`scroll-hero ${reducedMotion ? 'scroll-hero--reduced' : ''}`}>
      <div className="hero-sticky">
        <video
          ref={videoRef}
          className={`hero-video ${ready ? 'hero-video--ready' : ''}`}
          src="/assets/developer-hero-scrub.mp4"
          poster="/assets/developer-hero-poster.jpg"
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          onLoadedMetadata={() => {
            setReady(true)
            if (videoRef.current) videoRef.current.currentTime = reducedMotion ? 2.5 : 0.01
          }}
        />
        <div className="hero-scrim" />
        <div className="hero-grid" aria-hidden="true" />

        {!ready && (
          <div className="hero-loader"><LoaderCircle size={19} /> Preparing experience</div>
        )}

        <div className="hero-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${reducedMotion ? 1 : progress})` }} />
        </div>
        <div className="hero-progress-label" aria-hidden="true">
          <span>{String(Math.round(progress * 100)).padStart(2, '0')}</span><span>100</span>
        </div>

        <div className="hero-layer hero-layer--intro" style={layerStyle(0, 0.015, 0.15, 0.25)}>
          <div className="hero-kicker"><span className="status-dot" />Backend Engineer <span className="divider" /> <MapPin size={14} /> Chennai, India</div>
          <h1>Hi, I’m<br /><em>Kanishk.</em></h1>
          <p>I build reliable systems for fintech, AI, and data-intensive products.</p>
        </div>

        {!reducedMotion && (
          <>
            <div className="hero-layer hero-layer--summary" style={layerStyle(0.17, 0.26, 0.35, 0.46)}>
              <p className="hero-number">01 / PROFILE</p>
              <h2>Software engineer.<br /><em>Systems thinker.</em></h2>
              <p>Hands-on experience across backend development, AI-based systems, and cloud infrastructure.</p>
              <div className="hero-chips"><span>Go</span><span>Python</span><span>Microservices</span><span>GCP</span><span>AWS</span></div>
            </div>

            <div className="hero-layer hero-layer--current" style={layerStyle(0.39, 0.48, 0.58, 0.7)}>
              <p className="hero-number">02 / CURRENTLY</p>
              <h2>Building fintech<br /><em>services at Stitch.</em></h2>
              <p>Loans · Transactions · Ledgers · Cards · Payments</p>
              <div className="hero-techline"><span>Go / Kratos</span><span>PostgreSQL</span><span>ClickHouse</span></div>
            </div>

            <div className="hero-layer hero-layer--focus" style={layerStyle(0.63, 0.71, 0.8, 0.9)}>
              <p className="hero-number">03 / FOCUS</p>
              <div className="hero-focus-list">
                <span><b>01</b>Scalable backend services</span>
                <span><b>02</b>Cloud & infrastructure</span>
                <span><b>03</b>AI & data workflows</span>
              </div>
            </div>

            <div className="hero-layer hero-layer--cta" style={layerStyle(0.84, 0.92, 1, 1.1)}>
              <p className="hero-number">04 / LET’S BEGIN</p>
              <h2>Engineering with<br /><em>purpose.</em></h2>
              <div className="hero-actions">
                <a className="button button--primary" href="#work">Explore my work <ArrowRight size={18} /></a>
                <a className="button button--glass" href="/assets/Kanishk-P-Resume.pdf" target="_blank" rel="noreferrer">Résumé <Download size={18} /></a>
              </div>
              <div className="hero-socials">
                <a href="https://github.com/kanishk-rezol" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
                <a href="https://www.linkedin.com/in/kanishk-p-185256287/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              </div>
            </div>
          </>
        )}

        <a className="scroll-cue" href={reducedMotion ? '#work' : '#experience'}>
          <span>{reducedMotion ? 'Explore' : 'Scroll to explore'}</span><ArrowDown size={17} />
        </a>
      </div>
    </section>
  )
}
