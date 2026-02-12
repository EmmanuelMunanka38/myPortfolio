import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

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

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readingTime: number
  tags: string[]
  featured: boolean
  coverImage: string
}

function saveProjects(projects: Project[]): { success: boolean; error?: string } {
  try {
    const fullPath = path.join(dataDirectory, 'projects.json')
    fs.writeFileSync(fullPath, JSON.stringify(projects, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving projects:', error)
    return { success: false, error: String(error) }
  }
}

function saveBlogPosts(posts: BlogPost[]): { success: boolean; error?: string } {
  try {
    const fullPath = path.join(dataDirectory, 'blog.json')
    fs.writeFileSync(fullPath, JSON.stringify(posts, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving blog posts:', error)
    return { success: false, error: String(error) }
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const fullPath = path.join(dataDirectory, 'projects.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as Project[]
  } catch (error) {
    return []
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fullPath = path.join(dataDirectory, 'blog.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as BlogPost[]
  } catch (error) {
    return []
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const projects = await getProjects()
    const newProject: Project = {
      ...project,
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    projects.push(newProject)
    const result = saveProjects(projects)
    if (result.success) {
      return { success: true, id: newProject.id }
    }
    return { success: false, error: result.error }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<{ success: boolean; error?: string }> {
  try {
    const projects = await getProjects()
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) {
      return { success: false, error: 'Project not found' }
    }
    projects[index] = { ...projects[index], ...updates }
    return saveProjects(projects)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const projects = await getProjects()
    const filtered = projects.filter(p => p.id !== id)
    if (filtered.length === projects.length) {
      return { success: false, error: 'Project not found' }
    }
    return saveProjects(filtered)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function addBlogPost(post: Omit<BlogPost, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const posts = await getBlogPosts()
    const newPost: BlogPost = {
      ...post,
      id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    posts.push(newPost)
    const result = saveBlogPosts(posts)
    if (result.success) {
      return { success: true, id: newPost.id }
    }
    return { success: false, error: result.error }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<{ success: boolean; error?: string }> {
  try {
    const posts = await getBlogPosts()
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) {
      return { success: false, error: 'Blog post not found' }
    }
    posts[index] = { ...posts[index], ...updates }
    return saveBlogPosts(posts)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const posts = await getBlogPosts()
    const filtered = posts.filter(p => p.id !== id)
    if (filtered.length === posts.length) {
      return { success: false, error: 'Blog post not found' }
    }
    return saveBlogPosts(filtered)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function replaceAllProjects(projects: Project[]): Promise<{ success: boolean; error?: string }> {
  try {
    return saveProjects(projects)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function replaceAllBlogPosts(posts: BlogPost[]): Promise<{ success: boolean; error?: string }> {
  try {
    return saveBlogPosts(posts)
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
