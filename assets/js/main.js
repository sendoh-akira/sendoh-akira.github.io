$(document).ready(function() {

	$(function() {



		$(window).scroll(function() {
			if ($(window).scrollTop() > 150) {
				$("#backtotop").addClass("showme");
			} else {
				$("#backtotop").removeClass("showme");
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
		timeout: 10000
	});


	$(document).on('pjax:send', function() { //pjax链接点击后显示加载动画；
		$(".pjax_loading").css("display", "block");
	});

	$(document).on('pjax:complete', function() {
		$.getScript(
			"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
			function() {
				MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
			});

		$("pre").addClass("prettyprint linenums");

		prettyPrint();

		pajx_loadDuoshuo(); //pjax加载完成之后调用重载多说函数

		$(".pjax_loading").css("display", "none");

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
