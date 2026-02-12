import ProjectsSection from '@/Components/Projects/projects-section'
import { getProjects } from '@/lib/data'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return <ProjectsSection projects={projects} />
}