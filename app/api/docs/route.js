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

//     const prompt = `You are an expert technical documentation writer. Generate comprehensive professional documentation for the following ${language} code.

// CODE:
// \`\`\`${language}
// ${code}
// \`\`\`

// Generate complete markdown documentation with these sections:
// - Overview and purpose
// - Installation/Setup instructions
// - API Reference (all functions/methods with parameters and return types)
// - Usage Examples
// - Best Practices
// - Error Handling
// - Performance Considerations
// - Security Notes (if applicable)
// - Contributing Guidelines
// - License

// Make the documentation clear, well-structured, and professional. Include code examples where relevant.`

//     console.log("[v0] Sending docs request to Groq API")

//     const message = await groq.chat.completions.create({
//       model: "llama-3.1-70b-versatile",
//       max_tokens: 4000,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     })

//     console.log("[v0] Groq docs response received")

//     const markdown = message.choices[0]?.message?.content || ""

//     if (!markdown) {
//       console.error("[v0] Empty docs response from Groq")
//       return Response.json({ error: "Empty response from AI" }, { status: 500 })
//     }

//     return Response.json({ markdown })
//   } catch (error) {
//     console.error("[v0] Docs API error:", error.message)
//     return Response.json({ error: error.message || "Failed to generate documentation" }, { status: 500 })
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

    const prompt = `You are an expert technical documentation writer. Generate comprehensive professional documentation for the following ${language} code.

CODE:
\`\`\`${language}
${code}
\`\`\`

Generate complete markdown documentation with these sections:
- Overview and purpose
- Installation/Setup instructions
- API Reference (all functions/methods with parameters and return types)
- Usage Examples
- Best Practices
- Error Handling
- Performance Considerations
- Security Notes (if applicable)
- Contributing Guidelines
- License

Make the documentation clear, well-structured, and professional. Include code examples where relevant.`

    console.log("[v0] Sending docs request to Groq API")

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

    console.log("[v0] Groq docs response received")

    const markdown = message.choices[0]?.message?.content || ""

    if (!markdown) {
      console.error("[v0] Empty docs response from Groq")
      return Response.json({ error: "Empty response from AI" }, { status: 500 })
    }

    return Response.json({ markdown })
  } catch (error) {
    console.error("[v0] Docs API error:", error.message)
    return Response.json({ error: error.message || "Failed to generate documentation" }, { status: 500 })
  }
}