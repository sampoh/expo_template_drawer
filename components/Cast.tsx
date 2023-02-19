//セッションデータ名
export const sessionName:string = "Sampoh-Id";
export function getSessionName(MODE:string = '',headerId:string = ''):string{
    if(MODE.toLowerCase() === 'json'){
        return '{"' + sessionName + '":"' + headerId + '"}'; //fetchコマンドのheader用JSONを返却
    }else{
        return sessionName; //名称文字列のみを返却
    }
}

//ユーザデータの型 ( DOM同期させたい値 )
export type typeSession = {
    status:string;
    loaded:boolean;
    hasSession:boolean;
	device:string;
};

//グローバル値の型 ( DOM同期させたくない値 )
export type typeGlobalInfo = {
    loaded:boolean,
    hasSession:boolean,
    sessionId:string,
    userId:string,
    limit:string,
    iodate:string
}

//グローバル値の初期値 ( DOM同期させたくない値 )
export let globalInfo:typeGlobalInfo = {
    loaded:false,
    hasSession:false,
    sessionId:"",
    userId:"",
    limit:"",
    iodate:""
};

//グローバル値の更新 ( 引数はJSON文字列なので注意 )
export function setGlobal(JS:string){
    globalInfo = {...globalInfo,...JSON.parse(JS)};
};

//端末判定
export function detectDevice(ua:string){
	let device:string = '';
	if(ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0){
		device = 'sp';
	}else if(ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0){ //iOS12 まで
		device = 'tab';
	}else if(ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document){ //iOS13 以降
		device = 'tab';
	}else{
		device = 'pc';
	}
	return device;	
}

//一覧/詳細用データの型
export type typeListData = {
    id:number,
	食品名:string,
    廃棄率:number,
    エネルギー_kcal:number,
    エネルギー_kj:number,
    水分:number,
    タンパク質:number,
    アミノ酸組成によるたんぱく質:number,
	脂質:number,
	トリアシルグリセロール当量:number,
	飽和脂肪酸:number,
	一価不飽和脂肪酸:number,
	多価不飽和脂肪酸:number,
	コレステロール:number,
	炭水化物:number,
	利用可能炭水化物_単糖当量:number,
	水溶性食物繊維:number,
	不溶性食物繊維:number,
	食物繊維総量:number,
	灰分:number,
	ナトリウム:number,
	カリウム:number,
	カルシウム:number,
	マグネシウム:number,
	リン:number,
	鉄:number,
	亜鉛:number,
	銅:number,
	マンガン:number,
	ヨウ素:number,
	セレン:number,
	クロム:number,
	モリブデン:number,
	レチノール:number,
	αカロテン:number,
	βカロテン:number,
	βクリプトキサンチン:number,
	βカロテン当量:number,
	レチノール活性当量:number,
	ビタミンD:number,
	αトコフェロール:number,
	βトコフェロール:number,
	γトコフェロール:number,
	δトコフェロール:number,
	ビタミンK:number,
	ビタミンB1:number,
	ビタミンB2:number,
	ナイアシン:number,
	ビタミンB6:number,
	ビタミンB12:number,
	葉酸:number,
	パントテン酸:number,
	ビオチン:number,
	ビタミンC:number,
	食塩相当量:number,
	備考:string
}

