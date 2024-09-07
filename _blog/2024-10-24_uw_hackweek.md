---
date: 2024-10-24
title: Engaging in the 2024 UW Hackweek
summary: 'Connecting with some of the most passionate open science advocates in a week-long Hackathon at Seattle.'
---

Notes on attending the 2024 NASA Earth Sciences UW Hackweek in Seattle, USA 🇺🇸 from 19-23 Aug 2024.

- Program schedule: <https://2024.hackweek.io/#schedule>
- Jupyter Book for ICESat-2 track: <https://icesat-2-2024.hackweek.io>

Photo of the Hackweek venue in the University of Washington.

![IMG_20240819_091005](https://github.com/user-attachments/assets/1f96363b-f174-4b88-8403-9e7e27322843)

As mentioned in my Mastodon [post](https://mastodon.nz/@weiji14/112989575093074957) on the first day (you can find all my live-toots that week under the #Hackweek tag), this in-person Hackweek meant a lot to me because I've been trying for 5 years (since I found out about it during my PhD) to attend, at least the ICESat-2 track that is.
The format of the ICESat-2 Hackweek itself has evolved over the years, including a fully remote event in 2022, a hybrid event in 2023, to the 3-in-1 ICESat-2/SnowEx/GeoSMART Hackweek this 2024!
On a personal note, I've felt so fortunate to still have this opportunity to connect with the Cryosphere community, because even though I'm not strictly in academia anymore, or working with laser altimeter data in my day job, I want to make sure that the next generation of researchers have the best tools to do open science, and this Hackweek I've found is hands down the most impactful way to achieve it.

## Overall impressions

To my knowledge, this is one of the most sought after science-focused Hackathon-style events of its kind, organized mostly by folks from UW's eScience Institute which has been continuously improving their Hackweek as a Service model.
There were maybe 100-ish people attending, mainly university students at the postgraduate level and postdocs, and a quarter or so people are more seasoned veterans working at NASA's DAACs, Research Software Engineers, tenured academics, and maybe a handful of industry types.

Given the conference location and funders (NASA/NSF), the attendees were mostly from the US and Canada, with some from Europe and India, not so much from the Asia Pacific.
The demographic balance seemed pretty good, I'd reckon there was an evenly split gender balance (though there were pockets of more men in some projects), and they even had non-binary bathrooms (a first for me at a conference!).
Of course, there's still room for improvement on getting more non-white and non-male identities to the teaching ranks, but I was glad to see a student I taught two years ago lead a project this year, and would love to see more of that happen!

![IMG_20240819_140343](https://github.com/user-attachments/assets/2f0c68b8-2dda-480b-880c-220d83a95b77)

On the schedule side, the general format was to have lecture/interactive tutorials in the morning, and project hack-time in the afternoon.
The tutorials started with the basics of doing Collaborative Development on a shared JupyterHub called CryoCloud, an overview of the ICESat-2/SnowEx missions, and basics of accessing those datasets in the cloud.
The more advanced or niche topics like machine learning and details of field-based instruments like LiDAR & GPR were taught near the middle of the week.
Projects involved teams from as small as 2? to 10+, and typically covered topics adjacent to someone's PhD research, to more software driven teams like [`icepyx4gedi`](https://github.com/ICESAT-2HackWeek/icepyx4gedi) which I worked on!

![IMG_20240819_140303](https://github.com/user-attachments/assets/9ee7984c-836b-4c83-a7c3-f08bde3b1993)

Overall, it does feel like we're trying to cover a lot of ground on everything from open science best practices to cloud-based workflows, machine learning, and even a session on mental health this year!
Luckily, the firehose of information is mostly all recorded so people can always go back and rewatch it, and I'm really pleased that the organizers were mindful to put in ample breaks for us to recharge or slip in a much needed conversation somewhere.
The inter-generational learning is something I can't get enough of, I've been pleasantly surprised at how good students nowadays are at using git and getting up to speed on performing tasks like searching for coincident satellite data, something which stumps even full professors!
Like-wise, it was great talking to people from the NASA DAACs on what is going behind the scenes, and getting a heads up on what's coming up.
And I can tell you now, there is a lot more to come!

Here is a loose assortment of moments I'd like to share.

---

## What's the new default I hear?!!

"Does everyone know how to use GitHub/git?", I asked, looking towards our project members (mostly looking at the students).
They gave me a look as though it was a stupid question (like, duh?).

Ok, so we can hit the ground running?!
Maybe 2-3 years ago, it used to be that we would spend an hour or two getting people up to speed on how to use git.
Either they all came prepared, or this cohort/generation is really, how to say, attuned to the tools needed for collaboration on scientific code.

Another "what is going on" moment for me was when I was summoned for some advice on the [chlorophyll-a gap filling project](https://github.com/geo-smart/mind-the-chl-gap).
Eli was asking me if Zarr was a good format to store n-dimensional data in for their use-case on time-series grids.

Like YES!!
I have been trying (unsuccessfully) to convince ML modellers to use Zarr for storing ML datasets in the >2 projects I've been working on this year instead of NetCDF, GeoTIFF, etc, simply because you can make the data load as fast as technology allows (see my [last blog post](../when-cloud-native-geospatial-meets-gpu-native-machine-learning)).
And here you are, just using it as a matter of fact, as if there was a better choice?!
Madness!

The most epic story I heard that week though, was how Jessica managed to serendipitously connect Jeff Lee to Luis Lopez to make cloud-optimized HDF5 files a thing for the next ICESat-2 release (v007).
The backstory was that Luis has been working for the past year (since the [h5cloud](https://github.com/ICESAT-2HackWeek/h5cloud) project) on figuring out how to make accessing ICESat-2 data over s3 performant, from varying the internal chunk sizes of the HDF5 file to tweaking various settings of I/O libraries (details [here](https://nsidc.github.io/cloud-optimized-icesat2)).
All that said, the problem was that users won't get the maximum benefit (read: speedy file reads over s3) if the archive of ICESat-2 HDF5 files weren't reprocessed, a massive undertaking.

<figure>
    <img src="https://github.com/nsidc/cloud-optimized-icesat2/blob/4210ed22486162a938589412e734f27b6c737372/figures/figure-2.png?raw=true" alt="Cloud-optimized HDF5 file internal structure">
    <figcaption>
    <small>
    Internal structure of a cloud-optimized HDF5 file. First read is R0, and subsequent reads are R1, R2, ... Rn. Source: https://github.com/nsidc/cloud-optimized-icesat2
    </small>
    </figcaption>
</figure>

Now, long story short, Jessica happened to be sitting next to Jeff at some conference dinner, and after some chatter and realizing who they were, she managed to convince Jeff to talk to Luis afterwards.
Apparently, Jeff was that very important person at NSIDC who could change how the ICESat-2 HDF5 files were written out, and Luis manages to explain how some simple config changes were all that was needed to get cloud-optimized performance.
Yes, seemingly trivial, but it took us 5 years to get here...

Defaults, you never know how important they are, until you look into it.

---

## Giving back to the community

It's not often that I get to interact face-to-face with people and get to see/hear them express their feedback.
For me, good feedback itself can vary from none (it just works, no complaints) to quick acknowledgement (thank you, that was helpful!) to a more active form (hey, I think you can help me with ...).

This time round, I was particularly excited to see how combining the ICESat-2 and GeoSMART tracks would work out, the latter being all about Machine learning which is quite the rave for some reason.
There were many [possibilities](https://github.com/uwhackweek/schedule-2024/issues/38#issuecomment-2198787712) on what Machine Learning method to teach, and what target/topic to apply it on.
In the end, I designed this [tutorial on classifiying ICESat-2 ATL07 point cloud data](https://icesat-2-2024.hackweek.io/tutorials/machine-learning/point_cloud_classifier.html) into different surface types (water, thin sea ice, thick sea ice).

![ICESat-2 ATL07 sea ice point cloud classification ML pipeline](https://github.com/user-attachments/assets/d61521a4-d27a-4eb8-b886-3d92c5516c32)

The machine learning pipeline itself was probably 80% data preprocessing and only 20% model training, but I thought it would be useful to show all of that end-to-end.
I was particularly fond of the code to find coincident Sentinel-2 imagery and ICESat-2 tracks, something adapted from a Jupyter notebook sent to me from Alek Petty.
That, and a nice clean way to create a GeoParquet file, and even some code using PyGMT to plot an RGB image and do grdtrack.

Funny thing is that I'm not even a sea ice scientist (that tutorial was adapted from someone else's code), so I was glad that nobody asked difficult questions (there were actually a lot of questions during my pauses)!
Something I kinda realized that week was how there were way more ATL08 land/vegetation users than those using the ice products.
I did manage to help a couple of students tweak my notebook code to use ATL08 instead of ATL07 (and I hope others can figure it out themselves), but in a way, I think it'd be good if someone shows a vegetation/land cover example next year.

Besides the tutorial, I'd be remiss if I didn't mention how the [CryoCloud JupyterHub](https://cryointhecloud.com) has worked practically seamlessly this time, as good infrastructure should.
Over the past two years, I've helped out as much as I can on package maintenance with Tasha, Scott and others, because solving dependency hell has been 10% of my PhD, and I don't want that to be the case for others.

It was also during that week that I found out about CryoCloud's plans to rebrand as StratusGeo (subject to funding), and while I'm a little saddened by the loss of the 'Cryo' part, continuity of the JupyterHub is more important.
There's still so much innovation to be done in terms of making cloud-optimized datasets more ubiquitous, and also implementing batch-style workflows to compete with HPCs, so they have my fullest support in taking the next leap.

Feedback matters.
The next time you fill in those 'surveys', do spell out what you appreciate.

---

## What next?

Being so close to people working on satellites and their products, you hear things like:
- The upcoming [Earth Dynamics Geodetic Explorer (EDGE)](https://edge.ucsd.edu/instrument) altimeter combining ICESat-2 and GEDI, 40 beams??!
- NISAR's (yet again) delayed launch date...
- HLS will prioritize releasing quick look products instead of 10m spatial resolution product, based on survey needs...

![EDGE swath-mapping laser altimeter over vegetation and ice](https://web.archive.org/web/20240907043249im_/https://edge.ucsd.edu/wp-content/uploads/sites/499/2024/05/ED001_R10.png)

But what I'm more keen on is when's the next hack session!
OpenScapes has this 2-hr hackdays every fornight (e.g. for [earthaccess](https://github.com/NASA-Openscapes/how_we_work/issues/49)), but they're not ideal for my timezone.
Next best in-person one would probably be this [Post-AGU Pangeo hackathon](https://discourse.pangeo.io/t/post-agu-pangeo-working-meeting-december-14-2024-in-washington-dc/4440), so I guess I'll see everyone there!
