import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/themed';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-gesture-handler';

//実装
import Login from './components/Login';
import Main from './components/Main';
import {detectDevice,getSessionName,typeSession,globalInfo,setGlobal} from './components/Cast';
import {SessionContext} from './components/Context';

//expoデバッグ用
import {StatusBar} from 'expo-status-bar';

export type typeContextSession = {
  sessionInfo:typeSession
  setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>
}

//初期通信 ( セッションチェック )
function checkSession(sessionInfo:typeSession,setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>){

  if(sessionInfo.status === 'before'){
    let sessionName = getSessionName();
    AsyncStorage.getItem(sessionName,(err,testid) =>{

      console.log('[ App is loading ]');
      if(err !== null){ console.log(err) }
      let headerId:string = (testid === null) ? "" : "" + testid;
      let headerJson:string =getSessionName('JSON',headerId);
      console.log(headerJson);
      let req:string = 'https://local.rna.co.jp/test/react_check_session.php';
  
      fetch(req,{mode:'cors',headers:JSON.parse(headerJson)}).then(temp =>temp.json())
      .then(res =>{
        console.log('Response of "' + req + '"',res);
        AsyncStorage.setItem(sessionName,res.testid);
        setGlobal('{"sessionId":"' + res.testid + '","hasSession":' + res.hasSession + '}');
        setSessionInfo((prev)=>({...prev,...{status:'loaded',loaded:true,hasSession:res.hasSession,device:'sp'}}));
      }).catch(err => {
        console.log(err);
        setSessionInfo((prev)=>({...prev,...{status:'failed',loaded:false}}));
      })
        
    });

  }

}

function App() {

  const [sessionInfo,setSessionInfo] = React.useState<typeSession>({status:"before",loaded:false,hasSession:false,device:'sp'});

  if(sessionInfo.status === 'loaded'){
    //セッションチェック済みの場合はこちら
    console.log('[ App is loaded ]');
    if(sessionInfo.hasSession){
      //セッション有り
      return (
        <SessionContext.Provider value={{sessionInfo,setSessionInfo}}>
          <Main />
          <StatusBar style="auto" />
        </SessionContext.Provider>
      )
    }else{
      //セッション無し
      return (
        <SessionContext.Provider value={{sessionInfo,setSessionInfo}}>
          <View style={styles.container}>
            <Login setSessionInfo={setSessionInfo}/>
            <StatusBar style="auto" />
          </View>
        </SessionContext.Provider>
      )  
    }
  }else if(sessionInfo.status === 'before'){
    ///アプリ起動時はセッションチェックを実施
    console.log('[ App is not loaded ]');
    checkSession(sessionInfo,setSessionInfo);
    return (
      <View style={styles.container}>
        <Text h3>Loading</Text>
        <StatusBar style="auto" />
      </View>
    )
  }else if(sessionInfo.status === 'failed'){
  }
}

//Viewのスタイル
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App