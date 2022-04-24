function THashStorage() {
  var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  var self = this;
  var password = null;
  var pHash = {};

  self.addValue = function (key, value) {
    self.value = value;
    self.key = key;
    self.getAjaxString();
  };

  self.getValue = function (key) {
    return pHash[key];
  };

  self.deleteValue = function (key) {
    var del = delete pHash[key];
    self.lockgetAjaxString();
    return del;
  };

  self.getKeys = function () {
    return (Object.keys(pHash));
  };

  self.getAjaxString = function () {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ',
        n: 'BAICHUK_DRINKS',
      },
      cache: false,
      success: self.getReady,
      error: self.errorHandler
    });
  };

  self.readAjaxString = function () {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ',
        n: 'BAICHUK_DRINKS',
      },
      cache: false,
      error: self.errorHandler,
      success: function (ResultH) {
        if (ResultH.error != undefined) {
          alert(ResultH.error);
        } else {
          pHash = JSON.parse(ResultH.result);
        }
      }
    });
  };

  self.readAjaxString();

  self.updateAjaxString = function () {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'UPDATE',
        n: 'BAICHUK_DRINKS',
        v: JSON.stringify(pHash),
        p: password,
      },
      cache: false,
      error: self.errorHandler,
      success: function (ResultH) {
        if (ResultH.error != undefined) {
          alert(ResultH.error);
        } else {
          console.log(ResultH);
          self.readAjaxString();
        }
      }
    });
  };

  self.lockgetAjaxString = function () {
    password = Math.random();

    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET',
        n: 'BAICHUK_DRINKS',
        p: password,
      },
      cache: false,
      success: self.lockgetReady,
      error: self.errorHandler
    });
  };

  self.getReady = function (ResultH) {
    if (ResultH.error != undefined) {
      alert(ResultH.error);
    } else {
      pHash = JSON.parse(ResultH.result);
      pHash[self.key] = self.value;
      self.lockgetAjaxString();
    }
  };

  self.lockgetReady = function (ResultH) {
    if (ResultH.error != undefined) {
      alert(ResultH.error);
    } else {
      self.updateAjaxString();
    }
  };

  self.errorHandler = function (jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  };

  // self.insertAjaxString = function () {
  //   $.ajax({
  //     url: AjaxHandlerScript,
  //     type: 'POST',
  //     data: {
  //       f: 'INSERT',
  //       n: 'BAICHUK_DRINKS',
  //       v: JSON.stringify(pHash),
  //     },
  //     cache: false,
  //     error: self.errorHandler,
  //     success: function (ResultH) {
  //       if (ResultH.error != undefined) {
  //         alert(ResultH.error);
  //       } else {
  //         alert('success');
  //       }
  //     }
  //   });
  // };
}