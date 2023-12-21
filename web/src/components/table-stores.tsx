import {DatePickerDemo} from "@/registry/new-york/ui/date-picker.tsx";
import { Switch } from "@/registry/new-york/ui/switch"

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
    const [storeRuStore, setRuStore] = useState<Store>()
    const [GoogleDeplotInfo, setGoogleDeplotInfo] = useState("Введите даты")
    const [state, setState] = React.useState(false);
    const [isErrorsGo, setIsErrorsGo] = React.useState(false);
    const [isErrorsAp, setIsErrorsAp] = React.useState(false);
    const [isErrorsHu, setIsErrorsHu] = React.useState(false);
    const [isErrorsRu, setIsErrorsRu] = React.useState(false);
    useEffect(() => {
        async function initialize() {

            setStoresN(stores)
            // if(stores.length == 0){
            //     return
            // }else if(stores.length == 1){
            //     if(stores[0].Store == "Google Play"){
            //         setGoogle(stores[0])
            //     }else if(stores[0].Store == "App Store"){
            //         setApple(stores[0])
            //     }else if(stores[0].Store == "Huawei AppGallery"){
            //         setHuawei(stores[0])
            //     }else if(stores[0].Store == "RuStore"){
            //         setRuStore(stores[0])
            //     }
            //
            // }else if(stores.length == 2){
            //     setApple(stores[1])
            // }

        }
        initialize();
    }, [stores]);

    useEffect(() => {
        async function initialize() {
            setGoogle(undefined)
            setApple(undefined)
            setHuawei(undefined)
            setRuStore(undefined)
            if(storesN.length == 0){
                return
            }
            if(storesN.length >= 1){
                if(storesN[0].Store == "Google Play"){
                    setGoogle(storesN[0])
                    setIsErrorsGo(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "App Store"){
                    setApple(storesN[0])
                    setIsErrorsAp(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "Huawei AppGallery"){
                    setHuawei(storesN[0])
                    setIsErrorsHu(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "RuStore"){
                    setRuStore(storesN[0])
                    setIsErrorsRu(storesN[0].IsErrors == "1")
                }
            }
            if(storesN.length >= 2){
                if(storesN[1].Store == "Google Play"){
                    setGoogle(storesN[1])
                    setIsErrorsGo(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "App Store"){
                    setApple(storesN[1])
                    setIsErrorsAp(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "Huawei AppGallery"){
                    setHuawei(storesN[1])
                    setIsErrorsHu(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "RuStore"){
                    setRuStore(storesN[1])
                    setIsErrorsRu(storesN[1].IsErrors == "1")
                }
            }
            if(storesN.length >= 3){
                if(storesN[2].Store == "Google Play"){
                    setGoogle(storesN[2])
                    setIsErrorsGo(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "App Store"){
                    setApple(storesN[2])
                    setIsErrorsAp(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "Huawei AppGallery"){
                    setHuawei(storesN[2])
                    setIsErrorsHu(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "RuStore"){
                    setRuStore(storesN[2])
                    setIsErrorsRu(storesN[2].IsErrors == "1")
                }
            }
            if(storesN.length >= 4){
                if(storesN[3].Store == "Google Play"){
                    setGoogle(storesN[3])
                    setIsErrorsGo(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "App Store"){
                    setApple(storesN[3])
                    setIsErrorsAp(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "Huawei AppGallery"){
                    setHuawei(storesN[3])
                    setIsErrorsHu(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "RuStore"){
                    setRuStore(storesN[3])
                    setIsErrorsRu(storesN[3].IsErrors == "1")
                }
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
        if(version != '' || version != null || version != 'null'){

            const apiUrlGoogle = `http://localhost:8080/set_version_info?version=${version}&store=Google%20Play&deployDate=${storeGoogle?.DeployDate}&installPercentage=${storeGoogle?.InstallPercentage}&isErrors=${isErrorsGo}`;
            console.log('url:', apiUrlGoogle)
            axios.post(apiUrlGoogle)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveApple = () => {
        if(version != '' || version != null || version != 'null'){

            const apiUrlApple = `http://localhost:8080/set_version_info?version=${version}&store=App%20Store&deployDate=${storeApple?.DeployDate}&installPercentage=${storeApple?.InstallPercentage}&isErrors=${isErrorsAp}`;
            console.log('url:', apiUrlApple)
            axios.post(apiUrlApple)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveHuawei = () => {
        if(version != '' || version != null || version != 'null'){
            const apiUrlHuawei = `http://localhost:8080/set_version_info?version=${version}&store=Huawei%20AppGallery&deployDate=${storeHuawei?.DeployDate}&installPercentage=${storeHuawei?.InstallPercentage}&isErrors=${isErrorsHu}`;
            console.log('url:', apiUrlHuawei)
            axios.post(apiUrlHuawei)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveRuStore = () => {
        // let elem = document.getElementById("rustore-errors")
        // let is_er = elem.getAttribute("che")
        // let result = false
        // console.log('elem', elem)
        // console.log('is_er', is_er)
        // if(is_er == "checked"){
        //     result = true
        // }
        if(version != '' || version != null || version != 'null'){
            const apiUrlRuStore = `http://localhost:8080/set_version_info?version=${version}&store=RuStore&deployDate=${storeRuStore?.DeployDate}&installPercentage=${storeRuStore?.InstallPercentage}&isErrors=${isErrorsRu}`;
            console.log('url:', apiUrlRuStore)
            axios.post(apiUrlRuStore)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };

    const handleSwitchChange = (checked) => {
        console.log("SWITCH CHEKED");
        setState(checked);
    };
    const ChangeInfo = (event) => {
        console.log(event.target.value);
        console.log("id", event.target.id, '-', event.target.name);

        // loop over the todos list and find the provided id.
        let updatedList = storesN.map(item =>
        {
            if(item.Store == "Google Play") {
                if (event.target.id == 'google-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'google-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                }else if (event.target.id == 'google-errors') {
                    console.log('checed',  event.target.checked, event.target.name)

                    setState(event.target.checked);
                //     // return {...item, IsErrors: !event.target.checked};//gets everything that was already in item, and updates "done"
                }
            }else if(item.Store == "App Store") {
                if (event.target.id == 'apple-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'apple-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'apple-errors') {
                    return {...item, IsErrors: event.target.checked }; //gets everything that was already in item, and updates "done"
                }
            }else if(item.Store == "Huawei AppGallery") {
                if (event.target.id == 'huawei-deploy') {
                    return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'huawei-percentage') {
                    return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
                } else if (event.target.id == 'huawei-errors') {
                    return {...item, IsErrors: event.target.value}; //gets everything that was already in item, and updates "done"
                }
            }
            if (event.target.id == 'rustore-deploy') {
                console.log("event.target.id ", event.target.id )
                console.log("event.target.value ", event.target.value )
                console.log("item ", item )
                return {...item, DeployDate: event.target.value}; //gets everything that was already in item, and updates "done"
            } else if (event.target.id == 'rustore-percentage') {
                return {...item, InstallPercentage: event.target.value}; //gets everything that was already in item, and updates "done"
            } else if (event.target.id == 'rustore-errors') {
                return {...item, IsErrors: event.target.value}; //gets everything that was already in item, and updates "done"
            }


            return item; // else return unmodified item
        });
        setStoresN(updatedList); // set state to new object with updated list
    }
    const updateStoreProperty = (property : keyof Store, value : string) => {
        setRuStore(prevStore => ({ ...prevStore, [property]: value }));
    };

    const ChangeInfoRu = (event) => {
        console.log("event.target.id ", event.target.id )
        console.log("event.target.value ", event.target.value )
        if (event.target.id == 'rustore-deploy') {
            console.log("event.target.id ", event.target.id )
            console.log("event.target.value ", event.target.value )
            updateStoreProperty('DeployDate', event.target.value )
        } else if (event.target.id == 'rustore-percentage') {
            updateStoreProperty('InstallPercentage', event.target.value )
        } else if (event.target.id == 'rustore-errors') {
            // document.getElementById()
            console.log("event.target.id ", event.target.id )
            console.log("event.target.value ", event.target.value )
            console.log("SWITCHHHHH", event.target.value )

            // updateStoreProperty('IsErrors', event.target.value )
        }
    }
    const ChangeInfoSwitchGo = (event) => {
        if(isErrorsGo){
            setIsErrorsGo(false)
        }else {
            setIsErrorsGo(true)
        }
    }
    const ChangeInfoSwitchAp = (event) => {
        if(isErrorsAp){
            setIsErrorsAp(false)
        }else {
            setIsErrorsAp(true)
        }
    }
    const ChangeInfoSwitchHu = (event) => {
        if(isErrorsHu){
            setIsErrorsHu(false)
        }else {
            setIsErrorsHu(true)
        }
    }
    const ChangeInfoSwitchRu = (event) => {
        let elem = document.getElementById("rustore-errors")
        let is_er = elem.getAttribute("checked")
        let result = false
        console.log('elem', elem)
        console.log('is_er', is_er)
        if(isErrorsRu){
            setIsErrorsRu(false)
        }else {
            setIsErrorsRu(true)
        }
    }

    const handleSwitchToggleRu = () => {
        setIsErrorsRu(prevState => !prevState);
    };

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
    // console.log("infoPROPS", stores, stores.length, stores.length >= 1 )
    // console.log("infoUserState", storesN, storesN.length, storesN.length >= 1 )
    return(
        <div className="table-platforms-cont pt-2">
            <div className="table-platforms border rounded-md p-1 font-medium text-sm text-muted-foreground">
                <div className="table-platforms-header">
                    <h2 className="shop_header">Магазин</h2>
                    <h2 className="date-deploy_header">Дата деплоя</h2>
                    <h2 className="percentage_rolling_header">Процент раскатки</h2>
                    <h2>Ошибки</h2>
                </div>
                <div className="cell">
                    <h2 className="w-[110px] shop google">{storeGoogle != null ? storeGoogle.Store  : "google"}</h2>
                    <Input id={"google-deploy"} className="w-[110px] cell-deploy"
                           value={storeGoogle != null
                               ? (storeGoogle.DeployDate != "undefined" ? storeGoogle.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfo}></Input>
                    <Input id={"google-percentage"} className="w-[110px] cell-percentage"
                           value={storeGoogle != null
                               ? (storeGoogle.InstallPercentage != "undefined" ? storeGoogle.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfo}></Input> {/*storeGoogle?.InstallPercentage*/}
                    {/*<Input id={"google-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 1) ? (storesN[0].IsErrors ) : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input> /* == "0" ? "false" : "true"*/}
                    {/*<Switch id={"google-errors"} checked={state} onChange={ChangeInfo}></Switch>*/}
                    <input id={"google-errors"} type={"checkbox"} checked={isErrorsGo} onChange={ChangeInfoSwitchGo}/>
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
                    <h2 className="w-[110px] shop apple">{storeApple!= null ? storeApple.Store  : "apple store"}</h2>
                    <Input id={"apple-deploy"} className="w-[110px] cell-deploy"
                           value={storeApple != null
                               ? (storeApple.DeployDate != "undefined" ? storeApple.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfo}></Input>
                    <Input id={"apple-percentage"} className="w-[110px] cell-percentage"
                           value={storeApple != null
                               ? (storeApple.InstallPercentage != "undefined" ? storeApple.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfo}></Input>
                    {/*<Input id={"apple-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ?  storesN[1].IsErrors : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>*/}
                    {/*<Switch checked={stores != null ? ((storesN.length >= 2) ? (storesN[1].IsErrors == "1")  : false) :false}  onChange={ChangeInfo}></Switch>*/}
                    <input id={"apple-errors"} type={"checkbox"} checked={isErrorsAp} onChange={ChangeInfoSwitchAp}/>
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
                    <h2 className="w-[110px] shop apple">{storeHuawei != null ? storeHuawei.Store  : "huawei appGallery"}</h2>
                    <Input id={"huawei-deploy"} className="w-[110px] cell-deploy"
                           value={storeHuawei != null
                               ? (storeHuawei.DeployDate != "undefined" ? storeHuawei.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfo}></Input>
                    <Input id={"huawei-percentage"} className="w-[110px] cell-percentage"
                           value={storeHuawei != null
                               ? (storeHuawei.InstallPercentage != "undefined" ? storeHuawei.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfo}></Input>
                    <input id={"huawei-errors"} type={"checkbox"} checked={isErrorsHu} onChange={ChangeInfoSwitchHu}/>
                    {/*<Switch checked={stores != null ? ((storesN.length >= 3) ? (storesN[2].IsErrors == "1")  : false) : false } onChange={ChangeInfo}></Switch>*/}
                    {/*<Input id={"huawei-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ?  storesN[2].IsErrors : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>*/}
                    <Button
                        variant="default"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
                        onClick={handleSaveHuawei}
                    >
                        <span>{"Сохранить"}</span>
                    </Button>
                </div>
                <div className="cell">
                    <h2 className="w-[110px] shop apple">{storeRuStore != null ? "RuStore"  : "rustore"}</h2>

                    <Input id={"rustore-deploy"} className="w-[110px] cell-deploy"
                           value={storeRuStore != null
                               ? (storeRuStore.DeployDate != "undefined" ? storeRuStore.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoRu}></Input>
                    <Input id={"rustore-percentage"} className="w-[110px] cell-percentage"
                           value={storeRuStore != null
                               ? (storeRuStore.InstallPercentage != "undefined" ? storeRuStore.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfoRu}></Input>

                    {/*<Switch id={"rustore-errors"} onChange={ChangeInfoSwitchRu} checked={isErrorsRu}></Switch>*/}
                    <input id={"rustore-errors"} type={"checkbox"} checked={isErrorsRu} onChange={ChangeInfoSwitchRu}/>
                    <Button
                        variant="default"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent ml-0.5"
                        onClick={handleSaveRuStore}
                    >
                        <span>{"Сохранить"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}