export default function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2L4 7V15.5C4 23.1 9.12 30.1 16 31C22.88 30.1 28 23.1 28 15.5V7L16 2Z"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2L4 7V15.5C4 23.1 9.12 30.1 16 31C22.88 30.1 28 23.1 28 15.5V7L16 2Z"
        className="fill-primary/10"
      />
      <path
        d="M12 15.5L15 18.5L20.5 13"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
