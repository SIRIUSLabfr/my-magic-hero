export default function AvatarBrille() {
  return (
    <g className="brille">
      {/* Left lens */}
      <ellipse cx="131" cy="74" rx="20" ry="20" fill="white" opacity="0.18" stroke="#1a1a2e" strokeWidth="2.5" />
      {/* Right lens */}
      <ellipse cx="169" cy="74" rx="20" ry="20" fill="white" opacity="0.18" stroke="#1a1a2e" strokeWidth="2.5" />
      {/* Bridge */}
      <path d="M148 74 Q150 71 152 74" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Temple arms */}
      <path d="M111 76 Q104 76 100 80" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M189 76 Q196 76 200 80" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Lens shines */}
      <ellipse cx="124" cy="68" rx="4" ry="2" fill="white" opacity="0.6" transform="rotate(-25 124 68)" />
      <ellipse cx="162" cy="68" rx="4" ry="2" fill="white" opacity="0.6" transform="rotate(-25 162 68)" />
    </g>
  );
}
