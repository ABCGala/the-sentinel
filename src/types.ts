export interface TokenBalance {
  collection: string;
  quantity: string;
}

export interface FetchBalancesResponse {
  Data: TokenBalance[];
}

export interface TransferResponse {
  transactionId?: string; // ✅ Made transactionId optional to prevent errors if missing
}
