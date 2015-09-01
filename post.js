 /* imitate post a form to some location */
    var post = function(URL, PARAMS) {
      var tform = document.createElement("form");
      tform.action = URL;
      tform.method = "post";
      tform.style.display = "none";
      for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        tform.appendChild(opt);
      }
      document.body.appendChild(tform);
      tform.submit();
      return tform;
    }