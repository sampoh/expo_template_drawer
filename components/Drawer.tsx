import * as React from 'react';
import {Fragment,useState,useContext} from 'react';
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import {Dialog} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {getSessionName,typeSession,globalInfo,setGlobal} from './Cast';
import {LogoutComm} from './Logout';
import {List} from './List';
import {SessionContext} from './Context';

type logoutIO = {
    setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>
}

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}
  
function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props:any) {
    const {sessionInfo,setSessionInfo} = useContext(SessionContext);
    const [visible,setVisible] = useState(false);
    const toggleVisible = () => {
        setVisible(!visible);
    }
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="TEST" onPress={() => {
            TestComm();
        }} />
        <DrawerItem label="Logout" onPress={() => {
            LogoutComm(setVisible,setSessionInfo);
        }} />
        <Dialog isVisible={visible} onBackdropPress={toggleVisible}>
            <Dialog.Loading />
        </Dialog>
      </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function OnlyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={
      (props) =>(<CustomDrawerContent {...props} />)
      }>
      <Drawer.Screen name="食品成分表(野菜)" component={List} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default function AppDrawer() {
  return (
    <NavigationContainer>
    <Drawer.Navigator useLegacyImplementation drawerContent={
      (props) =>(<CustomDrawerContent {...props} />)
      }>
      <Drawer.Screen name="食品成分表(野菜)" component={List} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

//テスト
function TestComm():void{
  let sessionName = getSessionName();
    AsyncStorage.getItem(sessionName,(err,testid) =>{

        if(err !== null){ console.log(err) }

        let headerId:string = (testid === null) ? "" : "" + testid;
        let headerJson:string = getSessionName('JSON',headerId);
        let myUrl = 'https://local.rna.co.jp/test/react_list_data.php';
        fetch(myUrl,{mode:'cors',headers:JSON.parse(headerJson)})
        .then(res => {
            console.log('HTTP CODE : ' + res.status);
            return res.json();
        }).then(content => {
            console.log(content)
        }).catch(err => {
        });

    });
}
