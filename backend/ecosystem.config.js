// backend/ecosystem.config.js
// PM2 process file for the NestJS backend.
// Usage from this folder:
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 logs research-ustad-api

module.exports = {
  apps: [
    {
      name: 'research-ustad-api',
      script: 'dist/main.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};