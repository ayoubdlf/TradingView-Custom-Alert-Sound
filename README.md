# 🔔 TradingView Custom Alert Sound | Chrome Extension

This Chrome extension lets you set a **custom alert sound** for [TradingView](https://www.tradingview.com/) alerts.

TradingView doesn't (yet) support custom sounds, so this extension fills that gap by letting you use **any `.mp3` file**, or choose from a few built-in sounds.

Perfect for traders who are tired of the default beep and want alerts that actually *mean something* (or just sound cool).

---

## Features

- Use a custom `.mp3` sound (via URL) or pick from built-in options
- Saves your sound preference using Chrome's storage
- Test your alert sound instantly from the extension popup
- Auto adds your chosen sound directly into **TradingView alerts**

---

## 🧪 Limitations

- Only works on the website (mobile not supported)
- Custom sounds must be **direct URLs to .mp3 files**
- Doesn’t work with alerts outside TradingView

---

## 🤝 Contributing

Feel free to fork the repo, suggest ideas, or open a PR!  
If you’ve got a great sound to share or want to add new built-in options, even better.

---

## 📄 License

Released under the [MIT License](./LICENSE)

---

## 💬 Feedback

Have an idea? Found a bug? Just want to share a funny sound you use?

Open an issue or drop a message, feedback is always welcome 🎧

---

## 🧱 Build Instructions (If You're Cloning the Repo)

After cloning the repository, make sure you build the extension before loading it into Chrome.

### Steps:

1. Install dependencies:
   ```sh
   npm install
   ```

2. Build the project:
   ```sh
   npm run build
   ```

3. A `dist/` folder will be created, this is the final build.

4. Go to `chrome://extensions/`, enable **Developer Mode**, and click **"Load unpacked"**

5. Select the `dist/` folder, you're all set!

---

