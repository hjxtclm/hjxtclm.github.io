/**
 * Created by Administrator on 2016/10/16.
 */
function moveJs(obj, josn, fn) {
    var flag = false;
    var attrStyle=0;
    clearInterval(obj.time);//注意这里是obj.time
    obj.time = setTimeout(function () {
        for (var attr in josn) {
            if(attr=="opacity"){
                 attrStyle=Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                 attrStyle = parseInt(getStyle(obj, attr));//有单位
            }
            var speed = (josn[attr] - attrStyle) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (attrStyle == josn[attr]) {
                flag = true;
            }
            if(attr=="opacity"){
                obj.style[attr]=(attrStyle+speed)/100;
                obj.style.filter="alpha(opacity="+(attrStyle+speed)+")";
            }else{
                obj.style[attr]=attrStyle+speed+"px";
            }
        }
        if (flag) {
            clearInterval(obj.time);
            if (fn) {
                fn();
            }
        }
        moveJs(obj,josn,fn);
    }, 30);


}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else if (getComputedStyle) {
        return getComputedStyle(obj, null)[attr];
    }
}

function getClass(parent,children){
    var objP=parent?document.getElementById(parent):document;
    var child = objP.getElementsByTagName("*");
    var s=[];
    for(var i=0;i<child.length;i++){
        if(child[i].className.match(children)){
            s.push(child[i]);
        }
    }
    return s;
}