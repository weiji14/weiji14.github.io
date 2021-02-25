---
title: Community Experience
subtitle: Workshops, Hackathons and Open Source Contributions
layout: base.njk
---

### Workshops

<ul>
{% for post in collections.community reversed sort_by:date %}

#### {{ post.data.title }}

- Date: <time>{{ post.data.date | date: "%Y/%m/%d" }}</time>
- Conference Name: {{ post.data.conference }}
- Location: {{ post.data.location }}
- Links:&nbsp;
  {%- for website in post.data.websites -%}
    [{{ website[0] | capitalize }}]({{ website[1] }}){% unless forloop.last %}, {% endunless %}
  {%- endfor -%}
  {% if post.data.image.thumbnail %}
    <center>

    [![{{ post.data.caption }}]({{ post.data.image.thumbnail }})]({{ post.data.websites.github }})

    </center>
  {% endif %}

{% endfor %}
</ul>
