/**
 * Created by Administrator on 2016/11/11.
 */
$(function () {
    fHover(".fOne", ".fTwo");
    banner($(".hot-banner"), $(".hot-banner ul"), $(".banner-num span"));
    bannerChange($(".first-ul"), $("[class*=hot-list-slide]"), 540);
    ulChange(".bi-live .inline-ul", ".bi-live .num>span", 265, "point-span");
    showIfo(".all-rank li", ".ifo-none");
    ulChange(".animate .inline-ul", ".animate .all-title>span", 260, "point-span");
    ulChange(".tv .inline-ul", ".tv .all-title>span", 260, "point-span");
    ulChange(".week .tab-content .inline-ul", ".week .tab-num", 705, "on");
    ulChange(".game .inline-ul", ".game .all-title>span", 260, "point-span");
    ulChange(".dance .inline-ul", ".dance .all-title>span", 260, "point-span");
    ulChange(".music .inline-ul", ".music .all-title>span", 260, "point-span");
    ulChange(".life .inline-ul", ".life .all-title>span", 260, "point-span");
    ulChange(".technology .inline-ul", ".technology .all-title>span", 260, "point-span");
    fixed(".nav", ".fixed-right");
    scrollIn();
    $(window).on("resize", function () {
        fixed(".nav", ".fixed-right");
    });
    fixClick(".fixed-right");
    sortDivClick();
});

function fHover(objOne, objTwo) {
    var frOne = $(".frOne"), frTwo = $(".frTwo");
    var obj1 = $(objOne), obj2 = $(objTwo);
    frOne.hover(function () {
        clearTimeout(this.time);
        obj2.css("display", "none");
        obj1.css("display", "block")
    }, function () {
        this.time = setTimeout(function () {
            obj1.css("display", "none")
        }, 500)
    });
    frTwo.hover(function () {
        clearTimeout(this.time);
        obj1.css("display", "none");
        obj2.css("display", "block")
    }, function () {
        this.time = setTimeout(function () {
            obj2.css("display", "none")
        }, 500)
    });
}


//        banner
function banner(container, box, num) {
    var index = 0, bannerTime = null;
    banner1();
    num.hover(function () {
        if (!$(this).hasClass("banner-on")) {
            $(this).addClass("span-hover")
        }
    }, function () {
        if (!$(this).hasClass("banner-on")) {
            $(this).removeClass("span-hover")
        }
    });
//            点击
    num.on("click", function () {
        var i = $(this).index(".banner-num span");
        index = i;
        $(this).removeClass("span-hover").addClass("banner-on").siblings().removeClass("banner-on");
        box.css({
            left: -440 * i + "px"
        });

    });
//            暂停播放
    container.hover(function () {
        clearTimeout(bannerTime);
    }, function () {
        banner1();
    });
    function banner1() {
        bannerTime = setTimeout(function () {
            index++;
            if (index >= 5) {
                index = 0;
            }
            box.css({
                left: -440 * index + "px"
            });
            num.removeClass("banner-on");
            num.eq(index).addClass("banner-on");
            banner1();
        }, 3000)
    }
}


function bannerChange(box, btn, boxWidth) {
    var index = 0, s = [["昨日", "一周"], ["一周", "三日"], ["三日", "昨日"]];
    btn.on("mouseenter", function () {
        var img = box.find("img");
        for (var i = 0; i < img.length; i++) {
            img.eq(i).attr("src", img.eq(i).attr("data-src"));
        }
        btn.off("mouseenter");
    });
    btn.eq(0).on("click", function () {
        index--;
        if (index < 0) {
            index = 2;
        }
        box.css("left", -index * boxWidth + "px");
        btn.eq(0).html(s[index][0]);
        btn.eq(1).html(s[index][1]);
    });
    btn.eq(1).on("click", function () {
        index++;
        if (index > 2) {
            index = 0;
        }
        box.css("left", -index * boxWidth + "px");
        btn.eq(0).html(s[index][0]);
        btn.eq(1).html(s[index][1]);
    })
}


function ulChange(box, btn, width, cls) {
    var box1 = $(box), btn1 = $(btn);
    btn1.on("click", function () {
        this.i = $(this).index(btn);
        $(this).addClass(cls).siblings().removeClass(cls);
        box1.css("left", -this.i * width + "px");
        btn1.on("mouseenter", function () {
            showImg($(this));
            btn1.off("mouseenter");
        });
    })
}
function showImg(obj){
    var img = obj.find("img");
    for (var i = 0; i < img.length; i++) {
        img.eq(i).attr("src", img.eq(i).attr("data-src"));
    }
}

