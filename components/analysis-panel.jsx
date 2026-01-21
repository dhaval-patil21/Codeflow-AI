"use client";

import { ChevronDown, AlertCircle, Zap, Lock, Lightbulb } from "lucide-react";
import { useState } from "react";

const severityColors = {
  critical: "bg-red-100 text-red-800 border-red-300",
  high: "bg-orange-100 text-orange-800 border-orange-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-blue-100 text-blue-800 border-blue-300",
};

const getSeverityBadge = (severity) => {
  const baseClass = "px-3 py-1 text-xs font-medium rounded-full border";
  return severityColors[severity] || severityColors.low;
};

export default function AnalysisPanel({ analysis, isLoading }) {
  const [expandedSections, setExpandedSections] = useState({});

  if (isLoading) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Analyzing your code with AI...
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 border-dashed text-center text-gray-500 dark:text-gray-400">
        Run a review to see detailed analysis results
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
  ];

  const hasBestPractices =
    analysis.bestPractices && analysis.bestPractices.length > 0;

  return (
    <div className="space-y-4">
      {/* Score Card */}
      {analysis.score && (
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                Code Quality Score
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analysis.score}/100
              </p>
              {analysis.summary && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {analysis.summary}
                </p>
              )}
            </div>
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 flex items-center justify-center ${
                analysis.score >= 80 ? "shadow-lg" : ""
              }`}
            >
              <span className="text-white dark:text-gray-900 font-bold text-2xl">
                {analysis.score}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Sections */}
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div
            key={section.key}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
          >
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${section.color}`} />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-xs font-medium">
                  {section.items.length}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-900 dark:text-white transition-transform ${
                  expandedSections[section.key] ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections[section.key] && (
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3 bg-gray-50/50 dark:bg-gray-800/50">
                {section.items.length > 0 ? (
                  section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200/50 dark:border-gray-700/50 space-y-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">
                            {item.title || item}
                          </p>
                          {(item.severity || item.risk || item.impact) && (
                            <div className="mt-1">
                              <span
                                className={`inline-block ${getSeverityBadge(
                                  item.severity || item.risk || item.impact
                                )}`}
                              >
                                {item.severity || item.risk || item.impact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      )}
                      {item.line && (
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          Line: {item.line}
                        </p>
                      )}
                      {(item.suggestion ||
                        item.recommendation ||
                        item.mitigation ||
                        item.benefit) && (
                        <div className="p-3 bg-gray-900/5 dark:bg-white/5 rounded border border-gray-900/20 dark:border-white/20">
                          <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                            Action:
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.suggestion ||
                              item.recommendation ||
                              item.mitigation ||
                              item.benefit}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm py-4">
                    No {section.title.toLowerCase()} found
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Best Practices Section */}
      {hasBestPractices && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
          <button
            onClick={() => toggleSection("bestPractices")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Best Practices
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-xs font-medium">
                {analysis.bestPractices.length}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-900 dark:text-white transition-transform ${
                expandedSections.bestPractices ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.bestPractices && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3 bg-green-50/30 dark:bg-green-900/10">
              {analysis.bestPractices.map((practice, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200/50 dark:border-green-800/50"
                >
                  <p className="font-semibold text-sm text-green-700 dark:text-green-400">
                    {practice.title}
                  </p>
                  {practice.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {practice.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
