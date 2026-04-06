var RestCounterPlugin = {
  id: "rest-counter",
  name: "Rest Counter",
  version: "1.0.0",
  activate: function(api) {
    api.registerCommand("rest-counter.count", "Rest Counter: Count Rests", function() {
      var score = api.getScore();
      var count = 0;
      for (var p = 0; p < score.parts.length; p++)
        for (var m = 0; m < score.parts[p].measures.length; m++)
          for (var v = 0; v < score.parts[p].measures[m].voices.length; v++)
            for (var e = 0; e < score.parts[p].measures[m].voices[v].events.length; e++)
              if (score.parts[p].measures[m].voices[v].events[e].type === "rest") count++;
      api.showNotification("Your score has " + count + " rest" + (count !== 1 ? "s" : "") + ".");
    });
  }
};
module.exports = RestCounterPlugin;
