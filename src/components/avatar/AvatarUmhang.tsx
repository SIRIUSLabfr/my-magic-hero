interface Props {
  farbe: string;
}

export default function AvatarUmhang({ farbe }: Props) {
  return (
    <g className="umhang">
      {/* Cape flowing behind body */}
      <path
        d="M100 120 Q80 180 70 280 Q75 320 110 340 L150 345 L190 340 Q225 320 230 280 Q220 180 200 120 Z"
        fill={farbe}
        opacity="0.9"
      />
      {/* Cape inner shadow */}
      <path
        d="M110 130 Q95 190 88 270 Q93 305 120 325 L150 328 L180 325 Q207 305 212 270 Q205 190 190 130 Z"
        fill={farbe}
        opacity="0.6"
      />
    </g>
  );
}
