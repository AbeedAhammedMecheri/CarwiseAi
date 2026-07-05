import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#080F1E",
  navy: "#0D1B2E",
  card: "#0F2040",
  border: "rgba(59,130,246,0.15)",
  blue: "#3B82F6",
  blueDark: "#1D4ED8",
  white: "#F1F5F9",
  grey: "#94A3B8",
  greyDark: "#475569",
  green: "#22C55E",
  red: "#EF4444",
  yellow: "#F59E0B",
};

const SYSTEM_PROMPT = `You are CarWise AI — India's smartest car buying assistant. Help users with:
- New car recommendations by budget (give specific models with prices)
- Used car advice and inspection tips
- Fuel type comparison (petrol/diesel/CNG/electric)
- Car model comparisons
- Common problems in specific models
- Best time to buy, negotiation tips
Always be specific, practical and concise. Use bullet points for lists. For budgets always name exact models. For used cars always mention key risks. Respond in a friendly, expert tone.`;

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, boxShadow: `0 0 16px rgba(59,130,246,0.35)`,
      }}>🚗</div>
      <div>
        <div style={{ color: C.white, fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
          CarWise<span style={{ color: C.blue }}>AI</span>
        </div>
        <div style={{ color: C.greyDark, fontSize: 9, fontFamily: "monospace", letterSpacing: "1px" }}>
          INDIA'S CAR ADVISOR
        </div>
      </div>
    </div>
  );
}

function NavBtn({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `rgba(59,130,246,0.15)` : "transparent",
      border: active ? `1px solid ${C.border}` : "1px solid transparent",
      color: active ? C.blue : C.grey,
      borderRadius: 10, padding: "8px 14px",
      fontSize: 13, fontWeight: 600,
      cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
      fontFamily: "inherit", transition: "all 0.15s",
    }}>{icon} {label}</button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: 20, ...style,
    }}>{children}</div>
  );
}

function BlueBtn({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.greyDark : `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`,
      color: "#fff", border: "none", borderRadius: 10,
      padding: "10px 20px", fontSize: 14, fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit", transition: "all 0.15s",
      boxShadow: disabled ? "none" : `0 0 16px rgba(59,130,246,0.3)`,
      ...style,
    }}>{children}</button>
  );
}

