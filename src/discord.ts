import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname issue in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====== Environment Configuration ======
// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// ====== Constants from Environment ======
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
const API_URL = process.env.API_URL || "https://api-galaswap.gala.com";
const WALLET_ADDRESS = process.env.WALLET_ADDRESS || "";
const GALA_CHAIN_CHANNEL = "mainnet"; // Could be moved to .env if needed

/**
 * Fetches token balances from GalaChain API
 */
const fetchBalances = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/galachain/api/${GALA_CHAIN_CHANNEL}/token-contract/FetchBalances`,
            { Owner: WALLET_ADDRESS },
            { headers: { "X-Wallet-Address": WALLET_ADDRESS } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ The Sentinel - Error fetching balances:", error.response?.data || error.message);
        return null;
    }
};

/**
 * Fetches token allowances from GalaChain API
 */
const fetchAllowances = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/galachain/api/${GALA_CHAIN_CHANNEL}/token-contract/FetchAllowances`,
            { Owner: WALLET_ADDRESS },
            { headers: { "X-Wallet-Address": WALLET_ADDRESS } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ The Sentinel - Error fetching allowances:", error.response?.data || error.message);
        return null;
    }
};

/**
 * Sends notification to Discord webhook
 */
export const sendDiscordNotification = async (message: string) => {
    if (!DISCORD_WEBHOOK_URL) {
        console.error("❌ The Sentinel - Discord webhook URL is missing");
        return;
    }

    try {
        await axios.post(DISCORD_WEBHOOK_URL, { content: message });
        console.log("✅ The Sentinel - Notification sent to Discord.");
    } catch (error) {
        console.error("❌ The Sentinel - Error sending Discord notification:", error);
    }
};

/**
 * Sends high balance alert to Discord
 */
export const sendHighBalanceAlert = async (balance: number, address: string) => {
    await sendDiscordNotification(`⚠️ **The Sentinel - High Balance Alert** ⚠️\nWallet: ${address}\nBalance: ${balance} GALA`);
};

/**
 * Sends transfer success notification to Discord
 */
export const sendTransferSuccessNotification = async (amount: string, recipient: string, txHash: string) => {
    await sendDiscordNotification(`✅ **The Sentinel - Transfer Successful**\nAmount: ${amount} GALA\nTo: ${recipient}\nTX: ${txHash}`);
};

/**
 * Sends transfer failure notification to Discord
 */
export const sendTransferFailureNotification = async (recipient: string, error: string) => {
    await sendDiscordNotification(`❌ **The Sentinel - Transfer Failed**\nTo: ${recipient}\nError: ${error}`);
};

/**
 * Main execution function (for standalone testing)
 */
const main = async () => {
    if (!WALLET_ADDRESS) {
        console.error("❌ The Sentinel - Wallet address is missing");
        return;
    }

    console.log("🔄 The Sentinel - Fetching GALA balance and allowances...");
    
    const balances = await fetchBalances();
    const allowances = await fetchAllowances();

    if (balances && allowances) {
        const galaBalance = balances.Data.find((item: any) => item.collection === "GALA")?.quantity || "0";
        const allowanceData = allowances.Data.length > 0 ? JSON.stringify(allowances.Data, null, 2) : "No allowances";

        const message = `🔹 **The Sentinel Report**\n**GALA Balance:** ${galaBalance} GALA\n**Allowances:**\n${allowanceData}`;
        await sendDiscordNotification(message);
    }
};

// main(); // Uncomment for standalone testing
