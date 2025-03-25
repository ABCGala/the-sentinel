# 📌 The Sentinel: Gala Chain Wallet Guardian  

## Overview  
The Sentinel is a **Node.js** bot developed by **ABC** that acts as a **guardian for your Gala Chain wallet**. It continuously monitors your **GALA token balance** and **automatically transfers excess funds** to a designated wallet.  

### Features  
✅ **Monitors wallet balance in real-time**  
✅ **Automatically transfers GALA if balance exceeds 100**  
✅ **Detects when GALA is minted and moves it to a secure wallet**  
✅ **Sends notifications via Discord webhook**  
✅ **Supports background execution with PM2**  

---  

## 🚀 Installation & Setup  

### 1️⃣ Install Node.js  
You need **Node.js** and **npm** installed to run The Sentinel.  

#### On Linux/macOS  
Run the following commands to install Node.js:  
```bash
sudo apt update
sudo apt upgrade
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```
Or using **Homebrew** on macOS:  
```bash
brew install node
```

#### On Windows  
Download and install Node.js from:  
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

To verify installation, run:  
```bash
node -v
npm -v
```

---  

### 2️⃣ Download & Setup The Sentinel  
You can install **The Sentinel** using any of the following methods:  

#### Option 1: Clone from GitHub  
```bash
git clone https://github.com/ABCGala/The-Sentinel
cd The-Sentinel
```

#### Option 2: Download ZIP  
1. Download the latest version from **GitHub**.  
2. Extract the ZIP file and navigate to the folder.  

---  

### 3️⃣ Install Dependencies  
```bash
npm install
```

---  

### 4️⃣ Configuration  
Update the `.env` file with your details:

```env
API_URL=https://api-galaswap.gala.com
WALLET_ADDRESS=your-wallet-address
PRIVATE_KEY=your-private-key
PUBLIC_KEY=your-public-key
TRANSFER_THRESHOLD=100
DESTINATION_WALLET=your-destination-wallet-address
CHECK_INTERVAL=30000
DISCORD_WEBHOOK_URL=your-discord-webhook-url
```
---  

## ▶️ Running The Sentinel  

### On Linux/macOS  
Run the bot:  
```bash
npm start
```
To keep it running in the background:  
```bash
nohup npm start &  
```
To stop it:  
```bash
pkill -f "npm start"
```

---  

### On Windows  
Run:  
```bash
npm start
```
To run in the background:  
1. Open **Command Prompt (cmd)**  
2. Run:  
   ```bash
   start /B npm start
   ```
3. To stop the bot, find the process:  
   ```bash
   tasklist | find "node"
   ```
   Then terminate it:  
   ```bash
   taskkill /F /PID <Process_ID>
   ```

---  

## 🛠 Running The Sentinel with PM2 (Recommended for Continuous Execution)  

To keep **The Sentinel** running automatically, use **PM2**:  

### 1️⃣ Install PM2  
```bash
npm install -g pm2
```

### 2️⃣ Start The Sentinel  
```bash
pm2 start npm --name The-Sentinel -- start
```

### 3️⃣ Check Logs & Status  
```bash
pm2 logs The-Sentinel
pm2 status
```

### 4️⃣ Restart Automatically on Reboot  
Run:  
```bash
pm2 startup
```
Then execute the command PM2 provides to enable auto-start.  

### 5️⃣ Stop or Restart The Sentinel  
```bash
pm2 stop The-Sentinel  # Stop the bot
pm2 restart The-Sentinel  # Restart the bot
pm2 delete The-Sentinel  # Remove from PM2
```

---  

## 🐝 Logs & Errors  
If the bot encounters errors, they will be logged in the console.  
To save logs to a file manually:  
```bash
npm start > sentinel.log 2>&1 &
```

---  

## 🚫 Stopping The Sentinel  
- **Linux/macOS**: `pkill -f "npm start"`  
- **Windows**: `taskkill /F /PID <Process_ID>`  
- **PM2**: `pm2 stop The-Sentinel`  

---  

## 💰 Donations  
If you find **The Sentinel** useful, consider supporting the project:  
**Donate: galachain|8C1C40a9df32D7460cb387FBf6Ede6cD9Ec5689e**  

---  

Developed by **ABC**. Enjoy tracking and securing your Gala Chain assets with **The Sentinel! 🚀**

