export interface IAppConfig {
  port: number;
  bcryptSalt: number;
  apiPrefix: string;
}

export default (): IAppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
  apiPrefix: process.env.API_PREFIX || 'api',
});
