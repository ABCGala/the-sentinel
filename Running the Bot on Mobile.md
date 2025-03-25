# **The Sentinel**

Automated bot for monitoring GalaChain balances and transferring GALA tokens.

---

## **📱 Running the Bot on Mobile (Android & iOS)**

You can run the **The Sentinel** on your **mobile device** using **Termux (Android)** or by setting up a **cloud server (iOS & Android).**

---

### **🔹 Running the Bot on Android (Using Termux)**

You can run the bot locally on an **Android** device using **Termux**, a powerful terminal emulator.

#### **📌 Step 1: Install Termux**
Download **Termux** from:
- [F-Droid](https://f-droid.org/packages/com.termux/) (Recommended)
- [GitHub](https://github.com/termux/termux-app/releases)

**⚠️ Do not install Termux from Google Play Store** (it is outdated).

#### **📌 Step 2: Install Dependencies**
Open Termux and run:
```sh
pkg update && pkg upgrade -y
pkg install git nodejs -y
```

#### **📌 Step 3: Clone the Bot Repository**
Run the following command to **download the bot’s code**:
```sh
git clone https://github.com/ABCGala/The-Sentinel.git
cd The-Sentinel
```

#### **📌 Step 4: Install Required Packages**
Inside the bot’s directory, install dependencies:
```sh
npm install
```

#### **📌 Step 5: Configure the Bot**
Create a `.env` file to store your **wallet and API details**:
```sh
nano .env
```
Paste the following (replace with your real details):
```
API_URL=https://api-galaswap.gala.com
WALLET_ADDRESS=galachain|8C1C40a9df32D7460cb387FBf6Ede6cD9Ec5689e
PRIVATE_KEY=your-private-key
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook
MIN_BALANCE=100
CHECK_INTERVAL=30000
```
To save in **nano**, press `CTRL + X`, then `Y`, then `Enter`.

#### **📌 Step 6: Start the Bot**
Run the bot with:
```sh
npm start
```
For **development mode**:
```sh
npm run dev
```

#### **📌 Running in Background (Optional)**
To keep the bot running **after closing Termux**, run:
```sh
nohup npm start &
```
To stop it:
```sh
pkill -f "npm start"
```

---

### **🔹 Running the Bot on iOS**

**⚠️ iOS does not support running Node.js natively.** Instead, you need a **remote server (VPS).**

#### **📌 Using a Cloud Server (Recommended for iOS)**
1. **Get a free or cheap VPS** from:
   - [Railway](https://railway.app)
   - [Render](https://render.com)
   - [DigitalOcean](https://www.digitalocean.com)
   - [Linode](https://www.linode.com)

2. **Install an SSH app** like:
   - [Termius](https://www.termius.com)
   - [Blink Shell](https://blink.sh)

3. **Connect to your VPS and follow the same steps as Android.**

---

## **💙 Support Development**
If you find this project useful, consider donating:

**Donate : eth|8C1C40a9df32D7460cb387FBf6Ede6cD9Ec5689e**

Developed by **ABC** 🚀
