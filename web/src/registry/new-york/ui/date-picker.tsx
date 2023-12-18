"use client"

// import * as React from "react"
import { format, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/registry/new-york/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { useState, useEffect } from 'react';
import * as moment from "moment";


// interface DatePickerProps {
//     currentDate: string;
// }

export function DatePickerDemo(s) {
    const [date, setDate] = useState<Date>()
    //
    // useEffect(() => {
    //     setDate(new Date(parseISO(currentDate)));
    // }, []);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[490px] p-0 justify-start text-left mr-3 font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {date ? format(date, "dd-MM-yyyy") : <span>Выберите дату</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
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

const MyDatePicker = props => (
    <div>
        <DatePickerDemo
            {...props.input}
            dateFormat="DD-MM-YYYY"
            selected={props.input.value ? moment(props.input.value, 'DD-MM-YYYY') : moment()}
            placeholderText={props.placeholder}
            disabled={props.disabled}
        />
        {
            props.meta.touched && props.meta.error &&
            <span className="error">
        { props.intl.formatMessage({ id: props.meta.error }) }
      </span>
        }
    </div>
);

export default MyDatePicker;