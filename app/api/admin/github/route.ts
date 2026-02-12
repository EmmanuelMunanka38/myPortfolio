import { NextRequest, NextResponse } from 'next/server'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  created_at: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 })
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'GitHub user not found' }, { status: 404 })
      }
      return NextResponse.json({ error: 'Failed to fetch GitHub repositories' }, { status: response.status })
    }

    const repos: GitHubRepo[] = await response.json()

    const formattedRepos = repos.map(repo => ({
      id: `gh_${repo.id}`,
      title: repo.name,
      description: repo.description || '',
      longDescription: repo.description || '',
      image: `https://opengraph.githubassets.com/${repo.id}/${username}/${repo.name}`,
      technologies: repo.language ? [repo.language] : [],
      liveUrl: repo.homepage || '',
      githubUrl: repo.html_url,
      featured: false,
      category: repo.language || 'Other',
      completionDate: repo.created_at.split('T')[0],
      client: username,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
    }))

    return NextResponse.json(formattedRepos)
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub repositories' }, { status: 500 })
  }
}
