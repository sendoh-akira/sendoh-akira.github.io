$(document).ready(function() {
	
	loadGitment() ;
	initGallery();
	
	
	$(function() {
	

		$(window).scroll(function() {
			
			var scrollTop = $(window).scrollTop();
			
			if ( scrollTop > 150) {
				$("#backtotop").addClass("showme");
			} else {
				$("#backtotop").removeClass("showme");
			}
			
			if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
			
				var galleryHidden = $("#galleryHidden").val();
				var pageNum = $("#galleryPageNum").val();
				var nextPageNum = parseInt(pageNum)+1;
				$("#galleryPageNum").val(nextPageNum);
				if ("gallery" == galleryHidden) {
					var obj = $('#selGallery');
					loadGallery(obj,nextPageNum,20);
				}
			}
			
		});

		$("#backtotop").click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});

		$("pre").addClass("prettyprint linenums");
		prettyPrint();

		$('.navbar-wrapper').stickUp();
		$("a#single_image").fancybox();
		$("a.group").fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 600,
			'speedOut': 200,
			'overlayShow': false
		});
	});



	$(document).pjax('.pjaxlink', '#pjax', {
		fragment: "#pjax",
		timeout: 1000
	});


	$(document).on('pjax:send', function() { //pjax链接点击后显示加载动画；
		$(".pjax_loading").css("display", "block");
	});

	//导出页面内容
	$("i.jquery-word-export").click(function(event) {
		var title = $(this).attr("title");
		$("article.post-content").wordExport(title);
	});

	$(document).on('pjax:complete', function() {


		var shareUrl = "/assets/js/jquery.share.min.js";
		var exportUrl = "/assets/js/jquery.wordexport.js";
		var fileSaverUlr = "/assets/js/FileSaver.js";
		$.getScript(shareUrl);
		$.getScript(fileSaverUlr, function() {
			if (!$("pre").hasClass("prettyprint")) {
				$("pre").addClass("prettyprint linenums");
			}
			prettyPrint();
		});

		$.getScript(exportUrl, function() {
			//导出页面内容
			$("i.jquery-word-export").click(function(event) {
				var title = $(this).attr("title");
				$("article.post-content").wordExport(title);
			});
		});

		//加载相册
		var galleryHidden = $("#galleryHidden").val();

		if ("gallery" == galleryHidden) {
			var obj = $('#selGallery');
			loadGallery(obj,1);
		}

		
		$(".pjax_loading").css("display", "none");
	});


	$("li.phoneselect").click(function() {
		$("div.navbar-collapse").removeClass("in");
		$("button.navbar-toggle").addClass("collapsed");
	});

	$("li.select").click(function() {
		//$("li.select").removeClass("act");
		//$(this).addClass("act");
	});

	$(".circle").load(function() {
		$(".circle").addClass("show");
	});

	$('.bookpiclist .bookpic').hover(
		function() {
			$(this).find('.booklabel').stop().animate({
				bottom: 0
			}, 200);
			$(this).find('img').stop().animate({
				top: -30
			}, 500);
		},
		function() {
			$(this).find('.booklabel').stop().animate({
				bottom: -40
			}, 200);
			$(this).find('img').stop().animate({
				top: 0
			}, 300);
		}
	);



});

function loadGitment() {

	var url = "https://api.github.com/repos/sendoh-akira/sendoh-akira.github.io/issues/comments?0=0" ;
	
	var  visitors = $('.ds-recent-visitors'); 
	
	var vdn =  $(visitors).attr('data-num-items');
	
	var comments = $('.ds-recent-comments');
	
	var cdn = $(comments).attr('data-num-items');
	
	$(comments).empty();
	$(visitors).empty();
	
	$.getJSON(url+"&callback=?", function(result) {
		var data = result.data ;
		
		//去除重复的访客记录。
		var qc='';
		if(data){
			$.each(data, function(index, d) {
	
				if(qc.indexOf(d.user.login)<0){
					//载入最近访客
					var vLi = $('<li>').prop('style','margin-bottom: 7px; margin-right: 3px;position: relative;');
					var vA = $('<a>').prop('style','color: #1756a9;').prop('href','https://github.com/'+d.user.login).prop('target','_blank');
					var vImg =$('<img>').prop('style','margin-left:8px;width: 44px;height: 44px;border-radius: 3px;-webkit-border-radius: 4px;').prop('src', d.user.avatar_url);
					var vDate = '<span style="display: block;height: 20px;line-height: 20px;margin-top: 2px;">'+d.updated_at.substr(0,9)+'</span>';
					vA.append(vImg).append(vDate);
					vLi.append(vA).appendTo(visitors);
				}							
				qc=qc+','+d.user.login;
				//载入最新评论
				
				var issue_url = d.issue_url;
				$.getJSON(issue_url+"?1=1&callback=?",function(r){
					var issue = r.data;
					var li = $('<li>').prop('style','font-size: 13px;list-style: none;line-height: 20px;');
				
					var liA = $('<a>').prop('style','display: block;padding: 5px;transition: all .3s ease-out;border-bottom: 1px solid #ddd; margin: 5px 0;').prop('href',issue.body).prop('target','_blank');
					
					
					var liAAvatar = $('<div>').prop('style','float: left;');
					var aimg = '<img alt="" src="'+d.user.avatar_url+'" style="border-radius: 50%;"  height="32" width="32">';
					liAAvatar.append(aimg);
					
					var bauthor = '<p style="">'+d.user.login+' 在「'+issue.title+'」中说: '+'</p>';
					var btext = '<p style="font-size: 12px;">'+d.body+'</p>';
					var liABody = $('<div>').prop('style','margin-left: 40px;');
					liABody.append(bauthor).append(btext);
					
					liA.append(liAAvatar).append(liABody);
					
					li.append(liA);
					li.appendTo(comments);
				})
				
				
			})
		}
	});


}

function read(v) {

	var selectV = $(v).val();
	if ("class" == selectV) {
		window.location.href = "/pages/class.html";
	}

	if ("tags" == selectV) {
		window.location.href = "/pages/tags.html";
	}

	if ("date" == selectV) {
		window.location.href = "/pages/archive.html";
	}


}
