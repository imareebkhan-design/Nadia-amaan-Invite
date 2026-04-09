import { useMemo } from "react";

const PETAL_COLORS = [
  "hsl(349, 80%, 81%)",
  "hsl(345, 75%, 75%)",
  "hsl(140, 25%, 60%)",
  "hsl(43, 52%, 54%)",
  "hsl(349, 60%, 70%)",
  "hsl(20, 85%, 65%)",
];

const FloralPetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 8 + Math.random() * 10,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${-Math.random() * 14}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            "--left": p.left,
            "--duration": p.duration,
            "--delay": p.delay,
            "--drift": p.drift,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: `0 0 6px ${p.color}40`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FloralPetals;
