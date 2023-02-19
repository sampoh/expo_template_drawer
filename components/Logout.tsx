import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {getSessionName,typeSession,globalInfo,setGlobal} from './Cast';

//ログアウト処理
export function LogoutComm(
    setVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>):void{

    let sessionName = getSessionName();
    AsyncStorage.getItem(sessionName,(err,testid) =>{

        setVisible(true);

        if(err !== null){ console.log(err) }

        console.log(globalInfo);
        setGlobal('{"hasSession":false}');
        console.log(globalInfo);
        // setSessionInfo((prev)=>({...prev,...{hasSession:false}}));
        let headerId:string = (testid === null) ? "" : "" + testid;
        let headerJson:string = getSessionName('JSON',headerId);
        let myUrl = 'https://local.rna.co.jp/test/react_logout.php';
        fetch(myUrl,{mode:'cors',headers:JSON.parse(headerJson)})
        .then(res => {
            console.log('HTTP CODE : ' + res.status);
            return res.json();
        }).then(content => {
            console.log(content)
            AsyncStorage.setItem(sessionName,'');
            setGlobal('{"sessionId":"","hasSession":false}');
            setSessionInfo((prev)=>({...prev,...{status:'loaded',loaded:true,hasSession:false}}));
            setVisible(false);
        }).catch(err => {
            setSessionInfo((prev)=>({...prev,...{status:'loaded',loaded:true,hasSession:false}}));
            setVisible(false);
        });

    });

}
