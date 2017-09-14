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
		
		
		if(data){
			$.each(data, function(index, d) {
	
				
				//载入最近访客
				var a = $('<a>').prop('style','color: #1756a9;').prop('href','https://github.com/'+d.user.login).prop('target','_blank');
				var img =$('<img>').prop('style','width: 44px;height: 44px;border-radius: 3px').prop('src', d.user.avatar_url);
				a.append(img).appendTo(visitors);
				
				
				//载入最新评论
				/*var li = $('<li>').prop('style','position: relative; min-height: 60px;padding-left: 60px;margin: 19px 0;');
				var divMain = $('<div>').prop('style','position: relative;border: 1px solid #CFD8DC;border-radius: 0;');
				var divHeader = $('<div>').prop('style','margin: 12px 15px;color: #666;background-color: #fff; border-radius: 3px;');
				
				var spanTime = '<span >'+d.created_at+'</span>';
				divHeader.append($('<a>').prop('style','font-weight: 600;color: #666;').prop('href','https://github.com/'+d.user.login).prop('target','_blank')).append(spanTime);
				
				var divBody = $('<div>').prop('style','color: #333;font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size: 16px;line-height: 1.5;word-wrap: break-word;position: relative;margin: 12px 15px;overflow: hidden;border-radius: 3px;');
				var bodyP = '<p >'+d.body+'</p>';
				divBody.append(bodyP);
				
				divMain.append(divHeader).append(divBody);
				li.append(a).append(divMain).appendTo(comments);*/
				
				
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
