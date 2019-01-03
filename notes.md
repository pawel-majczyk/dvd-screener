```javascript
const time = {
  now: null,
  then: null,
  dt: null,
  total: 0,
};

function update() {

}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function step() {
  time.now = Date.now() / 1000;
  time.dt = time.now - time.then;
  time.total += time.dt;
  time.then = time.now;

  update();
  render();

  requestAnimationFrame(step);
}

function start() {
  time.then = Date.now() / 1000;
  step();
}



```
