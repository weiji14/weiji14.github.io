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
- Websites:
  {%- for website in post.data.websites %}
    - {{ website }}
  {%- endfor -%}

{% endfor %}
</ul>
