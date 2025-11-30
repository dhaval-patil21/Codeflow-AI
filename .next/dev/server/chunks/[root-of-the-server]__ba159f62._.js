module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[project]/Downloads/ai-code-reviewer/app/api/review/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ai$2d$code$2d$reviewer$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/ai-code-reviewer/node_modules/groq-sdk/index.mjs [app-route] (ecmascript) <locals>");
;
async function POST(request) {
    try {
        const { code, language } = await request.json();
        if (!code || !code.trim()) {
            return Response.json({
                error: "Code is required"
            }, {
                status: 400
            });
        }
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("[v0] GROQ_API_KEY not found in environment");
            return Response.json({
                error: "API key not configured"
            }, {
                status: 500
            });
        }
        const groq = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ai$2d$code$2d$reviewer$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Groq"]({
            apiKey
        });
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
}`;
        console.log("[v0] Sending request to Groq API");
        const message = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 4000,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        console.log("[v0] Groq response received");
        const responseText = message.choices[0]?.message?.content || "";
        if (!responseText) {
            console.error("[v0] Empty response from Groq");
            return Response.json({
                error: "Empty response from AI"
            }, {
                status: 500
            });
        }
        // Parse JSON response from Groq
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("[v0] Failed to extract JSON from response:", responseText.substring(0, 200));
            return Response.json({
                error: "Failed to parse analysis response"
            }, {
                status: 500
            });
        }
        const analysis = JSON.parse(jsonMatch[0]);
        console.log("[v0] Analysis parsed successfully");
        return Response.json(analysis);
    } catch (error) {
        console.error("[v0] Review API error:", error.message);
        return Response.json({
            error: error.message || "Failed to analyze code"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba159f62._.js.map