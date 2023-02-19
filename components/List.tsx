import * as React from 'react';
import {Fragment,useState,useContext,useEffect} from 'react';
import {Text,StyleSheet,View,ScrollView} from 'react-native';
import {ButtonGroup,Input,Button,Dialog} from '@rneui/themed';
import {Table,Row,Rows,Col,TableWrapper,Cell} from 'react-native-table-component';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {defaultData,ListStyle,ListWidth,convertTableData,typeListData,ListHeaderData,getSessionName,typeSession,globalInfo,setGlobal} from './Cast';
import {useSessionContext,SessionContext,typeContextSession} from './Context'
import DetailOfList from './Detail';

const recsPerPage:number = 25;//1ページの件数

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });

type updateListData = {
    searchText:string,
    list:any[],
    hasPager:boolean,
    pager:typePager
};

type typePager = {
    page:number,
    pageMax:number,
    pageFrom:number,
    pageTo:number,
    prev:false,
    prevJump:false,
    next:false,
    nextJump:false,
    recsPerPage:number,
    recsAll:number,
    recFrom:number,
    recTo:number,
    msg:string
};

type typeFuncPager = {
    DATA:updateListData,
    setComm:React.Dispatch<React.SetStateAction<typeComm>>
};

type typeComm = {
    state: string;
    page: number;
    recsPerPage: number;
    searchText: string;
    id:number; //詳細ロード用
}

type typeScreenInfo = {
    mode:string,
    id:number,
    data:typeListData
};

const Stack = createStackNavigator();

//タイトル非表示のスタックナビゲーション
export function List(){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="ListOfList" component={ListOfList} />
            <Stack.Screen name="DetailOfList" component={DetailOfList} />
        </Stack.Navigator>
    )
}

function ListOfList(props:any){
    // console.log(props);
    const {sessionInfo,setSessionInfo} = useContext(SessionContext);
    const [listData,setListData] = useState<updateListData>({
        searchText:"",
        list:[],
        hasPager:false,
        pager:{
            page:1,pageMax:1,pageFrom:1,pageTo:1,
            prev:false,prevJump:false,next:false,nextJump:false,
            recsPerPage:recsPerPage,recsAll:0,recFrom:0,recTo:0,
            msg:""
        }
    });
    const [searchName,setSearchName] = useState("");
    const [comm,setComm] = useState<typeComm>({state:"",page:1,recsPerPage:recsPerPage,searchText:"",id:0});

    useEffect(() => {
        //"comm" の変化時のみ動作する
        if(comm.state === 'communicating'){
            LoadList(comm,setComm,setListData,setSessionInfo);
        }
    },[comm]);

    //リロード
    if(
        (typeof props.route.params !== 'undefined') &&
        (typeof props.route.params.list !== 'undefined') &&
        (typeof props.route.params.list.mode !== 'undefined') &&
        (props.route.params.list.mode === 'reload')){
            props.route.params.list.mode = '';
            setComm((prev)=>({...prev,...{state:'communicating'}}));
    }

    let inputStyle = {
        inputStyle:{margin:0,padding:0},
        containerStyle:{marginTop:0,marginBottom:-18,padding:0},
        inputContainerStyle:{margin:0,padding:0}
    }

    return (
        <View style={{flex:1,paddingLeft:12,paddingRight:12,paddingBottom:0,paddingTop:0,backgroundColor:'#fff'}}>
            <View style={{flex:0.95}}>
            <Input placeholder="食品名" value={searchName} onChangeText={(val)=>{setSearchName(val)}}
                inputStyle={inputStyle.inputStyle}
                containerStyle={inputStyle.containerStyle}
                inputContainerStyle={inputStyle.inputContainerStyle}/>
            <Button
                title={'検索'}
                titleStyle={{fontSize:18}}
                buttonStyle={{
                    backgroundColor:'rgba(78, 116, 289, 1)',
                    borderRadius:24,
                    height:48,
                    padding:0
                }}
                containerStyle={{
                    marginHorizontal:100,
                    marginTop:0,
                    marginBottom:12,
                }}
                onPress={() => setComm({state:'communicating',page:1,recsPerPage:listData.pager.recsPerPage,searchText:searchName,id:0})}/>
            {/* ↑ "useEffect"で非同期に順次実行 ↑ */}
            {listData.hasPager && (<ListPager DATA={listData} setComm={setComm} />)}
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth:2,borderColor:'#c8e1ff'}}>
                        <Row data={ListHeaderData} widthArr={ListWidth} style={styles.head} textStyle={{textAlign:'center'}} />
                    </Table>
                    {(listData.list.length > 0) && (
                        <ScrollView style={{marginTop:-1}}>
                            <Table borderStyle={{borderWidth:2,borderColor:'#c8e1ff'}}>
                                <RenderCols list={listData.list} props={props} setComm={setComm}/>
                            </Table>
                        </ScrollView>
                    )}
                </View>
            </ScrollView>

            <Dialog isVisible={(comm.state !== '')}>
                <Dialog.Loading />
            </Dialog>
                
            </View>
            <View style={{flex:0.05,justifyContent:'center',alignItems:'center'}}>
                <View style={{height:'80%',width:'90%',justifyContent:'center',alignItems:'center',borderRadius:15,backgroundColor:'#dcdcdc'}}>
                    <Text style={{textAlignVertical:'center'}}>{listData.pager.msg}</Text>
                </View>
            </View>
        </View>
    );
}

