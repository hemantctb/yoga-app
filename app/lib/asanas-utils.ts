// Client-safe utility functions for asanas
// These don't depend on Node.js modules like 'fs'

export function getCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    'standing': 'Standing',
    'seated': 'Seated',
    'arm-balance': 'Arm Balance',
    'backbend': 'Backbend',
    'forward-bend': 'Forward Bend',
    'hip-opener': 'Hip Opener',
    'inversion': 'Inversion',
    'twist': 'Twist',
    'core': 'Core',
    'restorative': 'Restorative',
    'supine': 'Supine',
    'prone': 'Prone',
  };
  return names[category] || category;
}
