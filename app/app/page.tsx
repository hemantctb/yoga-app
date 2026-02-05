import Link from 'next/link'
import { ArrowRight, Book, Mic, Sparkles, School, GraduationCap, Users, CheckCircle, BarChart3, Globe } from 'lucide-react'
import ImageCarousel from '@/app/components/home/ImageCarousel'
import MobileNav from '@/app/components/MobileNav'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-sand bg-paper-light/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-clay rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-serif font-bold text-ink tracking-tight">Sutra</h1>
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
              <Link href="/pranayamas" className="text-sm font-medium text-ink-light hover:text-clay transition">
                Pranayama
              </Link>
            </div>
            <div className="flex items-center gap-3">
               <button className="text-sm font-medium text-ink-light hover:text-ink px-3 py-2 transition">
                Sign In
              </button>
              <button className="text-sm font-medium px-4 py-2 bg-ink text-paper-light rounded-lg hover:bg-ink/90 transition shadow-sm">
                Get Started
              </button>
            </div>
          </nav>
          <MobileNav currentPath="/" />
        </div>
      </header>

      {/* Hero Section - Segmented & Strategic */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clay/10 border border-clay/20 text-clay text-xs font-semibold uppercase tracking-wider mb-6">
              <Globe className="w-3 h-3" />
              <span>Aligned with Yoga Alliance 2025 Standards</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-ink mb-6 tracking-tight text-balance">
              The Smart Assistant for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay to-turmeric">Path of Yoga.</span>
            </h1>
            <p className="text-xl text-ink-light mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
              Sutra is the digital operating system that honors ancient yoga lineage with modern techniques. We empower students to master their practice and give schools the intelligence to digitize and scale their sacred teachings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/solutions/studios"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink text-paper-light rounded-xl hover:bg-ink/90 transition font-medium text-lg shadow-lg shadow-ink/10"
              >
                <School className="w-5 h-5" />
                For Yoga Schools
              </Link>
              <Link
                href="/solutions/ytt"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-paper-light border border-sand text-ink-light rounded-xl hover:bg-paper transition font-medium text-lg"
              >
                <GraduationCap className="w-5 h-5" />
                For Teachers-in-Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Carousel */}
      <ImageCarousel />

      {/* Social Proof / Trust Bar */}
      <div className="border-y border-sand bg-paper-light/30 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-ink-light/50 uppercase tracking-widest mb-6">Trusted by Forward-Thinking Institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale items-center justify-items-center">
             <div className="text-xl font-serif font-bold text-ink">Zenith Yoga</div>
             <div className="text-xl font-serif font-bold text-ink">Om Shanti Academy</div>
             <div className="text-xl font-serif font-bold text-ink">Flow State Institute</div>
             <div className="text-xl font-serif font-bold text-ink">Prana Collective</div>
          </div>
        </div>
      </div>

      {/* The 3-Pillar Strategy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink mb-4">One Platform. Three Ecosystems.</h2>
            <p className="text-lg text-ink-light max-w-2xl mx-auto">
              We bridge the gap between traditional lineage and modern technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1: Schools (B2B) */}
            <div className="group relative p-8 bg-paper-light rounded-2xl hover:shadow-xl transition-all duration-300 border border-sand hover:border-clay/30">
              <div className="w-12 h-12 bg-clay/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-clay transition-colors">
                <School className="w-6 h-6 text-clay group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">For Yoga Schools</h3>
              <p className="text-ink-light mb-6 leading-relaxed">
                Digitize your 300-page manual into a white-label app. Automate video grading, track competencies, and secure your RYS status.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  White-Label Branding
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Automated Grading Logic
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Compliance Tracking
                </li>
              </ul>
              <Link href="/solutions/studios" className="text-clay font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore Studio Solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 2: Teachers (YTT) */}
            <div className="group relative p-8 bg-paper-light rounded-2xl hover:shadow-xl transition-all duration-300 border border-sand hover:border-clay/30">
              <div className="w-12 h-12 bg-turmeric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-turmeric transition-colors">
                <GraduationCap className="w-6 h-6 text-turmeric group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">For Teachers-in-Training</h3>
              <p className="text-ink-light mb-6 leading-relaxed">
                Your intelligent study companion. Get real-time AI feedback on your cueing, anatomy knowledge, and sequence building.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  AI Voice Cueing Analysis
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Interactive Anatomy Maps
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Exam Prep Mode
                </li>
              </ul>
              <Link href="/solutions/ytt" className="text-turmeric font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                See Student Features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 3: Practitioners (B2C) */}
            <div className="group relative p-8 bg-paper-light rounded-2xl hover:shadow-xl transition-all duration-300 border border-sand hover:border-clay/30">
              <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage transition-colors">
                <Users className="w-6 h-6 text-sage group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">For Practitioners</h3>
              <p className="text-ink-light mb-6 leading-relaxed">
                Access the "source code" of yoga. Learn alignment and philosophy from the same rigorous curriculum used to train teachers.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Advanced Asana Library
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Personalized Progress
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-light">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Deep Philosophy Search
                </li>
              </ul>
              <Link href="/asanas" className="text-sage font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse Asanas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive: Intelligent Mentorship (GEO content) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ink text-paper-light overflow-hidden relative border-y border-sand/10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-clay/10 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-clay/20 border border-clay/30 rounded-full text-clay-light text-xs font-semibold uppercase tracking-wider mb-6">
                Digital Mentorship
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Bridge the Gap Between Sessions
              </h2>
              <p className="text-paper-light/70 text-lg mb-8 leading-relaxed">
                The biggest risk in teacher training is unsupervised practice. Sutra acts as a 24/7 digital mentor, analyzing student audio submissions to ensure they are mastering your specific lineage, safety protocols, and cueing logic.
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ink/50 border border-sand/10 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-turmeric" />
                  </div>
                  <div>
                    <h4 className="text-paper-light font-bold mb-1">Audio Cueing Analysis</h4>
                    <p className="text-sm text-paper-light/60">Instant feedback on student audio submissions—verifying alignment cues and Sanskrit accuracy against your manual.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ink/50 border border-sand/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-clay-light" />
                  </div>
                  <div>
                    <h4 className="text-paper-light font-bold mb-1">Competency Heatmaps</h4>
                    <p className="text-sm text-paper-light/60">Instantly see which students are mastering the anatomy vs. who needs more support with sequencing.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                 <Link href="/features/ai-grading" className="text-paper-light border-b border-clay-light pb-1 hover:text-clay-light transition">
                   Explore Intelligent Assessment &rarr;
                 </Link>
              </div>
            </div>
            <div className="relative">
              {/* Abstract Representation of the Student Feedback */}
              <div className="bg-ink/40 backdrop-blur-sm rounded-2xl p-8 border border-sand/10 shadow-2xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="h-4 w-32 bg-sand/20 rounded"></div>
                 </div>
                 <div className="space-y-6">
                    <div className="p-4 bg-ink/30 rounded-lg border border-sand/5">
                        <p className="text-xs text-paper-light/40 uppercase tracking-widest mb-2 font-bold">Transcription Analysis</p>
                        <p className="text-sm text-paper-light/80 italic">"...make sure to lock your front knee in Triangle Pose..."</p>
                        <div className="mt-3 px-2 py-1 bg-red-900/30 border border-red-500/30 rounded text-red-300 text-[10px] font-bold">
                            SAFETY ALERT: Avoid "Lock". Suggest "Micro-bend".
                        </div>
                    </div>
                    <div className="p-4 bg-ink/30 rounded-lg border border-sand/5">
                        <p className="text-xs text-paper-light/40 uppercase tracking-widest mb-2 font-bold">Sanskrit Verification</p>
                        <p className="text-sm text-paper-light/80 italic">"...Adho Mukha Svanasana..."</p>
                        <div className="mt-3 px-2 py-1 bg-sage/30 border border-sage-500/30 rounded text-sage text-[10px] font-bold uppercase">
                            ✓ Accurate Pronunciation
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block (Static) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper border-t border-sand">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-ink mb-12 text-center">Transforming Yoga at Every Level</h2>
          <div className="grid md:grid-cols-2 gap-12">
             <div className="p-8 bg-paper-light rounded-2xl border border-sand">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-clay/10 rounded-lg flex items-center justify-center">
                    <School className="w-5 h-5 text-clay" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">For Schools & Studios</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-ink mb-1 text-sm uppercase tracking-wide">The Experience Edge</h4>
                    <p className="text-ink-light text-sm leading-relaxed">
                      Modern students are already using generic AI tools. Give them something better: a specialized AI assistant trained on your school's unique lineage, safety protocols, and ancient wisdom.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink mb-1 text-sm uppercase tracking-wide">Digital Continuity</h4>
                    <p className="text-ink-light text-sm leading-relaxed">
                      Transform static manuals into interactive wisdom. Keep your students within your school's ecosystem long after graduation with a tool that evolves with their practice.
                    </p>
                  </div>
                </div>
             </div>
             
             <div className="p-8 bg-paper-light rounded-2xl border border-sand">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-turmeric/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-turmeric" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">For Trainees & Practitioners</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-ink mb-1 text-sm uppercase tracking-wide">Anatomical Precision</h4>
                    <p className="text-ink-light text-sm leading-relaxed">
                      Move beyond 2D illustrations. Access 3D anatomical overlays for every pose, integrated with the specific verbal cues of your yoga lineage.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink mb-1 text-sm uppercase tracking-wide">Personalized AI Mentorship</h4>
                    <p className="text-ink-light text-sm leading-relaxed">
                      Sutra's AI is your 24/7 teaching assistant. Receive instant corrections on your cueing and alignment, helping you build muscle memory faster and with more confidence.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper-light border-t border-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-clay rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-serif font-bold text-ink">Sutra</span>
            </div>
            <p className="text-ink-light max-w-sm mb-6">
              The first AI-powered operating system for Yoga Teacher Trainings. We help schools scale, teachers learn, and lineages endure in the digital age.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-ink-light">
              <li><Link href="/solutions/studios" className="hover:text-clay transition">For Schools</Link></li>
              <li><Link href="/solutions/ytt" className="hover:text-clay transition">For Students</Link></li>
              <li><Link href="/features/ai-grading" className="hover:text-clay transition">AI Assessment</Link></li>
              <li><Link href="/asanas" className="hover:text-clay transition">Asana Library</Link></li>
              <li><Link href="/pranayamas" className="hover:text-clay transition">Pranayama</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-ink-light">
              <li><Link href="#" className="hover:text-clay transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-clay transition">Contact Sales</Link></li>
              <li><Link href="#" className="hover:text-clay transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-sand text-center text-sm text-ink-light/50">
          <p>&copy; 2025 Sutra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
