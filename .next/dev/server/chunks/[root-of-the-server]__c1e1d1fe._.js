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
"[project]/Downloads/ai-code-reviewer/app/api/docs/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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

Make the documentation clear, well-structured, and professional. Include code examples where relevant.`;
        console.log("[v0] Sending docs request to Groq API");
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
        console.log("[v0] Groq docs response received");
        const markdown = message.choices[0]?.message?.content || "";
        if (!markdown) {
            console.error("[v0] Empty docs response from Groq");
            return Response.json({
                error: "Empty response from AI"
            }, {
                status: 500
            });
        }
        return Response.json({
            markdown
        });
    } catch (error) {
        console.error("[v0] Docs API error:", error.message);
        return Response.json({
            error: error.message || "Failed to generate documentation"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c1e1d1fe._.js.map