---
title: Professional Experience
subtitle: Previous employment in the industry
layout: base.njk
---

### Employment

<ul>
{% for post in collections.professional reversed sort_by:date %}

#### {{ post.data.role }} at {{ post.data.company }}

- From <time>{{ post.data.start_date | date: "%b %Y" }}</time> to <time>{{ post.data.date | date: "%b %Y" }}</time> in the {{ post.data.team }}.
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
