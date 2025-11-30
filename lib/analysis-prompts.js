export const codeReviewPrompt = (code, language) => {
  return `You are an expert code reviewer. Analyze the following ${language} code in detail and provide a comprehensive review.

CODE:
\`\`\`${language}
${code}
\`\`\`

Provide your analysis in JSON format ONLY, with no additional text. Use exactly this structure:
{
  "score": <number 0-100>,
  "summary": "<brief overall assessment>",
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "title": "<issue title>",
      "description": "<detailed description>",
      "line": "<approximate line or area>",
      "suggestion": "<how to fix it>"
    }
  ],
  "suggestions": [
    {
      "category": "refactoring|naming|structure|clarity",
      "title": "<suggestion title>",
      "description": "<detailed suggestion>",
      "benefit": "<why this matters>"
    }
  ],
  "performance": [
    {
      "title": "<performance issue>",
      "description": "<detailed explanation>",
      "impact": "high|medium|low",
      "recommendation": "<how to optimize>"
    }
  ],
  "security": [
    {
      "title": "<security concern>",
      "description": "<detailed explanation>",
      "risk": "critical|high|medium|low",
      "mitigation": "<how to fix>"
    }
  ],
  "bestPractices": [
    {
      "title": "<best practice>",
      "description": "<explanation>"
    }
  ]
}

Analyze every statement, function, and logic flow. Be specific and actionable.`
}

export const docGenerationPrompt = (code, language) => {
  return `You are an expert technical documentation writer. Generate comprehensive professional documentation for the following ${language} code.

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
}
