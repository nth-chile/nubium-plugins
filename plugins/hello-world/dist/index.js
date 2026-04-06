var HelloWorldPlugin = {
  id: "hello-world",
  name: "Hello World",
  version: "1.1.0",
  description: "Greeting commands for Nubium",
  activate: function(api) {
    api.registerCommand("hello-world.greet", "Hello World: Greet", function() {
      api.showNotification("Hello from the community plugin registry!");
    });
    api.registerCommand("hello-world.score-info", "Hello World: Score Info", function() {
      var score = api.getScore();
      var parts = score.parts.length;
      var measures = score.parts[0] ? score.parts[0].measures.length : 0;
      api.showNotification((score.title || "Untitled") + ": " + parts + " part" + (parts !== 1 ? "s" : "") + ", " + measures + " measure" + (measures !== 1 ? "s" : ""));
    });
  }
};
module.exports = HelloWorldPlugin;
