import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, replaceAllBlogPosts, BlogPost } from '@/lib/admin-data'

export async function GET() {
  try {
    const posts = await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.action === 'replaceAll') {
      const result = await replaceAllBlogPosts(body.posts as BlogPost[])
      if (result.success) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    if (body.id) {
      const result = await updateBlogPost(body.id, body)
      if (result.success) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    const result = await addBlogPost(body)
    if (result.success) {
      return NextResponse.json({ success: true, id: result.id })
    }
    return NextResponse.json({ error: result.error }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Blog post ID required' }, { status: 400 })
    }
    
    const result = await deleteBlogPost(id)
    if (result.success) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: result.error }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
