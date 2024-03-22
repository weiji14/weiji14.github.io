---
title: Blog
subtitle: Technical blog posts on building next generation geospatial data science tools!
layout: base.njk
---

### Posts

<ul>
{%- for post in collections.post reversed sort_by:date -%}
  <li>
    <a href={{ post.url }}>{{ post.data.title }}</a>
    <time> ~ <small>{{ post.data.date | date: "%d/%m/%Y" }}</small></time>
  </li>
{%- endfor -%}
</ul>
