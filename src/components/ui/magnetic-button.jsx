import { Magnetic } from '../motion/magnetic';
import { cn } from '../../lib/utils';

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary text-white shadow-glow-primary hover:brightness-110',
    secondary:
      'border border-border bg-surface-2 text-foreground hover:border-primary/40 hover:bg-surface',
    ghost: 'text-muted hover:text-foreground',
  };

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-premium',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Magnetic>
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button type={type} className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    </Magnetic>
  );
}
