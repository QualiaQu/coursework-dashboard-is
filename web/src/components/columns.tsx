"use client"

import { ColumnDef } from "@tanstack/react-table"

// import { Badge } from "@/registry/new-york/ui/badge"

import { priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "subject",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Subject" />
        ),
        cell: ({ row }) => <div className={`w-[60px] h-${String(row.getValue("subject")).length > 5 ? 7 : 5}`}>{row.getValue("subject")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "project",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Project" />
        ),
        cell: ({ row }) => <div className={`w-[80px] h-${String(row.getValue("project")).length > 5 ? 7 : 5}`}>{row.getValue("project")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "tracker",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tracker" />
        ),
        cell: ({ row }) => <div className={`w-[80px] h-${String(row.getValue("tracker")).length > 5 ? 7 : 5}`}>{row.getValue("tracker")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className={`flex w-[50px] items-center h-3`}>
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority")
            )

            if (!priority) {
                return null
            }

            return (
                <div className={`flex items-center ${priority.color} h-3`}>
                    <span>{priority.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    {
        accessorKey: "assignee",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assignee" />
        ),
        cell: ({ row }) => <div className={`w-[80px] h-${String(row.getValue("assignee")).length > 5 ? 7 : 5}`}>{row.getValue("assignee")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start date" />
        ),
        cell: ({ row }) => <div className={`w-[80px] h-5`}>{row.getValue("startDate")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // {
    //     accessorKey: "dueDate",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Due date" />
    //     ),
    //     cell: ({ row }) => <div className="w-[80px]">{row.getValue("dueDate")}</div>,
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id))
    //     },
    // },
]