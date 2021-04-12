---
title: Wei Ji Leong
subtitle: Geospatial Data Scientist, PhD Student in Glaciology
layout: base.njk
---

## Research Interests

* [Mapping the distribution of subglacial water in Antarctica](https://www.wgtn.ac.nz/antarctic/study/profiles/wei-ji-leong)
* Deep Learning on large Earth Observation datasets
* Reproducible Science via Open Source Software


## Geospatial Data Science Skills

- *Deep Learning skills*:
  * **Computer Vision**: Comfortable with designing **Convolutional Neural Networks** for **image segmentation** of satellite imagery.
  Very knowledgeable about state-of-the-art models including **Generative Adversarial Networks** for **super resolution**, and have dabbled with actor-critic **Reinforcement Learning** models.
  Well acquainted with Bayesian-based **hyperparameter tuning** and modifying neural network **architectures** for better performance on novel applications.
  * **Reproducible Research**: Practical experience with **structuring machine learning** projects from dataset **preprocessing** to groundtruth **validation**.
  Adept at using **dvc** to version control **training data** and log **experimental artifacts**.
  Very capable of producting visually pleasing **data visualizations** in **static** and **interactive** formats for a range of audiences.

- *Programming/Scripting*:
  * **Python**: Excellent proficiency, from running vectorized **NumPy** operations, to handling 2D **Pandas** tables and n-dimensional **Xarray** datasets.
  Able to handle large datasets via **Dask** for distributed CPU computing and **CuPy/Rapids AI** for GPU accelerated workflows.
  Adept at utilizing various geospatial Python libraries like **PyGMT**, **Geopandas** and **Rasterio**.
  Avid user of **Keras/Tensorflow** for prototyping deep neural networks and **Chainer** for more advanced models.
  * **Matlab/R**: Intermediate proficiency.
  Used to running **statistical analyses** and **ice sheet inverse modelling** on geophysical datasets.
  Also able to make scientific figures with the aid of libraries like **ggplot2** in R.
  * **HTML/CSS/Javascript**: Intermediate proficiency.
  Besides making my own **JAMstack** websites, I’ve also produced interactive maps using **Leaflet** and **Mapbox**.

- *Open source mentality*:
  * **Active contributor** on public **Github** projects like [PyGMT](https://github.com/GenericMappingTools/pygmt) and [IcePyx](https://github.com/icesat2py/icepyx).
  Likes to keep code maintainable by writing quality **unit tests** and automating repeatable processes using **continuous integration/deployment** services.
  * High competence in using **Jupyter** notebooks/**QGIS** as a platform for analyzing spatial data;
  strong familiarity (> 10 years experience) with **Linux** command-line interface.
  * Familiar with using **git** to track code and document changes; **docker** containers and **conda/pip** to ensure reproducible environments


## Tertiary Education

- [Antarctic Research Centre](https://www.wgtn.ac.nz/antarctic), [Victoria University of Wellington](https://www.wgtn.ac.nz), New Zealand
  * **PhD** in Glaciology/Physical Geography, under examination (2017-2021).
  * **BSc (Hons)**, First Class Honours in Geology, with selection of other papers in Remote Sensing, Physical Geography and Environmental Psychology (2015).
  * **BSc**, majoring in Environmental Science and Geography, including some notable Geological and Biological science components (2012-2014).


## Community Experience

<ul>
{% for post in collections.community reversed sort_by:date %}

- <time><small>{{ post.data.date | date: "%Y/%m/%d" }}</small></time> ~ {{ post.data.type | capitalize }} ~ [{{ post.data.title }}]({{ post.url }})

{% endfor %}
</ul>


## Academic Experience

<ul>
{% for post in collections.academic reversed sort_by:date %}

- {{ post.data.type | capitalize }} - [{{ post.data.title }}]({{ post.url }})
  <small>{{ post.data.citation }}</small>

{% endfor %}
</ul>


## Professional Experience

<ul>
{% for post in collections.professional reversed sort_by:date %}

- <time>{{ post.data.start_date | date: "%b %Y" }}</time> to <time>{{ post.data.date | date: "%b %Y" }}</time> ~ [{{ post.data.role }} at {{ post.data.company }}]({{ post.url }})

{% endfor %}
</ul>
