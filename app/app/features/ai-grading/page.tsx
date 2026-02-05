import Link from 'next/link'
import { Sparkles, BarChart3, Clock, CheckSquare, AlertTriangle, Play, Mic } from 'lucide-react'

export default function AIGradingPage() {
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
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-ink text-paper-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E6E2D8 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clay/20 text-clay-light text-xs font-semibold uppercase tracking-wider mb-6 border border-clay/30">
                Lineage-Specific Assessment
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-8 tracking-tight">
                Consistency is the Heart of <span className="text-clay-light">Lineage</span>.
            </h1>
            <p className="text-xl text-paper-light/70 mb-10 leading-relaxed text-balance">
                The biggest challenge for a yoga school is maintaining cueing consistency across a global cohort. Sutra's AI analyzes student audio submissions to ensure every trainee honors your unique safety protocols and anatomical logic.
            </p>
            <div className="flex justify-center gap-4">
                 <Link 
                    href="/asanas"
                    className="px-8 py-4 bg-clay text-white rounded-xl hover:bg-clay-hover transition font-medium text-lg shadow-lg shadow-clay/20"
                 >
                    Explore Audio Assessment
                 </Link>
            </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-ink mb-16 text-center">Intelligent Feedback Loop</h2>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-sand/50 -z-10"></div>

                {/* Step 1 */}
                <div className="bg-paper-light p-8 rounded-2xl border border-sand shadow-sm">
                    <div className="w-24 h-24 bg-clay/5 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-paper shadow-sm">
                        <Mic className="w-10 h-10 text-clay" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-ink mb-3">1. Audio Submission</h3>
                        <p className="text-ink-light text-sm leading-relaxed">
                            Students record their cues directly in the app, building muscle memory for their verbal teaching.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="bg-paper-light p-8 rounded-2xl border border-sand shadow-sm">
                    <div className="w-24 h-24 bg-turmeric/5 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-paper shadow-sm">
                        <Sparkles className="w-10 h-10 text-turmeric" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-ink mb-3">2. Lineage Check</h3>
                        <p className="text-ink-light text-sm leading-relaxed">
                            Our AI compares the recording against your school's specific manual, flagging anatomical risks.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="bg-paper-light p-8 rounded-2xl border border-sand shadow-sm">
                    <div className="w-24 h-24 bg-sage/5 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-paper shadow-sm">
                        <CheckSquare className="w-10 h-10 text-sage" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-ink mb-3">3. Mastery Insight</h3>
                        <p className="text-ink-light text-sm leading-relaxed">
                            Students get instant guidance, and Lead Trainers see competency trends across the whole cohort.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-light/30 border-t border-sand">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-paper-light p-8 rounded-2xl shadow-sm border border-sand">
                 <div className="flex items-center justify-between mb-6 border-b border-sand pb-4">
                    <span className="font-bold text-ink text-sm">Assessment Report: Sarah J.</span>
                    <span className="px-3 py-1 bg-turmeric/10 text-turmeric text-[10px] font-bold rounded-full uppercase tracking-wider border border-turmeric/20">Needs Review</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex gap-4 items-start p-3 bg-clay/5 rounded-lg border border-clay/10">
                        <AlertTriangle className="w-5 h-5 text-clay mt-0.5" />
                        <div>
                            <div className="font-bold text-ink text-xs uppercase tracking-wide">Safety Risk (03:14)</div>
                            <p className="text-ink-light text-xs">Student cued "lock the knee" in Triangle Pose. Suggested: "Micro-bend".</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start p-3 bg-sage/5 rounded-lg border border-sage/10">
                        <CheckSquare className="w-5 h-5 text-sage mt-0.5" />
                        <div>
                            <div className="font-bold text-ink text-xs uppercase tracking-wide">Sanskrit Accuracy (05:22)</div>
                            <p className="text-ink-light text-xs">Correct pronunciation of "Adho Mukha Svanasana".</p>
                        </div>
                    </div>
                 </div>
            </div>
            <div>
                <h2 className="text-3xl font-serif font-bold text-ink mb-6 text-balance">Objective, Data-Driven Grading</h2>
                <p className="text-ink-light text-lg mb-8 leading-relaxed">
                    Move beyond subjective "vibes." Sutra provides objective data on your cohort's performance, helping you identify curriculum gaps instantly.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-clay" />
                        <span className="text-ink-light text-sm">Reduce grading time by 80%</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-turmeric" />
                        <span className="text-ink-light text-sm">Identify struggling students early</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckSquare className="w-5 h-5 text-sage" />
                        <span className="text-ink-light text-sm">Generate automated compliance logs</span>
                    </li>
                </ul>
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