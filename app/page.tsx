import Hero from "@/Components/Hero/hero";
import ProjectsSection from "@/Components/Projects/projects-section";
import { getFeaturedProjects } from "@/lib/data";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return ( 
    <div>
      <Hero/>
      <ProjectsSection projects={featuredProjects} />
    </div>
  
  );
}
