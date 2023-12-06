import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { UserNav } from "@/components/user-nav"
import { DatePickerDemo } from "@/registry/new-york/ui/date-picker.tsx"
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { Input } from "@/registry/new-york/ui/input"
import { Progress } from "@/components/ui/progress"



interface GoodTasks{
    subject: string;
    project: string;
    tracker: string;
    status:  string ;
    priority: string ;
    assignee: string ;
    startDate: string;
    dueDate: string | null;
}
interface Task {
    Subject: string;
    Project: { id: number; name: string };
    Tracker: { id: number; name: string };
    Status: { id: number; name: string };
    Priority: { id: number; name: string };
    Assignee: { id: number; name: string };
    StartDate: string;
    DueDate: string | null;
}
interface Release {
    id: number;
    version: string;
    name : string;
}

function counterClosed(tasks : GoodTasks[]){
    let count = 0;
    for (let elem of tasks) {

        if(elem.status == "Closed" ){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            count+=1;
        }

    }
    return count;
}


function getTasks(tasks : Task[]) {
    // let i:number = 0;
    const array: GoodTasks[] = []
    for (let elem of tasks) {
        // const elem:Task = tasks[i]
        const goodElem:GoodTasks =
        {
            subject : elem.Subject,
            project: elem.Project.name,
            tracker: elem.Tracker.name,
            status : elem.Status.name,
            priority :elem.Priority.name,
            assignee : elem.Assignee.name,
            startDate: elem.StartDate,
            dueDate : elem.DueDate,
        }
        console.log(goodElem)
        array.push(goodElem)
    }
    return array
}
interface TaskPageProps {
    // Добавьте необходимые пропсы
}

const TaskPage: React.FC<TaskPageProps> = () => {
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedRelease, setSelectedRelease] = useState<string>('');
    const [tasksForRelease, setTasksForRelease] = useState<Task[]>([]);
    const storedToken = localStorage.getItem('token');
    const navigate = useNavigate();
    if (storedToken == null) {
        navigate('/');
    }
    useEffect(() => {
        async function initialize() {
            const releasesData = await fetchReleases();
            setReleases(releasesData);
        }
        initialize();
    }, []);

    async function fetchReleases(): Promise<Release[]> {
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
        localStorage.setItem('versionInfo', JSON.stringify(selectedVersion));
        const tasks = await fetchTasksForRelease(selectedVersion);
        setTasksForRelease(tasks);
    };
    const good_tasks = getTasks(tasksForRelease)
    const closed_tasks = counterClosed(good_tasks)
    localStorage.getItem('versionInfo');
    return (
        <>
            <UserNav/>
            <div className="flex items-center pl-8 pt-4 justify-between">
                <select id="sel"  className="h-8 w-[150px] lg:w-[250px] rounded-md border-gray-300" onChange={handleReleaseChange} value={selectedRelease}>
                    <option  value="">Выберите релиз</option>
                    {releases.map((release) => (
                        <option className="border-gray-300" key={release.id} value={release.version}>
                            {release.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="page-main">
                <div className="h-full flex-1 flex-col w-1/2 space-y-8 px-8 pt-2 md:flex">
                    <Progress openTasks={good_tasks.length} closedTasks={closed_tasks} />
                    <DataTable data={good_tasks} columns={columns} />
                </div>
                <div className="table-platforms-cont pt-2">
                    <div className="table-platforms border rounded-md p-1 font-medium text-sm text-muted-foreground">
                        <div className="table-platforms-header">
                            <h2 className="shop_header">Магазин</h2>
                            <h2 className="date-deploy_header">Дата деплоя</h2>
                            <h2 className="date-agree_header">Дата согласования</h2>
                            <h2>Процент раскатки</h2>
                        </div>
                        <div className="cell">
                            <h2 className="shop google">Gogle</h2>
                            <DatePickerDemo></DatePickerDemo>
                            <DatePickerDemo></DatePickerDemo>
                            <Input className="w-[130px]"></Input>
                        </div>
                        <div className="cell">
                            <h2 className="shop apple">Apple</h2>
                            <DatePickerDemo></DatePickerDemo>
                            <DatePickerDemo></DatePickerDemo>
                            <Input className="w-[130px]"></Input>
                        </div>
                        <div className="cell">
                            <h2 className="shop huawei">Huawei</h2>
                            <DatePickerDemo></DatePickerDemo>
                            <DatePickerDemo></DatePickerDemo>
                            <Input className="w-[130px]"></Input>
                        </div>
                        <div className="cell">
                            <h2 className="shop rustore">Rustore</h2>
                            <DatePickerDemo></DatePickerDemo>
                            <DatePickerDemo></DatePickerDemo>
                            <Input className="w-[130px]"></Input>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TaskPage;