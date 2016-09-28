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
