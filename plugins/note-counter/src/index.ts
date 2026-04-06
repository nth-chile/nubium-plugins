const NoteCounterPlugin = {
  id: "note-counter",
  name: "Note Counter",
  version: "1.0.0",
  description: "Counts the total notes in your score",

  activate(api: any) {
    api.registerCommand("note-counter.count", "Note Counter: Count Notes", () => {
      const score = api.getScore();
      let count = 0;
      for (const part of score.parts) {
        for (const measure of part.measures) {
          for (const voice of measure.voices) {
            for (const event of voice.events) {
              if (event.type === "note") count++;
              if (event.type === "chord") count += event.pitches.length;
            }
          }
        }
      }
      api.showNotification(`Your score has ${count} note${count !== 1 ? "s" : ""}.`);
    });
  },
};

module.exports = NoteCounterPlugin;
