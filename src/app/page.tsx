'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import {
  GraduationCap, Play, Menu, X, BookOpen, Library, Download, Zap,
  TrendingUp, Rocket, CheckCircle, ChevronDown, ChevronRight,
  ArrowRight, Clock, Globe, DollarSign, Smartphone, Target, CreditCard,
  Star, Quote, Users, Shield, MessageCircle, Sparkles
} from 'lucide-react'

/* ========== HOOKS ========== */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const children = el.querySelectorAll('.scroll-reveal')
    children.forEach((child) => observer.observe(child))
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}

function useLoadingScreen(duration = 2500) {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), duration)
    const timer2 = setTimeout(() => setShow(false), duration + 600)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [duration])

  return { show, fadeOut }
}

/* ========== COMPONENTS ========== */

function SectionWrapper({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useScrollReveal()
  return (
    <section ref={ref} id={id} className={`scroll-reveal ${className}`}>
      {children}
    </section>
  )
}

function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B94C]" />
    </span>
  )
}

function GlassCard({ children, className = '', hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`liquid-glass ${hover ? 'transition-all duration-300 hover:scale-[1.02] hover:border-white/15' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ========== LOADING SCREEN ========== */

function LoadingScreen({ show, fadeOut }: { show: boolean; fadeOut: boolean }) {
  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Hotmart Color palette animated bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 hotmart-gradient-bar" />

      {/* Spinning ring + Hotmart logo */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-transparent border-t-[#FF6B35] border-r-[#00B94C] animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/hotmart-logo.png" alt="Hotmart" className="w-14 h-14 object-contain hotmart-logo-img" />
        </div>
      </div>

      {/* Brand name */}
      <h2 className="text-white text-2xl font-black tracking-tighter mb-2">
        HOTMART <span className="text-[#FF6B35]">PRO</span>
      </h2>
      <p className="text-gray-500 text-sm tracking-wide">Preparando tu ecosistema...</p>

      {/* Loading bar with full palette */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
        <div
          className="h-full hotmart-gradient-bar"
          style={{
            width: '40%',
            animation: 'loadingBar 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ========== NAVIGATION ========== */

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Ecosistema', href: '#ecosistema' },
    { label: 'El Motor', href: '#motor' },
    { label: 'Oferta', href: '#oferta' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-2' : 'top-4'}`}>
      <div className="liquid-glass-strong rounded-full px-3 md:px-8 py-2.5 md:py-3 flex items-center gap-3 md:gap-8 max-w-4xl mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 shrink-0">
          <img src="/hotmart-logo.png" alt="Hotmart" className="w-6 h-6 md:w-7 md:h-7 object-contain hotmart-logo-img" />
          <span className="text-white font-bold text-xs md:text-sm tracking-tight">
            HOTMART<span className="text-[#FF6B35]"> PRO</span>
          </span>
        </a>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA (desktop) */}
        <a
          href="https://wa.link/hanu3h"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block btn-dopamine rounded-full px-5 py-2 text-xs font-bold shrink-0 whitespace-nowrap"
        >
          EMPEZAR AHORA
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full mt-2 left-3 right-3 mx-auto liquid-glass-strong rounded-2xl p-4 flex flex-col gap-3 max-w-[280px] w-auto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.link/hanu3h"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dopamine rounded-full px-5 py-2.5 text-xs font-bold text-center mt-1 whitespace-nowrap"
          >
            EMPEZAR AHORA
          </a>
        </div>
      )}
    </nav>
  )
}

