export interface IAuthConfig {
  jwtSecretKey: string;
  jwtAlgorithm: Algorithm;
  jwtShortExpiresIn: string;
  jwtLongExpiresIn: string;

  FBAppId: string;
  FBAppSecretKey: string;

  GGAppId: string;
  GGAppSecretKey: string;
}

export default (): IAuthConfig => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtAlgorithm: 'HS256' as unknown as Algorithm,
  jwtShortExpiresIn: process.env.JWT_SHORT_EXPIRES_IN || '1d',
  jwtLongExpiresIn: process.env.JWT_LONG_EXPIRES_IN || '30d',

  FBAppId: process.env.FB_APP_ID,
  FBAppSecretKey: process.env.FB_APP_SECRET_KEY,
  GGAppId: process.env.GG_APP_ID,
  GGAppSecretKey: process.env.GG_APP_SECRET_KEY,
});
