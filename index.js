/**
 * Module dependencies.
 */

var classes = require('classes');

/**
 * Expose `overlay()`.
 */

module.exports = Overlay;

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(target) {
    if (!(this instanceof Overlay)) return new Overlay(target);
    this.target = target || document.body;
    this.el = document.createElement('div');
    this.classes = classes(this.el).add('overlay').add('hidden');
    this.target.appendChild(this.el);
}

Overlay.prototype.show = function () {
    
    this.classes.remove('hidden');
    return this;
    
};

Overlay.prototype.hide = function () {
    this.classes.add('hidden');
    return this;
};

Overlay.prototype.remove = function () {
    this.el.parentNode.removeChild(this.el);
    return this;
};