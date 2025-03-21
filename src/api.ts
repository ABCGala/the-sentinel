import axios from "axios";
import { signObject, generateUniqueKey } from "./utils.js";
import { WALLET_ADDRESS, PRIVATE_KEY, PUBLIC_KEY, API_URL } from "./config.js";
import { FetchBalancesResponse, TokenBalance } from "./types.js";
import { sendHighBalanceAlert, sendTransferSuccessNotification, sendTransferFailureNotification } from "./discord.js";

/**
 * Fetches the GALA balance from GalaChain.
 * @returns Available GALA balance.
 */
export async function getBalance(): Promise<number> {
  try {
    const requestData = {
      additionalKey: "none",
      category: "Unit",
      collection: "GALA",
      instance: "0",
      owner: WALLET_ADDRESS,
      type: "none",
    };

    const response = await axios.post<FetchBalancesResponse>(
      `${API_URL}/galachain/api/asset/token-contract/FetchBalances`,
      requestData,
      { headers: { "Content-Type": "application/json", "X-Wallet-Address": WALLET_ADDRESS } }
    );

    if (!response.data || !response.data.Data) {
      throw new Error("Invalid API response: Missing balance data");
    }

    console.log("🔍 API Response:", response.data);

    const balanceData = response.data.Data.find((token: TokenBalance) => token.collection === "GALA");
    const balance = balanceData ? parseFloat(balanceData.quantity) : 0;

    if (balance > 100) {
      await sendHighBalanceAlert(balance, WALLET_ADDRESS);
    }

    return balance;
  } catch (error: any) {
    console.error("❌ API error while fetching balance:", error.response?.data || error.message);
    return 0;
  }
}

/**
 * Transfers GALA tokens to a recipient while keeping 1 GALA as a fee.
 * @param recipient - The recipient's wallet address.
 * @param totalBalance - The current wallet balance.
 */
export async function transferTokens(recipient: string, totalBalance: number): Promise<void> {
  try {
    const FEE_AMOUNT = 1; 
    if (totalBalance <= FEE_AMOUNT) {
      throw new Error(`❌ Not enough GALA for transfer. Minimum balance must be greater than ${FEE_AMOUNT} GALA.`);
    }

    const amountToSend = Math.floor(totalBalance - FEE_AMOUNT).toString();

    const requestData = {
      from: WALLET_ADDRESS,
      to: recipient,
      tokenInstance: { collection: "GALA", category: "Unit", type: "none", additionalKey: "none", instance: "0" },
      quantity: amountToSend,
      uniqueKey: generateUniqueKey(),
      signerPublicKey: PUBLIC_KEY,
    };

    const signedData = signObject(requestData, PRIVATE_KEY);

    console.log(`🚀 Sending ${amountToSend} GALA to ${recipient}...`);

    await axios.post(
      `${API_URL}/galachain/api/asset/token-contract/TransferToken`,
      signedData,
      { headers: { "Content-Type": "application/json", "X-Wallet-Address": WALLET_ADDRESS } }
    );

    console.log("✅ Transfer successful!");

    await sendTransferSuccessNotification(amountToSend, recipient, "N/A");
  } catch (error: any) {
    console.error("❌ Transfer error:", error.message);
    await sendTransferFailureNotification(recipient, error.message);
    throw error;
  }
}
