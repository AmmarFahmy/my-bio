import { CSSProperties } from 'react';

type Layer = 'back' | 'front';

// Gold sparks drifting up through the night. Positions come from the index
// rather than Math.random(), so server and client render identical markup,
// and negative delays mean the sky is already full on first paint.
const LAYERS: Record<Layer, { count: number; size: (i: number) => number; duration: (i: number) => number }> = {
  // Behind the glass: these frost as they pass behind a pane
  back: {
    count: 16,
    size: (i) => 2 + (i % 3),
    duration: (i) => 13 + ((i * 7) % 10),
  },
  // In front: few, slower, slightly larger — always crisp
  front: {
    count: 7,
    size: (i) => 3 + (i % 2),
    duration: (i) => 19 + ((i * 5) % 9),
  },
};

export default function Embers({ layer }: { layer: Layer }) {
  const { count, size, duration } = LAYERS[layer];
  const offset = layer === 'back' ? 7 : 31;

  return (
    <div className={`embers embers--${layer}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${(i * 53 + offset) % 100}%`,
              width: size(i),
              height: size(i),
              '--dur': `${duration(i)}s`,
              '--delay': `${-((i * 13) % 22)}s`,
              '--drift': `${((i % 5) - 2) * 24}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
