import {DatePickerDemo} from "@/registry/new-york/ui/date-picker.tsx";
import {Input} from "@/registry/new-york/ui/input.tsx";
import React, { useState, useEffect } from 'react';
import MyDatePicker from "@/registry/new-york/ui/date-picker.tsx";
import {ArrowDownIcon, ArrowUpIcon, CaretSortIcon} from "@radix-ui/react-icons";
import {Button} from "@/registry/new-york/ui/button.tsx";
import axios from "axios";
import {ColumnDef} from "@tanstack/react-table";
interface Store {
    Version: string;
    Store: string;
    DeployDate : string | undefined;
    // ApprovalDate: string;
    InstallPercentage:string;
    IsErrors: string;
}
//криво косо сохраняет данные
//проблема если не все магазины есть в бд
interface DataTableProps {
    version: string,
    stores: Store[]
}

export function TableStores({
                                version,
                                stores,
                              }: DataTableProps){
    const [versionN, setVersionN] = useState(version)
    const [storesN, setStoresN] = useState<Store[]>(stores)
    const [storeGoogle, setGoogle] = useState<Store>()
    const [storeApple, setApple] = useState<Store>()
    const [storeHuawei, setHuawei] = useState<Store>()
    const [GoogleDeplotInfo, setGoogleDeplotInfo] = useState("Введите даты")

    useEffect(() => {
        async function initialize() {
            setStoresN(stores)
            if(stores.length == 0){
                return
            }else if(stores.length == 1){
                setGoogle(stores[0])
            }else if(stores.length == 2){
                setApple(stores[1])
            }
        }
        initialize();
    }, [stores]);

    useEffect(() => {
        async function initialize() {
            if(storesN.length == 0){
                return
            }else if(storesN.length > 0){
                setGoogle(storesN[0])
                setApple(storesN[1])
                setHuawei(storesN[2])
                console.log("apple useeffect", storesN[1])
            }
        }
        initialize();
    }, [storesN]);
    // const version = JSON.parse(localStorage.getItem('versionInfo')) //= localStorage.getItem('versionInfo');
    // const magaz = localStorage.getItem('storesInfo') != null ? JSON.parse(localStorage.getItem('storesInfo')) : []
    // const [storesi, setStores] = useState<Store[]>([])
    // const magaz = localStorage.getItem('storesInfo')
    // let inf
    //
    // useEffect(() => {
    //     async function initialize() {
    //         const storesData = await fetchReleases();
    //         setStores(storesData)
    //     }
    //     initialize();
    // }, [version]);
    //
    // async function fetchReleases(): Promise<Store[]> {
    //     const info = localStorage.getItem('versionInfo');
    //     if (info == null || info == undefined || info =='') {
    //         throw new Error('Ошибка. нет информации по магазинам');
    //     }
    //     const data = JSON.parse(info)
    //     return data;
    // }

    const handleSaveGoogle = () => {
        // console.log('inf:', inf)
        // const appleDeployInfo = localStorage.getItem('aplleDeployInfo').replace('"', "")
        // const applePercentageInfo = localStorage.getItem('apllePercentageInfo').replace('"', "")
        // const appleErrorsInfo = localStorage.getItem('aplleErrorsInfo').replace('"', "")
        // const googleDeployInfo = localStorage.getItem('googleDeployInfo').replace('"', "")
        // const googlePercentageInfo = localStorage.getItem('googlePercentageInfo').replace('"', "")
        // const googleErrorsInfo = localStorage.getItem('googleErrorsInfo').replace('"', "")
        if(version != '' || version != null || version != 'null'){

            const apiUrlGoogle = `http://localhost:8080/set_version_info?version=${version}&store=Google%20Play&deployDate=${storeGoogle?.DeployDate}&installPercentage=${storeGoogle?.InstallPercentage}&isErrors=${storeGoogle?.IsErrors}`;
            console.log('url:', apiUrlGoogle)
            axios.post(apiUrlGoogle)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });


            // Promise.all([
            //     fetch(`http://localhost:8080/set_version_info?version=${version}&store=Google%20Play&deployDate=${storeGoogle?.DeployDate}&installPercentage=${storeGoogle?.InstallPercentage}&isErrors=${storeGoogle?.IsErrors}`),
            //     fetch(`http://localhost:8080/set_version_info?version=${version}&store=Apple&deployDate=${storeApple?.DeployDate}&installPercentage=${storeApple?.InstallPercentage}&isErrors=${storeApple?.IsErrors}`)
            // ])
            //     .then(async([res1, res2]) => {
            //         const a = await res1.json();
            //         const b = await res2.json();
            //         console.log(a, 'AAA public repos on GitHub');
            //         console.log(b, 'BBB public repos on GitHub');
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

        //     axios.all([
        //         axios.post(`http://localhost:8080/set_version_info?version=${version}&store=Google%20Play&deployDate=${storeGoogle?.DeployDate}&installPercentage=${storeGoogle?.InstallPercentage}&isErrors=${storeGoogle?.IsErrors}`),
        //         axios.post(`http://localhost:8080/set_version_info?version=${version}&store=Apple&deployDate=${storeApple?.DeployDate}&installPercentage=${storeApple?.InstallPercentage}&isErrors=${storeApple?.IsErrors}`)
        //     ])
        //         .then(axios.spread((data1, data2) => {
        //             // output of req.
        //             console.log('data1', data1, 'data2', data2)
        //         }));
        }

    };
    const handleSaveApple = () => {
        if(version != '' || version != null || version != 'null'){

            const apiUrlApple = `http://localhost:8080/set_version_info?version=${version}&store=Apple&deployDate=${storeApple?.DeployDate}&installPercentage=${storeApple?.InstallPercentage}&isErrors=${storeApple?.IsErrors}`;
            console.log('url:', apiUrlApple)
            axios.post(apiUrlApple)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }

    };
    const handleSaveHuawei = () => {
        if(version != '' || version != null || version != 'null'){

            const apiUrlHuawei = `http://localhost:8080/set_version_info?version=${version}&store=Huawei&deployDate=${storeHuawei?.DeployDate}&installPercentage=${storeHuawei?.InstallPercentage}&isErrors=${storeHuawei?.IsErrors}`;
            console.log('url:', apiUrlHuawei)
            axios.post(apiUrlHuawei)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }

    };
    const ChangeGoogleDeplotInfo = (event) => {
        console.log(event.target.value);
        console.log("id", event.target.id);

        // loop over the todos list and find the provided id.
        let updatedList = storesN.map(item =>
        {
            if(item.Store == "Google Play") {
                if (event.target.id == 'google-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'google-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'google-errors') {
                    return {...item, IsErrors: event.target.value};//gets everything that was already in item, and updates "done"
                }
            }else if(item.Store == "Apple") {
                if (event.target.id == 'apple-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'apple-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'apple-errors') {
                    return {...item, IsErrors: event.target.value}; //gets everything that was already in item, and updates "done"
                }
            }else if(item.Store == "Huawei") {
                if (event.target.id == 'huawei-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'huawei-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'huawei-errors') {
                    return {...item, IsErrors: event.target.value}; //gets everything that was already in item, and updates "done"
                }
            }

            return item; // else return unmodified item
        });
        setStoresN(updatedList); // set state to new object with updated list
    }

    // if (version == "" || magaz == 'null' || magaz == null || magaz == ""){
    //     return (
    //         <div className="table-platforms-cont pt-2">
    //             <div className="table-platforms border rounded-md p-1 font-medium text-sm text-muted-foreground">
    //                 <div className="table-platforms-header">
    //                     <h2 className="shop_header">Магазин</h2>
    //                     <h2 className="date-deploy_header">Дата деплоя</h2>
    //                     <h2 className="percentage_rolling_header">Процент раскатки</h2>
    //                     <h2>Ошибки</h2>
    //                 </div>
    //                 <div className="cell">
    //                     <h2 className="w-[110px] shop google">Google</h2>
    //                     <Input className="w-[110px] cell-deploy" defaultValue={'Введите дату'}></Input>
    //                     <Input className="w-[110px] cell-percentage" defaultValue={'Введите процент'}></Input> {/*storeGoogle?.InstallPercentage*/}
    //                     <Input className="w-[110px] cell-percentage" defaultValue={'Есть ли ошибки?'}></Input>
    //                 </div>
    //                 <div className="cell">
    //                     <h2 className="w-[110px] shop apple">Apple</h2>
    //                     <Input className="w-[110px] cell-deploy" defaultValue={'Введите дату'} onChange={handleChangeAplleDeplotInfo}></Input>
    //                     <Input className="w-[110px] cell-percentage" defaultValue={'Введите процент'} onChange={handleChangeApllePercentageInfo}></Input>
    //                     <Input className="w-[110px] cell-percentage" defaultValue={'Есть ли ошибки?'} onChange={handleChangeAplleErrorsInfo}></Input>
    //                 </div>
    //                 <Button
    //                     variant="default"
    //                     size="sm"
    //                     className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
    //                     onClick={handleSave}
    //                 >
    //                     <span>{"Сохранить"}</span>
    //                 </Button>
    //             </div>
    //         </div>
    //     )
    // }else {
    //     inf = JSON.parse(localStorage.getItem('storesInfo'))
    //     console.log(inf, "after parse", inf[0].Version, version )
    //
    // }



    // console.log(version)
    // const [stores, setStores] = useState<Store[]>([]);
    // const [storeGoogle, setStoreGoogle] = useState<Store>();
    // const [storeApple, setStoreApple] = useState<Store>();
    // console.log('check', version , storeGoogle?.Version, storeApple?.Version)
    // useEffect(() => {
    //     async function initialize() {
    //         const storesData = await fetchStores();
    //         setStores(storesData);
    //         localStorage.setItem('storesInfo', JSON.stringify(storesData));
    //         setStoreGoogle(storesData[0])
    //         setStoreApple(storesData[1])
    //     }
    //     initialize();
    // }, []);

    // async function fetchStores(): Promise<Store[]> {
    //     const response = await fetch(`http://localhost:8080/get_version_info?version=${version}`);
    //     if (!response.ok) {
    //         throw new Error('Ошибка сети');
    //     }
    //     const data = await response.json();
    //     if (data != null){
    //         localStorage.setItem('infoGoogle', JSON.stringify(data[0]));
    //         if (data[1] != null){
    //             localStorage.setItem('infoApple', JSON.stringify(data[1]));
    //         }
    //     }
    //
    //     return data;
    // }



    // if (version == "\"\"" || version == null){
    //     return <div className="w-1/2"></div>
    // }

    // const sInfo = localStorage.getItem('infoStores') != null ? JSON.parse(localStorage.getItem('infoStores')) : []
    console.log("infoPROPS", stores, stores.length, stores.length >= 1 )
    console.log("infoUserState", storesN, storesN.length, storesN.length >= 1 )
    return(
        <div className="table-platforms-cont pt-2">
            <div className="table-platforms border rounded-md p-1 font-medium text-sm text-muted-foreground">
                <div className="table-platforms-header">
                    <h2 className="shop_header">Магазин</h2>
                    <h2 className="date-deploy_header">Дата деплоя</h2>
                    <h2 className="percentage_rolling_header">Процент раскатки</h2>
                    <h2>Ошибки</h2>
                </div>

                {/*<div className="cell">*/}
                {/*    <h2 className="w-[110px] shop google">Google</h2>*/}
                {/*    <Input className="w-[110px] cell-deploy" defaultValue={(inf.length >= 1) ? (inf[0].Version == version ? inf[0].DeployDate : 'Введите дату') : 'Введите дату'} onChange={handleChangeGoogleDeplotInfo}></Input>*/}
                {/*    <Input className="w-[110px] cell-percentage" defaultValue={(inf.length >= 1) ? (inf[0].Version == version ? inf[0].InstallPercentage : 'Введите процент'): 'Введите процент'}  onChange={handleChangeGooglePercentageInfo}></Input> /!*storeGoogle?.InstallPercentage*!/*/}
                {/*    <Input className="w-[110px] cell-percentage" defaultValue={(inf.length >= 1) ? (inf[0].Version == version ? inf[0].IsErrors : 'Есть ли ошибки?') : 'Есть ли ошибки?'} onChange={handleChangeGoogleErrorsInfo}></Input>*/}
                {/*</div>*/}
                {/*<div className="cell">*/}
                {/*    <h2 className="w-[110px] shop apple">Apple</h2>*/}
                {/*    <Input className="w-[110px] cell-deploy" defaultValue={(inf.length >= 2) ? (inf[1].Version == version ? inf[1].DeployDate : 'Введите дату') : 'Введите дату'} onChange={handleChangeAplleDeplotInfo}></Input>*/}
                {/*    <Input className="w-[110px] cell-percentage" defaultValue={(inf.length >= 2) ? (inf[1].Version == version ? inf[1].InstallPercentage : 'Введите процент'): 'Введите процент'} onChange={handleChangeApllePercentageInfo}></Input>*/}
                {/*    <Input className="w-[110px] cell-percentage" defaultValue={(inf.length >= 2) ? (inf[1].Version == version ? inf[1].IsErrors : 'Есть ли ошибки?') : 'Есть ли ошибки?'} onChange={handleChangeAplleErrorsInfo}></Input>*/}
                {/*</div>*/}

                <div className="cell">
                    <h2 className="w-[110px] shop google">Google</h2>
                    <Input id={"google-deploy"} className="w-[110px] cell-deploy" value={storesN.length >= 1 ? (storesN[0].DeployDate != "undefined" ? storesN[0].DeployDate : 'Введите дату') : 'Введите дату'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Input id={"google-percentage"} className="w-[110px] cell-percentage" value={(storesN.length >= 1) ? (storesN[0].InstallPercentage != "undefined" ? storesN[0].InstallPercentage : 'Введите процент') : 'Введите процент'}  onChange={ChangeGoogleDeplotInfo}></Input> {/*storeGoogle?.InstallPercentage*/}
                    <Input id={"google-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 1) ? (storesN[0].IsErrors /* == "0" ? "false" : "true"*/) : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Button
                        variant="default"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
                        onClick={handleSaveGoogle}
                    >
                        <span>{"Сохранить"}</span>
                    </Button>
                </div>
                <div className="cell">
                    <h2 className="w-[110px] shop apple">Apple</h2>
                    <Input id={"apple-deploy"} className="w-[110px] cell-deploy" value={(storesN.length >= 2) ? (storesN[1].DeployDate != "undefined" ? storesN[1].DeployDate : 'Введите дату') : 'Введите дату'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Input id={"apple-percentage"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ? (storesN[1].InstallPercentage != "undefined" ? storesN[1].InstallPercentage : 'Введите процент') : 'Введите процент'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Input id={"apple-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ?  storesN[1].IsErrors : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Button
                        variant="default"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
                        onClick={handleSaveApple}
                    >
                        <span>{"Сохранить"}</span>
                    </Button>
                </div>
                <div className="cell">
                    <h2 className="w-[110px] shop apple">Huawei</h2>
                    <Input id={"huawei-deploy"} className="w-[110px] cell-deploy" value={(storesN.length >= 2) ? (storesN[2].DeployDate != "undefined" ? storesN[2].DeployDate : 'Введите дату') : 'Введите дату'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Input id={"huawei-percentage"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ? (storesN[2].InstallPercentage != "undefined" ? storesN[2].InstallPercentage : 'Введите процент') : 'Введите процент'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Input id={"huawei-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ?  storesN[2].IsErrors : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>
                    <Button
                        variant="default"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
                        onClick={handleSaveHuawei}
                    >
                        <span>{"Сохранить"}</span>
                    </Button>
                </div>

                {/*<div className="cell">*/}
                {/*    <h2 className="shop huawei">Huawei</h2>*/}
                {/*    <DatePickerDemo></DatePickerDemo>*/}
                {/*    <DatePickerDemo></DatePickerDemo>*/}
                {/*    <Input className="w-[130px]"></Input>*/}
                {/*</div>*/}
                {/*<div className="cell">*/}
                {/*    <h2 className="shop rustore">Rustore</h2>*/}
                {/*    <DatePickerDemo></DatePickerDemo>*/}
                {/*    <DatePickerDemo></DatePickerDemo>*/}
                {/*    <Input className="w-[130px]"></Input>*/}
                {/*</div>*/}

            {/*<button id="button-save" >*/}
            {/*    Сохранить*/}
            {/*</button>*/}
            {/*    <Button*/}
            {/*        variant="default"*/}
            {/*        size="sm"*/}
            {/*        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"*/}
            {/*        onClick={handleSave}*/}
            {/*    >*/}
            {/*        <span>{"Сохранить"}</span>*/}
            {/*    </Button>*/}
            </div>
        </div>
    );
}