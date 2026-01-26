# Is This Thing On?

Welcome to my personal website!

This is technically my second website. My first website was developed using next.js and hosted on Vercel. But with how Guillermo Rauch was so tone deaf regarding his support for Israel, I decided to stop hosting my website on Vercel. In contrast, this website uses vite and react-router to handle routing.

There isn't much to elaborate about this website. It's mainly a place to share my projects and what I've been working on. One thing I like about it is that this devlog is a slug, and dynamically fetches the content from a markdown file based on the slug (the thing after devlog/). It processes the markdown file using marked and renders it as HTML.

Using tailwind-typography also allows me to style the markdown content easily. Here's a few examples.

I can make unordered lists:

- Item 1
- Item 2

I can make ordered lists:

1. Item 1
2. Item 2

I can make nested lists:

- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2

I can make some texts **bold** and some _italic_.

I can put in images.

![Photo Sorter](/screenshots/photo-sorter.png)

And I can put in code blocks.

```javascript
console.log("Hello, Markdown!");
```

I originally thought of making a new page for each project, but this markdown system speeds up the process of writing these devlogs.
