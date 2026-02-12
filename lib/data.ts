import fs from 'fs'
import path from 'path'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  category: string
  completionDate: string
  client: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
}

export interface AboutData {
  bio: {
    title: string
    subtitle: string
    description: string
    image: string
  }
  story: {
    title: string
    content: string
  }
  experience: Experience[]
  education: Array<{
    id: string
    degree: string
    institution: string
    period: string
    description: string
    achievements: string[]
  }>
  skills: {
    technical: Array<{
      category: string
      items: Array<{ name: string; level: number }>
    }>
    leadership: string[]
  }
  achievements: Array<{
    title: string
    description: string
    year: string
    type: string
  }>
  values: Array<{
    title: string
    description: string
  }>
}

const dataDirectory = path.join(process.cwd(), 'data')

export async function getProjects(): Promise<Project[]> {
  try {
    const fullPath = path.join(dataDirectory, 'projects.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as Project[]
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter(project => project.featured)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(project => project.id === slug) || null
}

export async function getAboutData(): Promise<AboutData | null> {
  try {
    const fullPath = path.join(dataDirectory, 'about.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as AboutData
  } catch (error) {
    console.error('Error reading about data:', error)
    return null
  }
}
