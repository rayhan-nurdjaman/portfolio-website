import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}

function Button({ children, href, external, className = "" }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-3 py-1 bg-neutral-100 " +
    "text-neutral-700 text-xs md:text-sm font-medium rounded-full " +
    "border border-neutral-200 transition-colors " +
    "hover:bg-neutral-200 hover:text-neutral-900 hover:border-neutral-300";

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (external) {
    return (
      <a
        className={combinedClasses}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={combinedClasses} to={href}>
      {children}
    </Link>
  );
}

export default Button;
