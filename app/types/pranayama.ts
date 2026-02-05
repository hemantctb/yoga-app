export interface Pranayama {
  id: string
  names: {
    sanskrit: string
    english: string
    phonetic: string
  }
  description: string
  category: string[]
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  mudra: string
  bandhas_involved: string[]
  mechanics: {
    default_ratio: string
    advanced_ratio: string
    nostril_focus: string
    mouth_breath: boolean
    technique?: string
  }
  impact: {
    chakras: {
      primary: string
      secondary: string[]
    }
    ayurveda: {
      dosha_impact: string
      guna: string
    }
    physical: string[]
    mental: string[]
  }
  safety: {
    contraindications: string[]
    retention_warnings: string[]
  }
  cueing: {
    summary: string[]
    foundation: string
    hand_position: string
    breath_instruction: string
    forbidden_words: string[]
    elevated_vocabulary: Array<{
      basic: string
      elevated: string
    }>
  }
}

export interface PranayamaMetadata {
  id: string
  title: string
  category: string[]
  description?: string
  sanskritName?: string
}
