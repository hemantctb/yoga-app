import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Pranayama, PranayamaMetadata } from '@/types/pranayama'

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge')
const PRANAYAMA_DIR = path.join(KNOWLEDGE_DIR, 'pranayama')
const MANIFEST_PATH = path.join(PRANAYAMA_DIR, 'manifest.json')

export async function getAllPranayamas(): Promise<PranayamaMetadata[]> {
  try {
    const manifestData = fs.readFileSync(MANIFEST_PATH, 'utf8')
    const manifest = JSON.parse(manifestData)
    const pranayamas = manifest.pranayamas || []

    // Enrich with descriptions and Sanskrit names from markdown files
    return pranayamas.map((pranayama: PranayamaMetadata) => {
      try {
        const filePath = path.join(PRANAYAMA_DIR, `${pranayama.id}.md`)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        return {
          ...pranayama,
          description: data.description || undefined,
          sanskritName: data.names?.sanskrit || undefined,
        }
      } catch {
        return pranayama
      }
    })
  } catch (error) {
    console.error('Error loading pranayama manifest:', error)
    return []
  }
}

export async function getPranayamaById(id: string): Promise<Pranayama | null> {
  try {
    const filePath = path.join(PRANAYAMA_DIR, `${id}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as Pranayama
  } catch (error) {
    console.error(`Error loading pranayama ${id}:`, error)
    return null
  }
}

export async function getPranayamasByCategory(category: string): Promise<PranayamaMetadata[]> {
  const allPranayamas = await getAllPranayamas()
  return allPranayamas.filter(pranayama =>
    pranayama.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
  )
}

export function getPranayamaCategories(): string[] {
  return [
    'balancing',
    'heating',
    'cooling',
    'cleansing',
    'restorative',
    'energizing',
  ]
}
