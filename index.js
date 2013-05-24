
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , domify = require('domify')
  , query = require('query')
  , events = require('event')
  , classes = require('classes')
;

/**
 * Expose `overlay()`.
 */

exports = module.exports = overlay;

/**
 * Expose `Overlay`.
 */

exports.Overlay = Overlay;

/**
 * Return a new `Overlay` with the given `options`.
 *
 * @param {Object|Element} options
 * @return {Overlay}
 * @api public
 */

function overlay(options){
  options = options || {};

  // element
  if (options.nodeName) {
    options = { target: options };
  }

  return new Overlay(options);
};

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(options) {
  Emitter.call(this);
  options = options || {};
  this.target = options.target || document.body;
  this.closable = options.closable;
  this.el = domify(require('./template'))[0];
  this._classes = classes(this.el);
  if (this.target) {
    this.el.removeAttribute('id');
    this._classes.add('overlay');
  }
  this.target.appendChild(this.el);
  if (this.closable) events.bind(this.el, 'click', this.hide.bind(this));
}

/**
 * Mixin emitter.
 */

Emitter(Overlay.prototype);

/**
 * Show the overlay.
 *
 * Emits "show" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.show = function(){
  this.emit('show');
  this._classes.remove('hide');
  return this;
};

/**
 * Hide the overlay.
 *
 * Emits "hide" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.hide = function(){
  this.emit('hide');
  return this.remove();
};

/**
 * Hide the overlay without emitting "hide".
 *
 * Emits "close" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.remove = function(){
  var self = this;
  self.emit('close');
  this._classes.add('hide');
  setTimeout(function(){
    self.el.parentNode.removeChild(self.el);
  }, 2000);
  return self;
};

