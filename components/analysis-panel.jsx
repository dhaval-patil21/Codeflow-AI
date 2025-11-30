"use client"

import { ChevronDown, AlertCircle, Zap, Lock, Lightbulb } from "lucide-react"
import { useState } from "react"

const severityColors = {
  critical: "bg-red-100 text-red-800 border-red-300",
  high: "bg-orange-100 text-orange-800 border-orange-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-blue-100 text-blue-800 border-blue-300",
}

const getSeverityBadge = (severity) => {
  const baseClass = "px-3 py-1 text-xs font-medium rounded-full border"
  return severityColors[severity] || severityColors.low
}

export default function AnalysisPanel({ analysis, isLoading }) {
  const [expandedSections, setExpandedSections] = useState({})

  if (isLoading) {
    return (
      <div className="p-8 bg-card rounded-lg border border-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your code with AI...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="p-8 bg-card rounded-lg border border-border border-dashed text-center text-muted-foreground">
        Run a review to see detailed analysis results
      </div>
    )
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sections = [
    {
      title: "Issues",
      key: "issues",
      items: analysis.issues || [],
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Suggestions",
      key: "suggestions",
      items: analysis.suggestions || [],
      icon: Lightbulb,
      color: "text-blue-600",
    },
    {
      title: "Performance",
      key: "performance",
      items: analysis.performance || [],
      icon: Zap,
      color: "text-orange-600",
    },
    {
      title: "Security",
      key: "security",
      items: analysis.security || [],
      icon: Lock,
      color: "text-purple-600",
    },
  ]

  const hasBestPractices = analysis.bestPractices && analysis.bestPractices.length > 0

  return (
    <div className="space-y-4">
      {/* Score Card */}
      {analysis.score && (
        <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Code Quality Score</p>
              <p className="text-3xl font-bold">{analysis.score}/100</p>
              {analysis.summary && <p className="text-xs text-muted-foreground mt-2">{analysis.summary}</p>}
            </div>
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ${analysis.score >= 80 ? "shadow-lg" : ""}`}
            >
              <span className="text-white font-bold text-2xl">{analysis.score}</span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Sections */}
      {sections.map((section) => {
        const Icon = section.icon
        return (
          <div key={section.key} className="border border-border rounded-lg overflow-hidden bg-card">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${section.color}`} />
                <span className="font-semibold">{section.title}</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">{section.items.length}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections[section.key] ? "rotate-180" : ""}`}
              />
            </button>

            {expandedSections[section.key] && (
              <div className="border-t border-border px-6 py-4 space-y-3 bg-secondary/10">
                {section.items.length > 0 ? (
                  section.items.map((item, idx) => (
                    <div key={idx} className="p-4 bg-card rounded-lg border border-border/50 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.title || item}</p>
                          {(item.severity || item.risk || item.impact) && (
                            <div className="mt-1">
                              <span
                                className={`inline-block ${getSeverityBadge(item.severity || item.risk || item.impact)}`}
                              >
                                {item.severity || item.risk || item.impact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                      {item.line && <p className="text-xs text-secondary-foreground">Line: {item.line}</p>}
                      {(item.suggestion || item.recommendation || item.mitigation || item.benefit) && (
                        <div className="p-3 bg-primary/5 rounded border border-primary/20">
                          <p className="text-xs font-medium text-primary mb-1">Action:</p>
                          <p className="text-xs text-muted-foreground">
                            {item.suggestion || item.recommendation || item.mitigation || item.benefit}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm py-4">No {section.title.toLowerCase()} found</p>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Best Practices Section */}
      {hasBestPractices && (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <button
            onClick={() => toggleSection("bestPractices")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Best Practices</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                {analysis.bestPractices.length}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.bestPractices ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSections.bestPractices && (
            <div className="border-t border-border px-6 py-4 space-y-3 bg-green-50/30">
              {analysis.bestPractices.map((practice, idx) => (
                <div key={idx} className="p-4 bg-card rounded-lg border border-green-200/50">
                  <p className="font-semibold text-sm text-green-700">{practice.title}</p>
                  {practice.description && <p className="text-xs text-muted-foreground mt-1">{practice.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
