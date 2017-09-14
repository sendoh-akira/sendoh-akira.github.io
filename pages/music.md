---
layout: default
title: 音乐
permalink: /pages/music.html
---




<div id="player5" class="aplayer" ></div>


<script type="text/javascript" src="{{ "/assets/js/mp3/APlayer.min.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript">

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
			url: '/assets/mp3/songdongye_banma.mp3',
			pic: '/assets/mp3/songdongye_banma.png',
			lrc: '/assets/mp3/songdongye_banma.lrc'
		},
		{
			title: '飘雪',
			author: '陈慧娴',
			url: '/assets/mp3/chenhuixian_piaoxue.mp3',
			pic: '/assets/mp3/chenhuixian_piaoxue.png',
			lrc: '/assets/mp3/chenhuixian_piaoxue.lrc'
		},
		{
			title: '成都',
			author: '赵雷',
			url: '/assets/mp3/zhaolei_chengdu.mp3',
			pic: '/assets/mp3/zhaolei_chengdu.png',
			lrc: '/assets/mp3/zhaolei_chengdu.lrc'
		}
		
		
	]
});
</script>

<!--
{
			title: 'あっちゅ～ま青春!',
			author: '七森中☆ごらく部',
			url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
			pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg',
			lrc: '{{site.baseurl}}/assets/mp3/qingchun.lrc'
		},
		{
			title: 'secret base~君がくれたもの~',
			author: '茅野愛衣',
			url: 'http://devtest.qiniudn.com/secret base~.mp3',
			pic: 'http://devtest.qiniudn.com/secret base~.jpg',
			lrc: '{{site.baseurl}}/assets/mp3/jun.lrc'
		},
		{
			title: '回レ！雪月花',
			author: '小倉唯',
			url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
			pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
			lrc: '{{site.baseurl}}/assets/mp3/xueyuehua.lrc'
		}
-->