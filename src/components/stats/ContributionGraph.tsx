"use client"

import { format, parseISO, subDays } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ContributionGraphProps {
  checkinDates: string[]
  habitCreatedAt: number
  userTimezone: string
}

type CellState = "completed" | "missed" | "not-applicable"

interface CellData {
  date: string
  state: CellState
}

export function buildCellData(
  checkinDates: string[],
  habitCreatedAt: number,
  userTimezone: string,
  today: string,
): Array<CellData> {
  const dates = Array.from({ length: 91 }, (_, i) =>
    format(subDays(parseISO(today), 90 - i), "yyyy-MM-dd"),
  )

  const creationDate = formatInTimeZone(
    new Date(habitCreatedAt),
    userTimezone,
    "yyyy-MM-dd",
  )

  const checkinSet = new Set<string>(checkinDates)

  return dates.map((date) => {
    if (date < creationDate) {
      return { date, state: "not-applicable" }
    }
    if (checkinSet.has(date)) {
      return { date, state: "completed" }
    }
    return { date, state: "missed" }
  })
}

const cellColorMap: Record<CellState, string> = {
  completed: "bg-[#16A34A]",
  missed: "bg-[#3A3A3C]",
  "not-applicable": "bg-[#3A3A3C]/30",
}

function tooltipText(date: string, state: CellState): string {
  const label = format(parseISO(date), "MMMM d")
  if (state === "completed") return `${label} — completed`
  if (state === "missed") return `${label} — missed`
  return `${label} — before habit started`
}

export function ContributionGraph({
  checkinDates,
  habitCreatedAt,
  userTimezone,
}: ContributionGraphProps) {
  const today = formatInTimeZone(new Date(), userTimezone, "yyyy-MM-dd")
  const cells = buildCellData(checkinDates, habitCreatedAt, userTimezone, today)

  return (
    <TooltipProvider>
      <div className="grid grid-cols-[repeat(13,12px)] grid-rows-[repeat(7,12px)] gap-[2px]">
        {cells.map((cell) => (
          <Tooltip key={cell.date}>
            <TooltipTrigger
              render={
                <div
                  className={`w-3 h-3 rounded-[2px] ${cellColorMap[cell.state]}`}
                />
              }
            />
            <TooltipContent>{tooltipText(cell.date, cell.state)}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
