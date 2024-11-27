![Check Math Game Thumbnail](/public/thumbnail.png)

**CHECKMATH** is a fun and challenging game where players compare mathematical expressions and provide the correct answer within a limited time. The project is designed to enhance logical thinking, quick calculation skills, and focus through randomly generated math puzzles.

## 🚀 Key Features

1. **Randomized Questions:**
    - The system automatically generates questions comparing two mathematical expressions.
    - Expressions can include various operations such as `+`, `-`, `*`, `/`, and the number of components in the expressions varies depending on difficulty.

2. **Multiple Difficulty Levels:**
    - **Easy:** Simple expressions with small numbers.
    - **Normal:** More complex expressions with larger numbers and multiple operations.
    - **Hard:** Long expressions with numerous components and challenging operations.

3. **Answer Validation:**
    - Players compare two expressions by selecting one of the symbols: `>`, `<`, or `=`.
    - The system validates the answer and provides immediate feedback.

4. **Cheating Detection:**
    - Integrated cheating detection mechanism ensures fair gameplay by monitoring suspicious behavior.

5. **Result Tracking:**
    - Keeps a history of questions and user performance.
    - Helps players evaluate their progress and accuracy over time.

## 🛠️ Installation and Setup

### Requirements
- **Node.js** (>= 18.x)
- A package manager: **pnpm** or **yarn**

### Installation Steps
1. **Clone the repository from GitHub:**
   ```bash
   git clone https://github.com/check-math/game.git
   cd game
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```
   or if using `yarn`:
   ```bash
   yarn install
   ```

3. **Run the application:**
   ```bash
   pnpm dev
   ```
   or with `yarn`:
   ```bash
   yarn dev
   ```

4. **Access the game:**
   Open your browser and navigate to: `http://localhost:3000`.

## 🧩 How to Play
1. At the start of the game, a random question is displayed, asking you to compare two mathematical expressions.
2. Players must select the correct symbol (`>`, `<`, or `=`) within the given time.
3. If the answer is correct, the next question will be displayed. If incorrect, feedback will be provided, and points may be deducted.

## 📂 Project Structure

```plaintext
CHECKMATH/
├── src/
│   ├── components/       # Core UI components
│   ├── composables/      # Hooks (generateQuiz, checkAnswer, etc.)
│   ├── assets/           # Resources such as images, icons
│   ├── styles/           # CSS and styling files
│   ├── router/           # Routing
│   ├── types/            # Interface
│   ├── views/            # Pages
│   ├── stores/           # State management
│   ├── constant/         # Constants
│   ├── App.vue           # Vue main file
│   └── main.ts           # JS main file 
├── public/               # Static files served by the application
├── .env                  # Enviroment config
├── vite.config.ts        # Vite config
├── tailwind.config.ts    # TailwindCSS config
├── index.html            # Index public file
├── package.json          # Project configuration and dependencies
└── README.md             # Project documentation (you’re reading this!)
```

## 🌟 Contribution
If you'd like to contribute to this project:
1. Fork the repository on GitHub.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit and push your changes:
   ```bash
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```
4. Open a Pull Request (PR) on GitHub.

## 📄 License
This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it under the terms of this license.

## 🤝 Contact
- **GitHub Repository:** [Check Math Game](https://github.com/check-math/game)
- **Developer Contact:** For any questions or suggestions, feel free to open an [Issue](https://github.com/check-math/game/issues).

Have fun playing the game! 🎉