---
title: Professional Experience
subtitle: Employment in the geospatial industry and research groups
layout: base.njk
---

### Employment

<ul>
{% for post in collections.professional reversed sort_by:date %}

#### {{ post.data.role }} at {{ post.data.company }}

- From <time>{{ post.data.date_start | date: "%b %Y" }}</time> to <time>{{ post.data.date_end | date: "%b %Y" }}</time> in the {{ post.data.team }}.
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
