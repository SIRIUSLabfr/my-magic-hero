interface Props {
  farbe: string;
}

export default function AvatarMaske({ farbe }: Props) {
  return (
    <g className="maske">
      {/* Miraculous-style mask over the eyes */}
      <path
        d="M108 72 Q115 62 132 64 Q145 66 150 70 Q155 66 168 64 Q185 62 192 72 Q188 82 175 84 Q165 85 155 80 Q150 78 145 80 Q135 85 125 84 Q112 82 108 72 Z"
        fill={farbe}
        opacity="0.85"
      />
      {/* Mask edge detail */}
      <path
        d="M108 72 Q115 62 132 64 Q145 66 150 70 Q155 66 168 64 Q185 62 192 72"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </g>
  );
}
