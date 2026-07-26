export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {eyebrow && (
        <span className="text-accent-primary text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-text-primary">{title}</h2>
      {subtitle && <p className="mt-4 text-text-secondary text-lg">{subtitle}</p>}
    </div>
  );
}
