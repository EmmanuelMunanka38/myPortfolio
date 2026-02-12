import { notFound } from 'next/navigation'
import BlogPostContent from '@/Components/Blog/blog-post'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
  }) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostContent post={post} />
}