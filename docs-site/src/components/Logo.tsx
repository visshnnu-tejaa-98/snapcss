interface LogoProps {
  size?: number
  showBadge?: boolean
  badgeText?: string
}

export default function Logo({ size = 17, showBadge = false, badgeText }: LogoProps) {
  return (
    <div className="hp-logo">
      <span className="hp-mark" />
      <span className="hp-wordmark" style={{ fontSize: size }}>
        snap<span className="hp-css">css</span>
      </span>
      {showBadge && badgeText && (
        <span className="logo-badge">{badgeText}</span>
      )}
    </div>
  )
}
