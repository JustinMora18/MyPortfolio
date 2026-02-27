import { useState } from "react";
import styles from "./Contact.module.css";

import contactBackground from "../../../../assets/images/contact/contactBackground.png";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const encode = (data) =>
    new URLSearchParams(data).toString(); // application/x-www-form-urlencoded

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...form,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className={styles.wrap}
      style={{ backgroundImage: `url(${contactBackground})` }}
    >
      <div className={styles.inner}>
        {/* LEFT: window/form */}
        <div className={styles.window}>
          <div className={styles.topBar}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.topTitle}>Contact Form</div>
            <div className={styles.topSpacer} />
          </div>

          {/* Netlify Forms needs these attributes + hidden input */}
          <form
            className={styles.form}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className={styles.honey}>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <label className={styles.field}>
              <span className={styles.label}>Name:</span>
              <input
                className={styles.inputLine}
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
              />
              <span className={styles.underline} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email:</span>
              <input
                className={styles.inputLine}
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                required
              />
              <span className={styles.underline} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Subject:</span>
              <input
                className={styles.inputLine}
                name="subject"
                value={form.subject}
                onChange={onChange}
                required
              />
              <span className={styles.underline} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Message:</span>
              <textarea
                className={styles.textarea}
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                required
              />
              <span className={styles.underline} />
            </label>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>

              {status === "success" && (
                <span className={styles.ok}>Sent ✅</span>
              )}
              {status === "error" && (
                <span className={styles.err}>
                  Couldn’t send. Try again.
                </span>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT: big title */}
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Get In
            <br />
            Touch
            <br />
            With Me!
          </h2>
        </div>
      </div>
    </section>
  );
}