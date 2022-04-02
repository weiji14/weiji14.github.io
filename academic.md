---
title: Academic Experience
subtitle: Publications and Conference Proceedings
layout: base.njk
---

### Publications

<ul>
{% for post in collections.academic reversed sort_by:date %}
{% if post.data.type == "paper" or post.data.type == "thesis" %}

#### {{ post.data.title }}

- {{ post.data.type | capitalize }} at {{ post.data.publication }}, <time>{{ post.data.date | date: "%Y" }}</time>
- Citation: {{ post.data.citation }}
- Links:&nbsp;
  {%- for website in post.data.websites -%}
    [{{ website[0] | capitalize }}]({{ website[1] }}){% unless forloop.last %}, {% endunless %}
  {%- endfor -%}
  {% if post.data.image.thumbnail %}
    <center>

    [![{{ post.data.caption }}]({{ post.data.image.thumbnail }})]({{ post.data.websites.github }})

    </center>
  {% endif %}

{% endif %}
{% endfor %}
</ul>

### Presentations

<ul>
{% for post in collections.academic reversed sort_by:date %}
{% if post.data.type == "presentation" %}

#### {{ post.data.title }}

- {{ post.data.type | capitalize }} at {{ post.data.conference }}, <time>{{ post.data.date | date: "%Y" }}</time>
- Citation: {{ post.data.citation }}
- Links:&nbsp;
  {%- for website in post.data.websites -%}
    [{{ website[0] | capitalize }}]({{ website[1] }}){% unless forloop.last %}, {% endunless %}
  {%- endfor -%}
  {% if post.data.image.thumbnail %}
    <center>

    [![{{ post.data.caption }}]({{ post.data.image.thumbnail }})]({{ post.data.websites.github }})

    </center>
  {% endif %}

{% endif %}
{% endfor %}
</ul>


### Posters

<ul>
{% for post in collections.academic reversed sort_by:date %}
{% if post.data.type == "poster" or post.data.type == "e-lightning" %}

#### {{ post.data.title }}

- {{ post.data.type | capitalize }} at {{ post.data.conference }}, <time>{{ post.data.date | date: "%Y" }}</time>
- Citation: {{ post.data.citation }}
- Links:&nbsp;
  {%- for website in post.data.websites -%}
    [{{ website[0] | capitalize }}]({{ website[1] }}){% unless forloop.last %}, {% endunless %}
  {%- endfor -%}
  {% if post.data.image.thumbnail %}
    <center>

    [![{{ post.data.caption }}]({{ post.data.image.thumbnail }})]({{ post.data.websites.github }})

    </center>
  {% endif %}

{% endif %}
{% endfor %}
</ul>
