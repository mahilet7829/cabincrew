export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <div className="mb-6">
      <p className="font-medium mb-3">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition ${
              selected === i
                ? "border-signal bg-signal/10 font-medium"
                : "border-ink/10 hover:border-ink/20"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}