/* ========== HERO SECTION ========== */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-3 sm:px-4 pt-20 sm:pt-24 pb-16 sm:pb-24">
      {/* ===== CINEMATIC FULL-SCREEN BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hotmart logo image covering full screen with Ken Burns animation */}
        <div className="absolute inset-0 animate-kenburns">
          <img
            src="/hotmart-logo.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Color overlay from palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1464]/30 via-transparent to-black/90" />
        {/* Additional gradient from sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 via-transparent to-[#00B94C]/10" />
      </div>

      {/* Floating decorative elements (desktop) */}
      <div className="hidden lg:block absolute top-32 left-16 animate-float z-10">
        <div className="liquid-glass rounded-full p-4">
          <TrendingUp className="w-8 h-8 text-[#FF6B35]" />
        </div>
      </div>
      <div className="hidden lg:block absolute top-48 right-24 animate-float-delayed z-10">
        <div className="liquid-glass rounded-full p-4">
          <Zap className="w-8 h-8 text-[#F7C948]" />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-40 left-28 animate-float z-10">
        <div className="liquid-glass rounded-full p-4">
          <Rocket className="w-8 h-8 text-[#00B94C]" />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-32 right-20 animate-float-delayed z-10">
        <div className="liquid-glass rounded-full p-3">
          <Sparkles className="w-6 h-6 text-[#9B59B6]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Hotmart Logo centered above headline */}
        <div className="mb-6">
          <img src="/hotmart-logo.png" alt="Hotmart" className="w-20 md:w-28 mx-auto object-contain hotmart-logo-img opacity-90" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 liquid-glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-8">
          <PulseDot />
          <span className="text-gray-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            EST. 2026 &middot; MENTOR&Iacute;A ACTIVA
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[2rem] sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4 sm:mb-6 text-white">
          TU ECOSISTEMA DE
          <br />
          INFOPRODUCTOS EN
          <br />
          <span className="text-gradient-hotmart">HOTMART. INGRESO PASIVO.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1">
          Transforma tu conocimiento en ingresos autom&aacute;ticos. Sin inventario. Sin log&iacute;stica.
          Solo escalabilidad digital con inteligencia artificial.
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
          <a
            href="https://wa.link/hanu3h"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dopamine rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm md:text-base inline-flex items-center gap-2 whitespace-nowrap"
          >
            ADQUIRIR ACCESO VIP <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {['?u=4', '?u=5', '?u=6'].map((u, i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100${u}`}
                alt="Creator avatar"
                className="w-8 h-8 rounded-full border-2 border-black object-cover"
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs sm:text-sm">+1,800 creadores activos</span>
        </div>
      </div>

      {/* Hotmart Color Palette Bar above marquee */}
      <div className="absolute bottom-10 left-0 right-0 h-[2px] hotmart-gradient-bar z-10" />

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-2.5 sm:py-3 z-10">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-gray-600 text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] mx-5 sm:mx-8">
              {['NUTRICIÓN', 'FINANZAS', 'MARKETING DIGITAL', 'FITNESS', 'DESARROLLO PERSONAL', 'PROGRAMACIÓN', 'COACHING', 'INVERSIONES', 'DISEÑO', 'FOTOGRAFÍA', 'IDIOMAS', 'E-COMMERCE'][i % 12]}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========== BENTO GRID - EL MOTOR ========== */

function MotorSection() {
  const cards = [
    {
      span: 'md:col-span-8',
      icon: <BookOpen className="w-7 h-7 text-[#00B94C]" />,
      iconBg: 'bg-[#00B94C]/10',
      title: 'Tienda de Infoproductos Pro',
      desc: 'Crea p&aacute;ginas de ventas de alta conversi&oacute;n integradas directamente con Hotmart. Tu tienda digital lista para facturar desde d&iacute;a uno.',
      tags: ['HOTMART INTEGRADO', 'P&Aacute;GINA DE VENTAS'],
      tagColor: 'text-[#00B94C]',
    },
    {
      span: 'md:col-span-4',
      icon: <Library className="w-7 h-7 text-[#FFD700]" />,
      iconBg: 'bg-[#FFD700]/10',
      title: 'Cat&aacute;logo Digital',
      desc: 'Organiza y presenta tus productos digitales de forma profesional. Control total sobre tu inventario digital.',
      progress: true,
    },
    {
      span: 'md:col-span-4',
      icon: <Download className="w-7 h-7 text-pink-500" />,
      iconBg: 'bg-pink-500/10',
      title: 'Entrega Autom&aacute;tica',
      desc: 'Tus clientes reciben acceso instant&aacute;neo al contenido. Sin intervenci&oacute;n manual, 24/7.',
      badges: true,
    },
    {
      span: 'md:col-span-8',
      icon: <Zap className="w-7 h-7 text-[#00B94C]" />,
      iconBg: 'bg-[#00B94C]/10',
      title: 'Cerebro de IA',
      desc: 'Inteligencia artificial que cierra ventas por ti. Responde dudas, cualifica leads y convierte visitantes en compradores autom&aacute;ticamente.',
      chatMockup: true,
    },
  ]

  return (
    <section id="ecosistema" className="py-16 sm:py-24 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4">
              EL MOTOR DE <span className="text-gradient-hotmart">HOTMART PRO</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              Cinco pilares dise&ntilde;ados para crear, lanzar y escalar infoproductos de forma masiva.
            </p>
          </div>

          <div id="motor" className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {cards.map((card, i) => (
              <div key={i} className={`scroll-reveal ${card.span}`}>
                <GlassCard className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 h-full">
                  <div className={`inline-flex p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${card.iconBg} mb-3 sm:mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{card.desc}</p>

                  {/* Tags */}
                  {card.tags && (
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-bold px-3 py-1 rounded-full border border-white/10 ${card.tagColor}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Progress bar */}
                  {card.progress && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#FFD700] font-bold">CONVERSION RATE</span>
                        <span className="text-[#FFD700] font-bold">89%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF6B35] transition-all duration-1000"
                          style={{ width: '89%' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Badge icons */}
                  {card.badges && (
                    <div className="flex gap-2 mt-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        INSTANT&Aacute;NEO
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        24/7
                      </span>
                    </div>
                  )}

                  {/* Chat mockup */}
                  {card.chatMockup && (
                    <div className="mt-6 space-y-3 max-w-sm">
                      {/* User message */}
                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5">
                          <p className="text-gray-300 text-xs">
                            Hola, quiero el curso de marketing digital. &iquest;Tiene garant&iacute;a?
                          </p>
                        </div>
                      </div>
                      {/* AI response */}
                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-[#00B94C]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Zap className="w-3 h-3 text-[#00B94C]" />
                        </div>
                        <div className="bg-[#00B94C]/10 border border-[#00B94C]/20 rounded-2xl rounded-tl-sm px-4 py-2.5">
                          <p className="text-gray-300 text-xs">
                            &iexcl;Hola! &iexcl;S&iacute;! El curso tiene 30 d&iacute;as de garant&iacute;a total. +1,800 alumnos ya lo validan. &iquest;Te lo activo ahora?
                          </p>
                          <span className="text-[#00B94C]/60 text-[10px] mt-1 block">Respondido en 2s &middot; IA Activa</span>
                        </div>
                      </div>
                      {/* User purchase */}
                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5">
                          <p className="text-[#00B94C] text-xs font-semibold">
                            &iexcl;S&iacute;! &iquest;C&oacute;mo pago? 💰
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== STATS SECTION ========== */

function StatsSection() {
  const stats = [
    { value: '$300B+', label: 'Mercado Global', color: 'text-[#FF6B35]', iconBg: 'bg-[#FF6B35]/10' },
    { value: '73%', label: 'Crecimiento Anual', color: 'text-[#00B94C]', iconBg: 'bg-[#00B94C]/10' },
    { value: '0h', label: 'Logística Requerida', color: 'text-[#F7C948]', iconBg: 'bg-[#F7C948]/10' },
    { value: '100%', label: 'Margen de Ganancia', color: 'text-[#9B59B6]', iconBg: 'bg-[#9B59B6]/10' },
  ]

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-[#FF6B35]" />,
      title: 'Vende Mientras Duermes',
      desc: 'Tus productos se venden 24/7 en piloto autom&aacute;tico. Sin importar la hora, la ubicaci&oacute;n o si est&aacute;s durmiendo.',
    },
    {
      icon: <Globe className="w-6 h-6 text-[#00B94C]" />,
      title: 'Opera Desde Cualquier Parte',
      desc: '100% remoto. Solo necesitas internet. Vende a toda Latinoam&eacute;rica y cobra en d&oacute;lares desde cualquier lugar.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#F7C948]" />,
      title: 'Gana en D&oacute;lares Autom&aacute;ticamente',
      desc: 'Hotmart te paga en USD y convierte autom&aacute;ticamente a tu moneda local. Facturaci&oacute;n recurrente sin esfuerzo.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          {/* Hotmart Color Palette gradient bar */}
          <div className="h-1 hotmart-gradient-bar mb-10 sm:mb-16" />

          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 liquid-glass rounded-full px-4 py-2 mb-6">
              <img src="/hotmart-logo.png" alt="Hotmart" className="w-4 h-4 object-contain" />
              <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                Hecho para Creadores
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3 sm:mb-4 leading-tight">
              EL PODER DEL MERCADO DE{' '}
              <span className="text-gradient-hotmart">INFOPRODUCTOS</span>{' '}
              EN TUS MANOS
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              La industria de productos digitales crece exponencialmente cada a&ntilde;o.
              El mercado se movi&oacute; $300B+ en 2025 y t&uacute; puedes capturar tu parte.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="scroll-reveal">
                <GlassCard className="rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 text-center cursor-default">
                  <div className={`inline-flex p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${stat.iconBg} mb-2 sm:mb-3`}>
                    <TrendingUp className="w-5 h-5" style={{ color: 'inherit' }} />
                  </div>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-black ${stat.color} mb-0.5 sm:mb-1`}>{stat.value}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <div key={i} className="scroll-reveal">
                <GlassCard className="rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 h-full">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== AUTOMATED SYSTEM SECTION ========== */

function AutomatedSystemSection() {
  const steps = [
    { icon: '📱', title: 'Tráfico', desc: 'Generas con Meta/TikTok' },
    { icon: '🎯', title: 'Landing', desc: 'Página de ventas optimizada' },
    { icon: '💳', title: 'Hotmart', desc: 'Checkout automático' },
    { icon: '💰', title: 'Ganancias', desc: 'Dinero directo a tu cuenta' },
  ]

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3 sm:mb-4">
              PILOTO <span className="text-gradient-hotmart">AUTOMÁTICO</span> EVERGREEN
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Tu infoproducto trabaja 24/7. T&uacute; solo generas tr&aacute;fico. El sistema hace el resto.
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Funnel diagram */}
            <div className="scroll-reveal">
              <GlassCard className="rounded-[32px] p-6 md:p-8 h-full">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00B94C]" />
                  Embudo de Conversión
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Tráfico Orgánico + Pago', pct: 100, color: 'bg-purple-500' },
                    { label: 'Página de Ventas', pct: 75, color: 'bg-[#00B94C]' },
                    { label: 'Checkout Hotmart', pct: 50, color: 'bg-[#00B94C]/80' },
                    { label: 'Entrega Automática', pct: 35, color: 'bg-[#FFD700]' },
                    { label: 'GANANCIAS $$$', pct: 25, color: 'bg-gradient-to-r from-[#00B94C] to-[#2DCE89]' },
                  ].map((step, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">{step.label}</span>
                        <span className="text-gray-500">{step.pct}%</span>
                      </div>
                      <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                        <div
                          className={`h-full rounded-lg ${step.color} flex items-center justify-end pr-3 transition-all duration-1000`}
                          style={{ width: `${step.pct}%`, transitionDelay: `${i * 150}ms` }}
                        >
                          {i === 4 && (
                            <span className="text-white text-xs font-bold">$$$</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* AI Chat Agent Mockup */}
            <div className="scroll-reveal">
              <GlassCard className="rounded-[32px] p-6 md:p-8 h-full">
                <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#00B94C]" />
                  Agente de IA
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00B94C]/20 text-[#00B94C] uppercase tracking-wider">
                    Live
                  </span>
                </h3>
                <p className="text-gray-600 text-xs mb-4">Asistente inteligente que cierra ventas 24/7</p>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {/* Conversation */}
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00B94C]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-[#00B94C]" />
                    </div>
                    <div className="bg-[#00B94C]/5 border border-[#00B94C]/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-300 text-xs leading-relaxed">
                        &iexcl;Bienvenido! Soy tu asistente. &iquest;Buscas crear tu primer infoproducto o escalar los que ya tienes?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start justify-end">
                    <div className="bg-white/5 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-300 text-xs">
                        Quiero crear uno desde cero, nunca he vendido nada online.
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00B94C]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-[#00B94C]" />
                    </div>
                    <div className="bg-[#00B94C]/5 border border-[#00B94C]/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Perfecto. Nuestra mentor&iacute;a te lleva paso a paso: validaci&oacute;n, creaci&oacute;n, lanzamiento y tr&aacute;fico. &iquest;En qu&eacute; &aacute;rea eres experto?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start justify-end">
                    <div className="bg-white/5 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-300 text-xs">
                        Soy nutricionista, tengo muchos conocimientos.
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00B94C]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-[#00B94C]" />
                    </div>
                    <div className="bg-[#00B94C]/5 border border-[#00B94C]/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-300 text-xs leading-relaxed">
                        &iexcl;Excelente nicho! Los cursos de nutrici&oacute;n en Hotmart facturan en promedio $2,400/mes. Con nuestra mentor&iacute;a puedes lanzar en 14 d&iacute;as. &iquest;Te comparto el plan? 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* 4-step flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="scroll-reveal">
                <GlassCard className="rounded-[24px] p-5 text-center h-full">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-gray-500 text-xs">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight className="hidden md:block w-4 h-4 text-gray-600 absolute right-0 top-1/2 -translate-y-1/2 translate-x-2" />
                  )}
                </GlassCard>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== PRICING SECTION ========== */

function PricingSection() {
  const features = [
    'Creación de tu infoproducto desde cero',
    'Dominio de publicidad pagada (Meta Ads, TikTok Ads)',
    'Viralización de contenido orgánico',
    '2 sesiones uno a uno personalizadas',
    'Acompañamiento durante 30 días',
    'Grupo VIP de soporte exclusivo',
  ]

  return (
    <section id="oferta" className="py-16 sm:py-24 px-3 sm:px-4 relative">
      {/* Hotmart Color Palette top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 hotmart-gradient-bar" />
      {/* Subtle background with palette colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00B94C]/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionWrapper>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4">
              INVERSI&Oacute;N EN TU <span className="text-gradient-gold">LIBERTAD</span>
            </h2>
          </div>

          {/* Pricing card */}
          <div className="scroll-reveal">
            <GlassCard className="rounded-[28px] sm:rounded-[40px] p-6 sm:p-8 md:p-12 text-center relative overflow-hidden hotmart-glow-orange">
              {/* Hotmart logo in pricing card */}
              <div className="absolute top-6 right-6 opacity-10">
                <img src="/hotmart-logo.png" alt="" className="w-24 h-24 object-contain" />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 relative z-10">
                <Star className="w-3 h-3.5 text-[#FF6B35]" />
                <span className="text-[#FF6B35] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                  Oferta Limitada &middot; Ultra VIP
                </span>
              </div>

              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-snug relative z-10">
                Mentor&iacute;a Avanzada: Creaci&oacute;n y Venta Masiva de Infoproductos en Hotmart
              </h3>

              {/* Price */}
              <div className="mb-2 relative z-10">
                <span className="text-gray-600 line-through text-base sm:text-lg">$700 USD</span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-7xl font-black text-gradient-gold mb-2 relative z-10">
                $350 USD
              </div>
              <p className="text-gray-500 text-[10px] sm:text-xs mb-6 sm:mb-8 relative z-10">Pago &uacute;nico &middot; Acceso de por vida</p>

              {/* Features */}
              <div className="text-left max-w-sm mx-auto mb-6 sm:mb-8 space-y-2.5 sm:space-y-3 relative z-10">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#00B94C] shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs sm:text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* Urgency banner */}
              <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 mb-5 sm:mb-6 relative z-10">
                <p className="text-[#FF6B35] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Cerramos accesos el jueves 30 de abril
                </p>
              </div>

              {/* CTA */}
              <a
                href="https://wa.link/hanu3h"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dopamine rounded-full px-6 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm md:text-base inline-flex items-center gap-2 relative z-10 whitespace-nowrap"
              >
                ASEGURAR MI CUPO VIP <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-gray-600 text-[10px] sm:text-xs mt-2.5 sm:mt-3 relative z-10">Cupos ultra-limitados</p>
            </GlassCard>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== TESTIMONIALS SECTION ========== */

function TestimonialsSection() {
  const testimonials = [
    {
      avatar: 'https://i.pravatar.cc/100?u=7',
      name: 'María González',
      result: '+$1,200 en primer mes',
      text: 'Llegué sin saber nada sobre infoproductos. En 30 días ya tenía mi curso en Hotmart generando ventas. La IA hace el trabajo pesado.',
    },
    {
      avatar: 'https://i.pravatar.cc/100?u=8',
      name: 'Carlos Mendoza',
      result: '+$3,400 en 2 meses',
      text: 'Ya tenía conocimiento en finanzas pero no sabía monetizarlo. La mentoría me enseñó a crear y lanzar. Ahora facturo en dólares.',
    },
    {
      avatar: 'https://i.pravatar.cc/100?u=9',
      name: 'Ana Rodríguez',
      result: '+$2,800 en 45 días',
      text: 'El sistema automatizado es real. Mi infoproducto se vende mientras duermo. La mejor inversión que he hecho en mi vida.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4 relative">
      {/* Hotmart Color Palette top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 hotmart-gradient-bar" />
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-10 sm:mb-16">
            <div className="mb-4">
              <img src="/hotmart-logo.png" alt="Hotmart" className="w-12 mx-auto object-contain opacity-30" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4">
              RESULTADOS <span className="text-gradient-hotmart">REALES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="scroll-reveal">
                <GlassCard className="rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 h-full">
                  {/* Quote icon */}
                  <Quote className="w-6 h-6 text-[#00B94C]/30 mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.text}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                    />
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-[#00B94C] text-xs font-semibold">{t.result}</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== FAQ SECTION ========== */

function FAQSection() {
  const faqs = [
    {
      q: '¿Necesito experiencia previa vendiendo online?',
      a: 'No, te guiamos desde cero. No necesitas experiencia previa en ventas digitales, marketing ni creación de contenido. El sistema está diseñado para principiantes absolutos que quieren generar ingresos pasivos.',
    },
    {
      q: '¿Qué tipo de infoproducto puedo crear?',
      a: '¡Cualquiera! Cursos en video, ebooks, mentorías grupales, membresías, templates, audios, PDFs... Si tienes conocimiento en cualquier área (nutrición, finanzas, fitness, negocios, tecnología), podemos monetizarlo.',
    },
    {
      q: '¿Cuánto tiempo necesito dedicar?',
      a: 'Mínimo 2-3 horas diarias durante la fase de creación (aprox 14 días). Una vez lanzado, el sistema es 90% automático y solo necesitas 30 minutos al día para gestionar tráfego.',
    },
    {
      q: '¿Qué incluye el acompañamiento?',
      a: '30 días de acompañamiento grupal + 2 sesiones uno a uno personalizadas con el mentor. Además tienes acceso al grupo VIP de soporte exclusivo de por vida.',
    },
    {
      q: '¿Y si no funciona?',
      a: 'El riesgo es prácticamente cero con infoproductos digitales. No hay inventario, no hay costos de envío, no hay logística. Tu única inversión es tiempo y conocimiento. Además, Hotmart tiene garantía integrada.',
    },
    {
      q: '¿Por qué Hotmart?',
      a: 'Es la plataforma #1 de infoproductos en Latinoamérica con más de 20 millones de usuarios. Soporta pagos en +50 países, procesamiento en múltiples monedas, y tiene el mejor sistema de afiliados del mercado.',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 sm:py-24 px-3 sm:px-4 relative">
      {/* Hotmart Color Palette top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 hotmart-gradient-bar" />
      <div className="max-w-3xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4">
              DUDAS <span className="text-gradient-hotmart">FRECUENTES</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={i} className="scroll-reveal">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left liquid-glass rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:border-white/15 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <span className="text-white font-semibold text-xs sm:text-sm md:text-base">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== FINAL CTA SECTION ========== */

function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4 relative overflow-hidden">
      {/* Hotmart palette background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B35]/3 via-black to-black pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 hotmart-gradient-bar pointer-events-none" />
      {/* Multi-color glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B35]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionWrapper>
          <div className="text-center">
            {/* Hotmart logo */}
            <div className="mb-6 relative z-10">
              <img src="/hotmart-logo.png" alt="Hotmart" className="w-16 mx-auto object-contain hotmart-logo-img opacity-80" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3 sm:mb-4 relative z-10 leading-tight">
              &iquest;LISTA PARA{' '}
              <span className="text-gradient-hotmart">FACTURAR</span>{' '}
              MIENTRAS DUERMES?
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-3 relative z-10">
              Cupos limitados. Cerramos el jueves 30 de abril.
            </p>

            <a
              href="https://wa.link/hanu3h"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dopamine rounded-full px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-base md:text-lg inline-flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 mb-4 relative z-10 whitespace-nowrap"
            >
              ESCR&Iacute;BEME POR WHATSAPP AHORA <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <p className="text-gray-600 text-xs relative z-10">
              Inversi&oacute;n: $350 USD &middot; Garant&iacute;a de 30 d&iacute;as
            </p>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

/* ========== FOOTER ========== */

function Footer() {
  return (
    <footer className="relative">
      {/* Hotmart Color Palette bar */}
      <div className="h-1 hotmart-gradient-bar" />
      <div className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/hotmart-logo.png" alt="Hotmart" className="w-5 h-5 object-contain" />
            <span className="text-white font-bold text-sm">
              HOTMART<span className="text-[#FF6B35]"> PRO</span>
            </span>
          </div>
          <p className="text-gray-600 text-xs">
            &copy; 2026 Hotmart Pro Mentor&iacute;a. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#FF6B35]/60 hover:text-[#FF6B35] text-xs transition-colors">T&eacute;rminos</a>
            <a href="#" className="text-[#00B94C]/60 hover:text-[#00B94C] text-xs transition-colors">Privacidad</a>
            <a href="https://wa.link/hanu3h" target="_blank" rel="noopener noreferrer" className="text-[#9B59B6]/60 hover:text-[#9B59B6] text-xs transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ========== MAIN PAGE ========== */

export default function Home() {
  const { show, fadeOut } = useLoadingScreen()

  return (
    <main className="bg-black min-h-screen">
      <LoadingScreen show={show} fadeOut={fadeOut} />
      <Navigation />
      <HeroSection />
      <MotorSection />
      <StatsSection />
      <AutomatedSystemSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
