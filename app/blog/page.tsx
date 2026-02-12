import BlogSection from '@/Components/Blog/blog-section'
import { getBlogPosts } from '@/lib/data'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return <BlogSection posts={posts} />
}