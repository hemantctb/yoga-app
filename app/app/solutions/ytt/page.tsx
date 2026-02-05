import Link from 'next/link'
import { Sparkles, Mic, BookOpen, Brain, Activity, PlayCircle } from 'lucide-react'
import ImageCarousel from '@/app/components/home/ImageCarousel'

export default function YTTPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header (Shared Style) */}
      <header className="border-b border-sand bg-paper-light/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-clay rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-serif font-bold text-ink tracking-tight">Sutra</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <Link href="/solutions/studios" className="text-sm font-medium text-ink-light hover:text-clay transition">
                For Schools
              </Link>
              <Link href="/solutions/ytt" className="text-sm font-medium text-clay transition">
                For Students
              </Link>
              <Link href="/asanas" className="text-sm font-medium text-ink-light hover:text-clay transition">
                Asana Library
              </Link>
            </div>
             <div className="flex items-center gap-3">
              <button className="text-sm font-medium px-4 py-2 bg-ink text-paper-light rounded-lg hover:bg-ink/90 transition shadow-sm">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-paper-light/30">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-turmeric/5 blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/10 text-turmeric text-xs font-semibold uppercase tracking-wider mb-6 border border-turmeric/20">
                For Teachers-in-Training
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-ink mb-8 tracking-tight">
                Your Pocket <span className="text-transparent bg-clip-text bg-gradient-to-r from-turmeric to-clay">Lead Trainer</span>.
            </h1>
            <p className="text-xl text-ink-light mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
                Don't just memorize cues—master them. Sutra listens to you teach, analyzes your alignment instructions, and helps you pass your practical exam with confidence.
            </p>
            <div className="flex justify-center gap-4">
                 <Link href="/asanas" className="px-8 py-4 bg-ink text-paper-light rounded-xl hover:bg-ink/90 transition font-medium text-lg flex items-center gap-2 shadow-lg shadow-ink/10">
                    <PlayCircle className="w-5 h-5" />
                    Try the AI Demo
                 </Link>
            </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <ImageCarousel />

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="bg-paper-light rounded-2xl p-8 border border-sand hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-turmeric/10 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-turmeric/20">
                        <Mic className="w-6 h-6 text-turmeric" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3">Voice Feedback</h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                        Record yourself teaching. Our AI analyzes your pace, tone, and vocabulary, suggesting elevated alternatives to common cues.
                    </p>
                </div>
                <div className="bg-paper-light rounded-2xl p-8 border border-sand hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-clay/10 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-clay/20">
                        <BookOpen className="w-6 h-6 text-clay" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3">Intelligent Manual</h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                        Query your school's manual instantly. Ask: "What are the contraindications for Headstand?" and get an instant, lineage-specific answer.
                    </p>
                </div>
                <div className="bg-paper-light rounded-2xl p-8 border border-sand hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-sage/20">
                        <Brain className="w-6 h-6 text-sage" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3">Sequence Builder</h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                        Build class flows with AI assistance. We check for biomechanical safety and flow logic, ensuring your transitions are graceful and safe.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* The "Confidence" Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ink text-paper-light">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-serif font-bold mb-6">Stop Guessing. Start Teaching.</h2>
                <p className="text-paper-light/70 text-lg mb-8 leading-relaxed">
                    The biggest fear for new teachers is "freezing" in front of a class. Sutra helps you build muscle memory, so when you step onto the mat, the words flow naturally.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-sage" />
                        <span className="text-sm">Real-time alignment checks</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-sage" />
                        <span className="text-sm">Sanskrit pronunciation guide</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-sage" />
                        <span className="text-sm">Anatomy overlays for every pose</span>
                    </li>
                </ul>
            </div>
            <div className="bg-ink/40 p-8 rounded-2xl backdrop-blur-sm border border-sand/10 shadow-2xl">
                <div className="flex gap-4 mb-6">
                    <div className="w-12 h-12 bg-sand/20 rounded-full"></div>
                    <div>
                        <div className="font-bold">Sarah J.</div>
                        <div className="text-sm text-paper-light/50 text-xs uppercase tracking-wide">RYT-200 Graduate</div>
                    </div>
                </div>
                <p className="text-lg italic text-paper-light/90">
                    "I was terrified of my final practicum. I used Sutra to practice my peak pose sequence every day. The AI caught my alignment errors instantly. I passed with distinction."
                </p>
            </div>
        </div>
      </section>

      {/* Footer (Shared Style) */}
      <footer className="bg-paper-light border-t border-sand py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-ink-light/50">
          <p>&copy; 2025 Sutra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}