(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var css = require('./style.css');

module.exports = Tabs;

function Tabs() {
  this.el = document.createElement('div');
  this.el.className = css.tabs;
  this.el.onmouseenter = () => {
    this.freeze = this.tabWidth;
  };
  this.el.onmouseleave = () => {
    this.freeze = 0;
    this.redraw();
  };
  this.items = [];
  this.freeze = 0;
  this.margin = 5;
  this.tabWidth = 0;
}

Tabs.prototype.add = function(label, data) {
  var item = new Item(label, data);
  this.items.push(item);
  this.el.appendChild(item.el);
  this.freeze = 0;
  this.redraw();

  item.onclose = () => {
    item.onclose = noop;
    var ontransitionend = () => {
      item.el.removeEventListener('webkitTransitionEnd', ontransitionend);
      item.el.parentNode.removeChild(item.el);
    };
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    item.el.addEventListener('webkitTransitionEnd', ontransitionend);
    item.el.style.zIndex = 0;
    item.el.style.width = 0;
    item.el.style.left = (item.left - item.width * .5) + 'px';
    this.redraw(index === this.items.length, index);
  };
};

Tabs.prototype.calcTabWidth = function(isLast, size) {
  var length = this.items.length;
  var width = this.el.getBoundingClientRect().width - this.margin;
  if (isLast) {
    width = this.tabWidth * (size + 1);
    this.freeze = 0;
  }
  this.tabWidth = width / length;
  this.tabWidth = this.freeze || this.tabWidth;
  this.tabWidth = Math.min(160, this.tabWidth);
};

Tabs.prototype.redraw = function(isLast, size) {
  this.calcTabWidth(isLast, size);
  this.items.forEach((item, i) => {
    item.width = this.tabWidth - this.margin;
    item.left = i * this.tabWidth + this.margin;
    item.el.style.width = item.width + 'px';
    item.el.style.left = item.left + 'px';
  });
};

function Item(label, data) {
  this.el = document.createElement('div');
  this.el.className = css.tab;
  this.label = document.createElement('div');
  this.label.className = css.label;
  this.label.textContent = label;
  this.close = document.createElement('div');
  this.close.className = css.close;
  this.close.onclick = e => { this.onclose(); e.stopPropagation(); };
  this.el.appendChild(this.label);
  this.el.appendChild(this.close);

  this.label = label;
  this.data = data;
}

Item.prototype.rename = function(label) {
  this.label.textContent = label;
};

function noop() {/* noop */}

},{"./style.css":2}],2:[function(require,module,exports){
module.exports = {"tabs":"_style__tabs","tab":"_style__tab","label":"_style__label","close":"_style__close"}
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNzcyA9IHJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGFicztcblxuZnVuY3Rpb24gVGFicygpIHtcbiAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGNzcy50YWJzO1xuICB0aGlzLmVsLm9ubW91c2VlbnRlciA9ICgpID0+IHtcbiAgICB0aGlzLmZyZWV6ZSA9IHRoaXMudGFiV2lkdGg7XG4gIH07XG4gIHRoaXMuZWwub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMuZnJlZXplID0gMDtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9O1xuICB0aGlzLml0ZW1zID0gW107XG4gIHRoaXMuZnJlZXplID0gMDtcbiAgdGhpcy5tYXJnaW4gPSA1O1xuICB0aGlzLnRhYldpZHRoID0gMDtcbn1cblxuVGFicy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obGFiZWwsIGRhdGEpIHtcbiAgdmFyIGl0ZW0gPSBuZXcgSXRlbShsYWJlbCwgZGF0YSk7XG4gIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgdGhpcy5lbC5hcHBlbmRDaGlsZChpdGVtLmVsKTtcbiAgdGhpcy5mcmVlemUgPSAwO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIGl0ZW0ub25jbG9zZSA9ICgpID0+IHtcbiAgICBpdGVtLm9uY2xvc2UgPSBub29wO1xuICAgIHZhciBvbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgICBpdGVtLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBvbnRyYW5zaXRpb25lbmQpO1xuICAgICAgaXRlbS5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0uZWwpO1xuICAgIH07XG4gICAgdmFyIGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBpdGVtLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBvbnRyYW5zaXRpb25lbmQpO1xuICAgIGl0ZW0uZWwuc3R5bGUuekluZGV4ID0gMDtcbiAgICBpdGVtLmVsLnN0eWxlLndpZHRoID0gMDtcbiAgICBpdGVtLmVsLnN0eWxlLmxlZnQgPSAoaXRlbS5sZWZ0IC0gaXRlbS53aWR0aCAqIC41KSArICdweCc7XG4gICAgdGhpcy5yZWRyYXcoaW5kZXggPT09IHRoaXMuaXRlbXMubGVuZ3RoLCBpbmRleCk7XG4gIH07XG59O1xuXG5UYWJzLnByb3RvdHlwZS5jYWxjVGFiV2lkdGggPSBmdW5jdGlvbihpc0xhc3QsIHNpemUpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICB2YXIgd2lkdGggPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gdGhpcy5tYXJnaW47XG4gIGlmIChpc0xhc3QpIHtcbiAgICB3aWR0aCA9IHRoaXMudGFiV2lkdGggKiAoc2l6ZSArIDEpO1xuICAgIHRoaXMuZnJlZXplID0gMDtcbiAgfVxuICB0aGlzLnRhYldpZHRoID0gd2lkdGggLyBsZW5ndGg7XG4gIHRoaXMudGFiV2lkdGggPSB0aGlzLmZyZWV6ZSB8fCB0aGlzLnRhYldpZHRoO1xuICB0aGlzLnRhYldpZHRoID0gTWF0aC5taW4oMTYwLCB0aGlzLnRhYldpZHRoKTtcbn07XG5cblRhYnMucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKGlzTGFzdCwgc2l6ZSkge1xuICB0aGlzLmNhbGNUYWJXaWR0aChpc0xhc3QsIHNpemUpO1xuICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICBpdGVtLndpZHRoID0gdGhpcy50YWJXaWR0aCAtIHRoaXMubWFyZ2luO1xuICAgIGl0ZW0ubGVmdCA9IGkgKiB0aGlzLnRhYldpZHRoICsgdGhpcy5tYXJnaW47XG4gICAgaXRlbS5lbC5zdHlsZS53aWR0aCA9IGl0ZW0ud2lkdGggKyAncHgnO1xuICAgIGl0ZW0uZWwuc3R5bGUubGVmdCA9IGl0ZW0ubGVmdCArICdweCc7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gSXRlbShsYWJlbCwgZGF0YSkge1xuICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gY3NzLnRhYjtcbiAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLmxhYmVsLmNsYXNzTmFtZSA9IGNzcy5sYWJlbDtcbiAgdGhpcy5sYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICB0aGlzLmNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuY2xvc2UuY2xhc3NOYW1lID0gY3NzLmNsb3NlO1xuICB0aGlzLmNsb3NlLm9uY2xpY2sgPSBlID0+IHsgdGhpcy5vbmNsb3NlKCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH07XG4gIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5sYWJlbCk7XG4gIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZSk7XG5cbiAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICB0aGlzLmRhdGEgPSBkYXRhO1xufVxuXG5JdGVtLnByb3RvdHlwZS5yZW5hbWUgPSBmdW5jdGlvbihsYWJlbCkge1xuICB0aGlzLmxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XG59O1xuXG5mdW5jdGlvbiBub29wKCkgey8qIG5vb3AgKi99XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcInRhYnNcIjpcIl9zdHlsZV9fdGFic1wiLFwidGFiXCI6XCJfc3R5bGVfX3RhYlwiLFwibGFiZWxcIjpcIl9zdHlsZV9fbGFiZWxcIixcImNsb3NlXCI6XCJfc3R5bGVfX2Nsb3NlXCJ9Il19
