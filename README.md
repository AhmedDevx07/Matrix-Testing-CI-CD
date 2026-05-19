# 🧪 Matrix Testing CI/CD

A professional CI/CD pipeline using **GitHub Actions** that runs automated tests across multiple Node.js versions in parallel, then builds only after all tests pass.

---

## 🌐 Live Demo

🔗 [matrix-testing-ci-cd.vercel.app](https://matrix-testing-ci-cd.vercel.app/)

---

## 🎯 Pipeline Goals

- ✅ Test on Node **18, 20, 24** simultaneously
- ✅ Build **only after** all tests pass
- ✅ Store **test reports** and **build output** as artifacts

---

## 📊 Pipeline Flow

```
Developer Pushes Code
        ↓
  GitHub Actions Triggers
        ↓
  ┌──────────────────────────┐
  │       Matrix Test        │
  ├────────┬─────────┬───────┤
  Node 18  Node 20  Node 24
  └────────┴─────────┴───────┘
        ↓ (all pass)
   Build Application
        ↓
   Upload Artifacts
        ↓
   Deploy to Vercel
```

---

## 🛠 Tech Stack

- **Runtime** — Node.js (18, 20, 24)
- **Framework** — Express.js
- **CI/CD** — GitHub Actions
- **Hosting** — Vercel

---

## 📁 Project Structure

```
Matrix-Testing-CI-CD/
├── .github/
│   └── workflows/
│       └── matrix-testing.yml
├── dist/
│   └── index.js          ← Build output
├── index.js
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Workflow File

`.github/workflows/matrix-testing.yml`

```yaml
name: Matrix Testing

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test on Node ${{ matrix.node-version }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 24]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm test --if-present
      - uses: actions/upload-artifact@v4
        with:
          name: test-report-node-${{ matrix.node-version }}
          path: test-reports/

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      - run: npm install
      - run: npm run build --if-present
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
```

---

## 📦 Artifacts

After every successful run, GitHub Actions stores:

| Artifact | Description |
|---|---|
| `test-report-node-18` | Test results on Node 18 |
| `test-report-node-20` | Test results on Node 20 |
| `test-report-node-24` | Test results on Node 24 |
| `build-output` | Final build from `dist/` folder |

---

## 🚀 Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/AhmedDevx07/Matrix-Testing-CI-CD.git
cd Matrix-Testing-CI-CD
```

**2. Install dependencies**
```bash
npm install
```

**3. Run locally**
```bash
npm start
```

**4. Open in browser**
```
http://localhost:3000
```

---

## 🧪 Matrix Testing Explained

Matrix testing runs the **same job on multiple environments** in parallel:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 24]
```

| Node Version | Status |
|---|---|
| Node 18 | ✅ Tested |
| Node 20 | ✅ Tested |
| Node 24 | ✅ Tested |

All 3 must pass before **Build** runs — `needs: test` ensures this.

---

## 👨‍💻 Author

**Muhammad Ahmed** — [@AhmedDevx07](https://github.com/AhmedDevx07)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
