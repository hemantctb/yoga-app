import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Asana, AsanaMetadata } from '@/types/asana'

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge')
const POSES_DIR = path.join(KNOWLEDGE_DIR, 'poses')
const MANIFEST_PATH = path.join(KNOWLEDGE_DIR, 'manifest.json')

export async function getAllAsanas(): Promise<AsanaMetadata[]> {
  try {
    const manifestData = fs.readFileSync(MANIFEST_PATH, 'utf8')
    const manifest = JSON.parse(manifestData)
    const poses = manifest.poses || []

    // Enrich with descriptions and Sanskrit names from markdown files
    return poses.map((pose: AsanaMetadata) => {
      try {
        const filePath = path.join(POSES_DIR, `${pose.id}.md`)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        return {
          ...pose,
          description: data.description || undefined,
          sanskritName: data.names?.sanskrit || undefined,
        }
      } catch {
        return pose
      }
    })
  } catch (error) {
    console.error('Error loading manifest:', error)
    return []
  }
}

export async function getAsanaById(id: string): Promise<Asana | null> {
  try {
    const filePath = path.join(POSES_DIR, `${id}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as Asana
  } catch (error) {
    console.error(`Error loading asana ${id}:`, error)
    return null
  }
}

export async function getAsanasByCategory(category: string): Promise<AsanaMetadata[]> {
  const allAsanas = await getAllAsanas()
  return allAsanas.filter(asana =>
    asana.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
  )
}

export function getCategories(): string[] {
  return [
    'standing',
    'seated',
    'arm-balance',
    'backbend',
    'forward-bend',
    'hip-opener',
    'inversion',
    'twist',
    'core',
    'restorative',
    'supine',
    'prone',
  ]
}

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
  }
  return names[category] || category
}
