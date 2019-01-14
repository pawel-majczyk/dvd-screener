import graphics from '../assets/dvd-logo.png';

const canvas = document.createElement('canvas');
canvas.width = 512 * 8;
canvas.height = 512 * 4;
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
  const amp = canvas.width / 40 - (square.height / 2);

  const period = 2 * Math.PI / w;
  // const frequency = 1 / period;

  square.x = (amp * Math.cos(period * time.total + fi)) + canvas.width / 2;
  square.y = (amp * Math.sin(period * time.total + fi)) + canvas.height / 2;
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // border
  context.fillStyle = 'red';
  const borderSize = 2;
  context.fillRect(0, 0, canvas.width, borderSize);
  context.fillRect(0, canvas.height - borderSize, canvas.width, canvas.height);
  context.fillRect(0, borderSize, borderSize, canvas.height);
  context.fillRect(canvas.width - borderSize, 0, canvas.width - borderSize, canvas.height);
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
  context.strokeStyle = 'blue';
  context.fillStyle = '#020502';
  context.fillRect(
    canvas.width / 360 * 145,
    canvas.height / 360 * 150,
    canvas.width / 360 * 70,
    canvas.height / 360 * 60,
  );

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
