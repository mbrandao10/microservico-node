declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      FRONTEND_URL: string;
      JWT_SECRET: string;
      SENTRY_DSN: string;
      JWT_SECRETJWT_SECRET: string;
      JWT_SECRETJWT_SECRETJWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      API_KEY_DOCS: string;
      HOST_EMAIL: string;
      PORT_EMAIL: number;
      SECURE_EMAIL: boolean;
      AUTH_USER_EMAIL: string;
      AUTH_PASS_EMAIL: string;
    }
  }
}
