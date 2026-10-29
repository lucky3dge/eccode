
<div align="center">
  <img src="favicon.png" alt="ECCode Logo" width="120" />

  # ECCode — Code Studio

  **Find the code. See the pattern.**

  A beautiful, interactive workspace for searching, exploring, and understanding Chinese character ECCode entries.

  ![Responsive](https://img.shields.io/badge/Interface-Responsive-6C4DFF?style=for-the-badge)
  ![Records](https://img.shields.io/badge/Source_Records-1%2C159-26C6A6?style=for-the-badge)
  ![JavaScript](https://img.shields.io/badge/JavaScript-Powered-F7DF1E?style=for-the-badge)
</div>

---

## ✨ About the Project

**ECCode Code Studio** transforms the supplied ECCode dataset into a clean, modern interface. Search code fragments, explore matching Chinese characters, inspect their coding details, and discover character stroke order in one focused workspace.

## 🚀 Features

- 🔎 **Live Search** — Search ECCode entries and code fragments as you type.
- 🈶 **Character Details** — View selected characters and their associated coding information.
- 🔤 **Pinyin & Pronunciation** — Explore pronunciation labels and listen to supported Chinese speech.
- ✍️ **Stroke Order** — View character stroke-order previews and animate them when data is available.
- 📊 **Dataset Overview** — Explore records and dataset statistics.
- 📱 **Responsive Design** — Designed for desktop and mobile screens, including the `02 / CODE DETAILS` panel.
- 📋 **Copy Tools** — Copy ECCode values and character details.
- 💾 **Local Dataset** — Search records from the included dataset.

## 🖥️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Search and interactive features |
| JSON | ECCode dataset |
| Python 3 | Local development server |

## ⚡ Getting Started

### Requirements

- Python 3
- A modern web browser

### Run Locally

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Run the application:

   ```bash
   python3 run_app.py
   ```

4. Open the local URL shown by the launcher in your browser.

Keep the terminal running while you use the application. Press `Ctrl+C` to stop the server.

## 📂 Project Structure

```text
ECCode/
├── index.html
├── styles.css
├── app.js
├── eccode-data.json
├── favicon.png
├── run_app.py
└── README.md
```

## 📱 Mobile Experience

ECCode adapts to smaller screens while keeping character information accessible. The `02 / CODE DETAILS` panel should remain visible and usable on mobile, alongside the search and stroke-order features.

## 📈 Dataset

- **Source records:** 1,159
- **Unique EC codes:** 702
- **Data format:** JSON
- **Search mode:** Live filtering

Statistics are based on the dataset supplied with this project.

## 🛠️ Future Improvements

- Improve mobile search and navigation.
- Expand stroke-order data coverage.
- Add more character comparison tools.
- Enhance accessibility and keyboard navigation.

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome. Please preserve the responsive layout and test search, character selection, pronunciation, and stroke-order controls after making changes.

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under an open-source license.

---

<div align="center">

**ECCode Code Studio**

*Search. Inspect. Discover.*

</div>
