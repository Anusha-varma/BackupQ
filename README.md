# BackupQ

**BackupQ** is an intelligent queue and payment management system that acts as an intermediary layer between users and high-traffic online services. Its primary goal is to prevent last-minute payment failures caused by server overload during deadline peaks.
---

## 🚀 Features

- **Smart Queue Management**: Allows users to join queues remotely and track their position in real-time.  
- **Dynamic Payment Mode Switching**: Automatically shifts from online to offline payment mode during high traffic periods to prevent failures and ensure deadlines are met.  
- **Load Monitoring System**: Displays real-time server load status to help users make informed decisions while processing payments.  
- **Deadline Protection**: Ensures critical payments are not missed, even during peak hours, by processing them automatically when load reduces.  
- **Scalability**: Designed with scalable architecture to handle increasing numbers of users and transactions without affecting performance.  
- **Offline Queue Support**: Works even when online services are temporarily unavailable, maintaining user trust and service continuity.  

---

## 🛠️ Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anusha-varma/BackupQ.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BackupQ
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
## ⚙️ Setup

1. Set up Supabase configuration in `.env` file:
   ```env
  VITE_SUPABASE_URL=https://eamchyabbfoymlmiyulv.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbWNoeWFiYmZveW1sbWl5dWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTk5MTQsImV4cCI6MjA2MDM5NTkxNH0.IjZCM3o6UGwoHtyT2om1ijbbmAm9j5qT7RpP29jp0Bo
   ```
2. Ensure your Supabase project has authentication and database tables configured appropriately.

## 🏃‍♂️ Run the App

```bash
npm run dev
```
This will start the development server and open the app at `http://localhost:8080`.

## Run Tests
```bash
npm test
```
```bash
npm run test:ui
```
## Demo Video Link: https://vimeo.com/1077076810/061780248f?share=copy
