/**
 * Created by Administrator on 2016/7/31.
 */
(function(){
    var oBox=document.getElementById('primary_main');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var left=oBox.getElementsByTagName('a')[0];
    var right=oBox.getElementsByTagName('a')[1];
    var data=null;
    var autoTimer=null;
    var interval=1000;
    var step=0;
    //1、获取并解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest;
        xml.open('get','json/data.txt?='+Math.random(),false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };xml.send()
        console.log(data)
    }
    //
    bind();
    function bind(){
        var str1='';
        var str2='';
        for(var i=0;i<data.length;i++){
            str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""/></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        oBoxInner.innerHTML=str1;
        oUl.innerHTML=str2;
    }

    lazyImg();
    function lazyImg(){
        for(var i=0;i<aImg.length;i++){
            var tmpImg=new Image;
            tmpImg.src=aImg[i].getAttribute('realImg');
            tmpImg.index=i;
            tmpImg.onload=function(){
                aImg[this.index].src=this.src;
                utils.css(aDiv[0],'zIndex',1);
                zhufengAnimate(aDiv[0],{opacity:1},500);
            }
        }
    }
    //4.
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for(var i=0;i<aDiv.length;i++){
            var curEle=aDiv[i];
            if(i===step){
                utils.css(curEle,'zIndex',1);
                zhufengAnimate(curEle,{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var k=0;k<siblings.length;k++){
                        utils.css(siblings[k],'opacity',0)
                    }
                });continue;
            }
            utils.css(curEle,'zIndex',0);
        }
        bannerTip();
    }

    function bannerTip(){
        for(var i=0;i<aLi.length;i++){
            var curEle=aLi[i];
            curEle.classList=i===step?'bg':'';
        }
    }
    oBox.onmouseover=function(){
        clearInterval(autoTimer);
       left.style.display=right.style.display='block'
    };
    oBox.onmouseout=function(){
        autoTimer=setInterval(autoMove,interval);
        left.style.display=right.style.display='none';
    };
    //
    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            (function(index){
                aLi[index].onmouseover=function(){
                    step=index;
                    setBanner();
                }
            })(i)
        }
    }
    //点击按钮左右切换
    left.onclick=function(){
        if(step<=0){
            step=aDiv.length
        }
        step--;
        setBanner();
    };
   right.onclick=autoMove;

})()