//詳細用初期値
export const defaultData = {
    id:0,
	食品名:'',
    廃棄率:0,
    エネルギー_kcal:0,
    エネルギー_kj:0,
    水分:0,
    タンパク質:0,
    アミノ酸組成によるたんぱく質:0,
	脂質:0,
	トリアシルグリセロール当量:0,
	飽和脂肪酸:0,
	一価不飽和脂肪酸:0,
	多価不飽和脂肪酸:0,
	コレステロール:0,
	炭水化物:0,
	利用可能炭水化物_単糖当量:0,
	水溶性食物繊維:0,
	不溶性食物繊維:0,
	食物繊維総量:0,
	灰分:0,
	ナトリウム:0,
	カリウム:0,
	カルシウム:0,
	マグネシウム:0,
	リン:0,
	鉄:0,
	亜鉛:0,
	銅:0,
	マンガン:0,
	ヨウ素:0,
	セレン:0,
	クロム:0,
	モリブデン:0,
	レチノール:0,
	αカロテン:0,
	βカロテン:0,
	βクリプトキサンチン:0,
	βカロテン当量:0,
	レチノール活性当量:0,
	ビタミンD:0,
	αトコフェロール:0,
	βトコフェロール:0,
	γトコフェロール:0,
	δトコフェロール:0,
	ビタミンK:0,
	ビタミンB1:0,
	ビタミンB2:0,
	ナイアシン:0,
	ビタミンB6:0,
	ビタミンB12:0,
	葉酸:0,
	パントテン酸:0,
	ビオチン:0,
	ビタミンC:0,
	食塩相当量:0,
	備考:''
}

export const ListHeaderData:string[] = [
	"",//ボタン用空白
	"id",
	"食品名",
	"廃棄率",
	"エネルギー_kcal",
	"エネルギー_kj",
	"水分",
	"タンパク質",
	"アミノ酸組成によるたんぱく質",
	"脂質",
	"トリアシルグリセロール当量",
	"飽和脂肪酸",
	"一価不飽和脂肪酸",
	"多価不飽和脂肪酸",
	"コレステロール",
	"炭水化物",
	"利用可能炭水化物_単糖当量",
	"水溶性食物繊維",
	"不溶性食物繊維",
	"食物繊維総量",
	"灰分",
	"ナトリウム",
	"カリウム",
	"カルシウム",
	"マグネシウム",
	"リン",
	"鉄",
	"亜鉛",
	"銅",
	"マンガン",
	"ヨウ素",
	"セレン",
	"クロム",
	"モリブデン",
	"レチノール",
	"αカロテン",
	"βカロテン",
	"βクリプトキサンチン",
	"βカロテン当量",
	"レチノール活性当量",
	"ビタミンD",
	"αトコフェロール",
	"βトコフェロール",
	"γトコフェロール",
	"δトコフェロール",
	"ビタミンK",
	"ビタミンB1",
	"ビタミンB2",
	"ナイアシン",
	"ビタミンB6",
	"ビタミンB12",
	"葉酸",
	"パントテン酸",
	"ビオチン",
	"ビタミンC",
	"食塩相当量",
	"備考"
];

