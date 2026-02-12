import AboutSection from '@/Components/About/about-section'
import { getAboutData } from '@/lib/data'

export default async function AboutPage() {
  const data = await getAboutData()
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">About data not found.</p>
      </div>
    )
  }

  return <AboutSection data={data} />
}