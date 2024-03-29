---
title: Wei Ji Leong
subtitle: Geospatial Data Scientist
layout: base.njk
---

## Research Interests

* [Mapping the distribution of subglacial water in Antarctica](https://www.wgtn.ac.nz/antarctic/study/profiles/wei-ji-leong)
* Deep Learning on large Earth Observation datasets
* Reproducible Science via Open Source Software


## Geospatial Data Science Skills

#### *Deep Learning & Remote Sensing*:
  - **Computer Vision**: Comfortable with designing **Convolutional Neural Networks** for **image segmentation** of satellite imagery.
  Very knowledgeable about state-of-the-art models including **Generative Adversarial Networks** for **super resolution**, and have dabbled with actor-critic **Reinforcement Learning** models.
  Well acquainted with Bayesian-based **hyperparameter tuning** and modifying neural network **architectures** for better performance on novel applications.
  - **Satellite Remote Sensing**: Very proficient with processing **ICESat/GLAS & ICESat-2/ATLAS** laser altimeter point cloud data for measuring surface elevation changes. Familiar with using optical (e.g. **Landsat 5/7/8** and **Sentinel-2**) and SAR (e.g. **Sentinel-1**) imagery for monitoring land cover changes. Also adept at **LiDAR** and aerial imagery processing workflows.
  - **Reproducible Research**: Practical experience with **structuring machine learning** projects from dataset **preprocessing** to groundtruth **validation**.
  Adept at using **dvc** to version control **training data** and log **experimental artifacts**.
  Very capable of producing visually pleasing **data visualizations** in **static** and **interactive** formats for a range of audiences.

#### *Programming/Scripting*:
  - **Python**: Excellent proficiency, from running vectorized **NumPy** operations, to handling 2D **Pandas** tables and n-dimensional **Xarray** datasets.
  Able to handle large datasets via **Dask** for distributed CPU computing and **CuPy/Rapids AI** for GPU accelerated workflows.
  Adept at utilizing various geospatial Python libraries like **PyGMT**, **Geopandas** and **Rasterio**.
  Avid user of **Pytorch/Chainer/Keras/Tensorflow** for prototyping deep neural networks.
  - **Cloud computing**: Informed about Cloud-native Geospatial concepts such as **Cloud-Optimized GeoTIFFs** and the **STAC** specification.
  Experienced with using Microsoft Planetary Computer (**Azure**), **NVIDIA** NGC and **Google Cloud Platform** to prototype applications.
  Capable of running asynchronous processing scripts using **SLURM** and **kbatch**.

#### *Open source mentality*:
  - **Active contributor** on public **Github** projects like [zen3geo](https://github.com/weiji14/zen3geo), [PyGMT](https://github.com/GenericMappingTools/pygmt) and [xbatcher](https://github.com/xarray-contrib/xbatcher).
  Likes to keep code maintainable by writing quality **unit tests** and automating repeatable processes using **continuous integration/deployment** services.
  - High competence in using **Jupyter** notebooks/**QGIS** as a platform for analyzing spatial data;
  strong familiarity (> 10 years experience) with **Linux** command-line interface.
  - Familiar with using **git** to track code and document changes; **docker** containers and **mamba/conda/pip** to ensure reproducible environments


## Tertiary Education

- [Antarctic Research Centre](https://www.wgtn.ac.nz/antarctic), [Victoria University of Wellington](https://www.wgtn.ac.nz), New Zealand
  - **PhD** in Glaciology/Physical Geography (2017-2021).
  - **BSc (Hons)**, First Class Honours in Geology, with selection of other papers in Remote Sensing, Physical Geography and Environmental Psychology (2015).
  - **BSc**, majoring in Environmental Science and Geography, including some notable Geological and Biological science components (2012-2014).


## Community Experience

<ul>
{% for post in collections.community reversed sort_by:date %}

{% if post.data.date %}
  - <time><small>{{ post.data.date | date: "%Y/%m/%d" }}</small></time> ~ {{ post.data.type | capitalize }} ~ [{{ post.data.title }}]({{ post.url }})
{% endif %}
{% if post.data.date_start %}
  - <time>{{ post.data.date_start | date: "%Y/%m/%d" }}</time> to <time>{{ post.data.date_end | date: "%Y/%m/%d" }}</time> ~ [{{ post.data.title }}]({{ post.url }})
{% endif %}

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

- <time>{{ post.data.date_start | date: "%b %Y" }}</time> to <time>{{ post.data.date_end | date: "%b %Y" }}</time> ~ [{{ post.data.role }} at {{ post.data.company }}]({{ post.url }})

{% endfor %}
</ul>
