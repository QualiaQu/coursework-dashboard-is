import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { TableStores } from "@/components/table-stores.tsx"
import { UserNav } from "@/components/user-nav"
import { DatePickerDemo } from "@/registry/new-york/ui/date-picker.tsx"
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { Input } from "@/registry/new-york/ui/input"
import { Progress } from "@/components/ui/progress"
import {Button} from "@/registry/new-york/ui/button.tsx";
// token ba7370ee222dc3fbab4b745b295ccae71cad12d0


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
interface Store {
    Version: string;
    Store: string;
    DeployDate : string | undefined;
    // ApprovalDate: string;
    InstallPercentage:string;
    IsErrors: string;
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
        // console.log(goodElem)
        array.push(goodElem)
    }
    return array
}
interface TaskPageProps {
    // Добавьте необходимые пропсы
}

function handleCreateRequest() {

    window.open('https://noc-new.is74.ru/agreement/main/create.html', '_blank');

}

const TaskPage: React.FC<TaskPageProps> = () => {
    const [releases, setReleases] = useState<Release[]>([]);
    const [selectedRelease, setSelectedRelease] = useState<string>('');
    const [tasksForRelease, setTasksForRelease] = useState<Task[]>([]);
    const [storesForRelease, setStoresForRelease] = useState<Store[]>([]);
    const storedToken = localStorage.getItem('token');
    const navigate = useNavigate();
    if (storedToken == null) {

        navigate('/');
    }
    useEffect(() => {
        async function initialize() {
            const releasesData = await fetchReleases();
            setReleases(releasesData);

            const dataUpdateIntervalId = setInterval(async () => {
                if (selectedRelease) {
                    const updatedTasks = await fetchTasksForRelease(selectedRelease);
                    setTasksForRelease(updatedTasks);
                }
            }, 60000);
        }

        // Вызов функции инициализации
        initialize();
    }, [selectedRelease]);

    async function fetchReleases(): Promise<Release[]> {
        console.log(storedToken)
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
            // const response2 = await fetch(`http://localhost:8080/get_version_info?version=${version}`);
            if (!response.ok /*&& !response2.ok*/) {
                throw new Error('Ошибка сети');
            }
            const data = await response.json();
            // const store = await response2.json();
            // setStoresForRelease(store)
            // localStorage.setItem('storesInfo', JSON.stringify(store));
            return data;
        } catch (error) {
            console.error('Ошибка при получении задач для релиза:', error);
            return [];
        }
    }
    async function fetchStoreForRelease(version: string): Promise<Store[]> {
        try {
            const response = await fetch(`http://localhost:8080/get_version_info?version=${version}`);
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при получении информации по магазинам для релиза:', error);
            return [];
        }
    }

    const handleReleaseChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        localStorage.removeItem('versionInfo')
        localStorage.removeItem('storesInfo')
        const selectedVersion = event.target.value;
        console.log(selectedVersion, '#####версия или выберите релиз')
        setSelectedRelease(selectedVersion);
        localStorage.setItem('versionInfo', JSON.stringify(selectedVersion));
        const tasks = await fetchTasksForRelease(selectedVersion);
        const stores = await fetchStoreForRelease(selectedVersion)
        setTasksForRelease(tasks);
        setStoresForRelease(stores)
    };
    // localStorage.removeItem('apllePercentageInfo')
    const good_tasks = getTasks(tasksForRelease)
    const closed_tasks = counterClosed(good_tasks)
    localStorage.getItem('versionInfo');
    // console.log(selectedRelease, storesForRelease[0].Version, '?+?+?+?+?+?+?')
    return (
        <>
            <UserNav/>
            <div className="items-center pl-8 pt-4 justify-between">
                <select id="sel"  className="h-8 w-[150px] lg:w-[250px] rounded-md border-gray-300" onChange={handleReleaseChange} value={selectedRelease}>
                    <option  value="">Выберите релиз</option>
                    {releases.map((release) => (
                        <option className="border-gray-300" key={release.id} value={release.version}>
                            {release.name}
                        </option>
                    ))}
                </select>
                <Button
                    className="ml-4 px-4 py-2 bg-accent text-white rounded-md"
                    onClick={handleCreateRequest} >
                    Создать заявку на согласование
                </Button>
            </div>
            <div className="page-main">
                <div className="h-full flex-1 flex-col w-1/2 space-y-2 px-8 pt-2 md:flex">
                    <Progress openTasks={good_tasks.length} closedTasks={closed_tasks} />
                    <DataTable data={good_tasks} columns={columns} />
                </div>
                <TableStores version={selectedRelease} stores={storesForRelease}></TableStores>
            </div>
        </>
    );
};

export default TaskPage;