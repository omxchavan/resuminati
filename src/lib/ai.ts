import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});

export async function callAI(
    systemPrompt: string,
    userPrompt: string,
    jsonMode: boolean = true
): Promise<string> {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 4096,
            ...(jsonMode && { response_format: { type: "json_object" } }),
        });

        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("AI call failed:", error);
        throw new Error("AI analysis failed. Please try again.");
    }
}

export default groq;
