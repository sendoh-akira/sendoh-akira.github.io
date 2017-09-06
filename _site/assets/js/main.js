$(document).ready(function() {

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

function pajx_loadDuoshuo() {


	var dus = $('.ds-thread');

	if ($(dus).length == 1) {

		var el = document.createElement('div');
		el.setAttribute('data-thread-key', $(dus).attr("data-thread-key")); //必选参数
		el.setAttribute('data-url', $(dus).attr("data-url"));
		DUOSHUO.EmbedThread(el);
		$(dus).html(el);

	}

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