function showIfo(box, ifo) {
    $(box).hover(function () {
        var ifo1 = $(ifo);
        var $this = $(this);
        var offT = $this.offset().top - ifo1.outerHeight() - 5;
        var offL = $this.offset().left;
        ifo1.find(".data-img").attr("src", $this.attr("data-src"));
        var s = ["title", "up", "tg", "yb", "gk", "sc", "dm", "txt"];
        $.each(s, function (i, val) {
            setData(ifo1, $this, val);
        });
        ifo1.css({
            display: "block",
            top: offT + "px",
            left: offL + "px"
        })
    }, function () {
        var ifo1 = $(ifo);
        ifo1.css({
            display: "none"
        })
    })
}


function setData(obj1, obj2, val) {
    obj1.find("." + val).html(obj2.attr("data-" + val))
}


function fixed(obj1, obj) {
    var $scroll = $(window).scrollTop();
    var box = $(obj1);
    var fix = $(obj);
    fix.css({
        left: box.outerWidth() + box.offset().left + 5 + "px"
    });
    if ($scroll > (box.outerHeight() + box.offset().top)) {
        fix.css({
            top: 0
        })
    } else {
        fix.css("top", box.offset().top + box.outerHeight() + "px");
    }
}

var s = [".bi-live", ".animate", ".tv", ".music", ".dance", ".game", ".technology", ".life", ".guichu", ".fashion", ".ad", ".fanny", ".film", ".tv-play"];
var s1 = [true,true,true,true,true,true,true,true,true,true,true,true,true,true];
function scrollIn() {
    var offHei = getHeight(s);
    var fix = $(".fixed-right li");
    scrollHeight(offHei, fix);
    $(document).on("scroll", function () {
        clearTimeout(this.timer);
        this.cur =Date.now();
        if(!this.start){
            this.start=this.cur
        }
        if(this.cur-this.start>500){
            scrollHeight(offHei, fix);
            fixed('.nav', '.fixed-right');
            this.start=this.cur;
        }else {
            this.timer=setTimeout(function(){
                scrollHeight(offHei, fix);
                fixed('.nav', '.fixed-right');
            },500)
        }
    });
}


function scrollHeight(h, obj) {
    var scrl = $(window).scrollTop();
    switch (true) {
        case scrl < h[0]:
            obj.removeClass("fixed-on");
            break;
        case scrl > h[0] && scrl < h[1]:
            setClass(obj.eq(0), "fixed-on");
            if (s1[0]){
                s1[0]=false;
                showImg($(s[0]));
                showImg($(s[1]));
            }
            break;
        case scrl > h[1] && scrl < h[2]:
            setClass(obj.eq(1), "fixed-on");
            if (s1[1]){
                s1[1]=false;
                showImg($(s[1]));
                showImg($(s[2]));
            }
            break;
        case scrl > h[2] && scrl < h[3]:
            setClass(obj.eq(2), "fixed-on");
            if (s1[2]){
                s1[2]=false;
                showImg($(s[2]));
                showImg($(s[3]));
            }
            break;
        case scrl > h[3] && scrl < h[4]:
            setClass(obj.eq(3), "fixed-on");
            if (s1[3]){
                s1[3]=false;
                showImg($(s[3]));
                showImg($(s[4]));
            }
            break;
        case scrl > h[4] && scrl < h[5]:
            setClass(obj.eq(4), "fixed-on");
            if (s1[4]){
                s1[4]=false;
                showImg($(s[4]));
                showImg($(s[5]));
            }
            break;
        case scrl > h[5] && scrl < h[6]:
            setClass(obj.eq(5), "fixed-on");
            if (s1[5]){
                s1[5]=false;
                showImg($(s[5]));
                showImg($(s[6]));
            }
            break;
        case scrl > h[6] && scrl < h[7]:
            setClass(obj.eq(6), "fixed-on");
            if (s1[6]){
                s1[6]=false;
                showImg($(s[6]));
                showImg($(s[7]));
            }
            break;
        case scrl > h[7] && scrl < h[8]:
            setClass(obj.eq(7), "fixed-on");
            if (s1[7]){
                s1[7]=false;
                showImg($(s[7]));
                showImg($(s[8]));
            }
            break;
        case scrl > h[8] && scrl < h[9]:
            setClass(obj.eq(8), "fixed-on");
            if (s1[8]){
                s1[8]=false;
                showImg($(s[8]));
                showImg($(s[9]));
            }
            break;
        case scrl > h[9] && scrl < h[10]:
            setClass(obj.eq(9), "fixed-on");
            if (s1[9]){
                s1[9]=false;
                showImg($(s[9]));
                showImg($(s[10]));
            }
            break;
        case scrl > h[10] && scrl < h[11]:
            setClass(obj.eq(10), "fixed-on");
            if (s1[10]){
                s1[10]=false;
                showImg($(s[10]));
                showImg($(s[11]));
            }
            break;
        case scrl > h[11] && scrl < h[12]:
            setClass(obj.eq(11), "fixed-on");
            if (s1[11]){
                s1[11]=false;
                showImg($(s[11]));
                showImg($(s[12]));
            }
            break;
        case scrl > h[12] && scrl < h[13]:
            setClass(obj.eq(12), "fixed-on");
            if (s1[12]){
                s1[12]=false;
                showImg($(s[12]));
                showImg($(s[13]));
            }
            break;
        case scrl > h[13]:
            setClass(obj.eq(13), "fixed-on");
            if(s1[13]){
                s1[13]=false;
                showImg($(s[12]));
                showImg($(s[13]));
            }
            break;
    }

}

