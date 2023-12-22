import {DatePickerDemo} from "@/registry/new-york/ui/date-picker.tsx";
import {Input} from "@/registry/new-york/ui/input.tsx";
import React, { useState, useEffect } from 'react';
import MyDatePicker from "@/registry/new-york/ui/date-picker.tsx";
import {Button} from "@/registry/new-york/ui/button.tsx";
import axios from "axios";

interface Store {
    Version: string;
    Store: string;
    DeployDate : string | undefined;
    // ApprovalDate: string;
    InstallPercentage:string;
    IsErrors: string;
}
interface DataTableProps {
    version: string,
    stores: Store[]
}

export function TableStores({
                                version,
                                stores,
                              }: DataTableProps){
    const [storesN, setStoresN] = useState<Store[]>(stores)
    const [storeGoogle, setGoogle] = useState<Store>()
    const [storeApple, setApple] = useState<Store>()
    const [storeHuawei, setHuawei] = useState<Store>()
    const [storeRuStore, setRuStore] = useState<Store>()
    const [isErrorsGo, setIsErrorsGo] = React.useState(false);
    const [isErrorsAp, setIsErrorsAp] = React.useState(false);
    const [isErrorsHu, setIsErrorsHu] = React.useState(false);
    const [isErrorsRu, setIsErrorsRu] = React.useState(false);
    useEffect(() => {
        async function initialize() {
            setStoresN(stores)
        }
        initialize();
    }, [stores]);

    useEffect(() => {
        async function initialize() {
            setGoogle(undefined)
            setApple(undefined)
            setHuawei(undefined)
            setRuStore(undefined)
            setIsErrorsGo(false)
            setIsErrorsAp(false)
            setIsErrorsHu(false)
            setIsErrorsRu(false)
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
        if(version != '' || version != null || version != 'null'){
            const apiUrlRuStore = `http://localhost:8080/set_version_info?version=${version}&store=RuStore&deployDate=${storeRuStore?.DeployDate}&installPercentage=${storeRuStore?.InstallPercentage}&isErrors=${isErrorsRu}`;
            console.log('url:', apiUrlRuStore)
            axios.post(apiUrlRuStore)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };

    const updateStorePropertyGo = (property : keyof Store, value : string) => {
        setGoogle(prevStore => ({ ...prevStore, [property]: value }));
    };
    const updateStorePropertyAp = (property : keyof Store, value : string) => {
        setApple(prevStore => ({ ...prevStore, [property]: value }));
    };
    const updateStorePropertyHu = (property : keyof Store, value : string) => {
        setHuawei(prevStore => ({ ...prevStore, [property]: value }));
    };
    const updateStorePropertyRu = (property : keyof Store, value : string) => {
        setRuStore(prevStore => ({ ...prevStore, [property]: value }));
    };
    const ChangeInfoGo = (event) => {
        if (event.target.id == 'google-deploy') {
            updateStorePropertyGo('DeployDate', event.target.value )
        } else if (event.target.id == 'google-percentage') {
            updateStorePropertyGo('InstallPercentage', event.target.value )
        }
    }
    const ChangeInfoAp = (event) => {
        if (event.target.id == 'apple-deploy') {
            updateStorePropertyAp('DeployDate', event.target.value )
        } else if (event.target.id == 'apple-percentage') {
            updateStorePropertyAp('InstallPercentage', event.target.value )
        }
    }
    const ChangeInfoHu = (event) => {
        if (event.target.id == 'huawei-deploy') {
            updateStorePropertyHu('DeployDate', event.target.value )
        } else if (event.target.id == 'huawei-percentage') {
            updateStorePropertyHu('InstallPercentage', event.target.value )
        }
    }

    const ChangeInfoRu = (event) => {
        if (event.target.id == 'rustore-deploy') {
            updateStorePropertyRu('DeployDate', event.target.value )
        } else if (event.target.id == 'rustore-percentage') {
            updateStorePropertyRu('InstallPercentage', event.target.value )
        }
    }
    const ChangeInfoSwitchGo = (event) => {
        setIsErrorsGo(!isErrorsGo)
    }
    const ChangeInfoSwitchAp = (event) => {
        setIsErrorsAp(!isErrorsAp)
    }
    const ChangeInfoSwitchHu = (event) => {
        setIsErrorsHu(!isErrorsHu)
    }
    const ChangeInfoSwitchRu = (event) => {
        setIsErrorsRu(!isErrorsRu)
    }

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
                    <h2 className="w-[110px] shop google">{storeGoogle != null ? "Google Play" : "google"}</h2>
                    <Input id={"google-deploy"} className="w-[110px] cell-deploy"
                           value={storeGoogle != null
                               ? (storeGoogle.DeployDate != "undefined" ? storeGoogle.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoGo}></Input>
                    <Input id={"google-percentage"} className="w-[110px] cell-percentage"
                           value={storeGoogle != null
                               ? (storeGoogle.InstallPercentage != "undefined" ? storeGoogle.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfoGo}></Input> {/*storeGoogle?.InstallPercentage*/}
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
                    <h2 className="w-[110px] shop apple">{storeApple!= null ? "App Store"  : "apple store"}</h2>
                    <Input id={"apple-deploy"} className="w-[110px] cell-deploy"
                           value={storeApple != null
                               ? (storeApple.DeployDate != "undefined" ? storeApple.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoAp}></Input>
                    <Input id={"apple-percentage"} className="w-[110px] cell-percentage"
                           value={storeApple != null
                               ? (storeApple.InstallPercentage != "undefined" ? storeApple.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfoAp}></Input>
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
                    <h2 className="w-[110px] shop apple">{storeHuawei != null ? "Huawei AppGallery"  : "huawei appGallery"}</h2>
                    <Input id={"huawei-deploy"} className="w-[110px] cell-deploy"
                           value={storeHuawei != null
                               ? (storeHuawei.DeployDate != "undefined" ? storeHuawei.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoHu}></Input>
                    <Input id={"huawei-percentage"} className="w-[110px] cell-percentage"
                           value={storeHuawei != null
                               ? (storeHuawei.InstallPercentage != "undefined" ? storeHuawei.InstallPercentage : 'Введите процент')
                               : 'Введите процент'}  onChange={ChangeInfoHu}></Input>
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