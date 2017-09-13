#include "lib_color.jsx"
var tones = [
  {s:95.0, b:60.0, title:"ビビッド"},
  {s:90, b:80, title:"ブライト"},
  {s:80, b:50, title:"ストロング"},
  {s:80, b:35, title:"ディープ"},
  {s:55, b:80, title:"ライト"},
  {s:55, b:65, title:"ソフト"},
  {s:55, b:45, title:"ダル"},
  {s:55, b:25, title:"ダーク"},
  {s:90, b:85, title:"ペール"},
  {s:22.5, b:65, title:"ライトグレイッシュ"},
  {s:22.5, b:45, title:"グレイッシュ"},
  {s:22.5, b:25, title:"ダークグレイッシュ"}
]

// ランダムなドミナントカラー（同一トーン）を生成する関数
function generateRandomColorWithTone(tone){
  var hue = Math.floor( Math.random() * 360 )
  var saturation = tone.s / 100.0;
  var brightness = tone.b / 100.0;  
  alert("h="+hue+" s="+saturation+" b="+brightness);
  var newColor;
  if(activeDocument.documentColorSpace == DocumentColorSpace.RGB){
    var tmpRgb = $$.color.HSBtoRGB(hue, saturation, brightness);
    newColor = new RGBColor();
    newColor.red = Math.floor( tmpRgb.R );
    newColor.green = Math.floor( tmpRgb.G );
    newColor.blue = Math.floor( tmpRgb.B );
    alert("R="+newColor.red +" G="+newColor.green +" B="+newColor.blue);
  }
  else if(activeDocument.documentColorSpace == DocumentColorSpace.CMYK){
    var tmpCmyk = $$.color.HSBtoCMYK(hue, saturation, brightness);
    newColor = new CMYKColor();
    newColor.cyan = Math.floor( tmpCmyk.C );
    newColor.magenta = Math.floor( tmpCmyk.M );
    newColor.yellow = Math.floor( tmpCmyk.Y );
    newColor.black = Math.floor( tmpCmyk.K );
    alert("C="+newColor.cyan +" M="+newColor.magenta +" Y="+newColor.yellow +" K="+newColor.black);
  }
  return newColor;
}

//  渡されたオブジェクト配列を全てランダムな色にする関数
function setRandomColorWithTone(arr, tone){
  for (var i=0; i<arr.length; i++){
    if(arr[i].groupItems){
      // グループであればさらに再帰呼び出し
      setRandomColorWithTone(arr[i].pageItems, tone);
    }else{
      // 各オブジェクトの塗り色にランダムな色を設定
      arr[i].fillColor  = generateRandomColorWithTone(tone); 
    }
  }    
}

// トーンを選択させるダイアログを表示
function showToneDialog(){

  var dx = 10;
  var width = 100;
  var dy = 5;
  var height = 15;
  var dia = new Window("dialog", "トーンを選んでください", [0,0,dx*5+width*3,150]);

  dia.pane1 = dia.add("panel",[5 ,10 ,dx*4+width*3 ,110] ,"トーン");

  dia.vivid = dia.pane1.add("radiobutton", [dx, dy, dx+width, dy+height], "vivid");
  dia.blight = dia.pane1.add("radiobutton", [dx*2+width, dy, dx*2+width*2, dy+height], "blight");
  dia.strong = dia.pane1.add("radiobutton", [dx*3+width*2, dy, dx*3+width*3, dy+height], "strong");
  dia.deep = dia.pane1.add("radiobutton", [dx, dy*2+height, dx+width, dy*2+height*2], "deep" );
  dia.light = dia.pane1.add("radiobutton", [dx*2+width, dy*2+height, dx*2+width*2, dy*2+height*2], "light");
  dia.soft = dia.pane1.add("radiobutton", [dx*3+width*2, dy*2+height, dx*3+width*3, dy*2+height*2], "soft");
  dia.dull = dia.pane1.add("radiobutton", [dx, dy*3+height*2, dx+width, dy*3+height*3], "dull");
  dia.dark = dia.pane1.add("radiobutton", [dx*2+width, dy*3+height*2, dx*2+width*2, dy*3+height*3], "dark");
  dia.pale = dia.pane1.add("radiobutton", [dx*3+width*2, dy*3+height*2, dx*3+width*3, dy*3+height*3], "pale");
  dia.lightGrayish = dia.pane1.add("radiobutton", [dx, dy*4+height*3, dx+width, dy*4+height*4], "light grayish");
  dia.grayish = dia.pane1.add("radiobutton", [dx*2+width, dy*4+height*3, dx*2+width*2, dy*4+height*4], "grayish");
  dia.darkGrayish = dia.pane1.add("radiobutton", [dx*3+width*2, dy*4+height*3, dx*3+width*3, dy*4+height*4], "dark grayish");

  dia.bot1 = dia.add("button", [10, 110, 100, 140], "実行",  { name:"ok"});
  dia.vivid.value=true;
  dia.center();
  dia.show();

  var tone;
  if( dia.vivid.value ){ tone = tones[0] };
  else if( dia.blight.value ){ tone = tones[1] };
  else if( dia.strong.value ){ tone = tones[2] };
  else if( dia.deep.value ){ tone = tones[3] };
  else if( dia.light.value ){ tone = tones[4] };
  else if( dia.soft.value ){ tone = tones[5] };
  else if( dia.dull.value ){ tone = tones[6] };
  else if( dia.dark.value ){ tone = tones[7] };
  else if( dia.pale.value ){ tone = tones[8] };
  else if( dia.lightGrayish.value ){ tone = tones[9] };
  else if( dia.grayish.value ){ tone = tones[10] };
  else if( dia.darkGrayish.value ){ tone = tones[11] };

  return tone;

}
// 選択されているオブジェクトを全て取得
sel = activeDocument.selection;
// ユーザーからトーンを取得
var newTone = showToneDialog();
// 自作関数setRandomColorで全オブジェクトをランダムな色に
setRandomColorWithTone(sel, newTone);


