/**
 * Prose — shared reading-width constraint for long-form text.
 *
 * Constrains content to ~65ch for comfortable long-form reading.
 * Inherits body font and line-height from globals.
 * Server Component — no client-side behavior.
 */
interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className = '' }: ProseProps) {
  return (
    <div
      className={`max-w-prose font-body text-base leading-normal ${className}`}
    >
      {children}
    </div>
  );
}
