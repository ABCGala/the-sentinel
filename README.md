# Gala Auto-Transfer Bot

## Description

Gala Auto-Transfer Bot is an automated system that monitors your GalaChain wallet balance and transfers GALA tokens when a specified threshold is exceeded. The bot also provides Discord notifications for balance updates, transfers, and errors.

## Features

- ✅ **Automatic GALA Balance Monitoring**
- ✅ **Auto-Transfer when balance exceeds threshold**
- ✅ **Discord Notifications for events**
- ✅ **Secure Transactions using cryptographic signing**
- ✅ **Docker Support for Easy Deployment**

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- Docker (optional, for containerized deployment)
- Git

### Steps to Install

```sh
# Clone the repository
git clone https://github.com/your-github-username/gala-auto-transfer-bot.git
cd gala-auto-transfer-bot

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit the .env file with your wallet and API details
```

## Configuration

Update the `.env` file with your details:

```env
API_URL=https://api-galaswap.gala.com
WALLET_ADDRESS=your-wallet-address
PRIVATE_KEY=your-private-key
PUBLIC_KEY=your-public-key
MIN_BALANCE=100
RECIPIENTS=recipient-wallet-address
CHECK_INTERVAL=30000
DISCORD_WEBHOOK_URL=your-discord-webhook-url
```

## Running the Bot

```sh
# Start the bot in development mode
npm run dev

# Start the bot in production mode
npm run start
```

## Running with Docker

### Build and Run

```sh
# Build the Docker image
docker build -t gala-bot .

# Run the container
docker run -d --name gala-bot --env-file .env gala-bot
```

## Deployment

### Deploying to GitHub

```sh
# Initialize a Git repository
git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/your-github-username/gala-auto-transfer-bot.git
git push -u origin main
```

## Security Considerations

- **Keep your PRIVATE\_KEY secret** – Never expose it publicly.
- **Use a .gitignore file** to prevent committing `.env` files.
- **Use environment variables in deployment** to secure sensitive data.

## **💙 Support Development**
If you find this project useful, consider donating:

**Donate : eth|8C1C40a9df32D7460cb387FBf6Ede6cD9Ec5689e**

Developed by **ABC** 🚀

