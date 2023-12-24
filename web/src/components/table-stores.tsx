import {Input} from "@/registry/new-york/ui/input.tsx";
import React, { useState, useEffect } from 'react';
import {Button} from "@/registry/new-york/ui/button.tsx";
import axios from "axios";

interface Store {
    Version: string;
    Store: string;
    DeployDate : string | undefined;
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
            if(storesN == null){
                return
            }
            if(storesN.length >= 1){
                if(storesN[0].Store == "Google Play"){
                    setGoogle(storesN[0])
                    updateStorePropertyGo('InstallPercentage', `${storesN[0].InstallPercentage}%`)
                    setIsErrorsGo(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "App Store"){
                    setApple(storesN[0])
                    updateStorePropertyAp('InstallPercentage', `${storesN[0].InstallPercentage}%`)
                    setIsErrorsAp(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "Huawei AppGallery"){
                    setHuawei(storesN[0])
                    updateStorePropertyHu('InstallPercentage', `${storesN[0].InstallPercentage}%`)
                    setIsErrorsHu(storesN[0].IsErrors == "1")
                }else if(storesN[0].Store == "RuStore"){
                    setRuStore(storesN[0])
                    updateStorePropertyRu('InstallPercentage', `${storesN[0].InstallPercentage}%`)
                    setIsErrorsRu(storesN[0].IsErrors == "1")
                }
            }
            if(storesN.length >= 2){
                if(storesN[1].Store == "Google Play"){
                    setGoogle(storesN[1])
                    updateStorePropertyGo('InstallPercentage', `${storesN[1].InstallPercentage}%`)
                    setIsErrorsGo(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "App Store"){
                    setApple(storesN[1])
                    updateStorePropertyAp('InstallPercentage', `${storesN[1].InstallPercentage}%`)
                    setIsErrorsAp(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "Huawei AppGallery"){
                    setHuawei(storesN[1])
                    updateStorePropertyHu('InstallPercentage', `${storesN[1].InstallPercentage}%`)
                    setIsErrorsHu(storesN[1].IsErrors == "1")
                }else if(storesN[1].Store == "RuStore"){
                    setRuStore(storesN[1])
                    updateStorePropertyRu('InstallPercentage', `${storesN[1].InstallPercentage}%`)
                    setIsErrorsRu(storesN[1].IsErrors == "1")
                }
            }
            if(storesN.length >= 3){
                if(storesN[2].Store == "Google Play"){
                    setGoogle(storesN[2])
                    updateStorePropertyGo('InstallPercentage', `${storesN[2].InstallPercentage}%`)
                    setIsErrorsGo(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "App Store"){
                    setApple(storesN[2])
                    updateStorePropertyAp('InstallPercentage', `${storesN[2].InstallPercentage}%`)
                    setIsErrorsAp(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "Huawei AppGallery"){
                    setHuawei(storesN[2])
                    updateStorePropertyHu('InstallPercentage', `${storesN[2].InstallPercentage}%`)
                    setIsErrorsHu(storesN[2].IsErrors == "1")
                }else if(storesN[2].Store == "RuStore"){
                    setRuStore(storesN[2])
                    updateStorePropertyRu('InstallPercentage', `${storesN[2].InstallPercentage}%`)
                    setIsErrorsRu(storesN[2].IsErrors == "1")
                }
            }
            if(storesN.length >= 4){
                if(storesN[3].Store == "Google Play"){
                    setGoogle(storesN[3])
                    updateStorePropertyGo('InstallPercentage', `${storesN[3].InstallPercentage}%`)
                    setIsErrorsGo(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "App Store"){
                    setApple(storesN[3])
                    updateStorePropertyAp('InstallPercentage', `${storesN[3].InstallPercentage}%`)
                    setIsErrorsAp(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "Huawei AppGallery"){
                    setHuawei(storesN[3])
                    updateStorePropertyHu('InstallPercentage', `${storesN[3].InstallPercentage}%`)
                    setIsErrorsHu(storesN[3].IsErrors == "1")
                }else if(storesN[3].Store == "RuStore"){
                    setRuStore(storesN[3])
                    updateStorePropertyRu('InstallPercentage', `${storesN[3].InstallPercentage}%`)
                    setIsErrorsRu(storesN[3].IsErrors == "1")
                }
            }
        }
        initialize();
    }, [storesN]);

    const handleSaveGoogle = () => {
        if(version != '' || version != null || version != 'null'){
            const percentage = storeGoogle?.InstallPercentage.replace(/%/,'')
            const apiUrlGoogle = `http://localhost:8080/set_version_info?version=${version}&store=Google%20Play&deployDate=${storeGoogle?.DeployDate}&installPercentage=${percentage}&isErrors=${isErrorsGo}`;
            console.log('url:', apiUrlGoogle)
            axios.post(apiUrlGoogle)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveApple = () => {
        if(version != '' || version != null || version != 'null'){
            const percentage = storeApple?.InstallPercentage.replace(/%/,'')
            const apiUrlApple = `http://localhost:8080/set_version_info?version=${version}&store=App%20Store&deployDate=${storeApple?.DeployDate}&installPercentage=${percentage}&isErrors=${isErrorsAp}`;
            console.log('url:', apiUrlApple)
            axios.post(apiUrlApple)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveHuawei = () => {
        if(version != '' || version != null || version != 'null'){
            const percentage = storeHuawei?.InstallPercentage.replace(/%/,'')
            const apiUrlHuawei = `http://localhost:8080/set_version_info?version=${version}&store=Huawei%20AppGallery&deployDate=${storeHuawei?.DeployDate}&installPercentage=${percentage}&isErrors=${isErrorsHu}`;
            console.log('url:', apiUrlHuawei)
            axios.post(apiUrlHuawei)
                .catch(error => {
                    console.error('Ошибка в пост запросе у магазинов:', error);
                });
        }
    };
    const handleSaveRuStore = () => {
        if(version != '' || version != null || version != 'null'){
            const percentage = storeRuStore?.InstallPercentage.replace(/%/,'')
            const apiUrlRuStore = `http://localhost:8080/set_version_info?version=${version}&store=RuStore&deployDate=${storeRuStore?.DeployDate}&installPercentage=${percentage}&isErrors=${isErrorsRu}`;
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
    const ChangeInfoGo = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id == 'google-deploy') {
            updateStorePropertyGo('DeployDate', event.target.value )
        } else if (event.target.id == 'google-percentage') {
            let value = event.target.value;
            const re = /\D/g
            value = value.replace(re, "");
            if ((parseInt(value) <= 100 && parseInt(value) >= 0) || value == "") {
                value = value.replace(/(.*)/, '$1%');
                event.target.value = value
                updateStorePropertyGo('InstallPercentage', event.target.value )
            }
        }
    }
    const ChangeInfoAp = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id == 'apple-deploy') {
            updateStorePropertyAp('DeployDate', event.target.value )
        } else if (event.target.id == 'apple-percentage') {
            let value = event.target.value;
            const re = /\D/g
            value = value.replace(re, "");
            if ((parseInt(value) <= 100 && parseInt(value) >= 0) || value == "") {
                value = value.replace(/(.*)/, '$1%');
                event.target.value = value
                updateStorePropertyAp('InstallPercentage', event.target.value )
            }
        }
    }
    const ChangeInfoHu = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id == 'huawei-deploy') {
            updateStorePropertyHu('DeployDate', event.target.value )
        } else if (event.target.id == 'huawei-percentage') {
            let value = event.target.value;
            const re = /\D/g
            value = value.replace(re, "");
            if ((parseInt(value) <= 100 && parseInt(value) >= 0) || value == "") {
                value = value.replace(/(.*)/, '$1%');
                event.target.value = value
                updateStorePropertyHu('InstallPercentage', event.target.value )
            }
        }
    }

    const ChangeInfoRu = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id == 'rustore-deploy') {
            updateStorePropertyRu('DeployDate', event.target.value )
        } else if (event.target.id == 'rustore-percentage') {
            let value = event.target.value;
            const re = /\D/g
            value = value.replace(re, "");
            if ((parseInt(value) <= 100 && parseInt(value) >= 0) || value == "") {
                value = value.replace(/(.*)/, '$1%');
                event.target.value = value
                updateStorePropertyRu('InstallPercentage', event.target.value )
            }
        }
    }
    const ChangeInfoSwitchGo = () => {
        setIsErrorsGo(!isErrorsGo)
    }
    const ChangeInfoSwitchAp = () => {
        setIsErrorsAp(!isErrorsAp)
    }
    const ChangeInfoSwitchHu = () => {
        setIsErrorsHu(!isErrorsHu)
    }
    const ChangeInfoSwitchRu = () => {
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
                    <div className="shop-ru google">{storeGoogle != null ? "Google Play" : "Google Play"}</div>
                    <Input id={"google-deploy"} className="w-[110px] cell-deploy" type={"date"}
                           value={storeGoogle != null
                               ? (storeGoogle.DeployDate != "undefined" ? storeGoogle.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoGo}></Input>
                    <Input id={"google-percentage"}
                           className="w-[110px] cell-percentage"
                           placeholder={'Введите процент'}
                           value={storeGoogle != null ? `${storeGoogle.InstallPercentage}` :  ""}
                           onChange={(event) => ChangeInfoGo(event)}></Input>
                    <div className={"cont-errors"}>
                        <input className={"errors"} id={"google-errors"} type={"checkbox"} checked={isErrorsGo} onChange={ChangeInfoSwitchGo}/>
                    </div>
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
                    <div className="shop-ru apple">{storeApple!= null ? "App Store"  : "AppStore"}</div>
                    <Input id={"apple-deploy"} className="w-[110px] cell-deploy" type={"date"}
                           value={storeApple != null
                               ? (storeApple.DeployDate != "undefined" ? storeApple.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoAp}></Input>
                    <Input id={"apple-percentage"} className="w-[110px] cell-percentage"
                           placeholder={'Введите процент'}
                           value={storeApple != null ? storeApple.InstallPercentage : ''}
                           onChange={ChangeInfoAp}></Input>
                    {/*<Input id={"apple-errors"} className="w-[110px] cell-percentage" value={(storesN.length >= 2) ?  storesN[1].IsErrors : 'Есть ли ошибки?'} onChange={ChangeGoogleDeplotInfo}></Input>*/}
                    {/*<Switch checked={stores != null ? ((storesN.length >= 2) ? (storesN[1].IsErrors == "1")  : false) :false}  onChange={ChangeInfo}></Switch>*/}
                    <div className={"cont-errors"}>
                        <input className={"errors"} id={"apple-errors"} type={"checkbox"} checked={isErrorsAp} onChange={ChangeInfoSwitchAp}/>
                    </div>
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
                    <div className="shop apple">{storeHuawei != null ? "Huawei AppGallery"  : "Huawei AppGallery"}</div>
                    <Input id={"huawei-deploy"} className="w-[110px] cell-deploy" type={"date"}
                           value={storeHuawei != null
                               ? (storeHuawei.DeployDate != "undefined" ? storeHuawei.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoHu}></Input>
                    <Input id={"huawei-percentage"} className="w-[110px] cell-percentage"
                           placeholder={'Введите процент'}
                           value={storeHuawei != null ? storeHuawei.InstallPercentage : ''}
                           onChange={ChangeInfoHu}></Input>
                    <div className={"cont-errors"}>
                        <input className={"errors"} id={"huawei-errors"} type={"checkbox"} checked={isErrorsHu} onChange={ChangeInfoSwitchHu}/>
                    </div>
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
                    <div className="shop-ru">{storeRuStore != null ? "RuStore"  : "RuStore"}</div>

                    <Input id={"rustore-deploy"} className="w-[110px] cell-deploy" type={"date"}
                           value={storeRuStore != null
                               ? (storeRuStore.DeployDate != "undefined" ? storeRuStore.DeployDate : 'Введите дату')
                               : 'Введите дату'} onChange={ChangeInfoRu}></Input>
                    <Input id={"rustore-percentage"} className="w-[110px] cell-percentage"
                           placeholder={'Введите процент'}
                           value={storeRuStore != null ? storeRuStore.InstallPercentage : ''}
                           onChange={ChangeInfoRu}></Input>

                    {/*<Switch id={"rustore-errors"} onChange={ChangeInfoSwitchRu} checked={isErrorsRu}></Switch>*/}
                    <div className={"cont-errors"}>
                        <input className={"errors"} id={"rustore-errors"} type={"checkbox"} checked={isErrorsRu} onChange={ChangeInfoSwitchRu}/>
                    </div>
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