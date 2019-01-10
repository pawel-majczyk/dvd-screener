import graphics from '../assets/texture.jpg';

const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');

const square = {
  width: 10,
  height: 10,
  x: 150,
  y: 150,
};

const drawing = new Image();
drawing.src = graphics;
drawing.width = 128;
drawing.height = 128;

const time = {
  now: null,
  then: null,
  dt: null,
  total: 0,
};


function update() {
  // spring characteristics
  const k = 2 * Math.PI;
  const m = 0.3333;
  const fi = 4.712389;
  const w = Math.sqrt(k / m);
  const amp = 120 - (square.height / 2);

  const period = 2 * Math.PI / w;
  // const frequency = 1 / period;

  square.y = (amp * Math.sin(period * time.total + fi)) + 250;
  square.x = (amp * Math.cos(period * time.total + fi)) + 250;
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // border
  context.fillStyle = 'red';
  context.fillRect(0, 0, canvas.width, 16);
  context.fillRect(0, canvas.height - 16, canvas.width, canvas.height);
  context.fillRect(0, 16, 16, canvas.height);
  context.fillRect(canvas.width - 16, 0, canvas.width - 16, canvas.height);
  // floating square
  // const red = Math.floor(Math.sin(time.total) * 255);
  // const blue = Math.floor(Math.sin(time.now) * 255);
  // context.fillStyle = `rgba(${red}, 128, ${blue}, 255)`;
  // context.fillRect(

  //   square.x - square.width / 2,
  //   square.y - square.height / 2,
  //   square.width,
  //   square.height,
  // );

  context.drawImage(drawing,
    square.x - drawing.width / 2,
    square.y - drawing.height / 2,
    drawing.width, drawing.height);
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

function run() {
  time.then = Date.now() / 1000;
  step();
}

drawing.onload = () => {
  run();
};
run();
export default canvas;
