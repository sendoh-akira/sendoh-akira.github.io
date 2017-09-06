
function initGallery(){
	_500px.init({
		  sdk_key: '5f86a2a67c5cb5fbd65161a335a579cb77babc44'
		});
		
	var galleryHidden = $("#galleryHidden").val();

	if ("gallery" == galleryHidden) {
		var obj = $('#selGallery');
		loadGallery(obj,1);
	}
}	
	
	

function load500px(param){
	
	
	_500px.api('/photos', param, function (response) {
		if (response.success) {
		
		//alert('There are ' + response.data.photos.length + ' photos.');				
		
			
		var carouselLinks = []
		var linksContainer = $('#links')
		var page = param.page;
		
		if(page<=1){
			$(linksContainer).empty();
		}
		
		var images ;
			// Add the demo images as links with thumbnails to the page:
		$.each(response.data.photos, function(index, photo) {
				
				//console.log(photo);
				
				images = photo.images;
				var size_1 = images[0].url;
				var size_2048 = images[1].url;
			
				$('<a/>')
					.append($("<img >").prop('src', size_1))
					.prop('href', size_2048)
					.prop('title', photo.name)
					.attr('data-gallery', '')
					.appendTo(linksContainer)
				carouselLinks.push({
					href: size_1,
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
function loadGallery(obj,pagenum,rpp) {

	if(!rpp){
		rpp=20;
	}
	
	var value = $(obj).val();
	var param = {feature: value,image_size:'3,2048',rpp:rpp, page: pagenum} ;
	if('user'==value){
		param.username='wuyanfei';
	}
	load500px(param);
}
