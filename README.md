# Holoboard

A mixture of one of my creative projects for CSE154 and a project I made independently after the class ended. This was a small little project I made spotaneously to learn some of the Next 13 update.

Third-party viewer and live tracker for the Hololive and Holostars English members. When one of them are live, their icon will light up and you can click on it to get the current stream in the iframe. I may implement Google Authentication to allow you to send chat messages through your Google Account.

Some things I learned about Next 13:

1. It seems like you really need to consider whether or not you want to use a server or client component as they now have clearly defined roles. This particular app doesn't use much components in general but I already had to split some functionality in order to use client component specific functions within a parent server component.

2. useSWR seems to not work at the moment? All my calls with it failed.

## Background

The creative project specifically asked us to create our own API and make use of it through Javascript. At the time, I was unaware JSON could support arrays and only know basic Vanilla Javascript. The other project was a more multi-purpose app that allowed you to add channels and track their live status through the YouTube API with additional support for those supported by the Holodex API, but I never polished or was proud of it because it used local storage and was extremely buggy. For this, I extracted portions of the Holodex portion, but I plan to turn that app into a real app with user authentication and a database eventually.