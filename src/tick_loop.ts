import { getBalance, transferTokens } from "./api.js";
import { RECIPIENTS, MIN_BALANCE, CHECK_INTERVAL } from "./config.js";
import { sendDiscordNotification } from "./discord.js";

let consecutiveFailures = 0;

/**
 * Periodically checks the wallet balance and sends GALA if above threshold.
 */
async function checkAndTransfer() {
  console.log("🛡️ The Sentinel - Scanning wallet balance...");

  try {
    const balance = await getBalance();
    console.log(`🛡️ The Sentinel - Current Balance: ${balance} GALA`);

    if (balance > MIN_BALANCE) {
      console.log(`🛡️ The Sentinel - Balance exceeds ${MIN_BALANCE} GALA threshold. Initiating secure transfer...`);

      for (const recipient of RECIPIENTS) {
        try {
          const amountToSend = balance - 1;
          console.log(`🛡️ The Sentinel - Preparing transfer of ${amountToSend} GALA to ${recipient} (1 GALA fee reserve)...`);
          await transferTokens(recipient, balance);
          console.log(`✅ The Sentinel - Successfully secured ${amountToSend} GALA to ${recipient}!`);
        } catch (error: any) {
          console.error(`❌ The Sentinel - Transfer failed to ${recipient}:`, error.message || error);
          consecutiveFailures++;
          if (consecutiveFailures > 3) {
            await sendDiscordNotification(`🚨 **The Sentinel - Critical Failure Alert!**\n- **Target:** ${recipient}\n- **Error:** ${error.message || error}`);
          }
        }
      }
      consecutiveFailures = 0; // Reset failure counter after successful cycle
    } else {
      console.log("🛡️ The Sentinel - Balance below threshold. No action required.");
    }
  } catch (error: any) {
    console.error("❌ The Sentinel - System error during balance check:", error.message || error);
    await sendDiscordNotification(`⚠️ **The Sentinel - Monitoring System Error**\n${error.message || error}`);
  }
}

// Initialize continuous monitoring
console.log("🛡️ The Sentinel - Initializing automated monitoring system...");
console.log(`🛡️ Monitoring interval: ${CHECK_INTERVAL/1000} seconds`);
setInterval(checkAndTransfer, CHECK_INTERVAL);