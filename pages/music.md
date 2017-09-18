---
layout: default
title: 音乐
permalink: /pages/music.html
---



<link rel="stylesheet" href="{{ "/assets/css/music.css" | prepend: site.baseurl }}">
<div id="player5" class="aplayer" ></div>



<script type="text/javascript">
	
var APlayerUrl = "{{ "/assets/js/mp3/APlayer.min.js" | prepend: site.baseurl }}";
$.getScript(APlayerUrl, function() {
	var ap5 = new APlayer({
		element: document.getElementById('player5'),
		narrow: false,
		autoplay: false,
		showlrc: 3,
		mutex: true,
		theme: '#ad7a86',
		mode: 'random',
		listmaxheight: '69px',
		music: [
			
			{
				title: '斑马,斑马',
				author: '宋冬野',
				url: '../assets/mp3/songdongye_banma.mp3',
				pic: '../assets/mp3/songdongye_banma.png',
				lrc: '../assets/mp3/songdongye_banma.lrc'
			},
			{
				title: '飘雪',
				author: '陈慧娴',
				url: '../assets/mp3/chenhuixian_piaoxue.mp3',
				pic: '../assets/mp3/chenhuixian_piaoxue.png',
				lrc: '../assets/mp3/chenhuixian_piaoxue.lrc'
			},
			{
				title: '成都',
				author: '赵雷',
				url: '../assets/mp3/zhaolei_chengdu.mp3',
				pic: '../assets/mp3/zhaolei_chengdu.png',
				lrc: '../assets/mp3/zhaolei_chengdu.lrc'
			}
			
			
		]
	});
});

</script>

