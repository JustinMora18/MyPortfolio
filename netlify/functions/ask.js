// netlify/functions/ask.js

export default async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") return new Response("", { status: 204, headers });
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Use POST" }), { status: 405, headers });

  const apiKey = process.env.OPENAI_API_KEY;
  console.log("KEY prefix:", apiKey?.slice(0, 12));
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY env var on Netlify." }), {
      status: 500,
      headers,
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), { status: 400, headers });
  }

  const question = body?.question || body?.message;
  if (!question || typeof question !== "string") {
    return new Response(JSON.stringify({ error: "Missing question" }), { status: 400, headers });
  }

  const PORTFOLIO_CONTEXT = `
Name: Justin Mora
Location: Roselle, NJ
Summary:
Justin is a Computer Science student who focuses on web development and graphic design. He’s adaptable, quick to learn, and enjoys collaborating and interacting with people. He also has strong interests in photography and creative work.
Education:
- Union College (New Jersey) — Associate of Science in Computer Science (2022–2024)
- Kean University — Bachelor of Science in Computer Science (2025–Present)
Work Experience:
1) TransCore — Clerk / Image Reviewer (2024–Present)
- Reviews and corrects AI-detected license plate data for New York’s congestion pricing system.
- Categorizes vehicle types (passenger, truck, motorcycle, emergency, government) to ensure accurate reporting.
- Edits and validates license plate images, discarding altered or unreadable entries.
- Logs invalid or missing license plate IDs into shared Excel sheets for tracking and resolution.
- Maintains high productivity and accuracy standards while working with large datasets.
2) H&M — Sales Advisor (2023–2024)
- Provided customer service on the sales floor, fitting room, and register.
- Handled register transactions and supported store inventory processing.
- Processed and organized new clothing shipments for store presentation.
- Helped with store closing operations, maintaining a clean and organized environment.
Skills:
- Web: HTML, CSS, JavaScript, React
- Programming: Java
- Tools: Git/GitHub, Excel
- Design: Photoshop, Illustrator, Figma, Procreate, Lightroom
Leadership:
- ASECU Club — Social Media Manager (design + rebrand + socials)
Projects:
- Web apps: flashcards, calculator UI, timer, portfolio concepts
- Design: branding, layouts, event visuals, print
- Photography: multiple sessions as galleries
`;

  const SYSTEM_PROMPT = `
You are Justin Mora's portfolio assistant.
You must answer ONLY questions about Justin Mora, his skills, education, work experience, projects, and this portfolio.

Rules:
- If the user asks about Justin/portfolio, answer using ONLY the PORTFOLIO_CONTEXT below.
- If the answer is not in the context, reply: "I don't have that information yet."
- If the user asks anything unrelated to Justin/portfolio, reply exactly: "I only answer questions about Justin and his portfolio."

PORTFOLIO_CONTEXT:
${PORTFOLIO_CONTEXT}
`.trim();

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: "OpenAI request failed", status: r.status, details: data }),
        { status: 500, headers }
      );
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    return new Response(JSON.stringify({ answer: answer || "" }), { status: 200, headers });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error calling OpenAI", details: String(err?.message || err) }),
      { status: 500, headers }
    );
  }
};

