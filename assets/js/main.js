$(document).ready(function() {
	
	var cnzzCount = 1 ;
	$("#cnzz_stat_icon_1260447200").bind("DOMNodeInserted",function(e){
		var target = e.target;
		if(target.innerHTML=='站长统计'){
			$(target).remove();
			$("#cnzz_stat_icon_1260447200").before('<span>Sendoh Akira</span>');
		}

		if(cnzzCount>3){
			$("#cnzz_stat_icon_1260447200").empty();
		}
		cnzzCount++;
	})
	
	$(function() {
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

	$(document).on('pjax:complete', function() {
		$(".pjax_loading").css("display", "none");
	});

	$(document).on('pjax:send', function() { //pjax链接点击后显示加载动画；
		$(".pjax_loading").css("display", "block");
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

