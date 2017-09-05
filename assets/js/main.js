$(document).ready(function() {

	_500px.init({
		  sdk_key: '5f86a2a67c5cb5fbd65161a335a579cb77babc44'
		});
	
	var galleryHidden = $("#galleryHidden").val();

	if ("gallery" == galleryHidden) {
		loadGallery();
	}

	function load500px(){
		
		
		_500px.api('/photos', {feature: 'popular',image_size:4, page: 1}, function (response) {
			if (response.success) {
			
			//alert('There are ' + response.data.photos.length + ' photos.');				
			
				
			var carouselLinks = []
			var linksContainer = $('#links')
			var image_url ;
				// Add the demo images as links with thumbnails to the page:
			$.each(response.data.photos, function(index, photo) {
					
					console.log(photo);
					
					image_url = photo.image_url;
				
					$('<a/>')
						.append($("<img width='280' height='250' >").prop('src', image_url))
						.prop('href', image_url)
						.prop('title', photo.name)
						.attr('data-gallery', '')
						.appendTo(linksContainer)
					carouselLinks.push({
						href: image_url,
						title: photo.name
					})
				})
			
			// Initialize the Gallery as image carousel:
			blueimp.Gallery(carouselLinks, {
				container: '#blueimp-image-carousel',
				carousel: true
			})
				
				
			} else {
				console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message)
				//alert('Unable to complete request: ' + response.status + ' - ' + response.error_message);
			}
		});
	}
	
	function loadFlickr(){

		// Load demo images from flickr:
		$.ajax({
			url: 'https://api.flickr.com/services/rest/',  
			data: {    
				format: 'json',    
				method: 'flickr.people.getPhotos',//flickr.interestingness.getList   
			       	api_key: '5b8e8c4dda6644ef6d5012ce7ca911d9' ,// jshint ignore:line   
			        user_id: 'wuyanfei'  
			       }, 
			dataType: 'jsonp',  
			jsonp: 'jsoncallback'

		}).done(function(result) {
			var carouselLinks = []
			var linksContainer = $('#links')
			var baseUrl
				// Add the demo images as links with thumbnails to the page:
			$.each(result.photos.photo, function(index, photo) {
					baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
						photo.server + '/' + photo.id + '_' + photo.secret
					$('<a/>')
						.append($('<img>').prop('src', baseUrl + '_s.jpg'))
						.prop('href', baseUrl + '_b.jpg')
						.prop('title', photo.title)
						.attr('data-gallery', '')
						.appendTo(linksContainer)
					carouselLinks.push({
						href: baseUrl + '_c.jpg',
						title: photo.title
					})
				})
				// Initialize the Gallery as image carousel:
			blueimp.Gallery(carouselLinks, {
				container: '#blueimp-image-carousel',
				carousel: true
			})
		})

		// Initialize the Gallery as video carousel:
		blueimp.Gallery([{
			title: 'Sintel',
			href: 'https://archive.org/download/Sintel/' +
				'sintel-2048-surround.mp4',
			type: 'video/mp4',
			poster: 'https://i.imgur.com/MUSw4Zu.jpg'
		}, {
			title: 'Big Buck Bunny',
			href: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/' +
				'Big_Buck_Bunny_4K.webm',
			type: 'video/webm',
			poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/' +
				'Big_Buck_Bunny_4K.webm/4000px--Big_Buck_Bunny_4K.webm.jpg'
		}, {
			title: 'Elephants Dream',
			href: 'https://upload.wikimedia.org/wikipedia/commons/8/83/' +
				'Elephants_Dream_%28high_quality%29.ogv',
			type: 'video/ogg',
			poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
				'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
		}, {
			title: 'LES TWINS - An Industry Ahead',
			type: 'text/html',
			youtube: 'zi4CIXpx7Bg'
		}, {
			title: 'KN1GHT - Last Moon',
			type: 'text/html',
			vimeo: '73686146',
			poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
		}], {
			container: '#blueimp-video-carousel',
			carousel: true
		})

		
	}
	

	//载入相册
	function loadGallery() {
		load500px();
	}


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
			loadGallery();
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
