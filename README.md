# 🚀 OpsMind AI – Enterprise SOP Knowledge Assistant

OpsMind AI is an AI-powered Enterprise Knowledge Management System that enables employees to interact with Standard Operating Procedures (SOPs) using natural language.

The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from uploaded SOP documents and generate contextual responses using Google Gemini.

---

# 📌 Features

### 📄 SOP Upload & Processing

* Upload SOP documents in PDF format
* Automatic text extraction
* Intelligent chunking of documents
* Vector embedding generation
* Storage of embeddings in MongoDB

---

### 🤖 AI-Powered Question Answering

* Natural language search
* Semantic retrieval using vector search
* Gemini-powered answer generation
* Context-aware responses

Example:

```text
What is the target RTS Rate?
```

```text
The target RTS Rate should be below 2%.
```

---

### 🔍 Retrieval-Augmented Generation (RAG)

The system follows a complete RAG pipeline:

```text
User Query
     ↓
Generate Query Embedding
     ↓
MongoDB Vector Search
     ↓
Retrieve Relevant Chunks
     ↓
Build Context Prompt
     ↓
Gemini Response Generation
     ↓
Display Answer
```

---

### 📚 Source Citations

Every answer includes source references:

* File Name
* Page Number
* Section Name
* Chunk Number
* Similarity Score

Users can inspect source snippets used to generate the response.

---

### 📊 Document Analytics

Displays:

* Total Pages
* Total Chunks
* Embedding Dimensions
* AI Model Information

---

### 🌙 Dark Mode

* Light Theme
* Dark Theme
* Persistent theme preference

---

### 🛠 Admin Dashboard

Admin users can:

* View uploaded SOP documents
* Delete SOPs
* Manage document repository

---

# 🏗 System Architecture

```text
                    ┌─────────────┐
                    │   React UI  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Node Backend│
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼

      MongoDB Atlas   Gemini API    PDF Processor

            │
            ▼

      Vector Search
```

---

# ⚙ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* Multer

## AI / RAG

* Google Gemini API
* Vector Embeddings
* Semantic Search

## Database

* MongoDB Atlas
* MongoDB Vector Search

---

# 📂 Project Structure

```text
Project2

├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── routes
│   ├── services
│   ├── models
│   ├── uploads
│   ├── config
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
cd Project2
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

# 📈 RAG Workflow

### Step 1

Upload PDF

### Step 2

Extract text from document

### Step 3

Split into chunks

### Step 4

Generate embeddings

### Step 5

Store embeddings in MongoDB

### Step 6

User asks question

### Step 7

Generate query embedding

### Step 8

Perform vector search

### Step 9

Retrieve top matching chunks

### Step 10

Generate answer using Gemini

---

# 🔒 Security

* Environment variables secured using `.env`
* MongoDB Atlas authentication
* CORS enabled
* Input validation implemented

---

# 📊 Future Enhancements

* Multi-document chat
* OCR support
* Role-based authentication
* Cloud storage integration
* Real-time collaboration
* Citation PDF preview
* Docker deployment
* Kubernetes orchestration

---

# Key Achievements

Enterprise SOP Search
Retrieval-Augmented Generation (RAG)
Vector Database Search
Gemini AI Integration
Source Citation System
Dark Mode Support
Responsive UI
Admin Management Panel

---

OpsMind AI – Enterprise SOP Knowledge Assistant
