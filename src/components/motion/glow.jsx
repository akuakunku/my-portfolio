import { cn } from '../../lib/utils';

export function Glow({ className, children, variant = 'primary' }) {
  const variants = {
    primary: 'shadow-glow-primary',
    secondary: 'shadow-glow-secondary',
    subtle: 'shadow-glow-subtle',
  };

  return (
    <div className={cn('relative', variants[variant], className)}>{children}</div>
  );
}
