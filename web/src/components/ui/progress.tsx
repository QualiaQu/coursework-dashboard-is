import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps {
    className?: string;
    value?: number;
    openTasks: number;
    closedTasks: number;
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, value, openTasks, closedTasks, ...props }, ref) => {
    const totalTasks = openTasks;
    const progress = totalTasks > 0 ? (closedTasks / totalTasks) * 100 : 0;

    return (
        <div className="relative">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold"
                style={{ zIndex: 1, textShadow: '1px 1px 2px #000' }}
            >
                {progress.toFixed(2)}%
            </div>
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - progress}%)` }}
            />
        </ProgressPrimitive.Root>
        </div>
    );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };