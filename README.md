![ECCode Logo](favicon.png)

# ECCode — Chinese Character Coding Studio

**Search Chinese characters. Explore their codes. Learn through Mandarin pronunciation.**

ECCode is a browser-based educational tool for exploring Chinese character coding records. It combines a searchable dataset, character details, encoding information, and Mandarin pronunciation playback in a modern purple interface.

Developed as part of the **Coding Theory and Application of Chinese Character** course at Nanjing University of Posts and Telecommunications (NJUPT).

## ✨ Features

- 🔎 **ECCode Search** — Search the coding dataset using ECCode values and code fragments.
- 🈶 **Chinese Character Display** — View the Chinese character associated with a selected record.
- 📚 **Code Details** — Inspect ECCode, sound component, shape component, GBK value, and Unicode value when available.
- 🔊 **Mandarin Pronunciation** — Use the `♫ Hear` control or the music icon beside the selected character to request spoken Chinese pronunciation.
- 🎯 **Interactive Results** — Select a matching record to inspect its character and coding details.
- ⚡ **Quick Search** — Explore common code patterns using predefined shortcuts.
- 📊 **Local Dataset** — Explore 1,159 coding records, including alternate code assignments.
- 🎨 **Responsive Design** — A purple-themed workspace for searching and inspecting Chinese characters.

## 🖥️ Interface Preview

Add screenshots to a `screenshots/` directory in this repository to showcase the application.

```markdown
![ECCode Search Workspace](screenshots/search-workspace.png)

![ECCode Character Details](screenshots/character-details.png)
```

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Search and interaction logic |
| JSON | Local coding dataset |
| Python 3 | Local development server |
| Web Speech API | Browser-based speech synthesis |

## 📁 Project Structure

```text
eccode/
├── favicon.png         # ECCode logo and favicon
├── index.html          # Main application
├── styles.css          # Interface styling
├── app.js              # Search and interaction logic
├── eccode-data.json    # Character coding dataset
├── run_app.py          # Local server launcher
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Python 3
- A modern web browser

### 1. Clone the repository

```bash
git clone https://github.com/lucky3dge/eccode.git
```

### 2. Enter the project directory

```bash
cd eccode
```

### 3. Start the local server

```bash
python3 run_app.py
```

### 4. Open ECCode

Open the local URL printed by the server. If it uses port 8000, visit:

`http://localhost:8000`

## 📖 How to Use ECCode

1. Open the application in your browser.
2. Enter an ECCode or code fragment in the search bar.
3. Browse the matching records.
4. Select a result to display its character details.
5. Review the character, Pinyin, ECCode, sound component, shape component, and available encoding values.
6. Use `♫ Hear` or the music icon beside the selected character to request Mandarin pronunciation.

**Pronunciation note:** Audio depends on the Chinese voices available in the browser and operating system. Characters with multiple readings may require dictionary verification.

## 🧩 Understanding the Coding Data

- **ECCode:** The code associated with a record in the supplied dataset.
- **Sound component:** The phonetic component recorded by the coding scheme.
- **Shape component:** The shape-based component recorded by the coding scheme.
- **GBK / GB18030:** Character encoding information where available.
- **Unicode:** The Unicode code point associated with the character.
- **Pinyin:** The romanization system used to represent Mandarin pronunciation.

The inspected source dataset contains 1,159 records and 1,054 distinct character strings. Multiple records may correspond to the same character because of alternate code assignments.

## ⚠️ Current Limitations

- Search coverage depends on the available dataset and lookup logic.
- Duplicate characters and alternate coding assignments may exist.
- Browser speech synthesis does not guarantee correct readings for every character.
- Pronunciation data requires verification against a reliable Chinese dictionary.
- Character display depends on available system fonts.
- ECCode is an educational prototype, not a complete Chinese input method editor.

## 🔮 Future Improvements

- Verify character pronunciations against a reliable Mandarin dictionary.
- Improve search coverage and matching accuracy.
- Add automated tests for search and Unicode handling.
- Improve support for characters with multiple readings.
- Expand coding-data validation and character exploration.
- Improve accessibility and mobile usability.

## 🎓 Academic Context

**Course:** Coding Theory and Application of Chinese Character  
**University:** Nanjing University of Posts and Telecommunications (NJUPT)  
**Major:** Computer Science and Technology (CST)

## 📄 License

No license has been specified yet. Add a `LICENSE` file when you choose an appropriate open-source license.

## 👋 Feedback and Contributions

Suggestions, bug reports, and improvements are welcome. Open an issue in the repository to discuss a proposed change.

---

**ECCode — Search it. Inspect it. Hear it in Chinese.**
