"use client";

import { useMemo, useState } from "react";

type EvaluateResponse =
  | { applied: true; ruleId: string; discount: number }
  | { applied: false; discount: number };

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

  const [subtotal, setSubtotal] = useState<number>(120);
  const [isMember, setIsMember] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestBody = useMemo(
    () => ({
      totals: { subtotal, shipping: 0, tax: 0 },
      customer: { isMember },
    }),
    [subtotal, isMember]
  );

  async function onEvaluate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${apiBaseUrl}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = (await res.json()) as EvaluateResponse;
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Admin Evaluator</h1>
      <p style={{ opacity: 0.8 }}>
        Posts an order payload to <code>{apiBaseUrl}/evaluate</code> and renders the response.
      </p>

      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>Subtotal</span>
            <input
              type="number"
              value={subtotal}
              onChange={(e) => setSubtotal(Number(e.target.value))}
              style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", minWidth: 180 }}
            />
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 22 }}>
            <input
              type="checkbox"
              checked={isMember}
              onChange={(e) => setIsMember(e.target.checked)}
            />
            <span>Customer is a member</span>
          </label>

          <button
            onClick={onEvaluate}
            disabled={loading}
            style={{
              marginTop: 22,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ccc",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Evaluating..." : "Evaluate"}
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Request</h2>
          <pre style={{ background: "#3a3a3aff", padding: 12, borderRadius: 12, overflow: "auto" }}>
            {JSON.stringify(requestBody, null, 2)}
          </pre>

          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Response</h2>

          {error && (
            <pre style={{ background: "#3a3a3aff", padding: 12, borderRadius: 12, overflow: "auto" }}>
              {error}
            </pre>
          )}

          {!error && result && (
            <pre style={{ background: "#3a3a3aff", padding: 12, borderRadius: 12, overflow: "auto" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          )}

          {!error && !result && (
            <p style={{ opacity: 0.7 }}>Click Evaluate to see output.</p>
          )}
        </div>
      </section>
    </main>
  );
}
