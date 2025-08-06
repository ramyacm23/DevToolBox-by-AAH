# DevToolbox

A modular, vanilla JS web app to help developers explore and learn about popular tools, organized by use case.
[![View Live Site](https://img.shields.io/badge/View%20Live%20Site-DevToolBox-blue?style=for-the-badge&logo=githubpages)](https://deepthibalasubramanian.github.io/DevToolBox-by-AAH/)

---

## Features
- Tabs for categories (Version Control, Code Formatting, AI Assistants, etc.)
- Each tab lists tools as cards
- Click a tool to see details: what it does, install, syntax, docs
- All tool data in `tools.js` for easy editing
- Clean, modular code (UI, events, data separated)

## Project Structure
```
DevToolbox/
├── index.html
├── style.css
├── tools.js
├── app.js
└── README.md
```


## Adding or Editing Tools
- Open `tools.js`.
- Each category is an object in the `TOOL_CATEGORIES` array.
- Add a new tool object to the `tools` array for the right category.
- Each tool needs: `name`, `description`, `install`, `syntax`, `docs`.
- Optionally, add a `tutorialLinks` array (see below).
- To add a new category, add a new object to `TOOL_CATEGORIES`.

### Example Tool Object with Tutorials
```js
{
  name: "Git",
  description: "Distributed version control system for tracking changes in source code.",
  install: "https://git-scm.com/downloads",
  syntax: "git clone <repo-url>\ngit status\ngit commit -m 'message'",
  docs: "https://git-scm.com/doc",
  tutorialLinks: [
    { label: "Microsoft Learn: Introduction to Git", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-git/" },
    { label: "roadmap.sh: Git", url: "https://roadmap.sh/git" }
  ]
}
```

## About Tab
- The "About" tab shows a project description and a contributor list.
- To add contributors, edit the HTML in `app.js` or add to the `#more-contributors` div.

## Roadmaps Tab
- Roadmaps for each category are defined in `roadmap.js` as an array of objects.
- To add or edit a roadmap, open `roadmap.js` and update the steps for each category.

### Example Roadmap Object
```js
{
  category: "Version Control",
  steps: [
    "Understand Git Basics",
    "Learn GitHub workflows",
    "Try real-world projects",
    "Use GitHub CLI"
  ]
}
```

## Example Tool Object
```js
{
  name: "Git",
  description: "Distributed version control system for tracking changes in source code.",
  install: "https://git-scm.com/downloads",
  syntax: "git clone <repo-url>\ngit status\ngit commit -m 'message'",
  docs: "https://git-scm.com/doc"
}
```

## Contributing
- Keep code modular and readable.
- Test your changes in the browser.
- Use only vanilla JS, HTML, and CSS (no frameworks).
- Open a pull request with a clear description of your changes.

---
Enjoy exploring and contributing to DevToolbox!

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute with attribution.