export const ListWidth:number[] = [
	70, //ボタン用空白
	50, //id
	240, //食品名
	80, //廃棄率
	160, //エネルギー_kcal
	160, //エネルギー_kj
	60, //水分
	100, //タンパク質
	240, //アミノ酸組成によるたんぱく質
	60, //脂質
	240, //トリアシルグリセロール当量
	120, //飽和脂肪酸
	160, //一価不飽和脂肪酸
	160, //多価不飽和脂肪酸
	160, //コレステロール
	120, //炭水化物
	240, //利用可能炭水化物_単糖当量
	160, //水溶性食物繊維
	160, //不溶性食物繊維
	140, //食物繊維総量
	60, //灰分
	110, //ナトリウム
	100, //カリウム
	110, //カルシウム
	120, //マグネシウム
	60, //リン
	50, //鉄
	60, //亜鉛
	50, //銅
	90, //マンガン
	80, //ヨウ素
	80, //セレン
	80, //クロム
	110, //モリブデン
	110, //レチノール
	110, //αカロテン
	110, //βカロテン
	180, //βクリプトキサンチン
	140, //βカロテン当量
	180, //レチノール活性当量
	100, //ビタミンD
	150, //αトコフェロール
	150, //βトコフェロール
	150, //γトコフェロール
	150, //δトコフェロール
	100, //ビタミンK
	110, //ビタミンB1
	110, //ビタミンB2
	110, //ナイアシン
	110, //ビタミンB6
	120, //ビタミンB12
	60, //葉酸
	120, //パントテン酸
	90, //ビオチン
	100, //ビタミンC
	100, //食塩相当量
	320, //備考
];
/*
export const ListStyle:string[] = [
	'center', //id
	'left', //食品名
	'center', //廃棄率
	'center', //エネルギー_kcal
	'center', //エネルギー_kj
	'center', //水分
	'center', //タンパク質
	'center', //アミノ酸組成によるたんぱく質
	'center', //脂質
	'center', //トリアシルグリセロール当量
	'center', //飽和脂肪酸
	'center', //一価不飽和脂肪酸
	'center', //多価不飽和脂肪酸
	'center', //コレステロール
	'center', //炭水化物
	'center', //利用可能炭水化物_単糖当量
	'center', //水溶性食物繊維
	'center', //不溶性食物繊維
	'center', //食物繊維総量
	'center', //灰分
	'center', //ナトリウム
	'center', //カリウム
	'center', //カルシウム
	'center', //マグネシウム
	'center', //リン
	'center', //鉄
	'center', //亜鉛
	'center', //銅
	'center', //マンガン
	'center', //ヨウ素
	'center', //セレン
	'center', //クロム
	'center', //モリブデン
	'center', //レチノール
	'center', //αカロテン
	'center', //βカロテン
	'center', //βクリプトキサンチン
	'center', //βカロテン当量
	'center', //レチノール活性当量
	'center', //ビタミンD
	'center', //αトコフェロール
	'center', //βトコフェロール
	'center', //γトコフェロール
	'center', //δトコフェロール
	'center', //ビタミンK
	'center', //ビタミンB1
	'center', //ビタミンB2
	'center', //ナイアシン
	'center', //ビタミンB6
	'center', //ビタミンB12
	'center', //葉酸
	'center', //パントテン酸
	'center', //ビオチン
	'center', //ビタミンC
	'center', //食塩相当量
	'left', //備考
];
*/
export const ListStyle:any[] = [
	{textAlign:'center'}, //id
	{textAlign:'left'}, //食品名
	{textAlign:'center'}, //廃棄率
	{textAlign:'center'}, //エネルギー_kcal
	{textAlign:'center'}, //エネルギー_kj
	{textAlign:'center'}, //水分
	{textAlign:'center'}, //タンパク質
	{textAlign:'center'}, //アミノ酸組成によるたんぱく質
	{textAlign:'center'}, //脂質
	{textAlign:'center'}, //トリアシルグリセロール当量
	{textAlign:'center'}, //飽和脂肪酸
	{textAlign:'center'}, //一価不飽和脂肪酸
	{textAlign:'center'}, //多価不飽和脂肪酸
	{textAlign:'center'}, //コレステロール
	{textAlign:'center'}, //炭水化物
	{textAlign:'center'}, //利用可能炭水化物_単糖当量
	{textAlign:'center'}, //水溶性食物繊維
	{textAlign:'center'}, //不溶性食物繊維
	{textAlign:'center'}, //食物繊維総量
	{textAlign:'center'}, //灰分
	{textAlign:'center'}, //ナトリウム
	{textAlign:'center'}, //カリウム
	{textAlign:'center'}, //カルシウム
	{textAlign:'center'}, //マグネシウム
	{textAlign:'center'}, //リン
	{textAlign:'center'}, //鉄
	{textAlign:'center'}, //亜鉛
	{textAlign:'center'}, //銅
	{textAlign:'center'}, //マンガン
	{textAlign:'center'}, //ヨウ素
	{textAlign:'center'}, //セレン
	{textAlign:'center'}, //クロム
	{textAlign:'center'}, //モリブデン
	{textAlign:'center'}, //レチノール
	{textAlign:'center'}, //αカロテン
	{textAlign:'center'}, //βカロテン
	{textAlign:'center'}, //βクリプトキサンチン
	{textAlign:'center'}, //βカロテン当量
	{textAlign:'center'}, //レチノール活性当量
	{textAlign:'center'}, //ビタミンD
	{textAlign:'center'}, //αトコフェロール
	{textAlign:'center'}, //βトコフェロール
	{textAlign:'center'}, //γトコフェロール
	{textAlign:'center'}, //δトコフェロール
	{textAlign:'center'}, //ビタミンK
	{textAlign:'center'}, //ビタミンB1
	{textAlign:'center'}, //ビタミンB2
	{textAlign:'center'}, //ナイアシン
	{textAlign:'center'}, //ビタミンB6
	{textAlign:'center'}, //ビタミンB12
	{textAlign:'center'}, //葉酸
	{textAlign:'center'}, //パントテン酸
	{textAlign:'center'}, //ビオチン
	{textAlign:'center'}, //ビタミンC
	{textAlign:'center'}, //食塩相当量
	{textAlign:'left'}, //備考
];

