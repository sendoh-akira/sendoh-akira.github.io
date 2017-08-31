---
layout: default
title: 分类
permalink: /pages/class.html
---
<input type="hidden" id="menuId" value="1">
<table  class="table table-condensed" >
	<tr>
		<td align="right">
			<select onchange="read(this);">
				<option value="class" selected="selected">按类型</option>
				<option value="tags" >按标签</option>
				<option value="date" >按时间</option>
			</select>
		</td>
	</tr>
</table>

<div class="home">

	{% for category in site.categories %}
	      		<div class="panel panel-default">
	        			<div class="panel-heading center" id="{{ category[0] }}" name="{{ category[0] }}">{{ category[0] }}</div>
			              {% for post in category[1] %}
			                 <a  href='{{site.baseurl }}{{ post.url }}'  class="list-group-item clearfix pjaxlink">
				            {{post.title}}
				            <span class="badge">{{ post.date | date:"%Y年%m月%d日" }}</span>
				     </a>
			               {% endfor %}
			</div>
	{% endfor %}


</div>
