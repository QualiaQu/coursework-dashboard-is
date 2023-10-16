// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next"
// import Image from "next/image"
// import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/registry/new-york/ui/select"
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { UserNav } from "@/components/user-nav"
import { taskSchema } from "@/data/schema"
//
// export const metadata: Metadata = {
//     title: "Tasks",
//     description: "A task and issue tracker build using Tanstack Table.",
// }
//
// // Simulate a database read for tasks.
interface GoodTasks{
    subject: string;
    title: string;
    status:  string ;
    label: string;
    priority: string ;
    assignee: string ;
    startDate: string;
    dueDate: string | null;
}
interface Task {
    Subject: string;
    Status: { id: number; name: string };
    Priority: { id: number; name: string };
    Assignee: { id: number; name: string };
    StartDate: string;
    DueDate: string | null;
}

function getTasks(tasks : Task[]) {
    // let i:number = 0;
    const array: GoodTasks[] = []
    for (let elem of tasks) {
        // const elem:Task = tasks[i]
        const goodElem:GoodTasks =
        {
            subject : elem.Subject,
            title : "",
            status : elem.Status.name,
            label : "",
            priority :elem.Priority.name,
            assignee : elem.Assignee.name,
            startDate: elem.StartDate,
            dueDate : elem.DueDate,
        }
        console.log(goodElem)
        array.push(goodElem)
    }
    return array
    // return [
    //     {
    //         subject: "TASK-8782",
    //         title: "You can't compress the program without quantifying the open-source SSD pixel!",
    //         status: "in progress",
    //         label: "documentation",
    //         priority: "medium",
    //         Assignee: "Петя",
    //         StartDate: "02-07-2023",
    //         DueDate: "02-10-2023",
    //     },
    //     {
    //         subject: "TASK-7878",
    //         title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    //         status: "backlog",
    //         label: "documentation",
    //         priority: "medium",
    //         Assignee: "Антон",
    //         StartDate: "02-09-2023",
    //         DueDate: "",
    //     }
    // ]
    // const tasks = JSON.parse(data.toString())
    //
    // return z.array(taskSchema).parse(tasks)
}
// function getReleases() {
//     // Simulating fetching releases from JSON file or API endpoint
//     return [
//         "Apple",
//         "Banana",
//         "Blueberry",
//         "Grapes",
//         "Pineapple",
//     ];
// }
//
// export default function TaskPage() {
//     const tasks = getTasks()
//
//     return (
//         <>
//         <div>
//             <Select>
//                 <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Выберите релиз" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         <SelectLabel>Релизы</SelectLabel>
//                         <SelectItem value="apple">Apple</SelectItem>
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
//         </div>
//
//         <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//             <div className="flex items-center justify-between space-y-2">
//                 <div>
//                     <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//                     <p className="text-muted-foreground">
//                         Here&apos;s a list of your tasks for this month!
//                     </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <UserNav />
//                 </div>
//             </div>
//             <DataTable data={tasks} columns={columns} />
//         </div>
//         </>
//     )
// }


//попытка 2
// import { useState, useEffect } from 'react'; // Добавлен импорт useState и useEffect
// // import { taskSchema } from "@/data/schema"
//
// async function fetchReleases() {
//     const storedToken = localStorage.getItem('token');
//     // const tokenToUse = token || storedToken;
//     try {
//         const response = await fetch(`http://localhost:8080/get_redmine_versions?token=${storedToken}`);  // Замените на ваш реальный API-эндпоинт
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data)
//         return data; // Возвращаем данные из API
//     } catch (error) {
//         console.error('Error fetching releases:', error);
//         return [];
//     }
// }
//
// export default function TaskPage() {
//     const [releases, setReleases] = useState([]);
//     const [selectedRelease, setSelectedRelease] = useState('');
//
//     useEffect(() => {
//         async function initialize() {
//             const releasesData = await fetchReleases();
//             setReleases(releasesData);
//         }
//         initialize();
//     }, []);
//
//     const handleReleaseChange = (value) => {
//         setSelectedRelease(value);
//     };
//
//
//     // const tasks = getTasks();
//     const tasks = getTasks()
//     return (
//         <>
//             <div>
//                 <Select>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue
//                             placeholder="Выберите релиз"
//                             value={selectedRelease}
//                             onChange={handleReleaseChange}
//                         />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             <SelectLabel>Релизы</SelectLabel>
//                             {releases.map((release) => (
//                                 <SelectItem key={release.id} value={release.id}>
//                                     {release.name}
//                                 </SelectItem>
//                             ))}
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//             </div>
//
//             <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//                 <div className="flex items-center justify-between space-y-2">
//                     <div>
//                         <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//                         <p className="text-muted-foreground">
//                             Here&apos;s a list of your tasks for this month!
//                         </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <UserNav />
//                     </div>
//                 </div>
//                 <DataTable data={tasks} columns={columns} />
//             </div>
//         </>
//     );
// }




