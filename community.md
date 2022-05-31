---
title: Community Experience
subtitle: Workshops, Hackathons and Open Source Contributions
layout: base.njk
---

### Workshops/Hackweeks

<ul>
{% for post in collections.community reversed sort_by:date %}

#### {{ post.data.title }}

{% if post.data.date %}
  - Date: <time>{{ post.data.date | date: "%Y/%m/%d" }}</time>
{% endif %}
{% if post.data.date_start %}
  - Dates: <time>{{ post.data.date_start | date: "%Y/%m/%d" }} to {{ post.data.date_end | date: "%Y/%m/%d" }}</time>
{% endif %}
{% if post.data.authors %}
  - by:&nbsp;
  {%- for author in post.data.authors -%}
     {{ author }}{% unless forloop.last %}, {% endunless %}
  {%- endfor -%}
{% endif %}
{% if post.data.conference %}
  - Conference Name: {{ post.data.conference }}
{% endif %}
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
