# weiji14.github.io

My academic personal website and Curriculum Vitae.
Built using [Eleventy](https://11ty.io)!

[![Eleventy Build](https://github.com/weiji14/weiji14.github.io/workflows/Eleventy%20Build/badge.svg)](https://github.com/weiji14/weiji14.github.io/actions?query=workflow%3A%22Eleventy+Build%22)

# Getting Started

How to replicate a static site like this for the technical minded!
The site is automatically built using [Github Actions](https://github.com/actions)
and hosted on [Github Pages](https://pages.github.com/) for free.
To get things running locally, you can fork the repo first and follow the steps below.

## Clone the repo

Start by cloning this [repo-url](/../../), or that of your own fork.

    git clone <repo-url>

## Install the [eleventy](https://www.11ty.dev/docs/getting-started/) static site generator

    npm install -g @11ty/eleventy

## Build html files with eleventy

    # Change directory into the repo folder
    cd weiji14.github.io
    # Use eleventy to build from `.` directory to `_site`
    eleventy

## Preview the files locally

    eleventy --serve

## Deploy to the web

The static `*.html` files will be located inside the `_site` folder.
Under normal circumstances, you only need to `git push` the `*.md` files,
as the Github Actions workflow in `.github/workflows/eleventy_build.yml`
will handle the `*.md` to `*.html` conversion,
and publish the `_site` folder up onto Github Pages.
However, you may need to [tell Github Pages to use the `gh-pages` branch as the publishing source](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Alternatively, you can upload the files in `_site` manually to the `gh-pages`
branch, or another hosting provider of your choice such as
[netlify](https://www.netlify.com) or [Vercel](https://vercel.com).


# Content structure

The content are organized into multiple pages as follow:

- Home
- Curriculum Vitae
- Experiences:
  - Community
  - Academic
  - Professional

These are list of YAML metadata tags used for each markdown (`*.md`) file:

- **date**
- **title**
- authors
- publication
- citation
- websites
- tag[type]:
  - community
    - workshop
  - academic
    - preprint
    - presentation
    - poster
  - professional
