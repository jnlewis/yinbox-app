export interface AppConfig {
  yinboxContractNEAR: string;
  databaseConnection: string;
  databaseName: string;
  jwtSecret: string;
}

export const Config: AppConfig = {
  yinboxContractNEAR:
    process.env.NEXT_PUBLIC_YINBOX_CONTRACT_NEAR || 'yinbox.jeffreylewis.testnet',
  databaseConnection: process.env.DB_CONN_STRING || '',
  databaseName: process.env.DB_NAME || '',
  jwtSecret: process.env.JWT_SECRET || '',
};
