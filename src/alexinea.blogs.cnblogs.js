/* Alex-LEWIS Technology Blog JavaScript
 * 2016-01-10
 * */
var cb_null;
window.onscroll = function () { 
  var elsoltop = document.documentElement.scrollTop, bdyoltop = document.body.scrollTop;       
  if(elsoltop + bdyoltop > 100){
   $('#alex-top').css('display','inline-block');
   $('#alex-opt-share ul').css('right','79px');
   $('#alex-header').css({"box-shadow":"0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)","-moz-box-shadow":"0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)"});
  }else{
   $('#alex-top').hide();
   $('#alex-opt-share ul').css('right','15px');
   $('#alex-header').css({"box-shadow":"","-moz-box-shadow":""});
  }
}

function showMessage(msg){
  $('#alex-message-content').html(msg);
  $('#alex-message').fadeIn(250);
  var t = setTimeout('hideMessage();', 2000);
}
function hideMessage(){
  $('#alex-message').fadeOut(500,function(){
    $('#alex-message-content').html('');
  });
}

function isHome(){
    return $('#cb_post_title_url').length == 0
}

function getBlogUrl(){
    var t = $('#cb_post_title_url');
    if(t.length == 0) return 'http://www.cnblogs.com/%你的博客园地址别名%';
    return $(t[0]).attr('href');
}

function getBlogTitle(){
  if(isHome())
    return '行者自若的技术笔记（Alex-LEWIS）';
  return $('#cb_post_title_url').text();
}

function CreateCommentHead(){
  var allItem = $('.feedbackItem');
  if(allItem.length === 0) 
    return;
  $.each($('.feedbackItem'),function(i,val){
    var cmtId = $($(val).find('a.layer')).attr('href').replace('#','');
    var headNode = $(val).find('#comment_' + cmtId + '_avatar');
    var headUrl = 'http://%你的图床%/coder-image-0' + Math.ceil(Math.random()*7) + '.jpg';
    if(headNode.length>0){
      headUrl = $(headNode[0]).text();
    }
    console.log = headUrl;
    $(val).css({'background': '#FFF url(' + headUrl + ') no-repeat 10px 25px','background-size': '50px'});
  });
  console.log = 'done';
}

function CreatePostNavigator(){ 
  if(typeof(loadIndex)=="undefined" ||loadIndex==cb_null||isNaN(loadIndex)||loadIndex!==1)return;
  var navigatorTitleDiv = '<div id="navigatorTitleDiv">索引</div>';
  var navigatorDivContent = '<div id="navigatorDiv" class="navigatorClass"><ul class="nav">';

  if($(".postBody :header").length <= 1)return;

  var h1c = -1,h2c = 0,h3c = 0;h4c = 0;
  navigatorDivContent += '<li class="li_h1" title="标题"><a href="#s_nav_header" style="display:none;">poi~</a><a id="nav_header" href="javascript:void(0);" class="anchorLink">' + ++h1c + '.&nbsp;标题</a></li>';
  $.each($(".postBody :header"), function(i, val){
    var headerTagName = $(val)[0].tagName.toLowerCase();
    var nodeNumber = "";
    if(headerTagName === 'h1'){
      h1c++;h2c=0;h3c=0;h4c=0;nodeNumber = h1c + ".&nbsp;";
    }else if(headerTagName === 'h2'){
      h2c++;h3c=0;h4c=0;nodeNumber = "&nbsp;&nbsp;" + h1c + "." + h2c + ".&nbsp;";
    }else if(headerTagName === 'h3'){
      h3c++;h4c=0;nodeNumber = "&nbsp;&nbsp;&nbsp;&nbsp;" + h1c + "." + h2c + "." + h3c + ".&nbsp;";
    }else if(headerTagName === 'h4'){
      h4c++;nodeNumber = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + h1c + "." + h2c + "." + h3c + "." + h4c + ".&nbsp;";
    }
    var showContent = $(val).text();
    var navigatorItem = '<li class="li_'+headerTagName+'" title="' + showContent + '"><a href="#s_nav_' + i + '" style="display:none;">poi~</a><a id="nav_' + i + '" href="javascript:void(0);" class="anchorLink">' + nodeNumber + showContent + '</a></li>';
    navigatorDivContent += navigatorItem;
    var headerLabel = '<div id="s_nav_' + i + '"></div>';
    $(val).prepend(headerLabel);
  }); 
  var pinglunItem = '<li class="li_h1" title="评论"><a href="#blog-comments-placeholder" style="display:none;">poi~</a><a id="nav_pinglun" href="javascript:void(0);" class="anchorLink">' + ++h1c + '.&nbsp;评论</a></li>';
  navigatorDivContent += pinglunItem;
  navigatorDivContent += '</ul></div>';
     
  var fixedOffset = 45;
  $('#main').append(navigatorDivContent);
  $('#main').append(navigatorTitleDiv);
  $('#navigatorTitleDiv').click(function(){
    $('#navigatorDiv').fadeToggle(200);
  });
  $('.anchorLink').click(function(){
    var obj = $(this);
    var href = '#s_' + $(obj).attr('id');
    var pos = '#s_nav_pinglun' == href 
      ? $('#blog-comments-placeholder').offset().top - fixedOffset
      : '#s_nav_header' == href
        ? 0
        : $(href).offset().top - fixedOffset;
    $('html, body').animate({scrollTop: pos}, 2000, 'swing');
  });
     
  $('body').scrollspy({ target: '#navigatorDiv', offset: fixedOffset + 15});
}

