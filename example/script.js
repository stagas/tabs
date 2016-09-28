
var tabs = new Tabs;

tabs.onselect = function(item) {
  console.log(item.label);
};

document.body.appendChild(tabs.el);

for (var i = 0; i < 5; i++) addTab(i);

function addTab(data) {
  tabs.add((Math.random() * 10e8 | 0).toString(36), data);
}

document.body.onclick = function() {
  addTab(Math.random())
};
