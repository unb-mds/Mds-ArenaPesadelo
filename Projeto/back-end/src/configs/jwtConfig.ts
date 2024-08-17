interface IJwtConfig {
  secret: string;
  exp: string;
}

export default {
  exp: '1 day',
  secret: process.env.APP_SECRET,
} as IJwtConfig;