/* 代码复制
 * Alex-LEWIS, 2016-01-10
 * */
function createCloneCodeBtn(){
    if(isHome())return;
    var allPre = $('#cnblogs_post_body pre');
    if(allPre.length == 0) return;
    $.each(allPre, function(i, o){
        $(o).prepend("<div id='code_" + i + "' class='codeCloneBtn' onclick='cloneCode(" + i + ")'>复制代码</div>");
        $(o).attr('id','pre_code_' + i);
        cloneCodeInit(i);
    });
}
function cloneCodeInit(i){
  if ( window.clipboardData ) return;
    var codeText = $('#pre_code_' + i + ' code').text();    
    $('#code_' + i).zclip({
        path:'http://files.cnblogs.com/files/%你的博客园地址别名%/ZeroClipboard.swf',
        copy:function(){return codeText;},
        afterCopy:function(){cloneCodeSuccess();} 
    });
}
function cloneCode(i,o){
    if(i<0 || !o)return;
    var codeText = $($('pre code')[i]).text();
    if ( window.clipboardData ) { 
        window.clipboardData.setData("Text", codeText); 
        cloneCodeSuccess(); 
    }
}
function cloneCodeSuccess(){
    showMessage('代码已复制成功');
}

/* 关注
 * Alex-LEWIS, 2016-01-10
 * */
function setFollowStatus(fwState){
    if(fwState){
        $('#alex-opt-follow').removeClass('nonfollow').addClass('alreadyfollow');
    }else{
        $('#alex-opt-follow').removeClass('alreadyfollow').addClass('nonfollow');
    }
}
function startFollow(){
    if (isLogined || login(), c_has_follwed)
      return showMessage('你已经关注过该博主'), !1;

    var n = cb_blogUserGuid;
    $.ajax({
      url: "/mvc/Follow/FollowBlogger.aspx",
      data: '{"blogUserGuid":"' + n + '"}',
      dataType: "text",
      type: "post",
      contentType: "application/json; charset=utf-8",
      success: function (n){
        if(n == "未登录"){
          location.href = cnblogs.UserManager.GetLoginUrl();
        }else if(n == '关注失败'){
          showMessage('关注失败')
        }else{
          showMessage('关注成功');
          setFollowStatus(true);
          c_has_follwed = true;
          show_follow_msg(n);
          green_channel_success($("#green_channel_follow"), n);
        }
      },
      error: function(n){
        n.status > 0 && (showMessage('发生错误，看来博客园的程序员又要加班啦~'), 
          show_follow_msg("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com"), 
          green_channel_success($("#green_channel_follow"), "抱歉！发生了错误！"))
      }
    });
    //setFollowStatus(c_follow());
}
function removeFollow(){
    remove_follow();
    setFollowStatus(false);
    showMessage('o(￣ヘ￣o＃) 我们友尽……');
}
function hasFollowed(){
    return c_has_follwed;
}

