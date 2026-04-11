/**
 * Container — shared max-width layout primitive.
 *
 * Sizes:
 *   default — max-w-container (62rem ≈ 992px)
 *   wide    — max-w-container-wide (80rem ≈ 1280px)
 *
 * Always centered with px padding for mobile comfort.
 * Server Component — no client-side behavior.
 */
interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'wide';
  className?: string;
}

export function Container({
  children,
  size = 'default',
  className = '',
}: ContainerProps) {
  const widthClass = size === 'wide' ? 'max-w-container-wide' : 'max-w-container';

  return (
    <div
      className={`${widthClass} mx-auto w-full px-lg lg:px-xl ${className}`}
    >
      {children}
    </div>
  );
}
