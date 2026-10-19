# ECCode — Chinese Character Keyboard

A single-page, responsive Chinese character explorer and typing workspace.

## Run on macOS
1. Extract the ZIP.
2. Open Terminal and `cd` into the extracted folder.
3. Run `python3 run_app.py`.
4. Open `http://localhost:8000` if the browser does not open.

The page browses major Unicode Han blocks, including basic Han, Extension A, Compatibility Ideographs, Extension B, and later extensions. The Unicode atlas covers code-point ranges, so some positions may be unassigned or not render in the installed font. It does not mean every code point has a standardized character.

## Typing and pronunciation
The included Pinyin-to-character table is a lightweight offline starter, not a full Chinese IME or complete dictionary. For unrestricted Pinyin conversion, use the Chinese input method built into macOS/Windows/Linux and type into the input field or writing area. Clicking a character uses the browser's speech synthesis and a Chinese voice if one is installed. The app's local pronunciation/meaning notes are partial; unknown characters can still be selected and spoken by the system voice.

## ECCode data
`eccode-data.json` is derived from the supplied Excel workbook. ECCode search queries this local data. It is separate from the broader Unicode atlas.

Google Fonts is used for an enhanced visual appearance when internet is available; system fallbacks remain available offline.
