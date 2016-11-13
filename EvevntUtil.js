/**
 * Created by Administrator on 2016/10/20.
 */
var EventUtil = {
    addHandle:function(ele,type,handle){
        if(ele.addEventListener){
            //DOM2级事件处理程序
            ele.addEventListener(type,handle,false);
        }else if(ele.attachEvent){
            //IE事件处理程序
            ele.attachEvent("on"+type,handle);
        }else{
            //DOM0级事件处理程序
            ele["on"+type]=handle;
        }
    },
    removeHandle:function(ele,type,handle){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handle,false);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,handle);
        }else{
            ele["on"+type]=null;
        }
    },
    getEvent: function(event){
        return event || window.event;
    },
    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else if(event.returnValue){
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else if(event.cancelBubble){
            event.cancelBubble = true;
        }
    },
    eventType: function (event){
      return  event.target||event.srcElement;
    }
};