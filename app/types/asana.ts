export interface Asana {
  id: string
  names: {
    sanskrit: string
    english: string
    phonetic: string
  }
  description: string
  category: string[]
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  drishti: string
  impact: {
    chakras: {
      primary: string
      secondary: string[]
    }
    physical: string[]
    mental: string[]
  }
  anatomy: {
    strengthen: {
      primary: string[]
      secondary: string[]
    }
    stretch: {
      primary: string[]
      secondary: string[]
    }
    stabilize: {
      primary: string[]
      secondary: string[]
    }
  }
  props: string[]
  prop_guidance: Array<{
    prop: string
    purpose: string
    instruction: string
  }>
  assists: Array<{
    id: string
    title: string
    type: string
    instruction: string
    safety_check: string
  }>
  flow: {
    predecessors: string[]
    successors: string[]
  }
  cueing: {
    summary: string[]
    foundation: string[]
    alignment: string[]
    breath_instruction: string
    forbidden_words: string[]
    elevated_vocabulary: Array<{
      basic: string
      elevated: string
    }>
  }
}

export interface AsanaMetadata {
  id: string
  title: string
  category: string[]
  description?: string
  sanskritName?: string
}

export interface EvaluationFeedback {
  score: number
  strengths: string[]
  improvements: string[]
  transcript: string
  breathCue: {
    correct: boolean
    expected: string
    found?: string
  }
  forbiddenWordsUsed: string[]
  elevatedSuggestions: Array<{
    original: string
    suggestion: string
  }>
}

export type RecordingState = "idle" | "recording" | "processing" | "complete"
