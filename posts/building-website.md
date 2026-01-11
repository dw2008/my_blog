---
title: What I Learned From Building My First Website
excerpt: >-
  This year, I made a New Year's resolution to start blogging every week.
  Instead of only posting on LinkedIn or Twitter, I wanted my own personalizable
  platform, where I could customize what users saw.
date: '2026-01-11'
category: tech
readTime: 5 min
slug: building-website
imageUrl: >-
  https://media.licdn.com/dms/image/v2/D5612AQGWyeFhLQomJA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1698353496292?e=2147483647&v=beta&t=y1YXKJX81hG9Zvp33cI8KZQAFDp0MaX6Ff7Gyov1QrY
---
This year, I made a New Year's resolution to start blogging every week. Instead of only posting on LinkedIn or Twitter, I wanted my own personalizable platform, where I could customize what users saw. Through building this website and hosting it on Vercel, I learned about website functionality and web development as a whole. In this post, I'll walk you through how a website works, and more importantly, why it works this way. When you visit a website, three primary things are working together:
**Frontend** – The code that runs in your browser. These are the components that you see and interact with on the website, like buttons and menus. Running code directly in the browser means instant feedback when you click buttons or type, so no need to wait for a server to respond.
**Backend** – The code that runs on a server. The backend processes requests, fetches data, and does the heavy lifting you don't see. Having a backend helps both security and processing power. You don’t want to expose sensitive information like passwords to the browser, and you don't want every website visitor's computer doing expensive work like parsing markdown files. The server handles these once and sends back clean results.
**Database** – Where data is stored. To make sure my blog posts are saved and retrievable, they live as markdown files in a GitHub repository. As for why I used Github, it's free and I already use it for code :).
Now, let's see these in action when you visit my blog.
**Step 1: Browser Loads the URL**
When you type [dwu2008.me/blog](dwu2008.me/blog) into the browser, React Router reads the URL and determines which page to show; in this case, the blog listing page. React Router lets me have different URLs for different content while still being a single-page application so there aren’t full page reloads when you navigate.
**Step 2: React App Loads**
The frontend loads the navigation bar and page layout. However, there's no content yet, only a blank page. The blog posts aren't hardcoded into the app. If they were, I'd have to rebuild and redeploy the entire site every time I published a post. Instead, the app fetches data dynamically.
**Step 3: API Request is Made**
In order to reach the backend, React calls the API, which acts as a liaison between the frontend and the backend. The API keeps my GitHub credentials on the server (not exposed in browser code), does the heavy lifting of parsing markdown files, and sends back only the data needed. Without it, anyone could open browser dev tools, grab my GitHub token, and delete everything.
**Step 4: Backend Fetches the Data**
The API endpoint (which is a specific URL that performs one task) connects to GitHub, reads all markdown files (plain text files that use simple formatting symbols to create structure) in the posts/ folder, and extracts metadata (title, date, excerpt) from each file. The reason why I used markdown files was because I wanted to write in plain text. Also, with markdown format, I can move to a different platform later easier. If I ever want to switch platforms, I just move my GitHub repo. Compare that to Medium, where images often fail to export and you need third-party conversion tools, or Notion, where complex databases and relations don't transfer cleanly. With markdown in GitHub, I own my content in the most portable format possible.
**Step 5: Data Returns as JSON**
The backend sends back structured data as a JavaScript Object Notation (JSON) file.
Why JSON? It's the universal language of web APIs. Both code in the browser and on the server can read it easily. It’s structured, lightweight, and also human-readable. Here’s a simplified example of a JSON file:
```[ 
{"title": "My First Post", "date": "2024-01-01", "slug": "my-first-post"}, 
{"title": "Building a Website", "date": "2024-01-08", "slug": "building-website"}
]
```
**Step 6: React Displays the Posts**
React receives the data, saves it to state, and loops through the array to create a card for each post. State is React's memory. When state changes (like when new posts arrive), React automatically re-renders only what needs updating. It's efficient and keeps the UI in sync with your data.
The entire process takes under a second.
**Conclusion:**
Building this site demystified web development for me. Frontend talks to backend through API calls and backend fetches from storage. This process is simple in concept, but making it work felt like magic. For now, I'm excited to have my own platform and looking forward to writing here every week. In the future, I’ll be adding more functionalities, including comments and user logins. Thanks for supporting me on my journey!
[Image source](https://www.linkedin.com/pulse/what-website-anas-jubayer-xdzcc/)



