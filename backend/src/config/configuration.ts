// backend/src/config/configuration.ts

export interface AppConfig {
  env: string;
  port: number;
  mongodbUri: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  admin: {
    username: string;
    email: string;
    seedPassword: string;
  };
  deviceHashSalt: string;
  corsOrigins: string[];
  throttle: {
    ttl: number;
    limit: number;
  };
  socket: {
    /** ms to wait before closing idle connection */
    pingTimeout: number;
    /** ms between pings */
    pingInterval: number;
  };
  pdf: {
  accessKey: string;
  frontendUrl: string;
};
}

export default (): AppConfig => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '4001', 10),
  mongodbUri:
    process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/research_ustad',
  
    workshopDb: {
    host: process.env.WORKSHOP_DB_HOST ?? '127.0.0.1',
    port: parseInt(process.env.WORKSHOP_DB_PORT ?? '3306', 10),
    username: process.env.WORKSHOP_DB_USERNAME ?? 'root',
    password: process.env.WORKSHOP_DB_PASSWORD ?? '',
    database:
      process.env.WORKSHOP_DB_DATABASE ?? 'research_ustad_workshop',
    },

    workshopId: process.env.WORKSHOP_ID ?? 'workshop-one',
    });
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
  admin: {
    username: process.env.ADMIN_USERNAME ?? 'researchustad',
    email: process.env.ADMIN_EMAIL ?? 'admin@researchustad.org',
    seedPassword: process.env.ADMIN_SEED_PASSWORD ?? '',
  },
  deviceHashSalt: process.env.DEVICE_HASH_SALT ?? '',
  corsOrigins: (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '60', 10),
  },
  socket: {
    pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT ?? '20000', 10),
    pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL ?? '25000', 10),
  },
  pdf: {
  accessKey: process.env.PDF_ACCESS_KEY ?? '',
  frontendUrl:
    process.env.FRONTEND_URL ?? 'http://localhost:3006',
},
});