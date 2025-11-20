import { createFileRoute } from '@tanstack/react-router'
import { getCurrentGroup } from '@/server/group.calculate-stats'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => await getCurrentGroup(),
})

function RouteComponent() {
  const { previousGroup, currentGroup, nextGroups } = Route.useLoaderData()

  // Combine all days into one timeline
  const allDays = [previousGroup, currentGroup, ...nextGroups]

  const formatDayOfWeek = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('ro-RO', { weekday: 'short' }).toUpperCase();
  }

  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.toLocaleDateString('ro-RO', { month: 'short' });
    return { day, month };
  }

  const isToday = (index: number) => index === 1; // Today is at index 1 (after yesterday)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-3 py-4 max-w-4xl">
        {/* Compact Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Orar Serviciu
          </h1>
          <p className="text-xs text-blue-200/80">
            Organizare grupe elevi
          </p>
        </div>

        {/* Timeline View - Ultra Compact */}
        <div className="space-y-2">
          {allDays.map((day, index) => {
            const isCurrentDay = isToday(index);
            const dateInfo = formatDate(day.date);
            const isPrevious = index === 0;

            return (
              <Card
                key={index}
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${isCurrentDay
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-400 shadow-2xl scale-[1.01]'
                    : day.group
                      ? 'bg-white/95 hover:bg-white hover:shadow-md'
                      : 'bg-gray-100/70 hover:bg-gray-100'
                  }
                  ${isPrevious ? 'opacity-50' : ''}
                `}
              >
                {/* Timeline indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCurrentDay ? 'bg-yellow-400' : day.group ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />

                <CardContent className="p-2.5 sm:p-3">
                  <div className="flex items-center justify-between gap-1 sm:gap-3">
                    {/* Date Section - Compact */}
                    <div className="flex items-center gap-1.5 min-w-[80px] sm:min-w-[120px] shrink-0">
                      {isPrevious && <ChevronLeft className={`h-3 w-3 ${isCurrentDay ? 'text-white/60' : 'text-gray-400'}`} />}
                      {!isPrevious && !isCurrentDay && index === 2 && <ChevronRight className="h-3 w-3 text-blue-500" />}

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`text-center ${isCurrentDay ? 'text-white' : 'text-gray-900'}`}>
                          <div className={`text-lg sm:text-2xl font-bold leading-none ${isCurrentDay ? 'text-white' : 'text-gray-900'}`}>
                            {dateInfo.day}
                          </div>
                          <div className={`text-[9px] sm:text-[10px] uppercase mt-0.5 ${isCurrentDay ? 'text-blue-100' : 'text-gray-500'}`}>
                            {dateInfo.month}
                          </div>
                        </div>

                        <div className={`text-[10px] sm:text-sm font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>
                          {formatDayOfWeek(day.date)}
                        </div>
                      </div>
                    </div>

                    {/* Label - Hidden on very small screens */}
                    <div className="hidden sm:block shrink-0">
                      {isCurrentDay && (
                        <Badge variant="secondary" className="bg-yellow-400 text-gray-900 font-bold text-xs px-2 py-0.5">
                          ASTĂZI
                        </Badge>
                      )}
                      {isPrevious && (
                        <Badge variant="outline" className="text-gray-500 border-gray-400 text-xs px-2 py-0.5">
                          IERI
                        </Badge>
                      )}
                    </div>

                    {/* Group Badge - Prominent */}
                    <div className="flex justify-center sm:justify-end flex-1 min-w-0">
                      {day.group ? (
                        <Badge
                          variant={isCurrentDay ? "secondary" : "default"}
                          className={`
                            ${isCurrentDay
                              ? 'bg-white text-blue-600 text-2xl sm:text-3xl md:text-4xl py-2 sm:py-3 px-4 sm:px-6 md:px-8 font-black shadow-lg'
                              : 'text-xl sm:text-2xl md:text-3xl py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 font-bold'
                            }
                          `}
                        >
                          {day.group}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className={`
                            ${isCurrentDay
                              ? 'border-white/40 text-white/80 text-base sm:text-lg md:text-xl py-1.5 sm:py-2 px-3 sm:px-4 md:px-6'
                              : 'text-sm sm:text-base md:text-lg py-1 sm:py-1.5 px-2 sm:px-3 md:px-4 text-gray-500'
                            }
                          `}
                        >
                          Liber
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info - More compact */}
        <div className="mt-4 text-center text-xs text-blue-200/50">
          7 zile: ieri • astăzi • următoarele 5 zile
        </div>
      </div>
    </div>
  )
}
