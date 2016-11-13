/**
 * Created by Administrator on 2016/11/3.
 */
function getClassName(child,parent){
    var oParent = parent? document.getElementById(parent):document;
    var childArray = [];
    var allParent = oParent.getElementsByTagName("*");
    for (var i=0,l=allParent.length;i<l;i++){
        if(allParent[i].className==child){
            childArray.push(allParent[i]);
        }
    }
    return childArray;
}


window.onload=drag;

function drag(){
    var dragC = getClassName("title","container")[0];
    dragC.onmousedown = dragDown;
}

function dragDown(event){
    event=event||window.event;
    var oParent = document.getElementById("container"),
        cx=event.clientX-oParent.offsetLeft,
        cy=event.clientY-oParent.offsetTop;
    document.onmousemove=function(event){
        event=event||window.event;
        moveD(event,cx,cy);
    };
    document.onmouseup = dragUp;
}


function moveD(event,posx,posy){
    event= event||window.event;
    var oParent = document.getElementById("container"),
        l=event.clientX-posx,
        t=event.clientY-posy,
        maxl=document.body.clientWidth-oParent.offsetWidth,
        maxt=document.documentElement.clientHeight-oParent.offsetHeight;
    if(l<0){
        l=0;
    }else if(l>maxl){
        l=maxl;
    }
    if(t<0){
        t=0;
    }else if(t>maxt){
        t=maxt;
    }
    oParent.style.left=l+"px";
    oParent.style.top=t+"px";
    // document.title=document.documentElement.clientHeight+"";
}
function dragUp(){
    document.onmousemove=null;
    document.onmouseup =null;
}