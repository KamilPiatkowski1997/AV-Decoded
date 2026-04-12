import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { PhoneOff, MailWarning, Users, Bot, MessageSquareDashed, Layout, Filter, Share2, Workflow, CheckCircle2, Menu, Check, X } from 'lucide-react';
import Chatbot from './components/Chatbot';
import LiveDemos from './components/LiveDemos';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="bg-[#040408] text-white font-sans antialiased selection:bg-[#2563EB] selection:text-white flex flex-col min-h-screen">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <Services />
      <WhoIsThisFor />
      <Process />
      <About />
      <Pricing />
      <LiveDemos />
      <Contact />
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed z-50 bg-[#040408]/60 w-full border-white/5 border-b top-0 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-3xl font-serif tracking-tight text-white">AV Decoded</a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-xl text-gray-400 hover:text-white transition-colors">Services</a>
          <a href="#process" className="text-xl text-gray-400 hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="text-xl text-gray-400 hover:text-white transition-colors">Pricing</a>
          <a href="#demos" className="text-xl text-gray-400 hover:text-white transition-colors">AI Demos</a>
          <a href="#about" className="text-xl text-gray-400 hover:text-white transition-colors">About</a>
        </div>
        <a href="#contact" className="hidden md:inline-flex h-12 items-center justify-center rounded-lg bg-[#2563EB] px-8 text-lg font-normal text-white transition-all hover:bg-[#2563EB]/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-tight">
          Book a Free Call
        </a>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X strokeWidth={1.5} className="w-7 h-7" /> : <Menu strokeWidth={1.5} className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#040408]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {[
                { href: '#services', label: 'Services' },
                { href: '#process', label: 'How It Works' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#demos', label: 'AI Demos' },
                { href: '#about', label: 'About' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-gray-400 hover:text-white transition-colors py-3 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 w-full inline-flex h-12 items-center justify-center rounded-lg bg-[#2563EB] px-8 text-lg font-normal text-white transition-all hover:bg-[#2563EB]/90"
              >
                Book a Free Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero-section" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-transparent pt-20 z-10">
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 inline-block rounded-full border border-[#3B82F6]/50 px-5 py-2 backdrop-blur-md bg-[#3B82F6]/10 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-sm font-medium uppercase tracking-widest text-[#60A5FA]"
        >
          AI Automation Agency UK | Custom Business Automation Services
        </motion.h1>
        <div className="font-syne text-6xl md:text-8xl font-medium tracking-tight leading-none mb-4 flex flex-col items-center">
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-white block">Your Business.</motion.span>
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] block" style={{ textShadow: '0 0 45px rgba(59,130,246,0.4)' }}>Automated.</motion.span>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="font-dmsans text-2xl font-light text-[#94A3B8] max-w-[900px] mx-auto mt-6 mb-12 leading-relaxed"
        >
          AV Decoded builds custom AI systems that answer your calls, reply to your messages, and follow up with your customers — 24 hours a day, 7 days a week. No extra staff. No missed opportunities.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a href="#contact" className="w-full sm:w-auto inline-flex h-14 md:h-16 items-center justify-center rounded-full bg-[#2563EB] px-8 text-lg font-normal text-white transition-all hover:bg-[#3B82F6] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] tracking-tight">
            Book a Free Call
          </a>
          <a href="#process" className="w-full sm:w-auto inline-flex h-14 md:h-16 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md px-8 text-lg font-normal text-white transition-all hover:border-[#3B82F6] hover:text-[#60A5FA] hover:bg-white/5 tracking-tight">
            See How It Works →
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="h-12 w-px bg-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[#60A5FA] animate-pulse-down shadow-[0_0_10px_#60A5FA]"></div>
        </div>
        <span className="text-sm text-gray-400 uppercase tracking-widest font-dmsans">Scroll to expand</span>
      </motion.div>
    </section>
  );
}

function SocialProof() {
  return (
    <div className="border-y border-white/5 bg-[#080810]/40 backdrop-blur-xl py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-2xl text-gray-300 font-light flex items-center justify-center gap-4 flex-wrap">
          <CheckCircle2 strokeWidth={1.5} className="w-6 h-6 text-[#3B82F6]" />
          Built by an MSc AI & Robotics Engineer. Trusted by growing businesses.
        </p>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="py-24 md:py-32 relative z-10 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="md:text-5xl text-4xl text-white tracking-tight font-serif text-center mb-6"
        >
          You're losing customers between the cracks
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 font-light text-center max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Most businesses don't lose customers because of bad service. They lose them because nobody picked up the phone, replied to the email, or followed up after the job. These are fixable problems.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 font-light text-center mb-16"
        >
          Does any of that sound familiar?
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: PhoneOff, title: "Missed calls you never knew about", desc: "Every unanswered call is a potential customer gone. Most won't leave a voicemail. They'll just call your competitor instead. If you're not available 24/7, you're losing business around the clock." },
            { icon: MailWarning, title: "Emails sitting unanswered for days", desc: "Customers expect a response within the hour. When enquiries pile up in your inbox while you're doing the actual work, leads go cold fast. By the time you reply, they've already gone." },
            { icon: Users, title: "Clients you forgot to follow up with", desc: "The fortune is in the follow-up — but nobody has time. Without a system automatically checking in on past customers, you're leaving repeat business and referrals on the table every single week." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-[#0F0F1A] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#2563EB]/30 transition-colors duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 flex items-center justify-center mb-6">
                <item.icon strokeWidth={1.5} className="w-7 h-7 text-[#2563EB]" />
              </div>
              <p className="text-xl font-medium text-gray-200 mb-3">{item.title}</p>
              <p className="text-base text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Bot, title: "AI Receptionist", desc: "Our AI receptionist answers calls, responds to emails, and replies to text messages 24/7 — in your name, with your tone. Your customers get an instant response. You never miss a lead again. Fully customised to your business and your services." },
    { icon: MessageSquareDashed, title: "Automated Follow-Ups", desc: "Our automated follow-up system keeps in touch with your customers at exactly the right time — after an appointment, a week later, or when they haven't been back in a while. It runs in the background so you stay front of mind without lifting a finger." },
    { icon: Layout, title: "Website Design", desc: "Your website is often the first and only chance to make a lasting impression on a new lead. We design clean, high-converting interfaces that reflect the true quality of your work and build instant trust with your visitors." },
    { icon: Filter, title: "Lead Capture & Qualification", desc: "Never lose a warm lead again. Our AI captures every enquiry — from your website, phone, or email — qualifies them automatically, and only sends you the ones worth your time. You focus on closing. We handle the filtering." },
    { icon: Share2, title: "Content & Social Automation", desc: "Staying visible shouldn't feel like a second full-time job. We automate your content distribution — turning customer interactions into social posts, replies, and updates — so your brand stays top-of-mind across all platforms without you ever having to hit 'post'." },
    { icon: Workflow, title: "Workflow Automation", desc: "We identify the repetitive tasks eating your team's time and automate them — data entry, scheduling, reminders, reporting, and more. Built around the tools you already use, so there's no steep learning curve and no disruption to your day." }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0A0A12] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">AI automation built around your business — not ours</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-400 font-light">Custom systems designed to operate quietly in the background, ensuring your business never drops the ball.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0F0F1A] border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-[#2563EB]/30 transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-6">
                <div className="shrink-0 mt-1"><svc.icon strokeWidth={1.5} className="w-8 h-8 text-[#2563EB]" /></div>
                <div>
                  <h3 className="text-2xl font-serif tracking-tight text-white mb-3">{svc.title}</h3>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoIsThisFor() {
  const audiences = [
    {
      title: "Service-Based Businesses",
      desc: "Plumbers, electricians, cleaners, and local services who are constantly on the job and missing calls from new leads.",
      icon: "🔧"
    },
    {
      title: "Agencies & Consultancies",
      desc: "Marketing, design, and consulting firms that need to automate client onboarding, reporting, and follow-ups to scale without adding headcount.",
      icon: "📈"
    },
    {
      title: "E-commerce & Retail",
      desc: "Online stores dealing with high volumes of repetitive customer service queries, order tracking, and return requests.",
      icon: "🛍️"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#040408] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-serif tracking-tight text-white mb-6">Who We Help.</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl font-light text-gray-400 max-w-3xl mx-auto">Our AI systems are designed for businesses that are scaling fast but drowning in admin.</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((aud, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-[#2563EB]/30 transition-colors duration-500 group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{aud.icon}</div>
              <h3 className="text-3xl font-serif tracking-tight text-white mb-4">{aud.title}</h3>
              <p className="text-xl text-gray-400 font-light leading-relaxed">{aud.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#040408]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-6">Three Steps From First Call to Fully Automated</h2>
          <p className="text-3xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed tracking-tight">No lengthy proposals, no complicated onboarding. Just a clear process that gets your business automated fast.</p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between gap-16 md:gap-8">
          <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent"></div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-white/10 flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-white/20 group-hover:border-[#3B82F6]/50 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">01</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">We Listen</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">A free 20-minute discovery call where we find out exactly what's slipping through the cracks in your business — and identify where automation can make the biggest difference.</p>
          </div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-[#60A5FA]">02</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">We Build</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">We design and build your custom AI automation system from the ground up. No off-the-shelf tools. No templates. Every solution is built specifically around your workflow and the way you work.</p>
          </div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-white/10 flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-white/20 group-hover:border-[#3B82F6]/50 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">03</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">You Scale</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">Your systems go live and start working immediately — answering calls, sending follow-ups, capturing leads — 24 hours a day, every day. You get your time back and your business grows.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="md:py-32 border-y bg-[#080810] border-white/5 pt-24 pb-24 relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1">
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-10 leading-tight">Built by Someone Who Actually Understands AI</h2>
          <p className="text-2xl text-gray-400 font-light leading-relaxed mb-8">
            AV Decoded was founded by an MSc graduate in Artificial Intelligence, Robotics & Autonomous Systems, with a BEng in Mechatronics Engineering. The name started with a passion for autonomous vehicles — intelligent systems that perceive the world, make decisions, and take action without human input. That same engineering logic now powers the automation systems we build for businesses.
          </p>
          <p className="text-2xl text-gray-400 font-light leading-relaxed mb-8">
            Unlike agencies that resell generic software tools, we build every solution from scratch — custom-designed to fit how your business actually operates. We have hands-on experience building automation systems in high-stakes environments, including large-scale infrastructure, computer vision, and intelligent process automation.
          </p>
          <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12">
            If you want someone who understands the technology at a deep level and can translate it into real results for your business — that's exactly what AV Decoded was built to do.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center rounded-lg bg-[#2563EB]/10 px-5 py-2.5 text-lg font-normal text-[#60A5FA] ring-1 ring-inset ring-[#2563EB]/30 tracking-tight">MSc AI, Robotics & Autonomous Systems</span>
            <span className="inline-flex items-center rounded-lg bg-white/5 px-5 py-2.5 text-lg font-normal text-gray-300 ring-1 ring-inset ring-white/10 tracking-tight">BEng Mechatronics</span>
            <span className="inline-flex items-center rounded-lg bg-white/5 px-5 py-2.5 text-lg font-normal text-gray-300 ring-1 ring-inset ring-white/10 tracking-tight">Automation Developer</span>
            <span className="inline-flex items-center rounded-lg bg-white/5 px-5 py-2.5 text-lg font-normal text-gray-300 ring-1 ring-inset ring-white/10 tracking-tight">Computer Vision Specialist</span>
          </div>
        </div>
        
        <div className="flex-1 lg:pl-12 w-full max-w-xl relative items-center justify-center">
          <div className="relative w-full aspect-square mx-auto bg-[#0C0C12] rounded-[2rem] p-4 border-t border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black shadow-[inset_0_0_40px_rgba(0,0,0,1)] pointer-events-none z-30"></div>
            <div className="absolute bottom-5 left-8 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)] border border-blue-400/50 z-30"></div>

            <div className="relative w-full h-full bg-[#020617] rounded-2xl overflow-hidden font-mono text-sm md:text-base text-blue-400 p-6 md:p-8 flex flex-col ring-1 ring-inset ring-blue-900/40 shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-20"></div>

              <div className="relative z-10 flex flex-col h-full drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                <div className="flex justify-between border-b border-blue-500/30 pb-3 mb-5 tracking-tighter">
                  <span>AV_DECODED_SYS_v2.0</span>
                  <span>STATUS: ONLINE</span>
                </div>

                <div className="flex gap-6 flex-1 mb-5 min-h-0">
                  <div className="w-1/3 border-r border-blue-500/30 pr-5 flex flex-col gap-5">
                    <div>
                      <div className="mb-1 opacity-70 uppercase tracking-widest text-xs">Core Thread</div>
                      <div className="text-xs uppercase opacity-50 mb-2 mt-4">Load</div>
                      <div className="flex items-end gap-2 h-12">
                        <div className="w-3 bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div className="w-3 bg-blue-500 h-[85%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div className="w-3 bg-blue-500 h-[70%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div className="w-3 bg-blue-900/60 h-[40%]"></div>
                      </div>
                    </div>
                    <div className="border-t border-blue-500/30 pt-4">
                      <div className="text-xs uppercase opacity-50 mb-2">Neural Net</div>
                      <div className="tracking-widest leading-loose">
                        SYNC: OK<br/>DATA: RX
                      </div>
                    </div>
                  </div>

                  <div className="w-2/3 border border-blue-500/30 flex items-center justify-center relative bg-blue-900/10">
                    <span className="animate-pulse tracking-widest uppercase text-blue-300 shadow-[0_0_15px_rgba(96,165,250,0.5)]">[ Processing ]</span>
                  </div>
                </div>

                <div className="h-1/3 border-t border-blue-500/30 pt-4 flex flex-col relative overflow-hidden">
                  <div className="opacity-70 mb-3 sticky top-0 bg-[#020617] z-10 tracking-widest uppercase text-xs">Execution Log</div>
                  <div className="flex-1 overflow-hidden relative">
                    <div className="absolute bottom-0 w-full flex flex-col justify-end leading-loose terminal-scroll tracking-tight text-blue-300">
                      <div>{`> initiating handshake...`}</div>
                      <div>{`> establishing secure link`}</div>
                      <div>{`> auth token verified`}</div>
                      <div>{`> deploying automated routines`}</div>
                      <div className="text-white opacity-90">{`> intercepting unread comms`}</div>
                      <div className="text-white opacity-90">{`> natural language gen: ONLINE`}</div>
                      <div className="text-white opacity-90">{`> routing qualified leads`}</div>
                      <div className="flex items-center gap-2 mt-2">{`> standing by for input`}
                        <span className="w-3 h-5 bg-blue-400 animate-cursor-blink shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const leftOrbX = useTransform(scrollYProgress, [0, 1], ["-150%", "0%"]);
  const rightOrbX = useTransform(scrollYProgress, [0, 1], ["150%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section id="pricing" className="py-32 relative z-10 bg-[#040408]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Abstract Connection Animation */}
        <div className="relative h-40 md:h-64 w-full max-w-3xl mx-auto mb-16 overflow-hidden flex justify-center items-center">
          
          <motion.div 
            style={{ x: leftOrbX, opacity, scale }}
            className="absolute left-1/2 -translate-x-[60%] flex items-center justify-center w-32 h-32 md:w-48 md:h-48"
          >
            <div className="absolute inset-0 bg-[#3B82F6] rounded-full blur-[60px] opacity-40 animate-pulse"></div>
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#60A5FA] to-[#2563EB] rounded-full shadow-[0_0_40px_rgba(59,130,246,0.8)] relative z-10 flex items-center justify-center">
              <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-white/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ opacity, scale }}
            className="absolute z-0 flex items-center justify-center w-full h-full"
          >
            <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent opacity-50 shadow-[0_0_15px_rgba(96,165,250,0.8)]"></div>
          </motion.div>

          <motion.div 
            style={{ x: rightOrbX, opacity, scale }}
            className="absolute right-1/2 translate-x-[60%] flex items-center justify-center w-32 h-32 md:w-48 md:h-48"
          >
            <div className="absolute inset-0 bg-[#8B5CF6] rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] rounded-full shadow-[0_0_40px_rgba(139,92,246,0.8)] relative z-10 flex items-center justify-center">
              <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-white/50 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ opacity }}
            className="absolute z-20 flex items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0F0F1A] border border-[#60A5FA]/50 rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.4)]">
              <Workflow className="w-6 h-6 md:w-8 md:h-8 text-[#60A5FA] -rotate-45" />
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-6">Simple, Transparent Packages.</h2>
          <p className="text-3xl font-light text-gray-400 max-w-4xl mx-auto leading-relaxed tracking-tight">No hidden fees. No bloated retainers. Every package is quoted based on your specific needs — book a free call and we'll give you a clear number within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto mb-20">
          <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/10 transition-colors">
            <h3 className="text-4xl font-serif tracking-tight text-white mb-3">Starter</h3>
            <p className="text-xl text-gray-400 font-light mb-10 pb-10 border-b border-white/5 leading-relaxed">One powerful system to plug the biggest gap in your business.</p>
            <p className="text-3xl font-normal tracking-tight text-[#60A5FA] mb-10">Price on request</p>
            <ul className="space-y-6 mb-10 flex-1 text-xl text-gray-300 font-light">
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />1 custom AI automation system</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />AI Receptionist or Follow-Ups</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Setup & configuration included</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Integration with your existing tools</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />2 weeks post-launch support</li>
            </ul>
            <a href="#contact" className="w-full h-16 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-xl font-normal text-white transition-all hover:bg-white/10 tracking-tight">Get Started</a>
          </div>

          <div className="bg-[#0F0F1A] border border-[#3B82F6]/50 rounded-3xl p-10 flex flex-col relative md:-translate-y-6 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-normal px-6 py-2.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.4)]">Most Popular</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-3 mt-2">Growth</h3>
            <p className="text-xl text-gray-400 font-light mb-10 pb-10 border-b border-white/5 leading-relaxed">Full AI back office that handles your communications end to end.</p>
            <p className="text-3xl font-normal tracking-tight text-[#60A5FA] mb-10">Price on request</p>
            <ul className="space-y-6 mb-10 flex-1 text-xl text-gray-300 font-light">
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Up to 4 custom AI automation systems</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Omnichannel — calls, email, SMS</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Automated follow-up sequences</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />CRM & calendar integrations</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Website chatbot integration</li>
            </ul>
            <a href="#contact" className="w-full h-16 inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-8 text-xl font-normal text-white transition-all hover:bg-[#3B82F6] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] tracking-tight">Book a Call</a>
          </div>

          <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/10 transition-colors">
            <h3 className="text-4xl font-serif tracking-tight text-white mb-3">Custom</h3>
            <p className="text-xl text-gray-400 font-light mb-10 pb-10 border-b border-white/5 leading-relaxed">Built from scratch around your business, your team, and your goals.</p>
            <p className="text-3xl font-normal tracking-tight text-[#60A5FA] mb-10">Price on request</p>
            <ul className="space-y-6 mb-10 flex-1 text-xl text-gray-300 font-light">
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Everything in Growth</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Full bespoke system architecture</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Computer vision & advanced AI</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Dedicated account manager</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Ongoing maintenance & monitoring</li>
            </ul>
            <a href="#contact" className="w-full h-16 inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-8 text-xl font-normal text-white transition-all hover:bg-white/5 tracking-tight">Discuss Scope</a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center bg-[#0F0F1A]/80 border border-[#3B82F6]/20 rounded-3xl p-12 backdrop-blur-sm">
          <div className="text-5xl mb-6">🤝</div>
          <h3 className="text-4xl font-serif text-white tracking-tight mb-6">We don't disappear after launch</h3>
          <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">Every package includes post-launch support. We monitor, tweak, and make sure your system is working exactly as it should — because your results are our reputation.</p>
        </div>
      </div>
    </section>
  );
}
function Contact() {
  useEffect(() => {
    const existingScript = document.getElementById('google-cal-script');
    if (existingScript) return;

    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'google-cal-script';
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;

    script.onload = () => {
      const tryLoad = () => {
        const target = document.getElementById('calendar-button-container');
        // @ts-ignore
        if (target && window.calendar?.schedulingButton) {
          // @ts-ignore
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ02790FCOT24-Uwu561D4vTakg9rM2b4_ganlYzNeB5RTNPVJVh7mRZ9VktgwAR5pRrYUcUTUNp?gv=true',
            color: '#2563EB',
            label: 'Book your free 30-minute call',
            target,
          });
        } else {
          setTimeout(tryLoad, 100);
        }
      };
      tryLoad();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <section id="contact" className="py-32 relative z-10 border-t border-white/5 bg-[#040408] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#2563EB]/20 via-[#040408] to-[#040408] pointer-events-none"></div>
      <div className="z-10 text-center max-w-6xl mx-auto px-6 relative">
        <h2 className="md:text-8xl leading-tight text-6xl text-white tracking-tight font-serif mb-10">
          Ready to stop losing customers to missed calls and slow replies?
        </h2>
        <p className="md:text-4xl text-3xl text-gray-400 font-light leading-relaxed mb-8 max-w-4xl mx-auto tracking-tight">
          Book a free 30-minute call with AV Decoded. We'll listen to what's not working in your business right now, and show you exactly how AI automation can fix it — with no jargon, no commitment, and no hard sell.
        </p>
        <p className="text-2xl text-gray-500 font-light mb-16 tracking-tight">No commitment · No pushy sales pitch · Free 30-minute call</p>
        <div className="flex justify-center items-center min-h-[100px]">
          <div id="calendar-button-container"></div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How long does it take to build?", a: "Most Starter systems go live within 1–2 weeks. Growth packages typically take 3–4 weeks depending on complexity. Custom builds are scoped individually on our discovery call." },
    { q: "Do I need to be technical to use this?", a: "Not at all. We handle the entire build and setup. From your end it just feels like having an extra team member — you won't need to touch any code or technical settings." },
    { q: "What tools do you integrate with?", a: "We work with the tools you already use — including Google Workspace, Outlook, CRMs like HubSpot or Zoho, Calendly, WhatsApp Business, Twilio, and more. We'll confirm compatibility on your discovery call." },
    { q: "How much does it cost?", a: "Every business is different so we price based on what you actually need — not a one-size-fits-all number. Book a free call and we'll give you a clear quote with no surprises." },
    { q: "What happens after my system goes live?", a: "We don't just hand it over and disappear. Every package includes post-launch support so we can tweak, adjust, and make sure everything is running exactly as it should." }
  ];

  return (
    <section className="py-32 bg-[#040408] z-10 border-white/5 border-t relative overflow-hidden" id="faq">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3B82F6]/5 via-[#040408] to-[#040408] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-20 text-center">Frequently Asked Questions</h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-white/10">
              <summary className="flex cursor-pointer md:text-3xl text-2xl font-light tracking-tight text-gray-200 hover:text-white transition-colors py-10 items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center ml-6">
                  <div className="w-8 h-0.5 bg-[#60A5FA] absolute transition-all duration-300 group-open:rotate-180" />
                  <div className="w-0.5 h-8 bg-[#60A5FA] absolute transition-all duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <div className="pb-12 text-gray-400 font-light text-2xl leading-relaxed pr-10 tracking-tight">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040408] border-t border-white/10 pt-20 pb-10 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="text-4xl font-serif tracking-tight text-white inline-block mb-6">AV Decoded</a>
            <p className="text-xl text-gray-500 font-light max-w-md leading-relaxed">Your Business. Automated. We build the systems that run your business in the background — 24/7, without extra headcount.</p>
          </div>
          <div>
            <h4 className="text-lg font-normal text-white mb-8 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-5">
              <li><a href="#services" className="text-xl text-gray-500 hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="text-xl text-gray-500 hover:text-white transition-colors">About</a></li>
              <li><a href="#process" className="text-xl text-gray-500 hover:text-white transition-colors">Process</a></li>
              <li><a href="#pricing" className="text-xl text-gray-500 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-xl text-gray-500 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-normal text-white mb-8 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-5">
              <li><a href="mailto:theavdecoded@gmail.com" className="hover:text-white transition-colors text-xl text-gray-500">theavdecoded@gmail.com</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xl text-gray-500">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg font-light text-gray-600">© 2026 AV Decoded. All rights reserved.</p>
          <p className="text-lg text-gray-600 font-light">AI Automation Agency — London, UK</p>
        </div>
      </div>
    </footer>
  );
}
