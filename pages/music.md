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
			url: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/songdongye_banma.mp3?Expires=1505464315&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=141MoyD%2F%2BEDUS%2BnCq2eaDp%2BQHJ4%3D',
			pic: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/songdongye_banma.png?Expires=1505464296&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=Ii%2F9DflYML0uZ4yRWO87Ig2NodU%3D',
			lrc: '/assets/mp3/songdongye_banma.lrc'
		},
		{
			title: '飘雪',
			author: '陈慧娴',
			url: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/chenhuixian_piaoxue.mp3?Expires=1505464333&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=AEB4rAURN4e%2BlTiUEEyhH3w17f0%3D',
			pic: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/chenhuixian_piaoxue.png?Expires=1505464347&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=Qq5ynpA9muqryncC%2BnbXeHhdAuc%3D',
			lrc: '/assets/mp3/chenhuixian_piaoxue.lrc'
		},
		{
			title: '成都',
			author: '赵雷',
			url: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/zhaolei_chengdu.mp3?Expires=1505464161&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=%2FtiM0j%2Fn7czWnu1oSdiT3yM0zSU%3D',
			pic: 'http://sendoh.oss-cn-beijing.aliyuncs.com/mp3/zhaolei_chengdu.png?Expires=1505464192&OSSAccessKeyId=TMP.AQHEfMGntpsSsjnaM0FX9uAO5wrfV_LA6pt36FnwvRJwa-AvtErwzbjr-kogAAAwLAIUCky3f7vY9wN-_VcCbrsmrAetKdcCFCHerLNxuCyx2XIVSm9u2kESvSxe&Signature=s7Zkw8%2BWU0RA7T19jRTDASXhIj8%3D',
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