function HomePage({ setPage }) {
  const features = [
    { icon: "🤖", title: "AI Car Advisor", desc: "Ask anything about buying a car in India", page: "chat" },
    { icon: "⚖️", title: "Car Comparison", desc: "Compare two cars side by side instantly", page: "compare" },
    { icon: "✅", title: "Used Car Checklist", desc: "Full inspection guide before you buy", page: "checklist" },
  ];
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚘</div>
        <h1 style={{ color: C.white, fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 12 }}>
          Buy Your Next Car<br />
          <span style={{ color: C.blue }}>With Confidence</span>
        </h1>
        <p style={{ color: C.grey, fontSize: 15, maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
          India's smartest car buying platform. Get AI advice, compare models, and inspect used cars — all in one place.
        </p>
        <BlueBtn onClick={() => setPage("chat")} style={{ fontSize: 15, padding: "12px 28px" }}>
          Ask AI Advisor →
        </BlueBtn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
  {[
    { url: "https://images.unsplash.com/photo-1573710459621-bb101783ca0f?w=600&q=80&auto=format&fit=crop", label: "Sedans" },
    { url: "https://images.unsplash.com/photo-1646844371347-e7eab6275747?w=600&q=80&auto=format&fit=crop", label: "SUVs" },
    { url: "https://images.unsplash.com/photo-1547500393-96e64b79e788?w=600&q=80&auto=format&fit=crop", label: "Hatchbacks" },
    { url: "https://images.unsplash.com/photo-1691846243759-b0df504ba04d?w=600&q=80&auto=format&fit=crop", label: "Showroom Picks" },
  ].map((img, i) => (
    <div key={i} style={{
      position: "relative", borderRadius: 14, overflow: "hidden", height: 110,
      border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    }}>
      <img src={img.url} alt={img.label} loading="lazy" style={{
        width: "100%", height: "100%", objectFit: "cover", display: "block",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,15,30,0.85), rgba(8,15,30,0) 60%)",
      }} />
      <div style={{
        position: "absolute", bottom: 8, left: 10,
        color: C.white, fontSize: 12, fontWeight: 700, letterSpacing: "0.2px",
      }}>{img.label}</div>
    </div>
  ))}
</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {features.map((f, i) => (
          <div key={i} onClick={() => setPage(f.page)} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 20, cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{f.title}</div>
            <div style={{ color: C.grey, fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            <div style={{ color: C.blue, fontSize: 12, marginTop: 10, fontWeight: 600 }}>Open →</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {[["🚗", "500+", "Car Models"], ["💡", "AI", "Powered"], ["🇮🇳", "India", "Focused"]].map(([icon, val, label], i) => (
          <div key={i} style={{
            flex: 1, background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div style={{ color: C.blue, fontWeight: 800, fontSize: 16 }}>{val}</div>
            <div style={{ color: C.grey, fontSize: 11 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const suggested = ["Best cars under ₹8 lakhs", "Used car inspection tips", "Petrol vs Diesel 2025", "Best SUV under ₹20 lakhs", "How to negotiate car price"];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content: msg }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newMsgs }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Something went wrong.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch { setMessages([...newMsgs, { role: "assistant", content: "Connection error. Try again." }]); }
    setLoading(false);
  }

  function fmt(text) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, color: C.white, margin: "8px 0 4px" }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}><span style={{ color: C.blue }}>▸</span><span>{line.slice(2)}</span></div>;
      if (!line.trim()) return <div key={i} style={{ height: 5 }} />;
      return <p key={i} style={{ marginBottom: 3 }}>{line}</p>;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", maxWidth: 720, width: "100%", margin: "0 auto" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🤖</div>
            <h2 style={{ color: C.white, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Ask AI Car Advisor</h2>
            <p style={{ color: C.grey, fontSize: 14, marginBottom: 28 }}>Get expert advice on buying any car in India</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {suggested.map((q, i) => (
                <button key={i} onClick={() => send(q)} style={{
                  background: "rgba(30,58,95,0.4)", border: `1px solid ${C.border}`,
                  color: C.grey, borderRadius: 100, padding: "8px 14px",
                  fontSize: 12.5, fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s",
                }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.grey; }}
                >{q}</button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
              {m.role === "assistant" && (
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>🚗</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "11px 15px",
                background: m.role === "user" ? `linear-gradient(135deg, ${C.blueDark}, ${C.blue})` : C.card,
                color: m.role === "assistant" ? C.grey : C.white,
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                border: m.role === "assistant" ? `1px solid ${C.border}` : "none",
                fontSize: 13.5, lineHeight: 1.65, fontFamily: m.role === "assistant" ? "monospace" : "inherit",
              }}>
                {m.role === "assistant" ? fmt(m.content) : m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚗</div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px 16px 16px 4px", padding: "12px 18px", display: "flex", gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.blue, animation: `blink 1.2s ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, padding: 14, background: C.bg }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end", background: C.card, border: `1px solid rgba(59,130,246,0.2)`, borderRadius: 14, padding: "10px 10px 10px 16px" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask anything about cars in India..." rows={1}
            style={{ flex: 1, background: "transparent", border: "none", color: C.white, fontSize: 14, fontFamily: "inherit", resize: "none", maxHeight: 100, outline: "none" }} />
          <button onClick={() => send()} disabled={!input.trim() || loading} style={{
            width: 38, height: 38, borderRadius: 10, border: "none",
            background: input.trim() && !loading ? `linear-gradient(135deg, ${C.blueDark}, ${C.blue})` : C.greyDark,
            color: "#fff", fontSize: 16, cursor: input.trim() && !loading ? "pointer" : "not-allowed",
          }}>↑</button>
        </div>
      </div>
    </div>
  );
}

function ComparePage() {
  const [car1, setCar1] = useState("");
  const [car2, setCar2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function compare() {
    if (!car1.trim() || !car2.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are a car expert for Indian market.",
          messages: [{ role: "user", content: `Compare ${car1} vs ${car2} for Indian buyers. Cover: price, mileage, maintenance cost, common issues, verdict. Be specific and concise.` }],
        }),
      });
      const data = await res.json();
      setResult(data.content?.map(b => b.text || "").join("") || "Error");
    } catch { setResult("Connection error. Try again."); }
    setLoading(false);
  }

  function fmt(text) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, color: C.white, margin: "10px 0 5px", fontSize: 14 }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}><span style={{ color: C.blue }}>▸</span><span style={{ color: C.grey, fontSize: 13 }}>{line.slice(2)}</span></div>;
      if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
      return <p key={i} style={{ color: C.grey, fontSize: 13, marginBottom: 3 }}>{line}</p>;
    });
  }

  const popular = [["Maruti Swift", "Hyundai i20"], ["Tata Nexon", "Maruti Brezza"], ["Honda City", "Hyundai Verna"], ["Toyota Fortuner", "MG Hector Plus"]];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h2 style={{ color: C.white, fontWeight: 800, fontSize: 22, marginBottom: 6 }}>⚖️ Car Comparison</h2>
      <p style={{ color: C.grey, fontSize: 13, marginBottom: 24 }}>Compare any two cars side by side for India</p>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          {[{ val: car1, set: setCar1, ph: "e.g. Maruti Swift" }, { val: car2, set: setCar2, ph: "e.g. Hyundai i20" }].map((f, i) => (
            <div key={i}>
              <label style={{ color: C.grey, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6, letterSpacing: "0.5px" }}>CAR {i + 1}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                style={{ width: "100%", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.white, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
            </div>
          ))}
        </div>
        <BlueBtn onClick={compare} disabled={!car1.trim() || !car2.trim() || loading} style={{ width: "100%" }}>
          {loading ? "Comparing..." : "Compare Now →"}
        </BlueBtn>
      </Card>
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: C.greyDark, fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", marginBottom: 10 }}>POPULAR COMPARISONS</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {popular.map(([a, b], i) => (
            <button key={i} onClick={() => { setCar1(a); setCar2(b); }} style={{
              background: "rgba(30,58,95,0.4)", border: `1px solid ${C.border}`,
              color: C.grey, borderRadius: 100, padding: "7px 14px",
              fontSize: 12, fontFamily: "inherit", cursor: "pointer",
            }}>{a} vs {b}</button>
          ))}
        </div>
      </div>
      {result && (
        <Card>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, padding: "10px 14px", background: C.navy, borderRadius: 10 }}>
            <span style={{ color: C.blue, fontWeight: 700, fontSize: 14 }}>{car1}</span>
            <span style={{ color: C.greyDark }}>vs</span>
            <span style={{ color: C.blue, fontWeight: 700, fontSize: 14 }}>{car2}</span>
          </div>
          {fmt(result)}
        </Card>
      )}
    </div>
  );
}

