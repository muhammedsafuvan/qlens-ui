
const ACCESS_TOKEN_KEY = "qlens_access_token";
const REFRESH_TOKEN_KEY = "qlens_refresh_token";
const ACCOUNT_KEY = "qlens_account";

export interface AuthAccount {
  user_id?: string;
  id?: string;
  workspace_id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
  [key: string]: unknown;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  account: AuthAccount;
}

export const authStorage = {
  save(session: AuthSession) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, session.access_token);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(session.account));
  },

  getAccessToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getAccount(): AuthAccount | null {
    const value = sessionStorage.getItem(ACCOUNT_KEY);
    return value ? JSON.parse(value) : null;
  },

  updateAccount(account: AuthAccount) {
    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  },

  clear() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCOUNT_KEY);
  },
};
