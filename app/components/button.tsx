import { Link } from "react-router";

function Button({
  children,
  href,
  external,
  className,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a
        className={`h-12 min-w-12 xl:h-16 xl:min-w-16 w-fit bg-[url('/edge_sheen.png')] bg-size[48px_48px] xl:bg-size[64px_64px] p-[2px] outline-2 outline-black rounded-full ${className}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col justify-center h-full w-full rounded-full bg-[url('/bg_sheen.png')] bg-size[48px_48px] xl:bg-size[64px_64px] bg-[#A0A0A0] hover:bg-white bg-blend-multiply">
          {children}
        </div>
      </a>
    );
  }
  return (
    <Link
      className={`h-12 min-w-12 xl:h-16 xl:min-w-16 w-fit bg-[url('/edge_sheen.png')] bg-size[48px_48px] xl:bg-size[64px_64px] p-[2px] outline-2 outline-black rounded-full ${className}`}
      to={href}
    >
      <div className="flex flex-col justify-center h-full w-full rounded-full bg-[url('/bg_sheen.png')] bg-size[48px_48px] xl:bg-size[64px_64px] bg-[#A0A0A0] hover:bg-white bg-blend-multiply">
        {children}
      </div>
    </Link>
  );
}

export default Button;
