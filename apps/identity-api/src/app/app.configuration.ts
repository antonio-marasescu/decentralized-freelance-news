export const databaseConfig = {
  provider: 'mongodb',
  host: 'localhost',
  port: 27017,
  name: 'identitydb',
  user: 'identityuser',
  password: 'identitypass',
};

export const databaseUrl = `${databaseConfig.provider}://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;
