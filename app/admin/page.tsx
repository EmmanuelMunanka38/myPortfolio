'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, Plus, Trash2, Edit, Eye, Package, User, Settings,
  BarChart3, Github, RefreshCw, X, Check, AlertCircle, ExternalLink,
  TrendingUp, Users, Eye as ViewIcon, Clock
} from 'lucide-react'

interface Project {
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

interface GitHubRepo {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  category: string
  client: string
  stars: number
  forks: number
}

interface AnalyticsData {
  totalVisitors: number
  uniqueVisitors: number
  pageViews: Record<string, number>
  recentVisits: Array<{
    timestamp: string
    page: string
  }>
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'analytics'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [githubUsername, setGithubUsername] = useState('')
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set())
  const [isLoadingGithub, setIsLoadingGithub] = useState(false)
  
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    uniqueVisitors: 0,
    pageViews: {},
    recentVisits: []
  })

  useEffect(() => {
    loadData()
    loadAnalytics()
  }, [activeTab])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const projectsRes = await fetch('/api/admin/projects')
      const projectsData = await projectsRes.json()
      
      if (Array.isArray(projectsData)) setProjects(projectsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAnalytics = () => {
    try {
      const stored = localStorage.getItem('portfolio_analytics')
      if (stored) {
        setAnalytics(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
  }

  const fetchGitHubRepos = async () => {
    if (!githubUsername.trim()) {
      showMessage('error', 'Please enter a GitHub username')
      return
    }
    
    setIsLoadingGithub(true)
    try {
      const response = await fetch(`/api/admin/github?username=${encodeURIComponent(githubUsername)}`)
      const data = await response.json()
      
      if (response.ok) {
        setGithubRepos(data)
        setSelectedRepos(new Set())
        showMessage('success', `Found ${data.length} repositories`)
      } else {
        showMessage('error', data.error || 'Failed to fetch GitHub repos')
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch GitHub repositories')
    } finally {
      setIsLoadingGithub(false)
    }
  }

  const importSelectedRepos = async () => {
    if (selectedRepos.size === 0) {
      showMessage('error', 'Please select at least one repository')
      return
    }
    
    setIsLoading(true)
    try {
      const reposToImport = githubRepos
        .filter(repo => selectedRepos.has(repo.id))
        .map(repo => ({
          ...repo,
          id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          featured: false,
          completionDate: new Date().toISOString().split('T')[0],
          longDescription: repo.description || ''
        }))
      
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'replaceAll', projects: [...projects, ...reposToImport] })
      })
      
      if (response.ok) {
        showMessage('success', `Imported ${reposToImport.length} projects from GitHub`)
        setGithubRepos([])
        setSelectedRepos(new Set())
        setGithubUsername('')
        loadData()
      } else {
        showMessage('error', 'Failed to import projects')
      }
    } catch (error) {
      showMessage('error', 'Failed to import projects')
    } finally {
      setIsLoading(false)
    }
  }

  const saveProject = async (project: Partial<Project>) => {
    setIsLoading(true)
    try {
      const method = project.id && !String(project.id).startsWith('new_') ? 'POST' : 'POST'
      const body = project.id && !String(project.id).startsWith('new_') 
        ? { ...project, id: project.id }
        : project
      
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      if (response.ok) {
        showMessage('success', 'Project saved successfully')
        setEditingProject(null)
        loadData()
      } else {
        showMessage('error', 'Failed to save project')
      }
    } catch (error) {
      showMessage('error', 'Failed to save project')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        showMessage('success', 'Project deleted successfully')
        loadData()
      } else {
        showMessage('error', 'Failed to delete project')
      }
    } catch (error) {
      showMessage('error', 'Failed to delete project')
    } finally {
      setIsLoading(false)
    }
  }

  const clearAllProjects = async () => {
    if (!confirm('Are you sure you want to delete ALL projects? This cannot be undone.')) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'replaceAll', projects: [] })
      })
      
      if (response.ok) {
        showMessage('success', 'All projects deleted')
        loadData()
      } else {
        showMessage('error', 'Failed to clear projects')
      }
    } catch (error) {
      showMessage('error', 'Failed to clear projects')
    } finally {
      setIsLoading(false)
    }
  }

  const ProjectForm: React.FC<{ project?: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [formData, setFormData] = useState<Partial<Project>>(
      project || {
        id: `new_${Date.now()}`,
        title: '',
        description: '',
        longDescription: '',
        image: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
        category: '',
        completionDate: new Date().toISOString().split('T')[0],
        client: ''
      }
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      saveProject(formData)
      onClose()
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea
            value={formData.longDescription || ''}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <input
              type="text"
              value={formData.client || ''}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
            <input
              type="date"
              value={formData.completionDate || ''}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
          <input
            type="text"
            value={(formData.technologies || []).join(', ')}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            placeholder="React, Next.js, TypeScript"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured || false}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
            id="featured"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Project</label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center ${
              message.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {message.type === 'success' ? <Check className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Projects</span>
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </nav>
          </div>

          {activeTab === 'projects' && (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setEditingProject({} as Project)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </button>
                <button
                  onClick={clearAllProjects}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Projects
                </button>
              </div>

              {editingProject !== null && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {editingProject.id && !String(editingProject.id).startsWith('new_') ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <button onClick={() => setEditingProject(null)} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ProjectForm project={editingProject.id ? editingProject : undefined} onClose={() => setEditingProject(null)} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                      {project.featured && (
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Featured</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tech}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{project.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              {projects.length === 0 && !editingProject && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No projects yet. Add one or import from GitHub.</p>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Github className="w-6 h-6 mr-2" />
                  Import from GitHub
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                  />
                  <button
                    onClick={fetchGitHubRepos}
                    disabled={isLoadingGithub}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 flex items-center"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingGithub ? 'animate-spin' : ''}`} />
                    Fetch Repos
                  </button>
                </div>

                {githubRepos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-600">{selectedRepos.size} of {githubRepos.length} selected</p>
                      <button
                        onClick={importSelectedRepos}
                        disabled={selectedRepos.size === 0 || isLoading}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Import Selected
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {githubRepos.map((repo) => (
                        <div
                          key={repo.id}
                          className={`p-3 border rounded-lg cursor-pointer transition ${
                            selectedRepos.has(repo.id) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            const newSelected = new Set(selectedRepos)
                            if (newSelected.has(repo.id)) {
                              newSelected.delete(repo.id)
                            } else {
                              newSelected.add(repo.id)
                            }
                            setSelectedRepos(newSelected)
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{repo.title}</h4>
                              <p className="text-sm text-gray-600 line-clamp-1">{repo.description || 'No description'}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{repo.stars} stars</span>
                                <span>{repo.forks} forks</span>
                                <span>{repo.category || 'Unknown'}</span>
                              </div>
                            </div>
                            {selectedRepos.has(repo.id) && (
                              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-600">Total Visitors</p>
                      <p className="text-2xl font-bold text-emerald-900">{analytics.totalVisitors}</p>
                    </div>
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Unique Visitors</p>
                      <p className="text-2xl font-bold text-blue-900">{analytics.uniqueVisitors}</p>
                    </div>
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Total Page Views</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {Object.values(analytics.pageViews).reduce((a, b) => a + b, 0)}
                      </p>
                    </div>
                    <ViewIcon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">Recent Visits</p>
                      <p className="text-2xl font-bold text-orange-900">{analytics.recentVisits.length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.pageViews).map(([page, views]) => (
                    <div key={page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{page}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (views / Math.max(...Object.values(analytics.pageViews))) * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{views}</span>
                      </div>
                    </div>
                  ))}
                  {Object.keys(analytics.pageViews).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No page view data yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {analytics.recentVisits.slice(0, 20).map((visit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                      <span className="text-gray-700">{visit.page}</span>
                      <span className="text-gray-500">{new Date(visit.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {analytics.recentVisits.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No recent visits</p>
                  )}
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Analytics Note</h4>
                <p className="text-sm text-blue-800">
                  This analytics data is stored in localStorage and will only track visits from the same browser. 
                  For production, consider integrating a proper analytics service like Google Analytics, Plausible, or a custom backend solution.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
