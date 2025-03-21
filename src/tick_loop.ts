import { getBalance, transferTokens } from "./api";
import { RECIPIENTS, MIN_BALANCE, CHECK_INTERVAL } from "./config";
import { sendDiscordNotification } from "./discord.js";

let consecutiveFailures = 0;

/**
 * Periodically checks the wallet balance and sends GALA if above threshold.
 */
async function checkAndTransfer() {
  console.log("🔄 Checking GALA balance...");

  try {
    const balance = await getBalance();
    console.log(`💰 Current Balance: ${balance} GALA`);

    if (balance > MIN_BALANCE) {
      console.log(`✅ Balance is above ${MIN_BALANCE}. Initiating transfer...`);

      for (const recipient of RECIPIENTS) {
        try {
          const amountToSend = balance - 1;
          console.log(`🚀 Sending ${amountToSend} GALA to ${recipient} (keeping 1 GALA for fees)...`);
          await transferTokens(recipient, balance);
          console.log(`✅ Successfully sent ${amountToSend} GALA to ${recipient}!`);
        } catch (error: any) {
          console.error(`❌ Failed to transfer to ${recipient}:`, error.message || error);
          consecutiveFailures++;
          if (consecutiveFailures > 3) {
            await sendDiscordNotification(`🚨 **Critical Failure Alert!**\n- **Error:** ${error.message || error}`);
          }
        }
      }
      consecutiveFailures = 0; // Reset failure count after a successful cycle
    } else {
      console.log("⚠️ Balance below threshold. Skipping transfer.");
    }
  } catch (error: any) {
    console.error("❌ Error in checkAndTransfer:", error.message || error);
  }
}

// Run check every CHECK_INTERVAL milliseconds
setInterval(checkAndTransfer, CHECK_INTERVAL);
