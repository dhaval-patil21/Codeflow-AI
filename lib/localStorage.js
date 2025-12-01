const STORAGE_KEYS = {
  REVIEWS: "codeflow_reviews",
  DOCS: "codeflow_docs",
  ANALYTICS: "codeflow_analytics",
}

export const getReviews = () => {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const addReview = (review) => {
  if (typeof window === "undefined") return
  const reviews = getReviews()
  const newReview = {
    id: Date.now(),
    type: "review",
    ...review,
    createdAt: new Date().toISOString(),
  }
  reviews.unshift(newReview)
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews))
  updateAnalytics("review", review)
  return newReview
}

export const getDocs = () => {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DOCS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const addDocs = (doc) => {
  if (typeof window === "undefined") return
  const docs = getDocs()
  const newDoc = {
    id: Date.now(),
    type: "docs",
    ...doc,
    createdAt: new Date().toISOString(),
  }
  docs.unshift(newDoc)
  localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs))
  updateAnalytics("docs", doc)
  return newDoc
}

export const getAnalytics = () => {
  if (typeof window === "undefined") return getDefaultAnalytics()
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS)
    return data ? JSON.parse(data) : getDefaultAnalytics()
  } catch {
    return getDefaultAnalytics()
  }
}

const getDefaultAnalytics = () => ({
  totalReviews: 0,
  totalDocs: 0,
  averageScore: 0,
  totalAnalysis: 0,
  allScores: [],
  recentActivity: [],
})

const updateAnalytics = (type, data) => {
  if (typeof window === "undefined") return
  const analytics = getAnalytics()

  if (type === "review") {
    analytics.totalReviews += 1
    analytics.allScores.push(data.score || 0)
    analytics.averageScore = Math.round(analytics.allScores.reduce((a, b) => a + b, 0) / analytics.allScores.length)
  } else if (type === "docs") {
    analytics.totalDocs += 1
  }

  analytics.totalAnalysis = analytics.totalReviews + analytics.totalDocs
  analytics.recentActivity.push({
    type,
    title: data.title || "Code Analysis",
    language: data.language,
    timestamp: new Date().toISOString(),
  })

  if (analytics.recentActivity.length > 10) {
    analytics.recentActivity = analytics.recentActivity.slice(0, 10)
  }

  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics))
}

export const deleteReview = (id) => {
  if (typeof window === "undefined") return
  const reviews = getReviews().filter((r) => r.id !== id)
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews))
}

export const deleteDocs = (id) => {
  if (typeof window === "undefined") return
  const docs = getDocs().filter((d) => d.id !== id)
  localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs))
}

export const getAllHistory = () => {
  if (typeof window === "undefined") return []
  const reviews = getReviews()
  const docs = getDocs()
  return [...reviews, ...docs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
