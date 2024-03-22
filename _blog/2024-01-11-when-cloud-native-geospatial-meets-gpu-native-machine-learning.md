---
date: 2024-01-11
title: When cloud-native geospatial meets GPU-native machine learning
summary: 'Accelerating compute with GPUDirect Storage technology on cloud-native geospatial data.'
---

![AI-generated image from Midjourney v5.2 using prompt 'Rocket launching straight through the clouds of the Earth's atmosphere at a 45 degree angle with orange flames from its booster --aspect 7:4' with seed 1342788268](https://github.com/weiji14/weiji14.github.io/assets/23487320/6fdfaa58-ca12-454a-b1fe-041cf6f3e5b0)

Behind every great Geospatial Foundation Model, is a stack of great open source tools.

At [FOSS4G SotM Oceania 2023](https://devseed.com/blog/2023-09-20-see-you-at-foss4g-sotm-oceania-2023), I gave a talk on the Pangeo Machine Learning Ecosystem in 2023 (see the recording [here](https://www.youtube.com/watch?v=X2LBuUfSo5Q)).
One of the reasons why the Pangeo community aligns well with folks at Development Seed - is that we like to be forward-looking - eager to use Earth Observation data for understanding past patterns, but preparing for what's to come with future Climate/Weather projections and it's impact on Earth in the coming decades.

But are we ready for Petabyte scale?

The launch of the [SWOT](https://en.wikipedia.org/wiki/Surface_Water_and_Ocean_Topography) satellite altimeter in 2022 and the upcoming [NISAR](https://en.wikipedia.org/wiki/NISAR_(satellite)) mission will produce Terabytes of data each day.
A paradigm shift is required at this scale, not only on the technical side in terms of data storage and compute, but also on the way people collaborate on building next-generation tools for open science.

Let's level up our game by:

- Shifting to accelerated **GPU-native** compute
- **Streaming** data subsets on-demand
- Handling complex **multi-modal** data inputs

As we start to catch a glimpse of [multi-modal Foundation Models](https://doi.org/10.48550/arXiv.2309.10020) over the horizon, it becomes apparent that the tools we use to train these models need to scale accordingly, be energy efficient, while remaining modular enough to be repurposed for different applications.

We'll now walk you through an example of what this looks like in practice.


## Going GPU-native with kvikIO

[![Illustration of NVIDIA GPUDirect Storage (GDS) from NVMe storage drive to Graphical Processing Unit (GPU) with and without GDS. Path with GDS is shorter, only passing through a PCIe switch. Path without GDS involves going through the PCIe switch, CPU, System RAM, then back to the CPU and PCIe switch before going to the GPU. Further on the right, the figure shows current (2023) support for filesystems, file formats (via cuFile) and Zarr compression (via nvCOMP).](https://github.com/weiji14/foss4g2023oceania/assets/23487320/b339605a-492b-4c5c-8a06-b14ebcd258b7)](https://github.com/weiji14/foss4g2023oceania/pull/6)

Our data journey starts at the file storage level.
Traditionally, to feed data from disk storage to a Graphical Processing Unit (GPU), the data would need to go through a PCIe switch, then to your CPU and System memory (CPU RAM) via what is called a bounce buffer, before going back to the PCIe switch, and then to the GPU.
Every step along this path introduces the potential for latency.

In the GPU-native world, you would use a technology like [NVIDIA GPUDirect Storage (GDS)](https://developer.nvidia.com/blog/gpudirect-storage), wherein the data goes via the PCIe switch and directly to the GPU, bypassing the CPU altogether.
This means less latency, and faster data read speeds (which I'll show some numbers for below)!
As of 2023, this is supported for [qualified file systems](https://docs.nvidia.com/gpudirect-storage/release-notes/index.html#known-limitations) such as ext4/xfs via [cuFile](https://docs.nvidia.com/gpudirect-storage/api-reference-guide/index.html), with extra setup required for network filesystems.

In terms of [cloud-optimized geospatial file formats](https://guide.cloudnativegeo.org), Parquet (via [cuDF](https://docs.rapids.ai/api/cudf/23.10/user_guide/io/io/#magnum-io-gpudirect-storage-integration)) and Zarr (via [kvikIO](https://docs.rapids.ai/api/kvikio/23.10/api/#zarr)) are currently the best supported.
For Zarr in particular, there is some initial support in [kvikIO](https://docs.rapids.ai/api/kvikio/23.10/zarr) for decompressing LZ4-compressed datasets directly using the GPU (via [nvCOMP](https://developer.nvidia.com/nvcomp)), and [cupy-xarray](https://cupy-xarray.readthedocs.io) has an [experimental kvikIO interface](https://github.com/xarray-contrib/cupy-xarray/pull/10) that would make it easier to read Zarr into GPU-backed xarray Datasets!
This gets us closer to not having to rely on the CPU, and as more [GPU-accelerated](https://rapids.ai) tools come online, this means we can leave the CPU-to-GPU bottleneck behind!


## Streaming subsets on-the-fly with xbatcher

[![Illustration of xbatcher's features of slicing multi-dimensional arrays on-the-fly with named variables. This is useful for e.g. time-series or multi-variate oceanography / climate model outputs. Diagram on the left shows how a datacube is sliced, and code block on the right shows how regular slicing code compares to xbatcher. At the bottom, more features are mentioned such as lazy loading, xarray acessors, and the experiment cache mechanism. Also mentioned upcoming roadmap like shuffling/sampling utilities and async loading of batches.](https://github.com/weiji14/foss4g2023oceania/assets/23487320/38af26ca-83ea-4798-be7f-95608ad56df0)](https://github.com/weiji14/foss4g2023oceania/pull/8)

Going GPU-native allows us to read data faster, but that doesn't mean we can fit all of it into GPU memory at once!
For large multi-variate and/or long time-series datasets such as the [ERA5](https://weatherbench2.readthedocs.io/en/latest/data-guide.html#era5) climate reanalysis product (which I'll be showing below), we need a smarter way to handle things.
A common way that geospatial Machine Learning practicioners have often used is to subset the datasets into smaller 'chips' that are stored as intermediate files, before loading them into memory.
This however, results in duplicated data, and when you're working on the terabyte or petabyte scale, it can be a pain to store and manage all of those intermediate files.

Why not just stream data subsets on-the-fly?
When using cloud-optimized formats like Cloud-Optimized GeoTIFFs or Zarr that have been [chunked properly](https://guide.cloudnativegeo.org/glossary.html#chunk-size), accessing subsets can be efficient.
Libraries like [xbatcher](https://xbatcher.readthedocs.io) allow us to slice datacubes intuitively along any dimension using named variables.
Xbatcher uses [xarray's lazy-loading](https://tutorial.xarray.dev/advanced/backends/2.Backend_with_Lazy_Loading.html) mechanism behind the scenes to save memory, and while the Xarray data model doesn't care if the underlying data is a CPU or GPU-backed array, it is still nice to know that you can switch from CPU to GPU-native while using the same interface!


## Composable geospatial DataPipes with zen3geo

[![Illustration of zen3geo's chainable I/O readers and processors for geospatial data, designed to be ready for multi-sensor/multi-modal architectures. Flowchart in the middle row shows STAC, vector, raster, spatial and other DataPipes making up zen3geo. Bottom row shows some of the key features of zen3geo (as of v0.6.2), and a future roadmap.](https://github.com/weiji14/foss4g2023oceania/assets/23487320/d6530fbd-3f83-4b50-a73b-5a1b696158bf)](https://github.com/weiji14/foss4g2023oceania/pull/9)

All that said, building a geospatial data pipeline for GPU-native workflows still involves a lot of moving parts.
From [Composable Data Systems](https://voltrondata.com/codex) to [Modular Deep Learning](https://www.ruder.io/modular-deep-learning), the trend is to build plug-and-play pieces that are interoperable.
Just as we are seeing AI systems that can combine visual, text and sound inputs, otherwise known as multi-modal models, we see the need to do the same for geospatial formats - raster, vector, point clouds, and so on.

One such library is [zen3geo](https://zen3geo.readthedocs.io), which is designed to allow for building custom multi-sensor or multi-modal data pipelines.
It implements I/O readers for standards such as [Spatiotemporal Asset Catalogs (STAC)](https://stacspec.org) which store raster or vector file formats, and allows you to do data conversions (e.g. [rasterization](https://zen3geo.readthedocs.io/en/v0.6.2/api.html#zen3geo.datapipes.DatashaderRasterizer)) or apply any custom processing function you've created.
Behind the scenes, zen3geo makes extensive use of the geopandas GeoDataFrame and Xarray data model, and depends on [torchdata DataPipes](https://pytorch.org/data/0.7/dp_tutorial.html) to chain operations together in a composable manner.

How does this work in practice?
Glad you asked, because now it's time to show a proper end-to-end GPU-native example!


# An example GPU-native data pipeline!

[![Illustration of a zen3geo DataPipe, starting with a url to an ERA5 Zarr store, which is read using kvikIO, passed through a custom pre-processing function, sliced into subsets using xbatcher, converted from CuPy arrays into Torch tensors, and finally passed into a DataLoader.](https://github.com/weiji14/foss4g2023oceania/releases/download/v0.9.0/demo_datapipe_code.png)](https://github.com/weiji14/foss4g2023oceania/pull/9)

The code above shows what a GPU-native data pipeline built with [zen3geo](https://github.com/weiji14/zen3geo) would look like for reading an [ERA5 dataset from WeatherBench2](https://weatherbench2.readthedocs.io/en/latest/data-guide.html#era5), one of the climate reanalysis products used to train models for making future Climate/Weather projections.
It consists of about five steps:

1. A pointer to the Zarr store
2. Reading the Zarr store with GPUDirect Storage using [cupy-xarray's `kvikIO` engine](https://github.com/xarray-contrib/cupy-xarray/pull/10)
3. A custom function to select desired ERA5 data variables (e.g. wind speed)
4. Slicing the ERA5 datacube along longitude/latitude/time dimensions with [xbatcher](https://zen3geo.readthedocs.io/en/v0.6.2/api.html#module-zen3geo.datapipes.xbatcher)
5. A custom collate function to convert CuPy arrays to Torch tensors (zero-copy)

This DataPipe can then be passed into a regular Pytorch DataLoader, that then streams data in a GPU-native way to some neural network model.
For more details, you can check out the [code on GitHub here](https://github.com/weiji14/foss4g2023oceania), otherwise let's see some benchmark results!


## Results: ~25% less time with GPUDirect Storage

![Comparing GPU-based kvikIO engine with CPU-based zarr engine.](https://github.com/weiji14/foss4g2023oceania/assets/23487320/753bdfd0-a98b-4b3d-81a2-9bdd6e5db93b)

This benchmark compares the GPU-based kvikIO engine with the CPU-based zarr engine for loading an 18.2GB ERA5 subset dataset (more technical details [here](https://github.com/zarr-developers/zarr-benchmark/discussions/14)).
We see that using GPUDirect Storage (via kvikIO) takes about 11.9 seconds, compared to about 16.0 seconds for the regular CPU-based method, or about 25% less time!

Let's say we want to scale up to a Terabyte of data, and run more epochs (or 'training' iterations).
Here are some back of envelope calculations:

- Scale to 55x more data (18.2GB to 1TB)
- Train for 100 epochs

The two methods would take this amount of time:

- Zarr   (CPU-based): 16.0s x 55 x 100 = 24.4 hours
- kvikIO (GPU-based): 11.9s x 55 x 100 = 18.2 hours

So we can save about 6 hours per day, which would be about 180 hours a month!
Let's put those savings in practical terms, in terms of dollar amounts and carbon emissions.

## Savings in terms of price and carbon emissions

| Time saved | Price (USD3/hr) [1] | Carbon (0.04842 kgCO₂eq/hr) [2] | CO₂ emissions equivalent to |
|--|--|--|--|
| 6 hr (day) | USD18 | 0.29 kgCO₂eq | 35 smartphone charges 📱 |
| 180 hr (month) | USD540 | 8.72 kgCO₂eq | 44km of driving a car 🚗 |
| 2190 hr (year) | USD6570 | 106.04 kgCO₂eq | 431km domestic flight (Taupo to Auckland) ✈️ |

Assumptions:
1. Price: USD3/hour for NVIDIA A100 40GB GPU (range $2.39-$4.10) from <https://www.paperspace.com/gpu-cloud-comparison>
2. Carbon intensity in Sydney region (538 gCO₂eq/kWh) from <https://cloud.google.com/sustainability/region-carbon><br>90 W power draw x 1 hour = 0.09 kWh<br>0.09 kWh x 538 gCO2eq/kWh = 0.04842 kgCO₂eq/hr


# Towards GPU-native geospatial data science 🚀

The foundation has been laid, and a path forward is now visible.
From cloud-native geospatial file formats optimized for concurrent reading, to accelerated processors that are enabling us to scale [The Wall](https://voltrondata.com/codex/wall-and-machine) or gap between classical CPU-based systems and GPU-based AI/ML workflows.
Building the next state-of-the-art will require an intricate design that leverages the power of a cloud-native and GPU-native stack.

And we hope that you will join us on this journey.
Keep an eye on this space!


## Credits

The Pangeo community has been instrumental in pushing the frontier of open, reproducible and scalable ways in scientific fields such as Earth Observation and Climate/Weather modelling.
In particular, we'd like to acknowledge the work of [Deepak Cherian](https://github.com/dcherian) at [Earthmover](https://earthmover.io)
and [Negin Sobhani](https://github.com/negin513) at [NCAR](https://ncar.ucar.edu) for their work on cupy-xarray/kvikIO,
as well as [Max Jones](https://github.com/maxrjones) at [Carbonplan](https://carbonplan.org) for recent developments on the xbatcher package.

---

Note: A trimmed version of this blog post is published at <https://developmentseed.org/blog/2024-03-19-combining-cloud-gpu-native>.
The version here is the full version with all the technical details spelt out.
