const HelloWorldPlugin = {
  id: "hello-world",
  name: "Hello World",
  version: "1.1.0",
  description: "Greeting commands for Nubium",

  activate(api: any) {
    api.registerCommand("hello-world.greet", "Hello World: Greet", () => {
      api.showNotification("Hello from the community plugin registry!");
    });

    api.registerCommand("hello-world.score-info", "Hello World: Score Info", () => {
      const score = api.getScore();
      const parts = score.parts.length;
      const measures = score.parts[0]?.measures.length ?? 0;
      api.showNotification(`${score.title || "Untitled"}: ${parts} part${parts !== 1 ? "s" : ""}, ${measures} measure${measures !== 1 ? "s" : ""}`);
    });
  },
};

module.exports = HelloWorldPlugin;