type typeRenderCols = {
    list:any[],
    props:any,
    setComm:React.Dispatch<React.SetStateAction<typeComm>>
}
function RenderCols({list,props,setComm}:typeRenderCols):JSX.Element{

    //未指定時用デフォルトスタイル
    const colStyle = {
        borderBottomWidth:2,
        borderRightWidth:2,
        borderColor:'#c8e1ff',
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:4,
        paddingRight:4,
        verticalAlign:'middle'
    };

    return (
        <View style={{flexDirection:'column'}}>
        {list.map((rowData,i) => {
            return (
                <View key={i} style={{flexDirection:'row',overflow:'hidden'}}>
                    <View style={{...colStyle,...{width:ListWidth[0],justifyContent:'center',alignItems:'center'}}}>
                        <Button
                            title={'編集'}
                            titleStyle={{fontSize:15,color:'#222'}}
                            buttonStyle={{
                                backgroundColor:'#ddd',
                                borderRadius:5,
                                paddingTop:3,
                                paddingBottom:3,
                                paddingLeft:12,
                                paddingRight:12,
                                margin:0,
                            }}
                            containerStyle={{
                                margin:0,
                                padding:0,
                                justifyContent:'center'
                            }}
                            onPress={() => editDetail(props,rowData[0])}
                         />
                    </View>
                    {rowData.map((colData:string,k:number) => {
                        let pos = k + 1;
                        return (
                            <Text key={"" + i + "_" + k} style={{...colStyle,...ListStyle[k],...{width:ListWidth[pos]}}}>
                                {colData}
                            </Text>
                        )
                    })}
                </View>
            )
        })}
        </View>
    )

}

function LoadList(
    comm:typeComm,
    setComm:React.Dispatch<React.SetStateAction<typeComm>>,
    setListData:React.Dispatch<React.SetStateAction<updateListData>>,
    setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>){

    let sessionName = getSessionName();
    AsyncStorage.getItem(sessionName,(err,testid) =>{

        // if(err !== null){ console.log(err) }
        let headerId:string = (testid === null) ? "" : "" + testid;
        let headerJson:string =getSessionName('JSON',headerId);
        console.log(headerJson);

        let query_params = encodeURIComponent(comm.searchText);
        let myUrl = 'https://local.rna.co.jp/test/react_list_data.php?searchname=' + query_params;
        myUrl += '&page=' + comm.page + '&recsperpage=' + comm.recsPerPage;

        fetch(myUrl,{mode:'cors',headers:JSON.parse(headerJson)})
        .then(temp => {
            console.log('HTTP CODE : ' + temp.status);
            return temp.json();
        }).then(res => {
            // console.log('Response',res);
            setListData((prev)=>({...prev,...{searchText:res.searchText,list:res.list,hasPager:res.hasPager,pager:res.pager}}));
            setGlobal('{"hasSession":' + res.hasSession + '}');
            if(!res.hasSession){
                setSessionInfo((prev)=>({...prev,...{hasSession:res.hasSession}}));
            }
            setComm((prev)=>({...prev,...{state:""}}));
        }).catch(err => {
            setComm((prev)=>({...prev,...{state:""}}));
        });
    
    });

}

//ページャ要素
function ListPager({DATA,setComm}:typeFuncPager){
    // console.log(DATA);
    let buttons:string[] = [];
    buttons.push('<<');
    buttons.push('<');
    let count:number = 1;
    let index:number = 2;
    for(let i=DATA.pager.pageFrom;i<=DATA.pager.pageTo;i++){
        count++;
        buttons.push("" + i);
        if(i === DATA.pager.page){ index = count }
    }
    buttons.push('>');
    buttons.push('>>');
    return (
        <ButtonGroup buttons={buttons} selectedIndex={index} containerStyle={{
            marginTop:0,
            marginBottom:12
        }}
        onPress={(val) => ExecutePager(buttons[val],DATA,setComm)}/>
    );
}

//ページング処理
function ExecutePager(
    str:string,
    DATA:updateListData,
    setComm:React.Dispatch<React.SetStateAction<typeComm>>){
    let newPage:number = 1;
    if(str === '<<'){
        newPage = 1;
    }else if(str === '<'){
        newPage = DATA.pager.page - 1;
        if(newPage < 1){ newPage = 1 }
    }else if(str === '>'){
        newPage = DATA.pager.page + 1;
        if(newPage > DATA.pager.pageMax){ newPage = DATA.pager.pageMax }
    }else if(str === '>>'){
        newPage = DATA.pager.pageMax
    }else{
        newPage = Number(str);
    }
    if(newPage !== DATA.pager.page){
        //"useEffect"で非同期に順次実行
        setComm({state:'communicating',page:newPage,recsPerPage:DATA.pager.recsPerPage,searchText:DATA.searchText,id:0});
    }
}

//編集画面へ遷移
function editDetail(props:any,dataId:number){
    props.navigation.navigate('DetailOfList',{detail:{id:dataId,mode:'edit'}});
}
