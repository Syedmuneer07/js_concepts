# Pager App

This is a simple messaging web application built with React and Vite. It demonstrates core JavaScript concepts and modern frontend practices, including form handling, state management, and API integration using axios.

## Features

- Send messages with a name and message field
- Form validation (minimum/maximum length, required fields)
- Messages are sent to a backend (e.g., Firebase) via REST API
- Responsive and modern UI

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm

### Installation

1. Clone the repository:
	```bash
	git clone <your-repo-url>
	cd Pager
	```
2. Install dependencies:
	```bash
	npm install
	```

### Environment Variables

Create a `.env` file in the root of the Pager project and add your Firebase (or backend) URL:

```
VITE_FIREBASE_URL=<your-firebase-or-backend-url>
```

### Running the App

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Deployment

The app is deployed at:

[https://js-concepts.onrender.com](https://js-concepts.onrender.com)

## Folder Structure

- `src/components/Form.jsx` — Message form component
- `src/components/MessageList.jsx` — Displays messages
- `src/App.jsx` — Main app logic

## License

This project is for educational purposes.
