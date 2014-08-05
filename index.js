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
    if (this.target === document.body)
        this.classes.add('body-overlay');
    this.target.appendChild(this.el);
}

Overlay.prototype.show = function () {
    if (!this.el.parentNode)
        this.target.appendChild(this.el);
    this.classes.remove('hidden');
    return this;
};

Overlay.prototype.hide = function () {
    this.classes.add('hidden');
    // don't leave all unused overlays in the DOM
    this.remove();
    return this;
};

Overlay.prototype.remove = function () {
    if (this.el.parentNode)
        this.el.parentNode.removeChild(this.el);
    return this;
};