var addNotify = function (msg) {
        // if there is a notify there, then update the notify message
        if (!notifyClosed && permanotice) {
          if (msg !== notifyMessage) {
            permanotice.update({ text: msg });
            notifyMessage = msg;
          }
        }
        // if there is not notify but permanotice
        if (notifyClosed && permanotice) {
          permanotice.init();
          notifyClosed = false;
          processNotify(msg);
        }
        // if there is not message and permanotice
        if (!permanotice && notifyClosed) {
          permanotice = new PNotify({
                  title: 'Notify Message',
                  text: msg,
                  hide: false,
                  addclass: "stack-bottomright",
                  stack: stack_topleft,
                  buttons: {
                        closer: false,
                        sticker: false
                  }
              });
          notifyClosed = false;
          notifyMessage = msg;
        }
      };
  
      var removeNotify = function() {
        if (permanotice && !notifyClosed && permanotice.remove) {
          notifyMessage = null;
          notifyClosed  = true;
          permanotice.remove();
        }
      };