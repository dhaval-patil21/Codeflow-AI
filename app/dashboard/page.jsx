"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BarChart3, Code, FileText, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { icon: Code, label: "Code Reviews", value: "24", change: "+12%" },
    { icon: FileText, label: "Docs Generated", value: "18", change: "+8%" },
    { icon: BarChart3, label: "Avg Quality Score", value: "82/100", change: "+5%" },
    { icon: TrendingUp, label: "Total Analysis", value: "42", change: "+20%" },
  ]

  const recentActivity = [
    { type: "review", title: "React Component Review", time: "2 hours ago", language: "jsx" },
    { type: "docs", title: "API Documentation Generated", time: "5 hours ago", language: "typescript" },
    { type: "review", title: "Python Script Analysis", time: "1 day ago", language: "python" },
    { type: "docs", title: "README Documentation", time: "2 days ago", language: "markdown" },
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
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="px-6 py-4 hover:bg-secondary/30 transition-colors flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium mb-1">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary rounded text-xs font-medium">{activity.language}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
