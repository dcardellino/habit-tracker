"use client"

import { format, parseISO, addDays, subDays, subWeeks, getDay } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

interface HabitMiniGridProps {
  checkinDates: string[]
  habitCreatedAt: number
  color: string
}

type CellState = "completed" | "missed" | "not-applicable"

interface CellData {
  date: string
  state: CellState
}

function buildCells(
  checkinDates: string[],
  habitCreatedAt: number,
): CellData[] {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const today = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd")
  const todayDate = parseISO(today)

  const dow = getDay(todayDate) // 0=Sun, 1=Mon...6=Sat
  const daysFromMonday = dow === 0 ? 6 : dow - 1
  const thisMonday = subDays(todayDate, daysFromMonday)
  const startMonday = subWeeks(thisMonday, 12)

  const creationDate = formatInTimeZone(
    new Date(habitCreatedAt),
    timezone,
    "yyyy-MM-dd",
  )

  const checkinSet = new Set<string>(checkinDates)

  const cells: CellData[] = []

  for (let week = 0; week <= 12; week++) {
    for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
      const date = format(
        addDays(startMonday, week * 7 + dayOfWeek),
        "yyyy-MM-dd",
      )

      let state: CellState
      if (date > today) {
        state = "not-applicable"
      } else if (date < creationDate) {
        state = "not-applicable"
      } else if (checkinSet.has(date)) {
        state = "completed"
      } else {
        state = "missed"
      }

      cells.push({ date, state })
    }
  }

  return cells
}

export function HabitMiniGrid({
  checkinDates,
  habitCreatedAt,
  color,
}: HabitMiniGridProps) {
  const cells = buildCells(checkinDates, habitCreatedAt)

  return (
    <div className="flex items-start gap-1">
      {/* Day labels */}
      <div className="flex flex-col" style={{ gap: "2px" }}>
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((label) => (
          <div
            key={label}
            className="font-mono text-[10px] leading-[8px] h-2 flex items-center"
            style={{ color: "#8E8E93", width: "14px" }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid — column-major fill with grid-flow-col */}
      <div
        className="grid gap-[2px]"
        style={{
          gridTemplateRows: "repeat(7, 8px)",
          gridAutoFlow: "column",
          gridAutoColumns: "8px",
        }}
      >
        {cells.map((cell, i) => (
          <div
            key={i}
            className="rounded-[2px]"
            style={{
              width: "8px",
              height: "8px",
              backgroundColor:
                cell.state === "completed"
                  ? color
                  : cell.state === "not-applicable"
                    ? "#3A3A3C4D"
                    : "#3A3A3C",
            }}
          />
        ))}
      </div>
    </div>
  )
}
