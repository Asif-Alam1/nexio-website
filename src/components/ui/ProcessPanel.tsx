interface ProcessPanelProps {
  step: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export default function ProcessPanel({
  step,
  title,
  description,
  isActive = false,
}: ProcessPanelProps) {
  return (
    <div
      className="process-panel w-[80vw] md:w-[80vw] flex-shrink-0 flex items-center gap-2xl px-2xl py-4xl"
      aria-current={isActive ? "true" : undefined}
    >
      {/* Decorative large number */}
      <div className="flex-shrink-0 w-[160px] text-right select-none">
        <span className="font-display text-[120px] font-extrabold text-blue opacity-[0.08] leading-none">
          {step}
        </span>
      </div>

      {/* Vertical separator */}
      <div className="flex-shrink-0 w-[2px] h-16 bg-blue" />

      {/* Content */}
      <div className="flex flex-col gap-m max-w-md">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-blue">
          STEP {step}
        </p>
        <h3 className="font-display text-h2 text-white font-bold">{title}</h3>
        <p className="text-body text-slate-light leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
