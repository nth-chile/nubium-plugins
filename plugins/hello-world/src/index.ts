const HelloWorldPlugin = {
  id: "hello-world",
  name: "Hello World",
  version: "1.0.0",
  description: "A simple test plugin that adds a greeting command",

  activate(api: any) {
    api.registerCommand("hello-world.greet", "Hello World: Greet", () => {
      api.showNotification("Hello from the community plugin registry!");
    });
  },
};

module.exports = HelloWorldPlugin;