function ChecklistPage() {
  const sections = [
    { title: "📋 Documents", items: ["RC (Registration Certificate) is original", "Insurance is valid and not expired", "PUC Certificate is valid", "Service history book available", "Loan NOC if previously financed", "Chassis & engine number matches RC"] },
    { title: "🚗 Exterior Check", items: ["No major dents or scratches", "All panels are same color (no repainting)", "Gaps between panels are even", "All lights working (headlights, indicators, brake)", "Tyres have good tread depth", "No rust on underbody or wheel arches"] },
    { title: "🔧 Engine Check", items: ["No smoke from exhaust", "Engine starts smoothly", "No unusual noises when running", "No oil leaks under car", "Coolant and oil levels are fine", "Battery is in good condition"] },
    { title: "🚪 Interior Check", items: ["AC works properly", "All windows open/close smoothly", "Central locking works", "All dashboard warning lights clear", "Infotainment/stereo works", "Seats and upholstery in good condition"] },
    { title: "🔄 Test Drive", items: ["Steering is smooth, no vibration", "Brakes respond well without noise", "No pulling to one side while driving", "Gears shift smoothly", "No unusual sounds at speed", "Clutch is not slipping (manual)"] },
  ];

  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));
  const total = sections.reduce((a, s) => a + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h2 style={{ color: C.white, fontWeight: 800, fontSize: 22, marginBottom: 6 }}>✅ Used Car Checklist</h2>
      <p style={{ color: C.grey, fontSize: 13, marginBottom: 20 }}>Complete inspection guide — use before buying any used car</p>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: C.grey, fontSize: 13 }}>Inspection Progress</span>
          <span style={{ color: C.blue, fontWeight: 700 }}>{done}/{total} ({pct}%)</span>
        </div>
        <div style={{ background: C.navy, borderRadius: 100, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.blueDark}, ${C.blue})`, borderRadius: 100, transition: "width 0.3s" }} />
        </div>
        {pct === 100 && <p style={{ color: C.green, fontSize: 13, marginTop: 10, fontWeight: 600, textAlign: "center" }}>✅ Full inspection complete! Safe to proceed.</p>}
      </Card>
      {sections.map((s, si) => (
        <Card key={si} style={{ marginBottom: 12 }}>
          <p style={{ color: C.white, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{s.title}</p>
          {s.items.map((item, ii) => {
            const key = `${si}-${ii}`;
            return (
              <div key={ii} onClick={() => toggle(key)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
                borderBottom: ii < s.items.length - 1 ? `1px solid rgba(59,130,246,0.08)` : "none",
                cursor: "pointer",
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: checked[key] ? C.blue : C.navy,
                  border: `2px solid ${checked[key] ? C.blue : C.greyDark}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#fff", transition: "all 0.15s",
                }}>
                  {checked[key] ? "✓" : ""}
                </div>
                <span style={{ color: checked[key] ? C.greyDark : C.grey, fontSize: 13, textDecoration: checked[key] ? "line-through" : "none" }}>{item}</span>
              </div>
            );
          })}
        </Card>
      ))}
      <BlueBtn onClick={() => setChecked({})} style={{ width: "100%", marginTop: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.grey, boxShadow: "none" }}>
        Reset Checklist
      </BlueBtn>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const nav = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "chat", label: "AI Advisor", icon: "🤖" },
    { id: "compare", label: "Compare", icon: "⚖️" },
    { id: "checklist", label: "Checklist", icon: "✅" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', sans-serif", color: C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.card}; border-radius: 2px; }
        textarea { resize: none; }
        textarea:focus { outline: none; }
        @keyframes blink { 0%,80%,100% { opacity:0.2; transform:scale(0.8); } 40% { opacity:1; transform:scale(1); } }
      `}</style>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,15,30,0.95)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`, padding: "0 16px",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", height: 64, gap: 8 }}>
          <Logo />
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
            {nav.map(n => (
              <NavBtn key={n.id} label={n.label} icon={n.icon} active={page === n.id} onClick={() => setPage(n.id)} />
            ))}
          </div>
        </div>
      </header>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "chat" && <ChatPage />}
      {page === "compare" && <ComparePage />}
      {page === "checklist" && <ChecklistPage />}
    </div>
  );
}
