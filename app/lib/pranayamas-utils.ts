// Client-safe utility functions for pranayamas
// These don't depend on Node.js modules like 'fs'

export function getPranayamaCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    'balancing': 'Balancing',
    'heating': 'Heating',
    'cooling': 'Cooling',
    'cleansing': 'Cleansing',
    'restorative': 'Restorative',
    'energizing': 'Energizing',
  }
  return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

export function getMudraDisplayName(mudra: string): string {
  const names: Record<string, string> = {
    'vishnu-mudra': 'Vishnu Mudra',
    'nasagra-mudra': 'Nasagra Mudra',
    'jnana-mudra': 'Jnana Mudra',
    'chin-mudra': 'Chin Mudra',
    'adi-mudra': 'Adi Mudra',
  }
  return names[mudra] || mudra.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function getBandhaDisplayName(bandha: string): string {
  const names: Record<string, string> = {
    'jalandhara-bandha': 'Jalandhara Bandha (Throat Lock)',
    'uddiyana-bandha': 'Uddiyana Bandha (Abdominal Lock)',
    'mula-bandha': 'Mula Bandha (Root Lock)',
    'maha-bandha': 'Maha Bandha (Great Lock)',
  }
  return names[bandha] || bandha.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function getDoshaDisplayName(dosha: string): string {
  const names: Record<string, string> = {
    'vata': 'Vata',
    'pitta': 'Pitta',
    'kapha': 'Kapha',
    'tridoshic': 'Tridoshic (All Doshas)',
    'vata-calming': 'Vata Calming',
    'pitta-calming': 'Pitta Calming',
    'kapha-reducing': 'Kapha Reducing',
  }
  return names[dosha] || dosha.charAt(0).toUpperCase() + dosha.slice(1)
}

export function getGunaDisplayName(guna: string): string {
  const names: Record<string, string> = {
    'sattvic': 'Sattvic (Pure)',
    'rajasic': 'Rajasic (Active)',
    'tamasic': 'Tamasic (Inert)',
  }
  return names[guna] || guna.charAt(0).toUpperCase() + guna.slice(1)
}

export function getNostrilFocusDisplayName(focus: string): string {
  const names: Record<string, string> = {
    'alternate': 'Alternate Nostrils',
    'both-nostrils': 'Both Nostrils',
    'left-only': 'Left Nostril Only',
    'right-only': 'Right Nostril Only',
  }
  return names[focus] || focus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
