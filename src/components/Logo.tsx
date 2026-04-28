interface LogoProps {
  size?: number
  className?: string
}

/**
 * Placeholder logo: PW monogram in brand orange.
 * Replace with full SVG logo once huashu-design produces brand assets.
 */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PixWarp logo"
    >
      <rect width="40" height="40" rx="8" fill="#F97316" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.05em"
      >
        PW
      </text>
    </svg>
  )
}