function setClass(obj, cls) {
    obj.addClass(cls).siblings().removeClass(cls);
}

function getHeight(s) {
    var a = [];
    for (var i = 0; i < s.length; i++) {
        a.push($(s[i]).offset().top - 350);
    }
    return a;
}

function fixClick(obj) {
    $(obj).on("click", function (e) {
        setClass($(e.target).parent("li"), "fixed-on");
        if ($(e.target).closest(".sort").hasClass("sort")) {
            var sortDiv = $(".sort-div");
            sortDiv.css("display") == "none" ? sortDiv.css("display", "block") : sortDiv.css("display", "none");
            var li = $(this).find("li");
            var img = $(this).find(".fixed-img");
            var a = li.find("a");
            if (sortDiv.css("display") == "block") {
                drag();
                li.removeClass("fixed-on");
                a.addClass("move");
                img.css("display", "block");
                $(document).off("scroll");
            } else {
                $(this).off("mousedown");
                a.removeClass("move");
                img.css("display", "none");
                scrollIn();
            }
        }
    })
}

function sortDivClick(){
    var box= $(".fixed-right");
    var li = box.find("li");
    var img = box.find(".fixed-img");
    $(".sort-div").on("click",function(){
        box.off("mousedown");
        li.removeClass("move");
        img.css("display", "none");
        scrollIn();
        $(this).css("display","none");
    })
}

function drag() {
    var box = $(".fixed-right");
    var container = $(document);
    box.on("mousedown", function (e) {
        e.preventDefault();
        var target = $(e.target).parent("li");
        target.after("<li class='ls-li'></li>");
        var x = e.pageX - target.offset().left;
        var y = e.clientY - target.position().top;
        var x1 = e.pageX;
        var y1 = e.clientY;
        var i = target.index(".fixed-right li");
        var t = null;
        var allLi = $(this).find("li");
        target.addClass("fix");
        container.on("mousemove", function (e) {
            clearTimeout(this.timer);
            this.cur =Date.now();
            if(!this.start){
                this.start=this.cur
            }
            if(this.cur-this.start>50){
                t = dragMove(x, y, target, e, x1, y1, i, allLi);
                this.start=this.cur;
            }else {
                this.timer=setTimeout(function(){
                    t = dragMove(x, y, target, e, x1, y1, i, allLi);
                },50)
            }

        });
        container.on("mouseup", function () {
            target.attr("style", "");
            if(t!=i&&t) {
                if (i < t) {
                    target.insertAfter(allLi.eq(t));
                    t--;
                    $(s[i]).insertAfter($(s[t]));
                    s.splice(t, 0, s.splice(i, 1)[0]);
                } else {
                    $(s[i]).insertBefore($(s[t]));
                    target.insertBefore(allLi.eq(t));
                    s.splice(t, 0, s.splice(i, 1)[0]);
                }
            }
            $(".ls-li").remove();
            target.removeClass("fix");
            $(this).off("mousemove");
            $(this).off("mouseup");
        })
    })
}


function dragMove(x, y, obj, e, x1, y1, i, obj2) {
    obj.css({
        left: e.pageX - x + "px",
        top: e.clientY - y + "px"
    });
    if (e.pageX - x1 > -24 && e.pageX - x1 < 24) {
        var t = Math.round((e.clientY - y1) / 32);
        var lsLi=$(".ls-li");
        if (t > 0) {
            t++;
            obj2.eq(i + t).after(lsLi);
        } else {
            obj2.eq(i + t).before(lsLi);
        }
        return i + t;
    }
}

function throttle(fn,context,delay,mustApplyTime){
    clearTimeout(fn.timer);
    fn.cur=Date.now();
    if(!fn.start){
        fn.start=fn.cur
    }
    if(fn.cur-fn.start>mustApplyTime){
        fn.call(context);
        fn.start=fn.cur;
    }else {
        fn.timer = setTimeout(function () {
            fn.call(context);
        }, delay)
    }

}


