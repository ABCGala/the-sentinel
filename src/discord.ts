import axios from "axios"; // Ensure axios is properly imported
import { DISCORD_WEBHOOK_URL } from "./config"; // Import webhook URL

/**
 * Sends a message to Discord webhook
 * @param message - The message to send
 */
export async function sendDiscordNotification(message: string): Promise<void> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("⚠️ Discord Webhook URL is not set.");
    return;
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content: message });
    console.log("✅ Sent notification to Discord:", message);
  } catch (error: any) {
    console.error("❌ Failed to send Discord notification:", error.response?.data || error.message);
  }
}

/**
 * Sends a high balance alert to Discord
 * @param balance - The current balance
 * @param walletAddress - The wallet address
 */
export async function sendHighBalanceAlert(balance: number, walletAddress: string): Promise<void> {
  await sendDiscordNotification(
    `🚨 **High Balance Alert!**\n- **Current Balance:** ${balance} GALA\n- **Wallet Address:** ${walletAddress}`
  );
}

/**
 * Sends a transfer success notification to Discord
 * @param amount - The amount transferred
 * @param recipient - The recipient's wallet address
 * @param txId - The transaction ID
 */
export async function sendTransferSuccessNotification(amount: string, recipient: string, txId?: string): Promise<void> {
  await sendDiscordNotification(
    `✅ **Transfer Successful!**\n- **Amount:** ${amount} GALA\n- **Recipient:** ${recipient}` + (txId ? `\n- **Transaction ID:** ${txId}` : "")
  );
}

/**
 * Sends a transfer failure notification to Discord
 * @param recipient - The recipient's wallet address
 * @param errorMessage - The error message
 */
export async function sendTransferFailureNotification(recipient: string, errorMessage: string): Promise<void> {
  await sendDiscordNotification(
    `❌ **Transfer Failed!**\n- **Recipient:** ${recipient}\n- **Error:** ${errorMessage}`
  );
}
