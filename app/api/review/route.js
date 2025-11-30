// import { Groq } from "groq-sdk"

// export async function POST(request) {
//   try {
//     const { code, language } = await request.json()

//     if (!code || !code.trim()) {
//       return Response.json({ error: "Code is required" }, { status: 400 })
//     }

//     const apiKey = process.env.GROQ_API_KEY
//     if (!apiKey) {
//       console.error("[v0] GROQ_API_KEY not found in environment")
//       return Response.json({ error: "API key not configured" }, { status: 500 })
//     }

//     const groq = new Groq({ apiKey })

//     const prompt = `You are an expert code reviewer. Analyze the following ${language} code in detail and provide a comprehensive review.

// CODE:
// \`\`\`${language}
// ${code}
// \`\`\`

// Analyze every statement, function, and logic flow. Be specific and actionable.

// Provide your analysis in JSON format ONLY, with no additional text. Use exactly this structure:
// {
//   "score": <number 0-100>,
//   "summary": "<brief overall assessment>",
//   "issues": [
//     {
//       "severity": "critical|high|medium|low",
//       "title": "<issue title>",
//       "description": "<detailed description>",
//       "line": "<approximate line or area>",
//       "suggestion": "<how to fix it>"
//     }
//   ],
//   "suggestions": [
//     {
//       "category": "refactoring|naming|structure|clarity",
//       "title": "<suggestion title>",
//       "description": "<detailed suggestion>",
//       "benefit": "<why this matters>"
//     }
//   ],
//   "performance": [
//     {
//       "title": "<performance issue>",
//       "description": "<detailed explanation>",
//       "impact": "high|medium|low",
//       "recommendation": "<how to optimize>"
//     }
//   ],
//   "security": [
//     {
//       "title": "<security concern>",
//       "description": "<detailed explanation>",
//       "risk": "critical|high|medium|low",
//       "mitigation": "<how to fix>"
//     }
//   ],
//   "bestPractices": [
//     {
//       "title": "<best practice>",
//       "description": "<explanation>"
//     }
//   ]
// }`

//     console.log("[v0] Sending request to Groq API")

//     const message = await groq.chat.completions.create({
//       model: "llama-3.1-70b-versatile",
//       max_tokens: 4000,
//       messages: [
//         {07
//           role: "user",
//           content: prompt,
//         },
//       ],
//     })

//     console.log("[v0] Groq response received")

//     const responseText = message.choices[0]?.message?.content || ""

//     if (!responseText) {
//       console.error("[v0] Empty response from Groq")
//       return Response.json({ error: "Empty response from AI" }, { status: 500 })
//     }

//     // Parse JSON response from Groq
//     const jsonMatch = responseText.match(/\{[\s\S]*\}/)
//     if (!jsonMatch) {
//       console.error("[v0] Failed to extract JSON from response:", responseText.substring(0, 200))
//       return Response.json({ error: "Failed to parse analysis response" }, { status: 500 })
//     }

//     const analysis = JSON.parse(jsonMatch[0])
//     console.log("[v0] Analysis parsed successfully")
//     return Response.json(analysis)
//   } catch (error) {
//     console.error("[v0] Review API error:", error.message)
//     return Response.json({ error: error.message || "Failed to analyze code" }, { status: 500 })
//   }
// }




















import { Groq } from "groq-sdk"

export async function POST(request) {
  try {
    const { code, language } = await request.json()

    if (!code || !code.trim()) {
      return Response.json({ error: "Code is required" }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("[v0] GROQ_API_KEY not found in environment")
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const groq = new Groq({ apiKey })

    const prompt = `You are an expert code reviewer. Analyze the following ${language} code in detail and provide a comprehensive review.

CODE:
\`\`\`${language}
${code}
\`\`\`

Analyze every statement, function, and logic flow. Be specific and actionable.

Provide your analysis in JSON format ONLY, with no additional text. Use exactly this structure:

{
  "score": <number 0-100>,
  "summary": "<overall assessment>",
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "title": "<issue title>",
      "description": "<detailed description>",
      "line": "<line number or range>",
      "suggestion": "<how to fix>"
    }
  ],
  "suggestions": [
    {
      "category": "refactoring|naming|structure|clarity",
      "title": "<suggestion title>",
      "description": "<detailed description>",
      "benefit": "<why this helps>"
    }
  ],
  "performance": [
    {
      "title": "<performance issue>",
      "description": "<detailed description>",
      "impact": "high|medium|low",
      "recommendation": "<how to improve>"
    }
  ],
  "security": [
    {
      "title": "<security concern>",
      "description": "<detailed description>",
      "risk": "critical|high|medium|low",
      "mitigation": "<how to fix>"
    }
  ],
  "bestPractices": [
    {
      "title": "<best practice>",
      "description": "<detailed description>"
    }
  ]
}`

    console.log("[v0] Sending request to Groq API")

    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated to currently supported model
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    console.log("[v0] Groq response received")

    const responseText = message.choices[0]?.message?.content || ""
    if (!responseText) {
      console.error("[v0] Empty response from Groq")
      return Response.json({ error: "Empty response from AI" }, { status: 500 })
    }

    // Parse JSON response from Groq
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error("[v0] Failed to extract JSON from response:", responseText.substring(0, 200))
      return Response.json({ error: "Failed to parse analysis response" }, { status: 500 })
    }

    const analysis = JSON.parse(jsonMatch[0])
    console.log("[v0] Analysis parsed successfully")

    return Response.json(analysis)
  } catch (error) {
    console.error("[v0] Review API error:", error.message)
    return Response.json(
      { error: error.message || "Failed to analyze code" },
      { status: 500 }
    )
  }
}