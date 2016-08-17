/**
 * Created by Administrator on 2016/7/18.
 */
//回到顶部 和页面下滑时出现导航栏
var oBtn=document.getElementById('sideBottom');
var oTop=document.getElementById('Top');
window.onscroll=computedDisplay;
function computedDisplay(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
    var clientH=document.documentElement.clientHeight||document.body.clientHeight;
    var scrollBottom=scrollT+clientH;
    if(scrollBottom>clientH*1.1){
        oTop.style.display='block';
        oBtn.style.display='block';
    }else{
        oTop.style.display='none';
        oBtn.style.display='none';
    }

}
oBtn.onclick=function(){
    oTop.style.display='none';
    var target = utils.win("scrollTop");
    var duration=2000;
    var interval=50;
    var step=target/duration*interval;
    clearInterval(timer);
    var timer=setInterval(function(){
        var curTop=utils.win('scrollTop');
        if(curTop===0){
            clearInterval(timer);
            window.onscroll=computedDisplay;
            return;
        }
        curTop-=step;
        console.log(curTop);
        utils.win('scrollTop',curTop);
    },interval)
};
//倒计时
var timerCon=document.getElementById('timerCon');
function toDou(n){
    return n>0&&n<10?'0'+n:''+n;
}
function countdown(){
    var oDate=new Date();
    var newDate=new  Date('2017/1/14 12:13:14');
    var s=Math.floor((newDate.getTime()-oDate.getTime())/1000);
    var d=Math.floor(s/86400);
    s%=86400;
    var h=Math.floor(s/3600);
    s%=3600;
    var m=Math.floor(s/60);
    s%=60;
    var str=toDou(d)+' 天'+ toDou(h)+'  :'+ toDou(m)+'  :'+ toDou(s);
    timerCon.innerHTML=str;
}
countdown();
clearTimeout(timer);
var timer=setInterval(countdown,1000);

//搜索栏
var search=document.getElementById('search');
var boxList=document.getElementById('boxList');
console.log(boxList)
search.onkeyup=search.onfocus=function(){
    var val=this.value.replace(/(^ +)|( +$)/g,'');
    console.log('('+val+')');
    boxList.style.display=val.length>=0?'block':'none';
};
document.body.onclick=function(e){
    e= e||window.event;
    var tar= e.target|| e.srcElement;
    if(tar.tagName.toLowerCase()==='a'&& tar.parentNode.parentNode.id==='boxList'){
        search.value=tar.innerHTML;
    }
    boxList.style.display='none';
};
search.onclick=function(e){
    e=e||window.event;
    e.stopPropagation? e.stopPropagation(): e.cancelBubblen=true;
};
//页面下滑时出现导航栏
/*
var oTop=document.getElementById('Top');
    window.onscroll=function(){
        var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
        var clientH=document.documentElement.clientHeight||document.body.clientHeight;
        var scrollBottom=scrollT+clientH;
        if(scrollBottom>clientH*1.5){
            oTop.style.display='block';
        }else{
            oTop.style.display='none';
        }
    }
*/


