import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ANSWERS = ["May", "I", "Court", "You"];

const LEVELS = [
  {
    word: "May",
    hint: "A month · a name · a question",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNaNjxSnOzhWJmavPCLpnBbdC4Z_761x7W_g&s",
      "https://img.pikbest.com/png-images/20241122/number-05-3d-calendar-white-with-black_11122518.png!bw700",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcj9gp9cYALqrmFpC94jhNdevU996c9lIvUw&s",
      "https://media.philstar.com/photos/2022/03/07/maymay-entrata_2022-03-07_12-09-29.jpg",
    ],
    emojis: ["🌸", "📅", "🌼", "🗓️"],
  },
  {
    word: "I",
    hint: "secret walang clue",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Ai_Ai_delas_Alas_2020_%28cropped%29.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zVNILIaJJukM66VctMdlL6l2dzlr0X7PdQ&s",
      "https://i.pinimg.com/474x/bf/6c/18/bf6c18d0c0d8428b60c6b19f7f8e9faa.jpg",
      "https://cdn.britannica.com/79/150179-120-3A8438B1/human-eye.jpg",
    ],
    emojis: ["🙋", "👤", "🪞", "💭"],
  },
  {
    word: "Court",
    hint: "pustahan po",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebt4cWgkXQw5oFzrCFJCTAoJFstiSTZoLjw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWuSHX53syhUb1bGsvKxEmCQTFOlCko4JnSA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJLbrq3TSq_SlBUPASdU5NVZMT_FHPfXxOQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9o8glyVZIqtFCrcPqxrvq2cqOrxwBc_wFVA&s",
    ],
    emojis: ["🏀", "🎾", "👑", "🏰"],
  },
  {
    word: "You",
    hint: "The one this was made for",
    images: [
      "https://pbs.twimg.com/media/EwTvvj3XEAEagdS.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Gqn4TS-lp0ITSHMVPSkOYRfegc5uiYavJw&s",
      "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyem1pbWQ1OHB1MWRsdTB5ZW9rZjE5aWg0a3ZxeWd0eGYzbHE5djF5NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wVEEp3Kk7hvnyJuvcu/200w.gif",
      "https://media.tenor.com/667enoKVwOsAAAAM/ponty.gif",
    ],
    emojis: ["👉", "💫", "🫵", "❤️"],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(word) {
  const upper = word.toUpperCase();
  const extras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((c) => !upper.includes(c));
  const extra = shuffle(extras).slice(0, Math.max(4, 8 - word.length));
  return shuffle([...upper.split(""), ...extra]).map((l, i) => ({
    id: i,
    letter: l,
    used: false,
  }));
}

// ─── PETALS ───────────────────────────────────────────────────────────────────
function Petals() {
  return (
    <>
      <div className="petal petal-1"></div>
      <div className="petal petal-2"></div>
      <div className="petal petal-3"></div>
      <div className="petal petal-4"></div>
    </>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onContinue }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (name.trim().toLowerCase() === "larrence") {
      onContinue();
    } else {
      setError("This game is not for you.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="page-bg min-h-screen flex flex-col items-center justify-center px-6">
      <Petals />
      <div className="glass-card w-full max-w-xs fade-in">
        <div className="text-center mb-8">
          <div className="game-icon-wrap mx-auto mb-4">
            <span className="text-3xl">🎴</span>
          </div>
          <h1 className="font-display text-3xl text-blue-100 mb-1">4 Pics 1 Word</h1>
          <p className="font-body text-slate-400 text-xs tracking-widest uppercase"></p>
        </div>
        <div className={shake ? "shake" : ""}>
          <label className="font-body text-blue-300 text-xs mb-2 block tracking-wide uppercase">Enter your name</label>
          <input
            className="input-field w-full mb-3"
            placeholder="Who are you?"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && <p className="text-center font-body text-blue-300 text-sm mb-3 fade-in">{error}</p>}
          <button onClick={handleSubmit} className="btn-primary w-full">Continue →</button>
        </div>
      </div>
    </div>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────
function Welcome({ onStart }) {
  return (
    <div className="page-bg min-h-screen flex flex-col items-center justify-center px-6">
      <Petals />
      <div className="glass-card w-full max-w-xs text-center fade-in">
        <h1 className="font-display text-4xl text-blue-100 mb-2">Hello, Larrence</h1>
        <p className="font-body text-blue-300 mb-1">Let's play a game.</p>
        <p className="font-body text-slate-400 text-sm mb-8">
          4 levels · 4 pictures each<br />One word per level
        </p>
        <button onClick={onStart} className="btn-primary w-full">Start Game</button>
      </div>
    </div>
  );
}

// ─── GAME ─────────────────────────────────────────────────────────────────────
function Game({ onComplete }) {
  const [level, setLevel] = useState(0);
  const [pool, setPool] = useState(() => buildPool(ANSWERS[0]));
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);

  const answer = ANSWERS[level];

  useEffect(() => {
    setPool(buildPool(answer));
    setSelected([]);
    setError("");
    setCorrect(false);
    setChecking(false);
  }, [level]);

  const tapPoolLetter = (tile) => {
    if (tile.used || selected.length >= answer.length || correct || checking) return;
    setPool((p) => p.map((t) => (t.id === tile.id ? { ...t, used: true } : t)));
    const newSelected = [...selected, { id: tile.id, letter: tile.letter }];
    setSelected(newSelected);
    setError("");

    if (newSelected.length === answer.length) {
      setChecking(true);
      const guess = newSelected.map((s) => s.letter).join("");
      if (guess.toUpperCase() === answer.toUpperCase()) {
        setCorrect(true);
        setTimeout(() => {
          if (level === ANSWERS.length - 1) onComplete();
          else setLevel((l) => l + 1);
        }, 900);
      } else {
        setError("Not quite! Try again 👀");
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPool((p) => p.map((t) => ({ ...t, used: false })));
          setSelected([]);
          setError("");
          setChecking(false);
        }, 800);
      }
    }
  };

  const tapBlank = (i) => {
    if (correct || checking) return;
    const removed = selected[i];
    setSelected((s) => s.filter((_, idx) => idx !== i));
    setPool((p) => p.map((t) => (t.id === removed.id ? { ...t, used: false } : t)));
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 12px 16px",
        overflow: "hidden",
      }}
      className="page-bg"
    >
      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>

        {/* ── Header: level + progress bar ── */}
        <div className="fade-in" style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span className="font-body" style={{ color: "#93c5fd", fontSize: "13px", fontWeight: 500 }}>
              Level {level + 1} / {ANSWERS.length}
            </span>
            <span className="font-body" style={{ color: "#64748b", fontSize: "11px", fontStyle: "italic" }}>
              {LEVELS[level].hint}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {ANSWERS.map((_, i) => (
              <div
                key={i}
                style={{
                  height: "6px",
                  flex: 1,
                  borderRadius: "9999px",
                  transition: "all 0.5s",
                  background: i < level ? "#f59e0b" : i === level ? "#fda4af" : "#1e293b",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Completed words so far ── */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", minHeight: "28px", flexShrink: 0 }}>
          {ANSWERS.slice(0, level).map((w, i) => (
            <span
              key={i}
              className="font-body fade-in"
              style={{
                color: "#93c5fd",
                fontSize: "12px",
                background: "rgba(255,255,255,0.08)",
                padding: "3px 10px",
                borderRadius: "8px",
                border: "1px solid #334d6e",
                fontWeight: 500,
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* ── 2×2 image grid ── */}
        <div
          className={shake ? "shake" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          {LEVELS[level].images.map((src, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                aspectRatio: "1",
                background: "#0f172a",
                border: "2px solid #1e3a5f",
              }}
            >
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "none",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "2rem", background: "#0f172a",
                }}
              >
                {LEVELS[level].emojis[i]}
              </div>
            </div>
          ))}
        </div>

        {/* ── Answer blanks ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexShrink: 0 }}>
          {Array.from({ length: answer.length }).map((_, i) => (
            <div
              key={i}
              onClick={() => selected[i] && tapBlank(i)}
              className={`letter-tile answer-tile ${
                correct ? "correct-tile" : selected[i] ? "filled" : "empty"
              }`}
              style={{ width: "36px", height: "40px", fontSize: "15px" }}
            >
              {selected[i]?.letter || ""}
            </div>
          ))}
        </div>

        {/* ── Status message ── */}
        <div style={{ height: "20px", textAlign: "center", flexShrink: 0 }}>
          {correct && (
            <p className="font-body fade-in" style={{ color: "#34d399", fontSize: "13px" }}>
              ✓ "{answer}"
            </p>
          )}
          {error && !correct && (
            <p className="font-body fade-in" style={{ color: "#93c5fd", fontSize: "12px" }}>
              {error}
            </p>
          )}
        </div>

        {/* ── Letter pool ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          {pool.map((tile) => (
            <button
              key={tile.id}
              onClick={() => tapPoolLetter(tile)}
              disabled={tile.used || correct}
              className={`letter-tile pool-tile ${tile.used ? "used" : ""}`}
              style={{ width: "36px", height: "40px", fontSize: "14px" }}
            >
              {tile.letter}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── CONFESSION ───────────────────────────────────────────────────────────────
function Confession({ onSubmit }) {
  const [phase, setPhase] = useState("loading");
  const [wordIndex, setWordIndex] = useState(0);

  // Letter typewriter state
const letterParagraphs = [
  "My Dearest Larrence,",
  "I've known you for a year and four months now, and in that time, we've created memories that I genuinely hold close to my heart.",
  "While I was working on this, I came across a quote on TikTok that felt a little too familiar, something I've actually seen a few times during our journey. It goes: \"When we first met, I wasn't looking for love. I was running away from it. But you were so kind and gentle that I felt my heart slowly opening up to you… and before I knew it, I was head over heels in love with you.\"",
  "And honestly, that's exactly what happened with us.",
  "You never rushed me. You let me take things at my own pace, not just in love. You helped me in ways you might not even realize, guiding me back to God and bringing peace back into my life.",
  "I'm genuinely sorry for the confusion I caused, for the mixed signals and the uncertainty I made you feel. I know it wasn't easy, and I regret putting you through that. But through it all, one thing has always been true: I love you.",
  "I thank you for coming into my life. You've given me something I didn't even realize I needed. Your presence alone brings the peace I've always yearned for. Love feels easy when I'm with you. Whatever your decision is, I'll be forever grateful that our paths crossed.",
  "And now that I think about it, I've been trying to win your heart all this time just without ever properly asking.",
  "Until now.",
];
  const [paraIndex, setParaIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [shownParas, setShownParas] = useState([]);
  const [currentPara, setCurrentPara] = useState("");
  const [letterDone, setLetterDone] = useState(false);

  // Form state
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");

 // ─── AUDIO ────────────────────────────────────────────────────────────────────
const audioRef = useRef(null);

// Initialize audio once
useEffect(() => {
  audioRef.current = new Audio("/iwannabeyoursinstrumental.mp3");
  audioRef.current.volume = 0; // start at 0 for fade in
  audioRef.current.loop = true;

  return () => {
    // cleanup on unmount
    audioRef.current.pause();
    audioRef.current = null;
  };
}, []);

// Fade in when letter phase starts
useEffect(() => {
  if (phase !== "letter") return;

  const audio = audioRef.current;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {}); // catch autoplay block silently

  // ── FADE IN ──
  // Ramps volume from 0 to target over ~1500ms
  // Change 0.35 below to adjust max volume (0.0 = silent, 1.0 = full)
  const targetVolume = 0.7;
  const fadeInDuration = 3000; // ms
  const steps = 30;
  const stepTime = fadeInDuration / steps;
  const stepSize = targetVolume / steps;

  let currentStep = 0;
  const fadeIn = setInterval(() => {
    currentStep++;
    if (audioRef.current) {
      audioRef.current.volume = Math.min(stepSize * currentStep, targetVolume);
    }
    if (currentStep >= steps) clearInterval(fadeIn);
  }, stepTime);

  return () => clearInterval(fadeIn);
}, [phase]);

// Fade out when leaving letter phase
useEffect(() => {
  if (phase === "letter") return;
  if (!audioRef.current || audioRef.current.paused) return;

  // ── FADE OUT ──
  // Ramps volume from current down to 0 over ~1000ms then pauses
  // Change fadeOutDuration below to make it faster or slower
  const fadeOutDuration = 1000; // ms
  const steps = 20;
  const stepTime = fadeOutDuration / steps;
  const startVolume = audioRef.current.volume;
  const stepSize = startVolume / steps;

  let currentStep = 0;
  const fadeOut = setInterval(() => {
    currentStep++;
    if (audioRef.current) {
      audioRef.current.volume = Math.max(startVolume - stepSize * currentStep, 0);
    }
    if (currentStep >= steps) {
      clearInterval(fadeOut);
      if (audioRef.current) audioRef.current.pause();
    }
  }, stepTime);

  return () => clearInterval(fadeOut);
}, [phase]);
  // ── loading
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("tiles"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // ── tiles: pop words one by one
  useEffect(() => {
    if (phase !== "tiles") return;
    if (wordIndex < ANSWERS.length) {
      const t = setTimeout(() => setWordIndex((i) => i + 1), 500);
      return () => clearTimeout(t);
    }
  }, [phase, wordIndex]);

  // ── letter: typewriter per paragraph
useEffect(() => {
  if (phase !== "letter") return;
  if (paraIndex >= letterParagraphs.length) {
    setLetterDone(true);
    return;
  }
  
  const para = letterParagraphs[paraIndex];
  
 
  if (charIndex < para.length) {
    const t = setTimeout(() => {
      setCurrentPara(para.slice(0, charIndex + 1));
      setCharIndex((c) => c + 1);
    },30); 
    
    return () => clearTimeout(t);
  } 
  else if (charIndex === para.length && paraIndex < letterParagraphs.length) {
    // Paragraph completed - add to shownParas and move to next
    const delay = para === "Hi Larrence," ? 500 : 
                  para === "Until now." ? 800 : 
                  600; 
    
    const t = setTimeout(() => {
      setShownParas((p) => [...p, currentPara]); 
      setCurrentPara("");
      setCharIndex(0);
      setParaIndex((i) => i + 1);
    }, delay);
    
    return () => clearTimeout(t);
  }
}, [phase, paraIndex, charIndex, currentPara]);

  const dodgeNo = () => {
    setNoPos({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 120,
    });
  };

  const handleYes = async () => {
    if (!email.trim()) { setEmailError("Please enter your email 💌"); return; }
    if (!date) { setEmailError("Please pick a date 📅"); return; }
    if (!time) { setEmailError("Please pick a time 🕐"); return; }
    setEmailError("");
    setSending(true);
    try {
      await onSubmit({ email, date, time });
      setPhase("done");
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  

  // ── LOADING
  if (phase === "loading") return (
    <div className="page-bg min-h-screen flex items-center justify-center">
      <div className="text-center fade-in">
        <div className="text-4xl mb-5 pulse-anim"></div>
        <p className="font-display text-blue-200 text-xl">Compiling your answers...</p>
        <div className="flex justify-center gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-400 dot-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

// ── TILE REVEAL
if (phase === "tiles") return (
  <div className="page-bg min-h-screen flex flex-col items-center justify-center px-6">
    <div className="text-center">
      <p className="font-body text-slate-400 text-xs mb-8 tracking-widest uppercase fade-in">
        Your answers revealed a question...
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {ANSWERS.map((word, i) => (
          <div
            key={i}
            className="transition-all duration-500"
            style={{
              opacity: i < wordIndex ? 1 : 0,
              transform: i < wordIndex ? "scale(1) translateY(0)" : "scale(0.7) translateY(16px)",
              transitionDelay: `${i * 0.05}s`,
            }}
          >
            <div className="flex gap-1">
              {word.split("").map((letter, j) => (
                <div key={j} className="letter-tile reveal-tile">
                  {letter.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ? tile */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: wordIndex === ANSWERS.length ? 1 : 0,
            transform: wordIndex === ANSWERS.length ? "scale(1) translateY(0)" : "scale(0.7) translateY(16px)",
          }}
        >
          <div className="letter-tile reveal-tile" style={{ color: "#c9a84c", borderColor: "#c9a84c" }}>
            ?
          </div>
        </div>
      </div>

      {wordIndex === ANSWERS.length && (
        <div className="fade-in">
          <button onClick={() => setPhase("letter")} className="btn-primary px-12">
            Continue →
          </button>
        </div>
      )}
    </div>
  </div>
);

  // ── LETTER
  if (phase === "letter") return (
    <div className="page-bg min-h-screen flex items-center justify-center px-5 py-12">
      <div className="glass-card w-full max-w-sm">
        <div className="text-xl mb-5">✉️</div>
<div className="font-body text-blue-50 space-y-4 text-sm leading-relaxed" style={{ minHeight: "260px" }}>
  {shownParas.map((p, i) => (
    <p
      key={i}
      className={`fade-in ${i === 0 ? "font-semibold text-blue-100 text-base" : ""} ${p === "Until now." ? "font-semibold text-blue-200 italic" : ""}`}
    >
      {p}
    </p>
  ))}
  
  {paraIndex < letterParagraphs.length && currentPara && (
    <p className={`${paraIndex === 0 ? "font-semibold text-blue-100 text-base" : ""} ${letterParagraphs[paraIndex] === "Until now." ? "font-semibold text-blue-200 italic" : ""}`}>
      {currentPara}
      <span className="cursor-blink" style={{ 
        display: "inline-block", 
        width: "2px", 
        height: "1em", 
        marginLeft: "2px",
        animation: "blink 1s step-start infinite" 
      }}>|</span>
    </p>
  )}
</div>

        {letterDone && (
          <div className="mt-8 flex justify-end fade-in">
            <button onClick={() => setPhase("form")} className="btn-primary px-8">
              Continue &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── FORM (phrase + form together)
// ── FORM
if (phase === "form") return (
  <div className="page-bg min-h-screen flex items-center justify-center px-4 py-10">
    <div className="w-full fade-in" style={{ maxWidth: "360px" }}>
      <div className="glass-card">

        {/* Phrase INSIDE the card */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3 float-anim">💝</div>
          <h2 className="font-display text-blue-100 leading-tight mb-1"
            style={{ fontSize: "clamp(1.5rem, 5.5vw, 1.9rem)" }}>
            May I finally court you,<br />the right way this time,
            <br /><em style={{ color: "#c9a84c" }}>Larrence?</em>
          </h2>
          <p className="font-body text-slate-400 text-xs mt-2 tracking-wide">— Alfred</p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(30,58,95,0.6)", marginBottom: "1.25rem" }} />

        {/* Checkboxes */}
        <div className="space-y-3 mb-5">
          {[
            { val: check1, set: setCheck1, label: "I agree to Alfred's heartfelt plea " },
            { val: check2, set: setCheck2, label: "I accept a dinner date in May 2026 " },
          ].map(({ val, set, label }, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <div
                className="mt-0.5 flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  width: "20px", height: "20px", borderRadius: "6px",
                  border: val ? "2px solid #c9a84c" : "2px solid #334d6e",
                  background: val ? "#c9a84c" : "transparent",
                  minWidth: "20px",
                }}
                onClick={() => set(!val)}
              >
                {val && <span style={{ color: "white", fontSize: "11px", fontWeight: "bold" }}>✓</span>}
              </div>
              <span className="font-body text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>
                {label}
              </span>
            </label>
          ))}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="font-body text-xs mb-2 block uppercase tracking-wide" style={{ color: "#94a3b8" }}>
            Pick a date 
          </label>
          <div className="flex gap-2">
            {["May 2, 2026", "May 3, 2026"].map((d) => (
              <button
                key={d}
                onClick={() => setDate(d)}
                className="flex-1 rounded-xl border-2 font-body text-sm transition-all"
                style={{
                  minHeight: "44px", padding: "0.5rem",
                  background: date === d ? "#c9a84c" : "rgba(255,255,255,0.07)",
                  borderColor: date === d ? "#c9a84c" : "#334d6e",
                  color: date === d ? "white" : "#1e293b",
                  color: date === d ? "white" : "#e2e8f0",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mb-4">
          <label className="font-body text-xs mb-2 block uppercase tracking-wide" style={{ color: "#94a3b8" }}>
            Pick a time 
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className="rounded-xl border-2 font-body text-sm transition-all"
                style={{
                  minHeight: "44px", padding: "0.5rem",
                  background: time === t ? "#c9a84c" : "rgba(255,255,255,0.07)",
                  borderColor: time === t ? "#c9a84c" : "#334d6e",
                  color: time === t ? "white" : "#e2e8f0",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="font-body text-xs mb-2 block uppercase tracking-wide" style={{ color: "#94a3b8" }}>
            Your email 
          </label>
          <input
            className="input-field w-full"
            placeholder="so I can confirm our date "
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            type="email"
            style={{ minHeight: "44px" }}
          />
          {emailError && (
            <p className="text-xs mt-1 font-body" style={{ color: "#c9a84c" }}>{emailError}</p>
          )}
        </div>

        {/* YES / NO */}
        <div className="flex gap-3 items-center justify-center">
          <button
            onClick={handleYes}
            disabled={!(check1 && check2 && email && date && time) || sending}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ minHeight: "44px" }}
          >
            {sending ? "Sending... 💌" : "YES "}
          </button>
          <button
            onMouseEnter={dodgeNo}
            className="btn-no"
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: "transform 0.2s ease",
              minHeight: "44px",
            }}
          >
            No
          </button>
        </div>

      </div>
    </div>
  </div>
);

  // ── DONE
  if (phase === "done") return (
    <div className="page-bg min-h-screen flex items-center justify-center px-6">
      <div className="glass-card w-full max-w-xs text-center fade-in">
        <div className="text-6xl mb-4 float-anim">🌹</div>
        <h2 className="font-display text-3xl text-blue-100 mb-3">You said yes.</h2>
        <p className="font-body text-blue-300 mb-1">
          See you on {date} at {time}, Babe. 
        </p>


      </div>
    </div>
  );

  return null;
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");

  const handleSubmit = async ({ email, date, time }) => {
    const res = await fetch("/send-email", {
      //const res = await fetch("http://localhost:3001/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Larrence", email, date, time }),
    });
    if (!res.ok) throw new Error("Failed to send");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

.page-bg {
  background: linear-gradient(135deg, #0d1f35 0%, #1a2f4a 40%, #1e3a5f 70%, #0f172a 100%);
  position: relative;
  background-attachment: fixed;
}
        .page-bg::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse at 15% 15%, rgba(30,58,95,0.45) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 85%, rgba(201,168,76,0.12) 0%, transparent 55%);
          pointer-events: none; z-index: 0;
        }

        .glass-card {
          background: rgba(15,23,42,0.75);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(30,58,95,0.6);
          border-radius: 2rem;
          padding: 1.75rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
          position: relative; z-index: 1;
        }

        .game-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px;
          background: linear-gradient(135deg, #1a2f4a, #ffc2d1);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px rgba(244,63,94,0.2);
        }

        /* ── LETTER TILES ── */
        .letter-tile {
          width: 40px; height: 44px;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: 16px;
          border-radius: 10px;
          transition: all 0.15s;
          user-select: none;
          text-transform: uppercase;
        }

        .answer-tile.empty {
          background: white;
          border: 2px solid #334d6e;
          color: transparent;
          cursor: default;
        }
        .answer-tile.filled {
          background: white;
          border: 2px solid #c9a84c;
          color: #a67c32;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(244,63,94,0.18);
        }
        .answer-tile.filled:hover { background: #0d1f35; }
        .answer-tile.correct-tile {
          background: #dcfce7 !important;
          border-color: #22c55e !important;
          color: #15803d !important;
        }

        .pool-tile {
          background: white;
          border: 2px solid #334d6e;
          color: #a67c32;
          cursor: pointer;
          box-shadow: 0 3px 0 #334d6e;
        }
        .pool-tile:hover:not(.used):not(:disabled) {
          background: #0d1f35;
          transform: translateY(-2px);
          box-shadow: 0 5px 0 #334d6e;
        }
        .pool-tile:active:not(.used):not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 1px 0 #334d6e;
        }
        .pool-tile.used {
          background: #f9f9f9;
          border-color: #e5e7eb;
          color: #e5e7eb;
          cursor: default;
          box-shadow: none;
        }

        .reveal-tile {
          width: 38px; height: 42px; font-size: 15px;
          background: white;
          border: 2px solid #c9a84c;
          color: #a67c32;
          box-shadow: 0 3px 0 #334d6e;
        }

        /* ── INPUT ── */
        .input-field {
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          border: 2px solid #1e3a5f;
          background: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          color: #8a6520; font-size: 0.9rem;
          outline: none; transition: border-color 0.2s;
        }
        .input-field::placeholder { color: #334d6e; }
        .input-field:focus { border-color: #c9a84c; }

        /* ── BUTTONS ── */
        .btn-primary {
          background: linear-gradient(135deg, #c9a84c, #a67c32);
          color: white;
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          padding: 0.72rem 1.5rem; border-radius: 9999px;
          border: none; cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(201,168,76,0.35);
          font-size: 0.9rem;
        }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(201,168,76,0.45); }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }

        .btn-no {
          background: transparent; color: #334d6e;
          font-family: 'DM Sans', sans-serif;
          padding: 0.72rem 1.5rem; border-radius: 9999px;
          border: 2px solid #334d6e; cursor: pointer;
          font-size: 0.9rem; position: relative; z-index: 10; white-space: nowrap;
        }

        /* ── ANIMATIONS ── */
        .fade-in { animation: fadeIn 0.55s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        .shake { animation: shake 0.5s ease; }
        @keyframes shake {
          0%,100% { transform:translateX(0); }
          20% { transform:translateX(-8px); } 40% { transform:translateX(8px); }
          60% { transform:translateX(-5px); } 80% { transform:translateX(5px); }
        }

        .float-anim { display:inline-block; animation: floatUp 3s ease-in-out infinite; }
        @keyframes floatUp { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }

        .pulse-anim { display:inline-block; animation: pulseS 1.2s ease-in-out infinite; }
        @keyframes pulseS { 0%,100% { transform:scale(1); } 50% { transform:scale(1.15); } }

        .dot-bounce { animation: dotB 1.2s ease-in-out infinite; }
        @keyframes dotB { 0%,80%,100% { transform:translateY(0); opacity:0.4; } 40% { transform:translateY(-8px); opacity:1; } }

.cursor-blink { 
  animation: blink 1s step-start infinite; 
  color: #c9a84c;
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
}

@keyframes blink { 
  0%, 100% { opacity: 1; } 
  50% { opacity: 0; } 
}

        .petal { position:fixed; font-size:1.4rem; opacity:0.12; z-index:0; animation:petalF 8s ease-in-out infinite; pointer-events:none; }
        .petal-1 { top:8%; left:4%; animation-delay:0s; }
        .petal-2 { top:18%; right:6%; animation-delay:2s; }
        .petal-3 { bottom:12%; left:8%; animation-delay:4s; }
        .petal-4 { bottom:22%; right:4%; animation-delay:6s; }
        @keyframes petalF { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-18px) rotate(12deg); } }
      `}</style>

      {page === "landing"    && <Landing    onContinue={() => setPage("welcome")} />}
      {page === "welcome"    && <Welcome    onStart={() => setPage("game")} />}
      {page === "game"       && <Game       onComplete={() => setPage("confession")} />}
      {page === "confession" && <Confession onSubmit={handleSubmit} />}
    </>
  );
}
