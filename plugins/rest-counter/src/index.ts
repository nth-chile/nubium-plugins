const RestCounterPlugin = {
  id: "rest-counter",
  name: "Rest Counter",
  version: "1.0.0",
  activate(api: any) {
    api.registerCommand("rest-counter.count", "Rest Counter: Count Rests", () => {
      const score = api.getScore();
      let count = 0;
      for (const part of score.parts)
        for (const measure of part.measures)
          for (const voice of measure.voices)
            for (const event of voice.events)
              if (event.type === "rest") count++;
      api.showNotification(`Your score has ${count} rest${count !== 1 ? "s" : ""}.`);
    });
  },
};
module.exports = RestCounterPlugin;
