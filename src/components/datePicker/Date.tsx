"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { cn } from "../../lib/utils"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"




export function DatePickerDemo({ date, setDate }: { date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "w-[240px] flex items-center gap-2 border border-gray-600 rounded-lg px-4 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
