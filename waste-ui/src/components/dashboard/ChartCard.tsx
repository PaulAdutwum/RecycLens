export default function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface rounded-2xl p-6">
      <h3 className="font-display font-semibold text-text-primary">{title}</h3>
      {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
