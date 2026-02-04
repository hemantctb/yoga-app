import Link from 'next/link'
import { ArrowRight, Book, Mic, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-primary/10 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-serif font-semibold text-primary">Sutra</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/asanas" className="text-sm text-foreground/70 hover:text-foreground transition">
              Asanas
            </Link>
            <button className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium">
            Your AI Teaching Assistant
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-foreground mb-6 text-balance">
            Master the Art of<br />Yoga Cueing
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Practice teaching with AI-powered feedback. Record your cueing, receive instant analysis, and elevate your teaching skills.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/asanas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium"
            >
              Explore Asanas
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition font-medium">
              <Mic className="w-4 h-4" />
              Try Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-semibold text-foreground mb-4">
              Everything You Need to Perfect Your Teaching
            </h3>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From comprehensive asana library to AI-powered feedback, we provide the tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-semibold mb-2">Comprehensive Library</h4>
              <p className="text-foreground/70">
                40+ asanas with detailed anatomical breakdowns, alignment cues, and teaching tips.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-semibold mb-2">Voice Recording</h4>
              <p className="text-foreground/70">
                Practice your cueing by recording yourself teaching any asana in real-time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-semibold mb-2">AI Feedback</h4>
              <p className="text-foreground/70">
                Receive instant, detailed feedback on your cueing, alignment instructions, and vocabulary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif font-semibold text-foreground mb-4">
            Ready to Transform Your Teaching?
          </h3>
          <p className="text-lg text-foreground/70 mb-8">
            Join teachers and students perfecting their practice with AI-powered guidance.
          </p>
          <Link
            href="/asanas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium text-lg"
          >
            Start Practicing Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2025 Sutra. Elevating yoga teaching with AI.</p>
        </div>
      </footer>
    </div>
  )
}
