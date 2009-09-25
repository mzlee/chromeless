function stringifyArgs(args) {
  var string;
  var stringArgs = [];
  for (var i = 0; i < args.length; i++) {
    try {
      string = args[i].toString();
    } catch (e) {
      string = "<toString() error>";
    }
    stringArgs.push(string);
  }
  return stringArgs.join(" ");
}

function message(print, level, args) {
  print(level + ": " + stringifyArgs(args) + "\n");
}

var Console = exports.Console = function Console(print) {
  if (!print)
    print = dump;
  if (print === dump) {
    // If we're just using dump(), auto-enable preferences so
    // that the developer actually sees the console output.
    var prefs = Cc["@mozilla.org/preferences-service;1"]
                .getService(Ci.nsIPrefBranch);
    prefs.setBoolPref("browser.dom.window.dump.enabled", true);
  }
  this.print = print;
};

Console.prototype = {
  log: function log() {
    message(this.print, "info", arguments);
  },

  info: function info() {
    message(this.print, "info", arguments);
  },

  warn: function warn() {
    message(this.print, "warning", arguments);
  },

  error: function error() {
    message(this.print, "error", arguments);
  }
};
