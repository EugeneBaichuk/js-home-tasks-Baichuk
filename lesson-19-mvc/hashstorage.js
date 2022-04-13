function TLocalStorage(name) {
  var self = this;
  var hashForRec = {};
  self.reset = function () {
    hashForRec = JSON.parse(localStorage[name]) || {};
  };
  self.addValue = function (Key, Value) {
    hashForRec[Key] = Value;
    localStorage[name] = JSON.stringify(hashForRec);
  };
  self.getValue = function (Key) {
    return hashForRec[Key];
  };
  self.deleteValue = function (Key) {
    delete hashForRec[Key];
    localStorage[name] = JSON.stringify(hashForRec);
  };
  self.getKeys = function () {
    return Object.keys(hashForRec);
  };
}