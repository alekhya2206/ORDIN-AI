# 🏥 ORDIN — AI-Powered Medical Report Simplifier

> **Hackerz Street 4.0** · Healthcare Track · Problem Statement #4  
> Organized by **IEEE Computer Society, Manipal University Jaipur**

---

## 📌 Problem Statement

Medical reports — lab results, prescriptions, and discharge summaries — are routinely filled with complex clinical terminology that most patients cannot understand. This creates a critical gap between healthcare providers and patients, often leading to confusion, missed follow-ups, and poor health outcomes.

**ORDIN** bridges this gap by converting complex medical language into simple, patient-friendly explanations — in multiple languages.

---

## 💡 Solution Overview

ORDIN is an AI-powered web application that allows patients to upload their medical reports and instantly receive easy-to-understand summaries. It extracts key medical terms using NLP, generates layman-friendly explanations, and supports multiple regional languages — making healthcare accessible for everyone.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📄 **Report Upload** | Users can upload PDFs or images of medical reports (lab results, prescriptions, discharge summaries) |
| 🔍 **NLP Term Extraction** | Automatically identifies and extracts complex medical terminology from the report |
| 🗣️ **Simplified Explanations** | Converts medical jargon into plain, easy-to-read language |
| 🌐 **Multi-Language Support** | Outputs explanations in English + regional Indian languages |
| 📊 **Structured Report View** | Clean UI presenting original terms alongside their simplified meanings |

---

## 🛠️ Tech Stack

```
Frontend        →  React.js / HTML + CSS + JS
Backend         →  Python (FastAPI / Flask)
AI/NLP          →  Claude API (Anthropic) / OpenAI / Hugging Face
OCR             →  Tesseract / Google Vision API
Translation     →  Google Translate API / IndicTrans
File Handling   →  PDF.js / PyMuPDF
```

> ⚡ Stack may vary based on implementation choices during the hackathon.

---

## 📦 Deliverables

As per the problem statement, ORDIN delivers:

- 
- [x] **Simplified Explanation Generator** producing layman-friendly language
- [x] **Multi-Language Support** — English + Regional Languages
- [x] **User Interface** where patients can upload reports and receive explanations

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- Python ≥ 3.10
- pip & npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ordin.git
cd ordin

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
pip install -r requirements.txt
```

### Running the App

```bash
# Start the backend server
cd server
python app.py

# Start the frontend (in a new terminal)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Project Structure

```
ordin/
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # App pages (Upload, Result, etc.)
│   │   └── App.jsx
│   └── package.json
│
├── server/                  # Backend API
│   ├── app.py               # Main entry point
│   ├── nlp/                 # NLP & term extraction logic
│   ├── translator/          # Multi-language translation module
│   └── requirements.txt
│
└── README.md
```

---

## 🧠 How It Works

```
User Uploads Report (PDF/Image)
        ↓


AI Generates Simplified Explanations
        ↓
Translation Module Converts to Selected Language
        ↓
Clean UI Displays Results to Patient
```

---

## 🌍 Supported Languages

- English 🇬🇧
- Hindi 🇮🇳
- Bengali
- Tamil
- Telugu
- Marathi
- *(More languages can be added)*

---


---

## 🏆 Hackathon Details

- **Event**: Hackerz Street 4.0
- **Track**: Healthcare
- **Problem #**: 4 — AI-Powered Medical Report Simplifier
- **Organizer**: IEEE Computer Society, Manipal University Jaipur
- **Theme**: Using technology to make healthcare accessible for all

---

## 📄 License

This project was built for **Hackerz Street 4.0** and is intended for educational and demonstration purposes.

---

<div align="center">
  <sub>Built with ❤️ at Hackerz Street 4.0 · Manipal University Jaipur</sub>
</div>
