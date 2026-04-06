var NoteCounterPlugin = {
  id: "note-counter",
  name: "Note Counter",
  version: "1.0.0",
  description: "Counts the total notes in your score and shows the result",

  activate: function(api) {
    api.registerCommand("note-counter.count", "Note Counter: Count Notes", function() {
      var score = api.getScore();
      var count = 0;

      for (var p = 0; p < score.parts.length; p++) {
        var part = score.parts[p];
        for (var m = 0; m < part.measures.length; m++) {
          var measure = part.measures[m];
          for (var v = 0; v < measure.voices.length; v++) {
            var voice = measure.voices[v];
            for (var e = 0; e < voice.events.length; e++) {
              var event = voice.events[e];
              if (event.type === "note") count++;
              if (event.type === "chord") count += event.pitches.length;
            }
          }
        }
      }

      api.showNotification("Your score has " + count + " note" + (count !== 1 ? "s" : "") + ".");
    });
  },
};

module.exports = NoteCounterPlugin;
