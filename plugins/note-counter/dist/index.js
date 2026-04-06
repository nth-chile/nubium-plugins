var NoteCounterPlugin = {
  id: "note-counter",
  name: "Note Counter",
  version: "1.0.0",
  description: "Counts the total notes in your score",
  activate: function(api) {
    api.registerCommand("note-counter.count", "Note Counter: Count Notes", function() {
      var score = api.getScore();
      var count = 0;
      for (var p = 0; p < score.parts.length; p++) {
        for (var m = 0; m < score.parts[p].measures.length; m++) {
          for (var v = 0; v < score.parts[p].measures[m].voices.length; v++) {
            var events = score.parts[p].measures[m].voices[v].events;
            for (var e = 0; e < events.length; e++) {
              if (events[e].type === "note") count++;
              if (events[e].type === "chord") count += events[e].pitches.length;
            }
          }
        }
      }
      api.showNotification("Your score has " + count + " note" + (count !== 1 ? "s" : "") + ".");
    });
  }
};
module.exports = NoteCounterPlugin;
