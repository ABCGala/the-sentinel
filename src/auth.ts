import axios from "axios";
import { API_URL, WALLET_ADDRESS, PRIVATE_KEY } from "./config";
import { signObject } from "./utils";

/**
 * Checks if the user is registered on GalaChain.
 * @returns {Promise<boolean>} True if the user is registered, otherwise false.
 */
export async function isUserRegistered(): Promise<boolean> {
  try {
    const requestData = { user: WALLET_ADDRESS };
    const signedData = signObject(requestData, PRIVATE_KEY);

    const response = await axios.post(
      `${API_URL}/galachain/api/asset/public-key-contract/GetPublicKey`,
      signedData,
      { headers: { "X-Wallet-Address": WALLET_ADDRESS, "Content-Type": "application/json" } }
    );

    const isRegistered = Boolean(response.data?.Data?.publicKey);
    if (isRegistered) {
      console.log("✅ The Sentinel confirmed the user is registered on GalaChain.");
    } else {
      console.log("❌ The Sentinel couldn't confirm the user's registration on GalaChain.");
    }
    return isRegistered;
  } catch (error: any) {
    console.error("❌ The Sentinel encountered an error while checking user registration:", error.response?.data || error.message);
    return false;
  }
}
