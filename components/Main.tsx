import * as React from 'react';
import {useState,useContext} from 'react';
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import {Dialog} from '@rneui/themed';

// import {getSessionName,typeSession,globalInfo,setGlobal} from './Cast';
import {LogoutComm} from './Logout';
import {List} from './List';
import {SessionContext} from './Context';

function SampleScreen(props:any){
  console.log(props);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:24}}>Sample Screen</Text>
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

export default function Main() {
  return (
    <NavigationContainer>
    <Drawer.Navigator useLegacyImplementation drawerContent={
      (props) =>(<CustomDrawerContent {...props} />)
      }>
      <Drawer.Screen name="食品成分表(野菜)" component={List} />
      <Drawer.Screen name="Sample Screen" component={SampleScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