export function convertTableData(IN:typeListData[]){
	let arr = [];
	for(let i=0;i<IN.length;i++){
		let temp = [];
		temp.push(IN[i].id);
		temp.push(IN[i].食品名);
		temp.push(IN[i].廃棄率);
		temp.push(IN[i].エネルギー_kcal);
		temp.push(IN[i].エネルギー_kj);
		temp.push(IN[i].水分);
		temp.push(IN[i].タンパク質);
		temp.push(IN[i].アミノ酸組成によるたんぱく質);
		temp.push(IN[i].脂質);
		temp.push(IN[i].トリアシルグリセロール当量);
		temp.push(IN[i].飽和脂肪酸);
		temp.push(IN[i].一価不飽和脂肪酸);
		temp.push(IN[i].多価不飽和脂肪酸);
		temp.push(IN[i].コレステロール);
		temp.push(IN[i].炭水化物);
		temp.push(IN[i].利用可能炭水化物_単糖当量);
		temp.push(IN[i].水溶性食物繊維);
		temp.push(IN[i].不溶性食物繊維);
		temp.push(IN[i].食物繊維総量);
		temp.push(IN[i].灰分);
		temp.push(IN[i].ナトリウム);
		temp.push(IN[i].カリウム);
		temp.push(IN[i].カルシウム);
		temp.push(IN[i].マグネシウム);
		temp.push(IN[i].リン);
		temp.push(IN[i].鉄);
		temp.push(IN[i].亜鉛);
		temp.push(IN[i].銅);
		temp.push(IN[i].マンガン);
		temp.push(IN[i].ヨウ素);
		temp.push(IN[i].セレン);
		temp.push(IN[i].クロム);
		temp.push(IN[i].モリブデン);
		temp.push(IN[i].レチノール);
		temp.push(IN[i].αカロテン);
		temp.push(IN[i].βカロテン);
		temp.push(IN[i].βクリプトキサンチン);
		temp.push(IN[i].βカロテン当量);
		temp.push(IN[i].レチノール活性当量);
		temp.push(IN[i].ビタミンD);
		temp.push(IN[i].αトコフェロール);
		temp.push(IN[i].βトコフェロール);
		temp.push(IN[i].γトコフェロール);
		temp.push(IN[i].δトコフェロール);
		temp.push(IN[i].ビタミンK);
		temp.push(IN[i].ビタミンB1);
		temp.push(IN[i].ビタミンB2);
		temp.push(IN[i].ナイアシン);
		temp.push(IN[i].ビタミンB6);
		temp.push(IN[i].ビタミンB12);
		temp.push(IN[i].葉酸);
		temp.push(IN[i].パントテン酸);
		temp.push(IN[i].ビオチン);
		temp.push(IN[i].ビタミンC);
		temp.push(IN[i].食塩相当量);
		temp.push(IN[i].備考);
		arr.push(Array.from(temp));
	}
	return arr;
}