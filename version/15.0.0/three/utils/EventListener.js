import { emptyFunction } from '../constants'

const EventListener = {
    listen: function (target, eventType, callback) {
      if (target.addEventListener) {
        target.addEventListener(eventType, callback, false);
        return {
          remove: function () {
            target.removeEventListener(eventType, callback, false);
          }
        };
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, callback);
        return {
          remove: function () {
            target.detachEvent('on' + eventType, callback);
          }
        };
      }
    },
    
    capture: function (target, eventType, callback) {
      if (target.addEventListener) {
        target.addEventListener(eventType, callback, true);
        return {
          remove: function () {
            target.removeEventListener(eventType, callback, true);
          }
        };
      } else {
        return {
          remove: emptyFunction
        };
      }
    },
  
    registerDefault: function () {}
  }

  export default EventListener