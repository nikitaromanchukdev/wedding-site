"use client";

/**
 * Month calendar for the wedding date, with the reserved day circled as if
 * marked by hand in pencil. Geometry is derived from the given Date so it
 * stays correct if the date ever changes.
 */

// Monday-first week, Russian short weekday labels.
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS_RU = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

// SVG grid geometry.
const PAD = 33;
const CELL = 42;
const ROW_TOP = 104; // top of the first day row
const ROW_H = 46;
const cx = (col: number) => PAD + CELL / 2 + col * CELL; // 54 .. 306
const cy = (row: number) => ROW_TOP + CELL / 2 + row * ROW_H;

type Props = {
  date: Date;
  /** Draw the pencil ring in (animate the stroke) once true. */
  animate?: boolean;
  className?: string;
};

export function WeddingCalendar({ date, animate = true, className }: Props) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // JS getDay(): Sun=0 → convert to Mon-first (Mon=0 … Sun=6).
  const firstCol = (new Date(year, month, 1).getDay() + 6) % 7;

  // Build the day cells with their grid position.
  const cells: { day: number; col: number; row: number }[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const index = firstCol + d - 1;
    cells.push({ day: d, col: index % 7, row: Math.floor(index / 7) });
  }

  const mark = cells.find((c) => c.day === day)!;
  const mx = cx(mark.col);
  const my = cy(mark.row);

  return (
    <svg
      viewBox="0 0 360 404"
      className={className}
      role="img"
      aria-label={`${day} ${MONTHS_RU[month]} ${year}`}
      fill="none"
    >
      {/* Title */}
      <text
        x="180"
        y="42"
        textAnchor="middle"
        fill="var(--black)"
        fontFamily="var(--font-comorant), Georgia, serif"
        fontStyle="italic"
        fontSize="24"
      >
        {MONTHS_RU[month]} {year}
      </text>

      {/* Hairline under the title */}
      <line
        x1={PAD}
        y1="58"
        x2={360 - PAD}
        y2="58"
        stroke="var(--hazelnut)"
        strokeWidth="1"
        opacity="0.45"
      />

      {/* Weekday header */}
      {WEEKDAYS.map((w, i) => (
        <text
          key={w}
          x={cx(i)}
          y="84"
          textAnchor="middle"
          fill="var(--hazelnut)"
          fontFamily="var(--font-ss3), system-ui, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {w.toUpperCase()}
        </text>
      ))}

      {/* Day numbers */}
      {cells.map((c) => {
        const isMark = c.day === day;
        const isWeekend = c.col >= 5;
        return (
          <text
            key={c.day}
            x={cx(c.col)}
            y={cy(c.row) + 7}
            textAnchor="middle"
            fontFamily="var(--font-comorant), Georgia, serif"
            fontSize={isMark ? "23" : "19"}
            fill={isMark ? "var(--black)" : "var(--black)"}
            opacity={isMark ? 1 : isWeekend ? 0.55 : 0.78}
          >
            {c.day}
          </text>
        );
      })}

      {/* Hand-drawn pencil heart around the reserved day */}
      <g transform={`translate(${mx} ${my}) rotate(-6)`}>
        {/* faint offset under-stroke for sketched depth */}
        <path
          d={HEART}
          stroke="var(--columbia-blue)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
          transform="translate(1.5 1)"
          pathLength={1}
          style={ringStroke(animate, "1.6s")}
        />
        {/* main pencil pass */}
        <path
          d={HEART}
          stroke="var(--columbia-blue)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
          pathLength={1}
          style={ringStroke(animate, "1.5s")}
        />
      </g>
    </svg>
  );
}

// Slightly irregular, over-shooting heart — reads as hand-scribbled in pencil.
const HEART =
  "M 0,-11 C -6,-24 -23,-28 -29,-13 C -34,-2 -16,13 0,27 C 16,13 34,-2 29,-13 C 23,-28 6,-24 2,-11";

// Draw-in: keep the stroke hidden until `animate`, then sweep it on.
function ringStroke(animate: boolean, duration: string): React.CSSProperties {
  return {
    strokeDasharray: 1,
    strokeDashoffset: animate ? 0 : 1,
    transition: `stroke-dashoffset ${duration} cubic-bezier(0.65,0,0.35,1) 1.1s`,
  };
}
