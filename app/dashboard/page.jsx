"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BarChart3, Code, FileText, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getAnalytics, getAllHistory } from "@/lib/localStorage";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const analyticsData = getAnalytics();
    setAnalytics(analyticsData);

    const history = getAllHistory();
    setRecentActivity(history.slice(0, 5));
  }, []);

  if (!mounted || !analytics) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 text-gray-900 dark:text-white">
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your code analysis statistics and recent activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium mb-1 text-gray-900 dark:text-white">
                        {activity.title || activity.type}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(
                          activity.createdAt || activity.timestamp
                        ).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded text-xs font-medium">
                      {activity.language}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No recent activity. Start a code review or generate
                  documentation.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
