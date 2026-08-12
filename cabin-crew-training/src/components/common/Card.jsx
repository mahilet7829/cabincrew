export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_8px_30px_rgba(14,18,16,0.08)] border border-ink/5 p-6 ${className}`}
    >
      {children}
    </div>
  );
}