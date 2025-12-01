
"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BarChart3, Code, FileText, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { getAnalytics, getAllHistory } from "@/lib/localStorage"

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const analyticsData = getAnalytics()
    setAnalytics(analyticsData)

    const history = getAllHistory()
    setRecentActivity(history.slice(0, 5))
  }, [])

  if (!mounted || !analytics) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  const stats = [
    {
      icon: Code,
      label: "Code Reviews",
      value: analytics.totalReviews.toString(),
      change: analytics.totalReviews > 0 ? "+100%" : "0%",
    },
    {
      icon: FileText,
      label: "Docs Generated",
      value: analytics.totalDocs.toString(),
      change: analytics.totalDocs > 0 ? "+100%" : "0%",
    },
    {
      icon: BarChart3,
      label: "Avg Quality Score",
      value: `${analytics.averageScore}/100`,
      change: analytics.averageScore > 70 ? "Good" : "Fair",
    },
    {
      icon: TrendingUp,
      label: "Total Analysis",
      value: analytics.totalAnalysis.toString(),
      change: analytics.totalAnalysis > 0 ? `+${analytics.totalAnalysis}` : "0",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Your code analysis statistics and recent activity</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 hover:bg-secondary/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium mb-1">{activity.title || activity.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.createdAt || activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-secondary rounded text-xs font-medium">{activity.language}</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-muted-foreground">
                  No recent activity. Start a code review or generate documentation.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
