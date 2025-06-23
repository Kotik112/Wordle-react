# Wordle React 🎯

A responsive and interactive web-based implementation of the popular Wordle game, built with **React** and **Vite**, with CI/CD integration and cloud deployment via **AWS S3** and **GitHub Actions**.

---

## 🚀 Overview

This project replicates the core gameplay of Wordle — a word-guessing puzzle where users have six attempts to guess a hidden five-letter word. The app delivers color-coded visual feedback to indicate character correctness and positioning. Words are dynamically fetched from an external API, with a Lambda proxy enabling secure, CORS-compliant communication.

---

## ✨ Features

- 🔠 **Word Matching Logic**  
  Handles correct letters (green), misplaced letters (yellow), and incorrect guesses (gray) with precision logic.

- 🧠 **Dynamic Word Generation**  
  Words are fetched from a remote API through a secure proxy.

- 🧪 **Invalid Word Handling**  
  Prevents non-dictionary words and provides user feedback.

- 💡 **Visual Feedback**  
  Interactive tile-based UI, mimicking the original Wordle look and feel.

- ☁️ **Production Deployment Pipeline**  
  Uses GitHub Actions to build and deploy to AWS S3 on push to `master`.

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| [React](https://reactjs.org/) | Component-based UI framework |
| [Vite](https://vitejs.dev/) | Lightning-fast development and build tool |
| [AWS S3](https://aws.amazon.com/s3/) | Static site hosting |
| [AWS Lambda](https://aws.amazon.com/lambda/) | CORS proxy for external API |
| [GitHub Actions](https://github.com/features/actions) | CI/CD for automated deployment |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/Kotik112/Wordle-react.git
cd Wordle-react
npm install
```

### Configuration

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=/api/fe/wordle-words     # For local dev via Vite proxy
# OR use your deployed Lambda URL:
# VITE_API_URL=https://your-api-gateway-url.amazonaws.com/default
```

### Development

To start the application locally:

```bash
npm run dev
```
This will launch the app at: `http://localhost:5173`


## ⚙️ CI/CD with GitHub Actions (Markdown)

### CI/CD with GitHub Actions

Every push to the `master` branch triggers a GitHub Actions workflow that:

1. Installs dependencies
2. Builds the application using `VITE_API_URL`
3. Uploads the compiled site (`dist/`) to an AWS S3 bucket

#### Workflow File

See `.github/workflows/CI-CD.yaml` for the full configuration.


### Required Secrets

To enable deployment, the following GitHub repository secrets must be configured:

| Secret Name              | Description                                             |
|--------------------------|---------------------------------------------------------|
| `AWS_ACCESS_KEY_ID`      | AWS IAM access key with permission to access the S3 bucket |
| `AWS_SECRET_ACCESS_KEY`  | Corresponding secret access key                         |
| `AWS_S3_BUCKET`          | Name of the S3 bucket for deployment                    |
| `VITE_API_URL`           | Full API URL used in the production build              |

You can add these secrets in your repository settings under:  
**Settings → Secrets and variables → Actions → New repository secret**


### License

This project is licensed under the [MIT License](LICENSE).