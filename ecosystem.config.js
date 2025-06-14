module.exports = {
  apps: [
    {
      name: "nicotordev",
      script: "npm",
      args: "start",
      env: { NODE_ENV: "production", PORT: 3090 },
    },
  ],
  deploy: {
    production: {
      user: "deploy",
      host: "ssh.nicotordev.com",
      ref: "origin/main",
      repo: "git@github.com:nicotordev/nicotordev.git",
      path: "/home/deploy/nicotordev",
      "post-deploy":
        "bun install && bun run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
