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
  item.onselect = () => this.select(item);
  if (!this.selected) this.select(item);
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
    if (this.selected === item) {
      this.selected = null;
      if (this.items.length) {
        this.select(this.items[this.items.length - 1]);
      }
    }
    this.redraw(index === this.items.length, index);
  };
};

Tabs.prototype.select = function(item) {
  if (this.selected) {
    this.selected.el.classList.remove(css.selected);
  }
  this.selected = item;
  this.selected.el.classList.add(css.selected);
  this.onselect(item);
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
  this.el.onclick = e => e.stopPropagation();
  this.el.onmousedown = e => { this.onselect(); e.stopPropagation(); };
  this.el.className = css.tab;
  this.label = document.createElement('div');
  this.label.className = css.label;
  this.label.textContent = label;
  this.close = document.createElement('div');
  this.close.className = css.close;
  this.close.onmousedown = e => e.stopPropagation();
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
module.exports = {"tabs":"_style__tabs","tab":"_style__tab","selected":"_style__selected","label":"_style__label","close":"_style__close"}
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjc3MgPSByZXF1aXJlKCcuL3N0eWxlLmNzcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYnM7XG5cbmZ1bmN0aW9uIFRhYnMoKSB7XG4gIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBjc3MudGFicztcbiAgdGhpcy5lbC5vbm1vdXNlZW50ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5mcmVlemUgPSB0aGlzLnRhYldpZHRoO1xuICB9O1xuICB0aGlzLmVsLm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLmZyZWV6ZSA9IDA7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfTtcbiAgdGhpcy5pdGVtcyA9IFtdO1xuICB0aGlzLmZyZWV6ZSA9IDA7XG4gIHRoaXMubWFyZ2luID0gNTtcbiAgdGhpcy50YWJXaWR0aCA9IDA7XG59XG5cblRhYnMucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGxhYmVsLCBkYXRhKSB7XG4gIHZhciBpdGVtID0gbmV3IEl0ZW0obGFiZWwsIGRhdGEpO1xuICBpdGVtLm9uc2VsZWN0ID0gKCkgPT4gdGhpcy5zZWxlY3QoaXRlbSk7XG4gIGlmICghdGhpcy5zZWxlY3RlZCkgdGhpcy5zZWxlY3QoaXRlbSk7XG4gIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgdGhpcy5lbC5hcHBlbmRDaGlsZChpdGVtLmVsKTtcbiAgdGhpcy5mcmVlemUgPSAwO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIGl0ZW0ub25jbG9zZSA9ICgpID0+IHtcbiAgICBpdGVtLm9uY2xvc2UgPSBub29wO1xuICAgIHZhciBvbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgICBpdGVtLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBvbnRyYW5zaXRpb25lbmQpO1xuICAgICAgaXRlbS5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0uZWwpO1xuICAgIH07XG4gICAgdmFyIGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBpdGVtLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBvbnRyYW5zaXRpb25lbmQpO1xuICAgIGl0ZW0uZWwuc3R5bGUuekluZGV4ID0gMDtcbiAgICBpdGVtLmVsLnN0eWxlLndpZHRoID0gMDtcbiAgICBpdGVtLmVsLnN0eWxlLmxlZnQgPSAoaXRlbS5sZWZ0IC0gaXRlbS53aWR0aCAqIC41KSArICdweCc7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT09IGl0ZW0pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGggLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVkcmF3KGluZGV4ID09PSB0aGlzLml0ZW1zLmxlbmd0aCwgaW5kZXgpO1xuICB9O1xufTtcblxuVGFicy5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oaXRlbSkge1xuICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgIHRoaXMuc2VsZWN0ZWQuZWwuY2xhc3NMaXN0LnJlbW92ZShjc3Muc2VsZWN0ZWQpO1xuICB9XG4gIHRoaXMuc2VsZWN0ZWQgPSBpdGVtO1xuICB0aGlzLnNlbGVjdGVkLmVsLmNsYXNzTGlzdC5hZGQoY3NzLnNlbGVjdGVkKTtcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcbn07XG5cblRhYnMucHJvdG90eXBlLmNhbGNUYWJXaWR0aCA9IGZ1bmN0aW9uKGlzTGFzdCwgc2l6ZSkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gIHZhciB3aWR0aCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSB0aGlzLm1hcmdpbjtcbiAgaWYgKGlzTGFzdCkge1xuICAgIHdpZHRoID0gdGhpcy50YWJXaWR0aCAqIChzaXplICsgMSk7XG4gICAgdGhpcy5mcmVlemUgPSAwO1xuICB9XG4gIHRoaXMudGFiV2lkdGggPSB3aWR0aCAvIGxlbmd0aDtcbiAgdGhpcy50YWJXaWR0aCA9IHRoaXMuZnJlZXplIHx8IHRoaXMudGFiV2lkdGg7XG4gIHRoaXMudGFiV2lkdGggPSBNYXRoLm1pbigxNjAsIHRoaXMudGFiV2lkdGgpO1xufTtcblxuVGFicy5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oaXNMYXN0LCBzaXplKSB7XG4gIHRoaXMuY2FsY1RhYldpZHRoKGlzTGFzdCwgc2l6ZSk7XG4gIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIGl0ZW0ud2lkdGggPSB0aGlzLnRhYldpZHRoIC0gdGhpcy5tYXJnaW47XG4gICAgaXRlbS5sZWZ0ID0gaSAqIHRoaXMudGFiV2lkdGggKyB0aGlzLm1hcmdpbjtcbiAgICBpdGVtLmVsLnN0eWxlLndpZHRoID0gaXRlbS53aWR0aCArICdweCc7XG4gICAgaXRlbS5lbC5zdHlsZS5sZWZ0ID0gaXRlbS5sZWZ0ICsgJ3B4JztcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBJdGVtKGxhYmVsLCBkYXRhKSB7XG4gIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy5lbC5vbmNsaWNrID0gZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB0aGlzLmVsLm9ubW91c2Vkb3duID0gZSA9PiB7IHRoaXMub25zZWxlY3QoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBjc3MudGFiO1xuICB0aGlzLmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMubGFiZWwuY2xhc3NOYW1lID0gY3NzLmxhYmVsO1xuICB0aGlzLmxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XG4gIHRoaXMuY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy5jbG9zZS5jbGFzc05hbWUgPSBjc3MuY2xvc2U7XG4gIHRoaXMuY2xvc2Uub25tb3VzZWRvd24gPSBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIHRoaXMuY2xvc2Uub25jbGljayA9IGUgPT4geyB0aGlzLm9uY2xvc2UoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfTtcbiAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlKTtcblxuICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG59XG5cbkl0ZW0ucHJvdG90eXBlLnJlbmFtZSA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gIHRoaXMubGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcbn07XG5cbmZ1bmN0aW9uIG5vb3AoKSB7Lyogbm9vcCAqL31cbiIsIm1vZHVsZS5leHBvcnRzID0ge1widGFic1wiOlwiX3N0eWxlX190YWJzXCIsXCJ0YWJcIjpcIl9zdHlsZV9fdGFiXCIsXCJzZWxlY3RlZFwiOlwiX3N0eWxlX19zZWxlY3RlZFwiLFwibGFiZWxcIjpcIl9zdHlsZV9fbGFiZWxcIixcImNsb3NlXCI6XCJfc3R5bGVfX2Nsb3NlXCJ9Il19
