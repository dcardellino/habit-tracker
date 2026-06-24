import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributionGraph } from "./ContributionGraph"

interface StatsCardProps {
  habitId: string
  habitName: string
  habitEmoji: string
  currentStreak: number
  bestStreak: number
  completionRate7d: number
  completionRate30d: number
  totalCheckins: number
  habitCreatedAt: number
  checkinDates: string[]
  userTimezone: string
}

function formatRate(rate: number, totalCheckins: number): string {
  if (rate === 0 && totalCheckins === 0) return "–"
  return Math.round(rate * 100) + "%"
}

export function StatsCard({
  habitId: _habitId,
  habitName,
  habitEmoji,
  currentStreak,
  bestStreak,
  completionRate7d,
  completionRate30d,
  totalCheckins,
  habitCreatedAt,
  checkinDates,
  userTimezone,
}: StatsCardProps) {
  return (
    <Card className="bg-[#1C1C1E] border-[#2C2C2E] text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{habitEmoji}</span>
          <CardTitle>{habitName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="font-mono text-2xl font-bold text-foreground">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">current streak</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-foreground">{bestStreak}</div>
            <div className="text-xs text-muted-foreground">best streak</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-foreground">
              {formatRate(completionRate7d, totalCheckins)}
            </div>
            <div className="text-xs text-muted-foreground">7-day</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-foreground">
              {formatRate(completionRate30d, totalCheckins)}
            </div>
            <div className="text-xs text-muted-foreground">30-day</div>
          </div>
        </div>
        <ContributionGraph
          checkinDates={checkinDates}
          habitCreatedAt={habitCreatedAt}
          userTimezone={userTimezone}
        />
      </CardContent>
    </Card>
  )
}
