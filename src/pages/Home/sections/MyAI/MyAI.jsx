import { useMemo, useRef, useState } from "react";
import styles from "./myAI.module.css";

import myAIBackground from "../../../../assets/images/myAI/myAIBackground.png";

const ENDPOINT = "/.netlify/functions/ask";

async function askAI(text) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: text }),
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error || "Request failed");

  return data.answer;
}

export default function MyAI() {
  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      content:
        "Hey! Ask me anything about Justin’s portfolio — projects, skills, experience, or education.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  const suggestions = useMemo(
    () => [
      "Who is Justin Mora?",
      "What was Justin’s last job and what did he do there?",
      "What are Justin’s strongest skills?",
      "What web projects are in the portfolio?",
      "What design work categories are included?",
      "What photography sessions are available?",
      "What tools does Justin use for design?",
      "Where does Justin study and what is his major?",
    ],
    []
  );

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const replacePendingBubble = (answer) => {
    setMessages((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i]?.pending) {
          next[i] = { role: "assistant", content: answer };
          break;
        }
      }
      return next;
    });
  };

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    setLoading(true);
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "assistant", content: "Thinking…", pending: true },
    ]);

    requestAnimationFrame(scrollToBottom);

    try {
      const answer = await askAI(question);

      const safeAnswer =
        (answer && String(answer).trim()) || "Sorry — I couldn't generate a response.";

      replacePendingBubble(safeAnswer);
      requestAnimationFrame(scrollToBottom);
    } catch (e) {
      replacePendingBubble(
        e?.message ? `Error: ${e.message}` : "Sorry — something failed while contacting the server."
      );
      requestAnimationFrame(scrollToBottom);
    } finally {
      setLoading(false);
      requestAnimationFrame(scrollToBottom);
    }
  };

  return (
    <section
      id="questions"
      className={styles.wrap}
      style={{ backgroundImage: `url(${myAIBackground})` }}
    >
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.copy}>
          <h2 className={styles.title}>Got Questions?</h2>
          <p className={styles.sub}>
            Ask my AI anything about <b>Justin</b> — projects, skills, education, and work
            experience.
          </p>
          <p className={styles.note}>
            It only answers using portfolio info. If something isn’t listed, it’ll say it doesn’t
            have it yet.
          </p>
        </div>

        {/* RIGHT */}
        <div className={styles.chatWindow}>
          <div className={styles.topBar}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.topTitle}>Ask Justin’s AI</div>
            <div className={styles.topSpacer} />
          </div>

          <div className={styles.body}>
            <div className={styles.suggestions}>
              {suggestions.slice(0, 6).map((s) => (
                <button
                  key={s}
                  className={styles.suggestion}
                  type="button"
                  onClick={() => send(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className={styles.messages} ref={listRef}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`${styles.bubbleRow} ${
                    m.role === "user" ? styles.rowUser : styles.rowAi
                  }`}
                >
                  <div
                    className={`${styles.bubble} ${
                      m.role === "user" ? styles.userBubble : styles.aiBubble
                    } ${m.pending ? styles.pending : ""}`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <form
              className={styles.composer}
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Justin…"
                aria-label="Ask a question"
                disabled={loading}
              />
              <button
                className={styles.sendBtn}
                type="submit"
                disabled={loading || !input.trim()}
              >
                <span className={styles.sendIcon} aria-hidden="true">
                  ➤
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}