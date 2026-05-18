import os
from groq import Groq
import json

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

async def analyze_code(code: str, language: str) -> dict:
    """
    Analyze code using Groq API
    Returns analysis with score and recommendations
    """
    client = Groq(api_key=GROQ_API_KEY)
    
    prompt = f"""Analyze the following {language} code and provide a detailed review.
    
Code:
```{language}
{code}
```

Please provide:
1. Overall code quality score (0-100)
2. Strengths of the code
3. Areas for improvement
4. Specific recommendations
5. Best practices that should be applied

Format your response as JSON with keys: score, strengths, improvements, recommendations, best_practices"""

    try:
        message = client.messages.create(
            model="mixtral-8x7b-32768",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        response_text = message.content[0].text
        
        # Try to parse as JSON
        try:
            analysis = json.loads(response_text)
        except json.JSONDecodeError:
            # If not valid JSON, create structured response
            analysis = {
                "raw_analysis": response_text,
                "score": 75,
                "strengths": [],
                "improvements": [],
                "recommendations": [response_text],
                "best_practices": []
            }
        
        return analysis
    except Exception as e:
        return {
            "error": str(e),
            "score": 0,
            "strengths": [],
            "improvements": ["Unable to analyze code"],
            "recommendations": [],
            "best_practices": []
        }

async def generate_documentation(code: str, language: str) -> str:
    """
    Generate documentation for code using Groq API
    """
    client = Groq(api_key=GROQ_API_KEY)
    
    prompt = f"""Generate comprehensive documentation for the following {language} code.
    
Code:
```{language}
{code}
```

Please provide:
1. Function/Class descriptions
2. Parameter documentation
3. Return value descriptions
4. Usage examples
5. Notes and important information

Format as clean markdown."""

    try:
        message = client.messages.create(
            model="mixtral-8x7b-32768",
            max_tokens=2048,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        return message.content[0].text
    except Exception as e:
        return f"Error generating documentation: {str(e)}"
