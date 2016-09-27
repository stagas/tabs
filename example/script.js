
var tabs = new Tabs;

document.body.appendChild(tabs.el);

for (var i = 0; i < 5; i++) addTab(i);

function addTab(data) {
  tabs.add((Math.random() * 10e8 | 0).toString(36), data);
}

tabs.onselect = function(item) {
  console.log(item.title);
};

document.body.onclick = function() {
  addTab(Math.random())
};
