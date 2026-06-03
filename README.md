# FemCare Wellness Platform

[![Version](https://img.shields.io/badge/version-1.0.0-rose.svg)](https://github.com/mimsultana11141/femcare-wellness)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://img.shields.io/badge/build-passing-brightgreen)
[![Tech Stack](https://img.shields.io/badge/stack-React%2019%20%7C%20TypeScript%20%7C%20Tailwind%20v4-purple.svg)](#tech-stack)

An elegant, interactive, and medically checked educational resource and cycle synchronization suite designed to bridge the awareness gap in women's endocrinology, menstrual phases, and hormone-health conditions.

---

## 📖 Table of Contents
- [Features](#features)
- [Design Theme & Aesthetics](#design-theme--aesthetics)
- [screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)
- [Author](#author)

---

## ✨ Features

- **Interactive AI-Guided Symptom Literacy Tool**: Select from physical and emotional biomarkers to instantly query our secure, server-side Google Gemini Pro pipeline and render educational outlooks, topics for discussion, and clinically bounded lifestyle suggestions.
- **Comprehensive Hormonal Condition Database**: Highly polished scientific reviews of PCOS/PCOD, Menstrual Cycle irregularities, Mental Wellness fluctuations, Thyroid Dysfunction, and Endocrine support.
- **Interactive Assessment Quiz**: Medically checked interactive diagnostics to map user symptoms directly into personalized meal plans, wellness strategies, and dynamic educational articles.
- **Cycle Syncing & Member Tracking Dashboard**: Monitor individual follicular, ovulatory, luteal, and menstrual phases, bookmark educational blogs, review historical transaction logs, and manage a personalized product wishlist.
- **Operations Administrative Console**: Real-time management tools allowing admins to append clinical products, moderate community blog posts, reply to customer inquiries, and adjust physical stock logs.
- **E-Commerce Health Boutique**: Secure checkout simulator integrated with promo codes (for instance, `BIOSYNC` for 15% off) allowing the simulation of card authorizations and dispatch log generation.

---

## 🎨 Design Theme & Aesthetics

The platform features the **Natural Tones** layout styling:
- **Calm Warm Palette**: Built on soft roses (`#FFF9FB`), gentle warm pink bounds (`#FFF0F5`), strong charcoal typography (`#2D3436`), and secondary mid-tones (`#636E72`).
- **Card Styling & Elevation**: Round borders (`rounded-[32px]` / `rounded-[40px]`), border-pink glow separators (`border-[#FF6B9D]/15`), and soft micro-shadows (`shadow-xl shadow-pink-100/10`).
- **Purified Interfaces**: Replaces clinical sterility with friendly, highly responsive organic visual components including curved cards, glass-morphic floating badges, and clean geometric focus indicators.

---

## 🖼️ Screenshots

### Desktop Wellness Hub View
```
+-------------------------------------------------------------------------+
| [🌸 FemCare Wellness]            Home  Awareness  Shop  Dashboard [Ad]  |
+-------------------------------------------------------------------------+
|                                                                         |
|   Empowering Women Through                 +------------------------+   |
|   HEALTH AWARENESS                        |  Symptom Guide         |   |
|   Understand your body, manage irregular   |  [ ] Irregular Periods |   |
|   cycles, and consult medical literature.  |  [✓] Mood Swings       |   |
|                                            |                        |   |
|   [ Explore Science ] [ View Catalog ]     |  [ Generate Outlook ]  |   |
|                                            +------------------------+   |
+-------------------------------------------------------------------------+
|  [PCOS/PCOD Guide]     [Cycle Tracking]      [Thyroid Balance Guide]    |
+-------------------------------------------------------------------------+
```

---

## 🛠️ Prerequisites

To run this platform locally, make sure you have the following software installed:

| Requirement | Minimum Version | Recommended Version |
| :--- | :--- | :--- |
| **Node.js** | v18.0.0 | v20.x or v22.x |
| **NPM** | v9.0.0 | v10.x |
| **Google Gemini API Key** | - | Server-side active API Key |

---

## 🚀 Installation

Follow these steps to configure your local setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mimsultana11141/femcare-wellness.git
   cd femcare-wellness
   ```

2. **Install all platform dependencies:**
   ```bash
   npm install
   ```

3. **Establish your local environmental values:**
   ```bash
   cp .env.example .env
   ```
   *Edit the `.env` file to insert your Google Gemini Pro credential.*

---

## 💻 Usage

### Run local development hot-reload server
To start the application in development mode with continuous type checking and Express middleware simulation:
```bash
npm run dev
```
The server will bind and become accessible on **[http://localhost:3000](http://localhost:3000)**.

### Build and bundle for production runtime
Compile both the client-side SPA bundle and server-side CommonJS controllers into optimized ready-to-run configurations:
```bash
npm run build
```

### Start the production bundle
```bash
npm start
```

---

## ⚙️ Configuration

The full-stack pipeline manages secrets and settings securely on the server-side. Documented variables are listed below:

| Variable Name | Required? | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | `""` | The Google GenAI service credential. Keeps API requests masked safely from client-side browser inspect utilities. |
| `NODE_ENV` | No | `"development"` | Set to `"production"` in cloud environments to prioritize static routing. |

---

## 📁 Project Structure

Below is an overview of the primary directory hierarchy:

```
├── dist/                     # Optimized compilation ready for deployment
├── public/                    # Static image maps and platform assets
├── src/
│   ├── components/            # Visual layout blocks and page panels
│   │   ├── AdminDashboard.tsx # Operations console back-office
│   │   ├── AssessmentQuiz.tsx # Lifestyle diagnostic checker applet
│   │   ├── Awareness.tsx    # Science-backed conditions library
│   │   ├── Blog.tsx           # Article feed and user savings engine
│   │   ├── Contact.tsx        # Ingress contact and message dispatchers
│   │   ├── Ecommerce.tsx      # Nutritional boutique and cart hooks
│   │   ├── Footer.tsx         # Clean organic page footer
│   │   ├── Hero.tsx           # Call-To-Actions and trust signals
│   │   ├── Navbar.tsx         # Sticky navigation and role toggle rails
│   │   ├── Services.tsx       # Consultation descriptions and portals
│   │   ├── SymptomChecker.tsx # Google Gemini interactive AI module
│   │   └── UserDashboard.tsx  # Personal phase tracker and bookmark panel
│   ├── types.ts               # Core model interfaces and typescript enums
│   ├── data.ts                # Mock relational entities and databases
│   ├── index.css              # Custom Tailwind v4 styling and root layer overrides
│   ├── main.tsx               # Main frontend DOM mounting script
│   └── App.tsx                # Master orchestration hub and state synchronization router
├── server.ts                  # Express production server incorporating Vite middleware
├── package.json               # Package descriptors and library dependency tree
├── vite.config.ts             # Compilation plugins configuration
└── tsconfig.json              # Typings guidelines configurations
```

---

## 📡 API Documentation

### Interactive API Endpoints

Our Express backend hosts the following endpoints (all requests and responses utilize strictly secure JSON-formatted content payloads):

#### `POST /api/assess-symptoms`
Generates a structured educational health report based on the selected array of physical symptoms.

* **Headers**: `Content-Type: application/json`
* **Request Block Example**:
  ```json
  {
    "symptoms": ["irregular_periods", "sudden_weight_gain", "mood_swings"]
  }
  ```
* **Response Output Example**:
  ```json
  {
    "outlook": "The overlapping presence of prolonged cycle disruptions paired with swift scale gains points toward potential metabolic shifts...",
    "topics": ["Anti-Inflammatory Nutrition", "Insulin Sensitivity Mapping"],
    "selfCare": [
      "Prioritize high-fiber complex carbohydrates during early luteal phases.",
      "Monitor resting pulse and stress triggers under clinical reviews."
    ]
  }
  ```

#### `GET /api/health`
Checks backend operations and service health status signals.

* **Response Output Example**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-06-03T17:35:17Z"
  }
  ```

---

## 🤝 Contributing

We welcome professional community contributions that enhance women's health awareness. Follow these guidelines:

1. **Fork the project repository** to your personal GitHub space.
2. **Configure a feature branch** to host your commits:
   ```bash
   git checkout -b feature/clinical-insights-update
   ```
3. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: expand symptom assessment mapping for hormonal fatigue"
   ```
4. **Push the commits** up to your branch:
   ```bash
   git push origin feature/clinical-insights-update
   ```
5. **Open a Pull Request** to our master branch for medical peer-review.

---

## 🧪 Testing

Keep code clean and resilient. To perform standard TypeScript type correctness validation:
```bash
npm run lint
```

---

## 🌐 Deployment

The platform is designed to be shipped inside custom Docker containers or standard node platforms (such as Google Cloud Run, Vercel, or Heroku).

1. Trigger production builds:
   ```bash
   npm run build
   ```
2. The compiler produces optimized assets to `dist/` and compiles the backend into `dist/server.cjs`.
3. Boot the instance in your cloud container with:
   ```bash
   npm start
   ```

---

## 🗺️ Roadmap

- [ ] **Wearable API Integrations**: Direct sync capabilities with Oura Ring, Garmin Connect, and Apple HealthKit.
- [ ] **Certified Clinician Consulting**: Direct virtual consultation scheduling with licensed Endocrinologists.
- [ ] **Daily Biometrics Charting**: Full interactive weekly menstrual graphs utilizing premium Recharts visual curves.

---

## ❓ FAQ

#### Is this app a substitute for professional clinical advice?
**No.** All information, self-assessments, and generated symptom outlooks are structured strictly for educational purposes and cycle synchronization training. We do not provide clinical diagnostics or prescription blueprints.

#### How is my personal biometric data saved?
All symptom checks are calculated transiently under anonymous HTTPS REST calls. We never log or connect personal names to biomarker identifiers, maintaining complete privacy standard levels.

---

## 📄 License

This software is licensed under the terms of the [MIT License](LICENSE).

---

## 👤 Author

**FemCare Wellness Team**
* **Email Support**: support@femcarewellness.com
* **GitHub Repository**: [@mimsultana11141](https://github.com/mimsultana11141)
* **Medical Review Board**: review-board@femcarewellness.com
