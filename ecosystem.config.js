module.exports = {
  apps: [
    // ──────────────── APP: Producción ────────────────
    {
      name: 'nicotordev', // Nombre principal
      cwd: '/home/deploy/nicotordev/current',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3090', // Next.js usará por defecto PORT=3000
      exec_mode: 'cluster',
      instances: 'max',

      // Carga de .env para producción
      env_file: '/home/deploy/nicotordev/current/.env',

      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
        NODE_PATH: '/home/deploy/nicotordev/current/node_modules',
        NODE_OPTIONS: '--max-old-space-size=6144 --no-warnings',
        NEXT_TELEMETRY_DISABLED: '1',
        REACT_VERSION: '19',
        NEXT_PRIVATE_DISABLE_PPR: '0',
        TURBO_REMOTE_CACHE_DISABLED: '1',
        NEXT_BUILD_DIR: '/home/deploy/nicotordev/shared/.next',
      },

      // Variables específicas para "production"
      env_production: {
        NODE_ENV: 'production',
        /**
         * Al dejar PORT=3000 aquí, Next.js arrancará en el puerto 3000.
         * Si no incluyes PORT aquí, Next.js también usa 3000 por defecto.
         */
        PORT: '3000',
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
        NODE_PATH: '/home/deploy/nicotordev/current/node_modules',
        NODE_OPTIONS: '--max-old-space-size=6144 --no-warnings',
        NEXT_TELEMETRY_DISABLED: '1',
        REACT_VERSION: '19',
        NEXT_PRIVATE_DISABLE_PPR: '0',
        TURBO_REMOTE_CACHE_DISABLED: '1',
        NEXT_BUILD_DIR: '/home/deploy/nicotordev/shared/.next',
      },

      min_uptime: '60s',
      max_restarts: 5,
      wait_ready: true,
      listen_timeout: 8000,
      restart_delay: 6000,
      kill_timeout: 5000,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Rutas de logs (producción)
      out_file: '/home/deploy/nicotordev/shared/logs/out.log',
      error_file: '/home/deploy/nicotordev/shared/logs/error.log',

      watch: false,
      ignore_watch: ['node_modules', 'logs', '.next'],

      cron_restart: '0 4 * * *',
      max_memory_restart: '1G',
      autorestart: true,
    },
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'ssh.nicotordev.com',
      ref: 'origin/main',
      repo: 'git@github.com:nicotordev/nicotordev.git',
      path: '/home/deploy/nicotordev',
      'pre-setup':
        'mkdir -p /home/deploy/nicotordev/shared && mkdir -p /home/deploy/nicotordev/shared/.next && mkdir -p /home/deploy/nicotordev/shared/logs',
      'post-deploy':
        'cd /home/deploy/nicotordev/current && chmod +x deploy.sh && ENV=production ./deploy.sh',
    },
  },
};