/* 收藏
 * Alex-LEWIS, 2016-01-10
 * */
function startCollect(){
    AddToWz(cb_entryId);
}

/* 版权签名
 * Alex-LEWIS, 2016-01-10
 * */
function loadMySignature(){
    if(isHome())return;
    var url = getBlogUrl();
    var signature = '本文发表于博客园《行者自若的技术笔记》，作者为 Forerunner（Alex-LEWIS/行者自若）<br />';
    signature += '作者博客：<a id="alex-blog-url" href="https://alexinea.com" target="_blank">https://alexinea.com</a><br />';
    signature += '本文地址：<a id="alex-post-url" href="'+url+'" target="_blank">'+url+'</a><br />';
    signature += '本文原创授权为：署名 - 非商业性使用 - 禁止演绎，';
    signature += '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" alt="协议普通文本" title="协议普通文本" target="_blank">协议普通文本</a> | <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode" alt="协议法律文本" title="协议法律文本" target="_blank">协议法律文本</a><br />';
    $("#MySignature").html(signature).show();
    
    var qrAndLikes = '<div id="alex-post-like"><a href="#like">赞赏</a></div>';
    qrAndLikes += '<div id="alex-qr-wrapper"><img id="alexinea-talk-qr" src="http://cnblogs.images.alexinea.com/wechat-mp.png" title="Alexinea Talk" alt="Alexinea Talk" /></div>';

    $("#blog_post_info").after(qrAndLikes);
}

/* 推荐本文
 * Alex-LEWIS, 2016-01-10
 * */
function likeThisPost(){
   var r = { blogApp: currentBlogApp, postId: cb_entryId, voteType: 'Digg', isAbandoned: false };
   $.ajax({
      url: "/mvc/vote/VoteBlogPost.aspx",
      type: "post",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(r),
      success: function(n){
          if(n.IsSuccess){
            var i = $('#digg_count');
            r.isAbandoned ? $(i).html(parseInt($(i).html()) - 1) : $(i).html(parseInt($(i).html()) + 1)
          }
          $("#digg_tips").html(n.Message);
          showMessage(n.Message);
      },
      error:function(n){
          n.status > 0 && 
          (n.status == 500 
            ? (showMessage('推荐时异常，看来博客园的程序员又要加班啦~'),$("#digg_tips").html("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com"))
            : (showMessage(n.Message),$("#digg_tips").html(n.responseText)))
      }
   });
}

/* 分享
 * Alex-LEWIS, 2016-01-10
 * */
function shareToDouban(){
  var u = getBlogUrl();
  var t = '分享行者自若（Alex-LEWIS）的文章「' + getBlogTitle() + '」';
  var g = 'http://www.douban.com/share/service?image=&href=' + escape(u) + '&name=' + t;
  shareCore(g);
}

function shareToQQ(){
  var u = getBlogUrl();
  var t = '分享行者自若（Alex-LEWIS）的文章「' + getBlogTitle() + '」';
  var g = 'http://connect.qq.com/widget/shareqq/index.html?url=' + escape(u) + '&title=' + t;
  shareCore(g);
}

function shareToQQZone(){
  var u = getBlogUrl();
  var t = '分享行者自若（Alex-LEWIS）的文章「' + getBlogTitle() + '」';
  var g = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + escape(u) + '&title=' + t;
  shareCore(g);
}

function shareCore(strUrl){
  var n = 800, t = 660, r = (window.screen.availHeight - 30 - t) / 2, u = (window.screen.availWidth - 10 - n) / 2;
  window.open(strUrl, "_blank", "location=no,top=" + r + ",left=" + u + ", toolbar=no, directories=no, titlebar=no, status=no, menubar=no, scrollbars=no,status=no, resizable=no, copyhistory=no, width=" + n + ", height=" + t + "");
}