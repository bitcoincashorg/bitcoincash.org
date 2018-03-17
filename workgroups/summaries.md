---
layout: page
title: Summaries
permalink: summaries.html
---
<ul>
{% for item in site.pages %}
{% if item.layout == 'summary' %}
    <li><a href="{{item.url}}">{{item.group}} - {{item.title}} - {{item.time}}</a></li>
{% endif %}
{% endfor %}
</ul>