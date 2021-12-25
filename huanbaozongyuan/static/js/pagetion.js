
function pageHelp(options) {
    layui.use(['layer','carousel','laypage'], function(){
    var $ = layui.$
    var limits = Math.ceil(options.count / options.limit);
    var allPage = [];
    var thisPage = [];
    for ( var i = 1; i<=limits ; i++) {
        allPage.push(i);
        if ( i< 6 ) {
            thisPage.push(i);
        }
    };
    $(options.ele).children().remove();
    $(options.ele).append('<div class="layui-box layui-laypage layui-laypage-default pageHelper"></div>')
    if ( options.limits ) {
        $('.pageHelper').append('<span class="layui-laypage-count">'+options.limit+'条/页</span>');
    };
    if (options.allPage) {
        $('.pageHelper').append('<span class="layui-laypage-count">共'+limits+'页</span>');
    }
    if (options.first) {
        $('.pageHelper').append('<a href="javascript:;" class="firstPage">首页</a>');
    }
    
   
    if (options.prev) {
        $('.pageHelper').append('<a href="javascript:;" class="prev">上一页</a>');
    }
    $('.pageHelper').append('<div class="thisPage" style="display:inline;"></div>');
    for ( var j=0;j<thisPage.length;j++ ) {
        $('.thisPage').append('<a href="javascript:;">'+ thisPage[j] +'</a>');
    }
    $('.thisPage').children().eq(0).addClass('pagehelpAvtive');
    if (options.next) {
        $('.pageHelper').append('<a  href="javascript:;" class="next">下一页</a>');
    }
    if (options.last) {
        $('.pageHelper').append('<a  href="javascript:;" class="lastPage">尾页</a>');
    }
    if (options.jump) {
        $('.pageHelper').append('<span class="layui-laypage-skip">第 <input class="jumpPageNum"/> 页</span>');
        $('.pageHelper').append('<a  href="javascript:;" class="jumpPage" >跳转</a>');
    }
    if (options.counts) {
        $('.pageHelper').append('<span  class="layui-laypage-count" style="margin-left:20px;">共'+options.count+' 条</span>');
    }
    // 手动跳转页面
    $('.jumpPageNum').bind('keyup', function(event) {
        　　if (event.keyCode == "13") {
        　　　　//回车执行查询
        　　　 handJump();
        　　}
    });
    $(document).on('click','.jumpPage',handJump);
    // 首页 
    $(document).on('click','.firstPage',function(){
        var allIndex = Number($('.pagehelpAvtive').html());
        if ( allIndex ===  allPage[0]) return;
        thisPage = allPage.slice(0,5);
        $('.thisPage').children().remove();
        for ( var j=0;j<thisPage.length;j++ ) {
            $('.thisPage').append('<a href="javascript:;">'+ thisPage[j] +'</a>');
        }
        jumpPage(0);
    });
    // 尾页
    $(document).on('click','.lastPage',function(){
        var allIndex = Number($('.pagehelpAvtive').html());
        if ( allIndex ===  allPage[allPage.length-1]) return;
        $('.thisPage').children().remove();
        thisPage = allPage.slice(-5);
        for ( var j=0;j<thisPage.length;j++ ) {
            $('.thisPage').append('<a href="javascript:;">'+ thisPage[j] +'</a>');
        }
        jumpPage(4);
    });
    // 上一页
    $(document).on('click','.prev',function(){
        var allIndex = Number($('.pagehelpAvtive').html());
        if ( allIndex ===  allPage[0]) return;
        var activeindex = $('.pagehelpAvtive').index();
        jumpPage( activeindex - 1 )
    });
    // 下一页
    $(document).on('click','.next',function(){
        var allIndex = Number($('.pagehelpAvtive').html());
        if ( allIndex ===  allPage[allPage.length-1]) return;
        var activeindex = $('.pagehelpAvtive').index();
        jumpPage( activeindex + 1 )
    });
    // 点击页码
    $(document).on('click','.thisPage>a',function(){
        var thisIndex = $(this).index();
        jumpPage(thisIndex)
    });
    // 跳转页面
    function jumpPage(thisIndex){
        if ( $('.thisPage>a').eq(thisIndex).hasClass('pagehelpAvtive') ) return;
        // if ( allIndex ===  allPage[allPage.length-1]) return;
        // if ( allIndex ===  allPage[0]) return;
        $('.thisPage>a').removeClass('pagehelpAvtive');
        $('.thisPage>a').eq(thisIndex).addClass('pagehelpAvtive');
        var allIndex = Number($('.pagehelpAvtive').html());
        options.fn(allIndex)
        if ( thisIndex === 0 && allIndex !== allPage[0]) {
            $('.thisPage').children().eq($('.thisPage').children().length-1).remove();
            $('.thisPage a').eq(0).before('<a href="javascript:;">'+ allPage[allIndex -2 ] +'</a>');
        };
        if ( thisIndex === 4 && allIndex !== allPage[allPage.length-1]) {
            $('.thisPage').children().eq(0).remove();
            $('.thisPage').append('<a href="javascript:;">'+ allPage[allIndex] +'</a>');
        };
    }
    // 手动填写跳转页面
    function handJump() {
        var jumpNum = Number($('.jumpPageNum').val());
        var allIndex = Number($('.pagehelpAvtive').html());
        if ( !jumpNum || jumpNum === allIndex || jumpNum < allPage[0] || jumpNum > allPage[allPage.length-1])return;
        // 前不够
        if ( jumpNum - 3 < 0 ) {
            // 后够
            if ( (allPage.length - jumpNum ) > 2) {
                thisPage = allPage.slice(0).splice(0,5);
            } else {
                // 后不够
                thisPage = allPage.slice(5 - (jumpNum - allPage.length )).splice(0,5)
            }
        }
        // 前够
        if ( jumpNum - 3 >= 0 ) {
            // 后够
            if ( (allPage.length - jumpNum ) > 2 ) {
                thisPage = allPage.slice(jumpNum - 3).splice(0,5)
            } else {
                // 后不够
                thisPage = allPage.slice(allPage.length - 5)
            }
        }
        $('.thisPage').children().remove();
        for ( var j=0;j<thisPage.length;j++ ) {
            $('.thisPage').append('<a href="javascript:;">'+ thisPage[j] +'</a>');
            if ( thisPage[j] == jumpNum ) {
                jumpPage(j);
            }
        }
    }
})
}