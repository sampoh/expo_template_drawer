import {Fragment,useState,useContext} from "react";
import {View,ScrollView,Text} from "react-native";
import {ButtonGroup,Input,Button,Dialog} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {defaultData,ListStyle,ListWidth,convertTableData,typeListData,ListHeaderData,getSessionName,typeSession,globalInfo,setGlobal} from './Cast';
import {useSessionContext,SessionContext,typeContextSession} from './Context'

type typeDetailInfo = {
    status:string,
    data:typeListData
}

type alertInfo = {
    visible:boolean,
    title:string,
    msg:string
}
export default function DetailOfList(props:any){

    const {sessionInfo,setSessionInfo} = useContext(SessionContext);
    const [detailInfo,setDetailInfo] = useState<typeDetailInfo>({status:'loading',data:defaultData});
    const [alertInfo,setAlertInfo] = useState<alertInfo>({visible:false,title:'',msg:''});

    if(detailInfo.status === 'loading'){
        loadDetail(props,setDetailInfo,props.route.params.detail.id);
    }else if(detailInfo.status === 'saving'){
        saveDetail(props,detailInfo.data,setAlertInfo,setSessionInfo,setDetailInfo);
    }
    console.log(detailInfo);

    return (
        <Fragment>
            <View style={{flex:1,paddingHorizontal:0,paddingBottom:0,paddingTop:0,backgroundColor:'#fff'}}>
                <ScrollView style={{paddingHorizontal:12}}>
                    {ListHeaderData.map((each) => {
                        let tmpKey = each as keyof typeListData;
                        if((each === 'id')||(each === '')){
                            return null
                        }else if(each === '食品名'){
                            return (
                                <Input key={each} label={each} value={String(detailInfo.data[tmpKey])}
                                onChangeText={(val)=>{
                                    let tmp = {...detailInfo};
                                    tmp.data[tmpKey] = val as never;
                                    setDetailInfo(tmp)
                                }} />
                            )
                        }else if(each === '備考'){
                            //文字列
                            return (
                                <Input key={each} label={each} value={String(detailInfo.data[tmpKey])}
                                onChangeText={(val)=>{
                                    let tmp = {...detailInfo};
                                    tmp.data[tmpKey] = val as never;
                                    setDetailInfo(tmp)
                                }}
                                style={{height:120,textAlignVertical:'top'}}
                                multiline={true}/>
                            )
                        }else{
                            //数値
                            return (
                                <Input key={each} label={each} value={String(detailInfo.data[tmpKey])}
                                keyboardType='number-pad'
                                onChangeText={(val)=>{
                                    val = val.replace(/[^0-9\\.]/gi, '');
                                    let tmp = {...detailInfo};
                                    tmp.data[tmpKey] = Number(val) as never;
                                    setDetailInfo(tmp)
                                }} />
                            )
                        }
                    })}
                </ScrollView>
                <View style={{
                    flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:10,
                    borderTopWidth:0,borderColor:'#cdcdcd',backgroundColor:'#ececec'}}>
                    <Button title="CANCEL" onPress={() => {props.navigation.goBack()}}
                        titleStyle={{fontSize:18}}
                        buttonStyle={{
                            backgroundColor:'#ff0000',
                            borderRadius:10,
                            paddingTop:8,
                            paddingBottom:8,
                            paddingLeft:24,
                            paddingRight:24,
                            margin:0}}
                    />
                    <Button title="SAVE" onPress={() => {setDetailInfo((prev)=>({...prev,...{status:'saving'}}))}}
                        titleStyle={{fontSize:18}}
                        buttonStyle={{
                            borderRadius:10,
                            paddingTop:8,
                            paddingBottom:8,
                            paddingLeft:40,
                            paddingRight:40,
                            margin:0}}
                    />
                    </View>
            </View>
            <Dialog isVisible={(detailInfo.status !== '')}>
                <Dialog.Loading />
            </Dialog>
            <Dialog isVisible={(alertInfo.visible)} onBackdropPress={()=>{setAlertInfo((prev)=>({...prev,...{visible:false}}))}}>
                <Text style={{color:'#ff0000'}}>{(alertInfo.msg)}</Text>
            </Dialog>
        </Fragment>
    )
}

function loadDetail(props:any,setDetailInfo:React.Dispatch<React.SetStateAction<typeDetailInfo>>,id:number){
    const {sessionInfo,setSessionInfo} = useContext(SessionContext);
    let sessionName = getSessionName();
    AsyncStorage.getItem(sessionName,(err,testid) =>{

        const headerId:string = (testid === null) ? "" : "" + testid;
        const headerJson:string =getSessionName('JSON',headerId);

        const myUrl = 'https://local.rna.co.jp/test/react_detail_data.php?id=' + id;

        fetch(myUrl,{mode:'cors',headers:JSON.parse(headerJson)})
        .then(temp => {
            console.log('HTTP CODE : ' + temp.status);
            return temp.json();
        }).then(res => {
            // console.log('Response',res);
            setGlobal('{"hasSession":' + res.hasSession + '}');
            if(res.hasSession){
                setDetailInfo((prev)=>({...prev,...{status:'',data:res.detail}}));
            }else{
                setDetailInfo((prev)=>({...prev,...{status:''}}));
                setSessionInfo((prev)=>({...prev,...{hasSession:res.hasSession}}));
            }
        }).catch(err => {
            setDetailInfo((prev)=>({...prev,...{status:''}}));
            props.navigation.navigate('ListOfList');
        });
    
    });

}

function saveDetail(
    props:any,
    data:typeListData,
    setAlertInfo:React.Dispatch<React.SetStateAction<alertInfo>>,
    setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>,
    setDetailInfo:React.Dispatch<React.SetStateAction<typeDetailInfo>>){

    let execute = (data.食品名 !== '');
    if(!execute){
        setAlertInfo((prev)=>({...prev,...{visible:true,title:'エラー',msg:'食品名を入力してください。'}}));
    }
    if(execute){
        let sessionName = getSessionName();
        AsyncStorage.getItem(sessionName,(err,testid) =>{

            const headerId:string = (testid === null) ? "" : "" + testid;
            const headerJson:string =getSessionName('JSON',headerId);
    
            const myUrl = 'https://local.rna.co.jp/test/react_detail_save.php';
    
            fetch(myUrl,{mode:'cors',headers:JSON.parse(headerJson),method:'POST',body:JSON.stringify(data)})
            .then(temp => {
                console.log('HTTP CODE : ' + temp.status);
                return temp.json();
            }).then(res => {
                // console.log('Response',res);
                setGlobal('{"hasSession":' + res.hasSession + '}');
                if(res.hasSession){
                    if(res.errMsg === ''){
                        props.navigation.navigate('ListOfList',{list:{mode:'reload'}});
                    }else{
                        setAlertInfo((prev)=>({...prev,...{visible:true,title:'エラー',msg:res.errMsg}}));
                    }
                }else{
                    setSessionInfo((prev)=>({...prev,...{hasSession:res.hasSession}}));
                }
                setDetailInfo((prev)=>({...prev,...{status:''}}));
            }).catch(err => {
                console.log('Error');
                setDetailInfo((prev)=>({...prev,...{status:''}}));
            });
    
        });
    }
}