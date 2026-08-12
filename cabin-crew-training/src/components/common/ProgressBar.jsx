export default function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full bg-ink/10 rounded-full h-2.5">
      <div
        className="bg-signal h-2.5 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}