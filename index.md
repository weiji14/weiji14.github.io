---
title: Wei Ji Leong
layout: base.njk
---

<a rel="me" href="https://github.com/weiji14"><img src="https://img.shields.io/badge/Github-@weiji14-%23181717.svg?logo=github" alt="Github user @weiji14 page"></a>
[![ORCID](https://img.shields.io/badge/ORCID-0000--0003--2354--1988-%23A6CE39?logo=orcid)](https://orcid.org/0000-0003-2354-1988)
[![ResearchGate profile](https://img.shields.io/badge/ResearchGate-Wei_Ji_Leong-%2300d0af?logo=researchgate)](https://www.researchgate.net/profile/Wei_Ji_Leong)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-wjleong14-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/wjleong14)
<a rel="me" href="https://mastodon.nz/@weiji14"><img src="https://img.shields.io/mastodon/follow/109260244388748570?domain=https%3A%2F%2Fmastodon.nz&amp;style=social" alt="Mastodon"></a>

{% include './weiji14/README.md' %}

## Portfolio

<section>
{% for post in collections.all reversed sort_by:date %}
{% if post.data.image.teaser %}
<article>

  [![{{ post.data.title }}]({{ post.data.image.teaser }})]({{ post.url }})
  {{ post.data.image.caption }}

</article>
{% endif %}
{% endfor %}
</section>
