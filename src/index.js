'use strict';

const { EventEmitter } = require('node:events');
const { setTimeout, clearTimeout } = require('node:timers');

module.exports = class PythonLikeEvent {
  constructor() {
    this.event = new EventEmitter();
    this._flag = false;
  }

  /**
   * Set the internal flag to true.
   */
  set() {
    this._flag = true;
    this.event.emit('set', true);
  }

  /**
   * Return true if and only if the internal flag is true.
   * @returns {boolean}
   */
  isSet() {
    return this._flag;
  }

  /**
   * Reset the internal flag to false.
   */
  clear() {
    this._flag = false;
  }

  /**
   * Block until the internal flag is true.
   * 
   * If the internal flag is true on entry, return immediately. Otherwise,
   * block until another set() call to set the flag to true, or until
   * the optional timeout occurs.
   * @param {?number} timeout 
   * @returns {Promise<boolean>}
   */
  wait(timeout = null) {
    if (this.isSet()) {
      return Promise.resolve(true);
    }

    if (timeout === null) {
      return new Promise(resolve => this.event.once('set', resolve));
    } else {
      return new Promise(resolve => {
        const timer = setTimeout(() => {
          resolve(this.isSet());
        }, timeout);

        this.event.once('set', flag => {
          clearTimeout(timer);
          resolve(flag);
        });
      });
    }
  }
};
