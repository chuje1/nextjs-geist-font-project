"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { Task, importanceColors } from "@/types/task"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TaskCalendarProps {
  tasks: Task[]
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<Date>()

  const footer = selectedDay ? (
    <p>You selected {selectedDay.toDateString()}.</p>
  ) : (
    <p>Please pick a day.</p>
  )

  const renderTaskIndicators = (day: Date) => {
    const activeTasks = tasks.filter(
      (task) => day >= task.startDate && day <= task.endDate
    )

    if (activeTasks.length === 0) return null

    return (
      <div className="absolute bottom-1 left-0 right-0 flex flex-col gap-0.5 px-1">
        {activeTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "h-0.5 rounded-sm",
              importanceColors[task.importance]
            )}
            title={task.name}
          />
        ))}
      </div>
    )
  }

  return (
    <DayPicker
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
      footer={footer}
      className={cn("p-3 bg-white rounded-lg border shadow-sm")}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center px-8",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal",
          "hover:bg-slate-100 focus:bg-slate-100",
          "aria-selected:opacity-100"
        ),
        day_selected: cn(
          "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50",
          "focus:bg-slate-900 focus:text-slate-50"
        ),
        day_today: "bg-slate-100",
        day_outside: "text-slate-400 opacity-50",
        day_disabled: "text-slate-400 opacity-50",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        Day: ({ date, ...props }) => (
          <div {...props} className="relative h-9 w-9 p-0">
            <div className="flex h-full w-full items-center justify-center">
              {date?.getDate()}
            </div>
            {date && renderTaskIndicators(date)}
          </div>
        ),
      }}
    />
  )
}
