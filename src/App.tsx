import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { PhoneOff, MailWarning, Users, Bot, MessageSquareDashed, Layout, Filter, Share2, Workflow, CheckCircle2, Menu, Check, X } from 'lucide-react';
import Chatbot from './components/Chatbot';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="bg-[#040408] text-white font-sans antialiased selection:bg-[#2563EB] selection:text-white flex flex-col min-h-screen">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <RevenueCalculator />
      <Services />
      <WhoIsThisFor />
      <Process />
      <About />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
}

function RevenueCalculator() {
  const [missedCalls, setMissedCalls] = useState(5);
  const [customerValue, setCustomerValue] = useState(100);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dailyLoss = missedCalls * customerValue;
  const weeklyLoss = dailyLoss * 5;
  const monthlyLoss = dailyLoss * 22;
  const yearlyLoss = dailyLoss * 260;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
      
      // Sending data to theavdecoded@gmail.com using FormSubmit
      try {
        await fetch("https://formsubmit.co/ajax/theavdecoded@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            missedCalls,
            customerValue,
            weeklyLoss,
            monthlyLoss,
            yearlyLoss,
            _subject: `New Lead from Revenue Calculator: ${name}`
          })
        });
      } catch (error) {
        console.error('Error sending lead:', error);
      }
      
      console.log('Lead captured:', { name, email, missedCalls, customerValue });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#080810] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-white mb-6">How much is silence costing you?</h2>
          <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto">Every missed call is a missed opportunity. Use our calculator to see the potential revenue you're leaving on the table.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <div className="bg-[#0F0F1A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Missed Calls Per Day</label>
                <input 
                  type="range" min="1" max="50" value={missedCalls} 
                  onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-3xl font-serif text-white">{missedCalls}</span>
                  <span className="text-gray-500">calls / day</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Average Customer Value (£)</label>
                <input 
                  type="number" value={customerValue} 
                  onChange={(e) => setCustomerValue(parseInt(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-2xl text-white focus:outline-none focus:border-[#2563EB]/50 transition-colors"
                />
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="pt-8 border-t border-white/5 space-y-4">
                  <p className="text-gray-400 text-sm mb-4">Get your full report and a custom automation strategy:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2563EB]/50"
                    />
                    <input 
                      type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2563EB]/50"
                    />
                  </div>
                  <button type="submit" className="w-full h-14 bg-[#2563EB] text-white rounded-xl font-medium hover:bg-[#3B82F6] transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Send Me My Strategy
                  </button>
                </form>
              ) : (
                <div className="pt-8 border-t border-white/5 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-white font-medium">Thanks, {name}! We'll be in touch shortly.</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-to-br from-[#2563EB]/20 to-transparent border border-[#2563EB]/30 rounded-3xl p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-gray-400 uppercase tracking-widest text-xs mb-2">Potential Weekly Loss</p>
                <h3 className="text-5xl md:text-6xl font-serif text-white">£{weeklyLoss.toLocaleString()}</h3>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Workflow className="w-24 h-24 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-8">
                <p className="text-gray-400 uppercase tracking-widest text-xs mb-2">Monthly Loss</p>
                <h3 className="text-3xl font-serif text-white">£{monthlyLoss.toLocaleString()}</h3>
              </div>
              <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-8">
                <p className="text-gray-400 uppercase tracking-widest text-xs mb-2">Yearly Loss</p>
                <h3 className="text-3xl font-serif text-[#60A5FA]">£{yearlyLoss.toLocaleString()}</h3>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                "Our AI Receptionist costs a fraction of this loss. Most of our clients see a full ROI within the first 30 days of going live."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          AI Receptionist Agency UK | Custom AI Voice & Chat Solutions
        </motion.h1>
        <div className="font-syne text-6xl md:text-8xl font-medium tracking-tight leading-none mb-4 flex flex-col items-center">
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-white block">Never Miss A Call.</motion.span>
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] block" style={{ textShadow: '0 0 45px rgba(59,130,246,0.4)' }}>Ever Again.</motion.span>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="font-dmsans text-2xl font-light text-[#94A3B8] max-w-[900px] mx-auto mt-6 mb-12 leading-relaxed"
        >
          AV Decoded builds custom AI Receptionists that answer your calls, qualify leads, and book appointments directly into your calendar — 24/7. We also offer high-converting website refreshes with integrated AI chat.
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
    { icon: Bot, title: "AI Receptionist (Voice & Chat)", desc: "Our AI receptionist answers calls, responds to emails, and replies to text messages 24/7 — in your name, with your tone. It qualifies leads and books appointments directly into your calendar while you work." },
    { icon: Layout, title: "Website Refresh + AI Integration", desc: "We don't just build websites; we build conversion machines. We'll refresh your site with a modern, high-trust design and integrate a custom AI chatbot that captures leads while you sleep." },
    { icon: MessageSquareDashed, title: "Automated Lead Follow-Up", desc: "Never let a lead go cold. Our systems automatically follow up with every enquiry via SMS or email, ensuring you're always the first to respond to a potential customer." },
    { icon: Filter, title: "Lead Qualification", desc: "Our AI filters out the tyre-kickers and only puts the high-value leads on your calendar. You spend your time closing deals, not answering basic questions." }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0A0A12] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-3xl mb-16 mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">Specialised AI Solutions for Your Front Office</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-400 font-light">We focus on the two most important parts of your business: capturing leads and converting them into customers.</motion.p>
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
      desc: "Missing calls means missing money. We build AI receptionists that answer every call, qualify leads, and book appointments directly into your calendar — while you're on the job.",
      icon: "🔧"
    },
    {
      title: "Agencies & Consultancies",
      desc: "Scale your output, not your overhead. We automate client onboarding, reporting, and repetitive follow-ups so your team can focus on high-value strategy, not admin.",
      icon: "📈"
    },
    {
      title: "E-commerce & Retail",
      desc: "Deliver 24/7 support without the 24/7 payroll. Our AI systems handle order tracking, returns, and common FAQs instantly, keeping your customers happy and your inbox empty.",
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-6">Three Steps to 24/7 AI Reception</h2>
          <p className="text-3xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed tracking-tight">We don't just give you a tool; we build a custom system that integrates directly into your business workflow.</p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between gap-16 md:gap-8">
          <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent"></div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-white/10 flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-white/20 group-hover:border-[#3B82F6]/50 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">01</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">Discovery</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">We map out your current call flow and identify exactly where you're losing leads. We then design the AI's personality and knowledge base to match your brand perfectly.</p>
          </div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-[#60A5FA]">02</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">Custom Build</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">We build your AI Receptionist from scratch. This includes voice synthesis, CRM integration, and calendar syncing. We test it thoroughly to ensure it handles every scenario flawlessly.</p>
          </div>
          
          <div className="relative flex-1 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full bg-[#0F0F1A] border border-white/10 flex items-center justify-center mb-8 relative z-10 text-6xl font-serif text-white/20 group-hover:border-[#3B82F6]/50 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">03</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-4">Go Live</h3>
            <p className="text-2xl text-gray-400 font-light max-w-md leading-relaxed">Your AI goes live. It starts answering calls, qualifying leads, and booking appointments instantly. You get a dashboard to monitor every interaction and watch your revenue grow.</p>
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
            AV Decoded was founded by an MSc graduate in Artificial Intelligence, Robotics & Autonomous Systems, with a BEng in Mechatronics Engineering. The name started with a passion for intelligent systems that perceive the world, make decisions, and take action without human input. That same engineering logic now powers the automation systems we build for businesses.
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
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="pricing" className="py-32 relative z-10 bg-[#040408]" ref={containerRef}>
      {/* Stunning Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: y2, rotate: -rotate }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-6">Simple, Transparent Pricing.</h2>
          <p className="text-3xl font-light text-gray-400 max-w-4xl mx-auto leading-relaxed tracking-tight">No hidden fees. No bloated retainers. Choose the package that fits your current needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto mb-20">
          <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/10 transition-colors">
            <h3 className="text-4xl font-serif tracking-tight text-white mb-3">AI Receptionist Starter</h3>
            <p className="text-xl text-gray-400 font-light mb-10 pb-10 border-b border-white/5 leading-relaxed">Perfect for businesses that need to capture every call and book appointments automatically.</p>
            <p className="text-3xl font-normal tracking-tight text-[#60A5FA] mb-10">Price on request</p>
            <ul className="space-y-6 mb-10 flex-1 text-xl text-gray-300 font-light">
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />24/7 AI Voice Receptionist</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Automated Calendar Booking</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />SMS & Email Lead Capture</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />Custom Tone of Voice</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#3B82F6] shrink-0 mt-1" />CRM Integration</li>
            </ul>
            <a href="#contact" className="w-full h-16 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-xl font-normal text-white transition-all hover:bg-white/10 tracking-tight">Get Started</a>
          </div>

          <div className="bg-[#0F0F1A] border border-[#3B82F6]/50 rounded-3xl p-10 flex flex-col relative shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-normal px-6 py-2.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.4)]">Full Digital Presence</div>
            <h3 className="text-4xl font-serif tracking-tight text-white mb-3 mt-2">AI + Web Refresh</h3>
            <p className="text-xl text-gray-400 font-light mb-10 pb-10 border-b border-white/5 leading-relaxed">For businesses ready to dominate their market with a high-converting site and full AI automation.</p>
            <p className="text-3xl font-normal tracking-tight text-[#60A5FA] mb-10">Price on request</p>
            <ul className="space-y-6 mb-10 flex-1 text-xl text-gray-300 font-light">
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Everything in AI Receptionist</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Modern Website Refresh</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Integrated AI Chatbot</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Conversion Rate Optimisation</li>
              <li className="flex items-start gap-4"><Check strokeWidth={2} className="w-6 h-6 text-[#60A5FA] shrink-0 mt-1" />Ongoing Performance Monitoring</li>
            </ul>
            <a href="#contact" className="w-full h-16 inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-8 text-xl font-normal text-white transition-all hover:bg-[#3B82F6] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] tracking-tight">Book a Call</a>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mt-16">
          <p className="text-2xl text-gray-400 font-light italic leading-relaxed">
            "Need something more custom? We build bespoke AI solutions for enterprise clients. Book a call to discuss your specific requirements."
          </p>
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
    { q: "Will the AI Receptionist sound robotic?", a: "Not at all. We use state-of-the-art voice synthesis that sounds natural, professional, and warm. Most customers won't even realize they're talking to an AI — they'll just be happy someone picked up the phone immediately." },
    { q: "Can it really book appointments directly into my calendar?", a: "Yes. We integrate directly with Google Calendar, Outlook, and most major booking softwares. When a customer picks a slot, it appears in your calendar instantly, just like a human assistant would do it." },
    { q: "What happens if the AI doesn't know the answer?", a: "The AI is trained on your specific business knowledge. If it encounters a complex query it can't handle, it can seamlessly take a detailed message, offer to have you call them back, or even transfer the call to your mobile if you're available." },
    { q: "How long does it take to get my system live?", a: "We move fast. A standard AI Receptionist setup typically goes live within 7–10 days. This includes the discovery phase, custom voice training, and full integration with your existing tools." },
    { q: "How do I know if I'll get a return on investment?", a: "If you're currently missing even 2-3 calls a week, the system usually pays for itself within the first month. Our calculator above shows the real cost of silence — our goal is to turn that lost revenue back into profit." }
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
