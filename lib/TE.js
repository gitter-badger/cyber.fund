// Generated by CoffeeScript 1.10.0
(function() {
  if (!CF.Utils) throw ("wrong context")
  var TE, THIS, h;

  THIS = CF.libsub.THIS;
  h = CF.Utils.logger;

  TE = function(str) {
    if (!(this instanceof TE)) {
      return TE;
    } else {
      this.constructorFunction = TE;
      this.text = str;
      this.state = _.clone(THIS);
      this.tick = 0;
      this["default"] = 'plain text';
      h.print("TE arguments object", arguments);
      h.print("TE args object", args);
      this.readCurrentSymbol = function(current) {
        return this.str[current];
      };
      this.next = function() {
        if (this.current) {
          this.log(this.current);
        }
        if (!this.current) {
          this.current = 'eof';
        }
        return this.current++;
      };
      return this;
    }
  };

  CF.lib = CF.lib || {}
  CF.lib.TE = TE

}).call(this);
