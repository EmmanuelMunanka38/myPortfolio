import { NextRequest, NextResponse } from 'next/server'

interface HackerNewsItem {
  id: number
  title: string
  url: string
  by: string
  time: number
  score: number
  descendants: number
  type: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type') || 'topstories'

    let storyIds: number[]

    const response = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json`)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch Hacker News stories' }, { status: 500 })
    }
    
    storyIds = await response.json()

    const limitedIds = storyIds.slice(0, limit)

    const stories = await Promise.all(
      limitedIds.map(async (id: number) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        const story: HackerNewsItem = await storyResponse.json()
        
        return {
          id: `hn_${story.id}`,
          title: story.title,
          slug: story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          excerpt: `Score: ${story.score} | ${story.descendants || 0} comments`,
          content: `Source: Hacker News\nURL: ${story.url || `https://news.ycombinator.com/item?id=${story.id}`}\nAuthor: ${story.by}\nScore: ${story.score}`,
          author: story.by,
          publishedAt: new Date(story.time * 1000).toISOString(),
          readingTime: Math.ceil((story.title.length + 200) / 200),
          tags: ['Hacker News', story.type],
          featured: false,
          coverImage: `https://hacker-news.firebaseio.com/v0/item/${story.id}.json`,
          url: story.url,
          hnId: story.id,
          score: story.score,
          comments: story.descendants || 0,
        }
      })
    )

    return NextResponse.json(stories)
  } catch (error) {
    console.error('Hacker News API error:', error)
    return NextResponse.json({ error: 'Failed to fetch Hacker News stories' }, { status: 500 })
  }
}
