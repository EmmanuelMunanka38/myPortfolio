import { NextRequest, NextResponse } from 'next/server'
import { getProjects, addProject, updateProject, deleteProject, replaceAllProjects, Project } from '@/lib/admin-data'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.action === 'replaceAll') {
      const result = await replaceAllProjects(body.projects as Project[])
      if (result.success) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    if (body.id) {
      const result = await updateProject(body.id, body)
      if (result.success) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    const result = await addProject(body)
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
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }
    
    const result = await deleteProject(id)
    if (result.success) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: result.error }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