interface Release {
    id: number;
    version: string;
}

import React, { useState, useEffect } from 'react';

interface TaskPageProps {
    // Добавьте необходимые пропсы
}

const TaskPage: React.FC<TaskPageProps> = () => {
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedRelease, setSelectedRelease] = useState<string>('');
    const [tasksForRelease, setTasksForRelease] = useState<Task[]>([]);
    const storedToken = localStorage.getItem('token');
    useEffect(() => {
        async function initialize() {
            const releasesData = await fetchReleases();
            setReleases(releasesData);
        }
        initialize();
    }, []);

    async function fetchReleases(): Promise<Release[]> {
        // Реализация запроса для получения релизов
        // Пример:

        const response = await fetch(`http://localhost:8080/get_redmine_versions?token=${storedToken}`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const data = await response.json();
        return data;
    }

    async function fetchTasksForRelease(version: string): Promise<Task[]> {
        try {
            const response = await fetch(`http://localhost:8080/get_redmine_issues?token=${storedToken}&version=${version}`);
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при получении задач для релиза:', error);
            return [];
        }
    }

    const handleReleaseChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVersion = event.target.value;
        setSelectedRelease(selectedVersion);

        // Fetch tasks for the selected release
        const tasks = await fetchTasksForRelease(selectedVersion);
        setTasksForRelease(tasks);
    };
    const good_tasks = getTasks(tasksForRelease)

    return (
        <>
            {/*<div>*/}
            {/*    <Select>*/}
            {/*    <SelectTrigger className="w-[180px]">*/}
            {/*    <SelectValue*/}
            {/*        placeholder="Выберите релиз"*/}
            {/*        value={selectedRelease}*/}
            {/*        onChange={handleReleaseChange}*/}
            {/*    />*/}
            {/*    </SelectTrigger>*/}
            {/*    <SelectContent>*/}
            {/*        <SelectGroup>*/}
            {/*            <SelectLabel>Релизы</SelectLabel>*/}
            {/*                {releases.map((release) => (*/}
            {/*            <SelectItem key={release.id} value={release.id}>*/}
            {/*                {release.name}*/}
            {/*            </SelectItem>*/}
            {/*            ))}*/}
            {/*        </SelectGroup>*/}
            {/*    </SelectContent>*/}
            {/*    </Select>*/}
            {/*</div>*/}
            <div>
                <select onChange={handleReleaseChange} value={selectedRelease}>
                    <option value="">Выберите релиз</option>
                    {releases.map((release) => (
                        <option key={release.id} value={release.version}>
                            {release.name}
                        </option>
                    ))}
                </select>
            </div>

             {/*Остальная часть компонента*/}
            {/*<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">*/}
            {/*    <div>*/}
            {/*        <h3>Tasks for Selected Release</h3>*/}
            {/*        <ul>*/}
            {/*            {tasksForRelease.map((task, index) => (*/}
            {/*                <li key={index}>*/}
            {/*                    <strong>Subject:</strong> {task.Subject}<br />*/}
            {/*                    <strong>Status:</strong> {task.Status.name}<br />*/}
            {/*                    <strong>Priority:</strong> {task.Priority.name}<br />*/}
            {/*                    <strong>Assignee:</strong> {task.Assignee.name}<br />*/}
            {/*                    <strong>Start Date:</strong> {task.StartDate}<br />*/}
            {/*                    <strong>Due Date:</strong> {task.DueDate || 'N/A'}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserNav />
                    </div>
                </div>
                <DataTable data={good_tasks} columns={columns} />
            </div>
        </>
    );
};

export default TaskPage;