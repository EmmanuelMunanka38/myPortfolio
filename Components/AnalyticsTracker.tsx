'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnalyticsData {
  totalVisitors: number
  uniqueVisitors: number
  pageViews: Record<string, number>
  recentVisits: Array<{
    timestamp: string
    page: string
  }>
}

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const trackVisit = () => {
      try {
        const analyticsKey = 'portfolio_analytics'
        const stored = localStorage.getItem(analyticsKey)
        
        let analytics: AnalyticsData = {
          totalVisitors: 0,
          uniqueVisitors: 0,
          pageViews: {},
          recentVisits: []
        }

        if (stored) {
          analytics = JSON.parse(stored)
        }

        const visitorId = localStorage.getItem('portfolio_visitor_id') || 
          `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        if (!localStorage.getItem('portfolio_visitor_id')) {
          localStorage.setItem('portfolio_visitor_id', visitorId)
          analytics.uniqueVisitors++
        }

        analytics.totalVisitors++

        const pageName = pathname || '/'
        analytics.pageViews[pageName] = (analytics.pageViews[pageName] || 0) + 1

        analytics.recentVisits.unshift({
          timestamp: new Date().toISOString(),
          page: pageName
        })

        analytics.recentVisits = analytics.recentVisits.slice(0, 100)

        localStorage.setItem(analyticsKey, JSON.stringify(analytics))
      } catch (error) {
        console.error('Analytics tracking error:', error)
      }
    }

    trackVisit()
  }, [pathname])

  return null
}
