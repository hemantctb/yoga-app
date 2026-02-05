import Link from 'next/link'
import { CheckCircle, School, BarChart3, Shield, Zap, Sparkles, Layout, DollarSign, BookOpen, Brain } from 'lucide-react'
import ImageCarousel from '@/app/components/home/ImageCarousel'

export default function StudiosPage() {
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
               <Link href="/solutions/studios" className="text-sm font-medium text-clay transition">
                For Schools
              </Link>
              <Link href="/solutions/ytt" className="text-sm font-medium text-ink-light hover:text-clay transition">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-light/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clay/10 text-clay text-xs font-semibold uppercase tracking-wider mb-6 border border-clay/20">
                    White-Label Solutions
                </div>
                <h1 className="text-5xl font-serif font-bold text-ink mb-6 leading-tight">
                    Your Curriculum.<br/>
                    Your Brand.<br/>
                    <span className="text-clay">Powered by AI.</span>
                </h1>
                <p className="text-xl text-ink-light mb-8 leading-relaxed">
                    Stop cobbling together generic tools. Sutra provides a branded, AI-powered platform that houses your entire lineage, automates grading, and creates a new revenue stream for your school.
                </p>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-ink text-paper-light rounded-xl hover:bg-ink/90 transition font-medium shadow-lg shadow-ink/10">
                        Book a Demo
                    </button>
                    <button className="px-8 py-4 bg-paper-light border border-sand text-ink-light rounded-xl hover:bg-paper transition font-medium">
                        View Pricing
                    </button>
                </div>
            </div>
            <div className="relative">
                {/* Visual of the White Label App */}
                <div className="bg-paper-light p-6 rounded-3xl shadow-2xl border border-sand relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="absolute -top-4 -right-4 bg-sage text-white px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-6">
                        Your Logo Here
                    </div>
                    <div className="border-b border-sand pb-4 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-sand rounded-full"></div>
                             <div className="h-4 w-24 bg-sand rounded"></div>
                        </div>
                        <div className="h-8 w-8 bg-paper rounded"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-40 bg-paper rounded-xl flex items-center justify-center text-ink-light/30 border border-sand/50 italic">
                            Custom Sequence Builder
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-24 bg-clay/5 rounded-xl p-4 border border-clay/10">
                                <div className="h-2 w-12 bg-clay/20 rounded mb-2"></div>
                                <div className="text-clay font-bold text-lg">Anatomy</div>
                            </div>
                            <div className="h-24 bg-turmeric/5 rounded-xl p-4 border border-turmeric/10">
                                <div className="h-2 w-12 bg-turmeric/20 rounded mb-2"></div>
                                <div className="text-turmeric font-bold text-lg">Philosophy</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-clay/10 blur-3xl -z-10 rounded-full"></div>
            </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <ImageCarousel />

      {/* The Experience Gap Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="text-3xl font-serif font-bold text-ink mb-4">Meet Your Students Where They Are</h2>
             <p className="text-lg text-ink-light leading-relaxed">
                Modern students are already using generic AI to learn. But generic models lack the nuance of your lineage and the safety required for deep practice. Sutra provides a specialized AI experience trained on ancient wisdom and modern techniques.
             </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-sand rounded-2xl bg-paper-light shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-ink/5 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 text-ink-light" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">Beyond the Binder</h3>
                <p className="text-ink-light text-sm">
                    Static manuals are hard to search and easy to lose. Transform your text into a living, interactive guide that students actually want to use.
                </p>
            </div>
            <div className="flex items-center justify-center">
                 <div className="p-3 bg-paper-light rounded-full border border-sand shadow-sm">
                    <Sparkles className="w-6 h-6 text-clay" />
                 </div>
            </div>
            <div className="p-8 border border-clay/20 bg-clay/5 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-clay/10 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="w-6 h-6 text-clay" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">Specialized Intelligence</h3>
                <p className="text-ink-light text-sm">
                    Generic AI can give dangerous cues. Our models are safety-focused, lineage-specific, and trained on the masters—ensuring your students learn correctly.
                </p>
            </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ink text-paper-light">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div>
                    <div className="mb-6 inline-block p-3 bg-ink/50 border border-sand/10 rounded-lg">
                        <Layout className="w-6 h-6 text-clay-light" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">White-Label Branding</h3>
                    <p className="text-paper-light/60 leading-relaxed text-sm">
                        The app looks and feels like your school. Your colors, your logo, your specific lineage cues. We are the engine; you are the hero.
                    </p>
                </div>
                <div>
                    <div className="mb-6 inline-block p-3 bg-ink/50 border border-sand/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-turmeric" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Automated Grading</h3>
                    <p className="text-paper-light/60 leading-relaxed text-sm">
                        Our AI analyzes student video submissions for alignment and cueing accuracy, reducing your grading workload by 80%.
                    </p>
                </div>
                <div>
                    <div className="mb-6 inline-block p-3 bg-ink/50 border border-sand/10 rounded-lg">
                        <Shield className="w-6 h-6 text-sage" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Compliance Ready</h3>
                    <p className="text-paper-light/60 leading-relaxed text-sm">
                        Built for 2025 standards. We automatically track core competencies and synchronous hours for seamless audits.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ / GEO Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-ink mb-12 text-center">School Owner FAQ</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-ink mb-2">Does this replace my Lead Trainers?</h3>
                    <p className="text-ink-light text-sm">
                        No. Sutra handles the rote work of grading basic alignment and memorization, allowing your Lead Trainers to focus on high-level philosophy and mentorship.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-ink mb-2">How fast is onboarding?</h3>
                    <p className="text-ink-light text-sm">
                        We digitize your manual and sequence scripts for you. Most schools launch their branded version in as little as 2 weeks.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-ink mb-2">Yoga Alliance Compliance?</h3>
                    <p className="text-ink-light text-sm">
                        Yes. Sutra provides the digital audit trail needed to prove student competency across all mandated categories.
                    </p>
                </div>
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