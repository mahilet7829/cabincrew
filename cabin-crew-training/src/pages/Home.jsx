import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-10 items-center py-12">
        <div>
          <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
            STATUS: READY FOR BOARDING
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5">
            Get exam-ready<br />before the airline is.
          </h1>
          <p className="text-slate-custom text-base mb-8 max-w-sm">
            Safety drills, service standards, grooming, and real interview
            questions — structured the way an airline actually screens you.
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5">
  Get exam-ready<br />and interview-ready.
</h1>
<p className="text-slate-custom text-base mb-8 max-w-sm">
  Safety drills, service standards, grooming, and real interview
  questions — structured the way Ethiopian Airlines actually
  screens and interviews candidates.
</p>
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition"
            >
              Start Training
            </Link>
            <Link
              to="/login"
              className="border border-ink/15 px-6 py-3 rounded-full font-medium hover:bg-ink/5 transition"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Floating boarding-pass style mockup card */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(14,18,16,0.15)] border border-ink/5 p-6 rotate-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-mono-label text-xs text-slate-custom">MODULE</p>
                <p className="font-display font-bold text-lg">Safety & Emergency</p>
              </div>
              <span className="font-mono-label text-xs bg-signal/20 text-signal-dark px-2 py-1 rounded">
                4/6 DONE
              </span>
            </div>
            <div className="w-full bg-ink/5 rounded-full h-2 mb-1">
              <div className="bg-signal h-2 rounded-full" style={{ width: "66%" }} />
            </div>
            <p className="font-mono-label text-xs text-slate-custom mt-3">
              NEXT: Fire Onboard — Est. 8 min
            </p>
          </div>
          <div className="absolute -bottom-5 -left-5 bg-ink text-paper rounded-2xl shadow-lg p-4 -rotate-3 hidden sm:block">
            <p className="font-mono-label text-xs text-signal">SCORE</p>
            <p className="font-display font-bold text-2xl">92%</p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-ink rounded-2xl px-8 py-8 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-paper">
        {[
  ["5", "Training modules"],
  ["30+", "Practice questions"],
  ["90s", "Evacuation standard"],
  ["1-on-1", "Interview simulation"],
].map(([stat, label]) => (
          <div key={label}>
            <p className="font-display font-bold text-2xl text-signal">{stat}</p>
            <p className="text-paper/60 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}