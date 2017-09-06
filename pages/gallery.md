---
layout: default
title: 相册
permalink: /pages/gallery.html
---

<input type="hidden" id="galleryHidden" value="gallery"/>
<input type="hidden" id="galleryPageNum" value="1"/>

<table  class="table table-condensed" >
	<tr>
		<td align="right">
			<select id="selGallery" onchange="loadGallery(this,1);">发现
				<option value="popular" selected="selected">热门</option>
				<option value="editors" >编辑</option>
				<option value="upcoming" >排名上升</option>
				<option value="fresh" >新作</option>
				<option value="user" >我的</option>			
				
			</select>
		</td>
	</tr>
</table>

<div id="links" class="links"></div>
<!-- The Gallery as lightbox dialog, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
