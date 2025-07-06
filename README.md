# Todo App

A lightweight, responsive, and modern Todo list application built with HTML, CSS, and JavaScript. Manage your daily tasks efficiently with a sleek UI, dark mode, and drag-and-drop sorting — all in your browser.

## Features

- Add, edit, and delete tasks with ease
- Mark tasks as completed (with strikethrough)
- Delete all tasks with a single click
- Drag-and-drop to reorder tasks (powered by SortableJS)
- Light/Dark mode toggle with animated switch
- Persistent storage using your browser's localStorage
- Responsive design for desktop, tablet, and mobile

## Live Demo

Try it out here: [https://prathb.github.io/TODO-App/](https://prathb.github.io/TODO-App/)

## Demo

Light Mode | Dark Mode  
:-------------------------:|:-------------------------:  
![Light Mode](screenshot/screenshot-light.png) | ![Dark Mode](screenshot/screenshot-dark.png)

## Getting Started

1. **Clone or download this repository**
2. Open `index.html` in your web browser

No build tools or dependencies required!

## File Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styles, including dark mode and toggle animation
├── script.js       # Main JavaScript logic
├── sortable.js     # SortableJS library (or loaded via CDN)
├── screenshot/     # App screenshots
└── README.md       # This file
```

## Usage

- **Add a task:** Type in the input and press "Add" or hit Enter.
- **Mark as complete:** Click the checkmark next to a task.
- **Edit a task:** Click the task text to edit, then press Enter or click outside to save.
- **Delete all tasks:** Click the "Delete All" button.
- **Reorder tasks:** Drag the handle (≡) to move tasks up or down.
- **Toggle theme:** Click the sun/moon toggle in the header. The toggle animates left/right as you switch themes. Your preference is saved.

## Customization

- All styles are in `styles.css`. You can easily adjust colors, fonts, or layout.
- The theme toggle is fully customizable and uses CSS variables for easy theming.

## Credits

- [SortableJS](https://github.com/SortableJS/Sortable) for drag-and-drop
- [Font Awesome](https://fontawesome.com/) for optional icons

## License

MIT