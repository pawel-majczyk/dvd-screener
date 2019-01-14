import graphics from '../assets/dvd-logo.png';

const canvas = document.createElement('canvas');
canvas.width = 512 * 8;
canvas.height = 512 * 8;
const ctx = canvas.getContext('2d');

const drawArea = {
  startPointX: canvas.width / 360 * 55,
  startPointY: canvas.height / 360 * 55,
  width: canvas.height / 360 * 290,
  height: canvas.height / 360 * 290,
  // startPointX: 0,
  // startPointY: 0,
  // width: canvas.width,
  // height: canvas.height,
};


const logo = new Image();
logo.src = graphics;
logo.width = 128;
logo.height = 128;
logo.velocity = { x: 800, y: 800 };
logo.position = {
  x: Math.floor(Math.random() * drawArea.width + drawArea.startPointX),
  y: Math.floor(Math.random() * drawArea.height + drawArea.startPointY),
};

const time = {
  now: null,
  then: null,
  dt: null,
  total: 0,
};


function handleOutOfBounds(obj, area) {
  const checkBounds = () => {
    if (obj.position.x - obj.width / 2 < area.startPointX) return 'left';
    if (obj.position.x + obj.width / 2 > area.startPointX + area.width) return 'right';
    if (obj.position.y + obj.height / 2 > area.startPointY + area.height) return 'lower';
    if (obj.position.y - obj.height / 2 < area.startPointY) return 'upper';
    return false;
  };
  const updateObjVelocity = (passedBoundary) => {
    const updatedObj = { velocity: { x: obj.velocity.x, y: obj.velocity.y } };
    let paramToAdjust = '';

    if (passedBoundary === 'left' || 'right') {
      paramToAdjust = 'x';
    }
    if (passedBoundary === 'upper' || 'lower') {
      paramToAdjust = 'y';
    }
    updatedObj.velocity[paramToAdjust] = obj.velocity[paramToAdjust] * -1;
    return updatedObj;
  };

  if (checkBounds(obj, area)) {
    const newVelocity = updateObjVelocity(logo, checkBounds(logo, drawArea));
    Object.assign(logo, newVelocity);
    // console.log('updated with', { logo });
  }
}
function updateObjPosition(obj, dt) {
  obj.position.x += obj.velocity.x * dt;
  obj.position.y += obj.velocity.y * dt;
}

function update() {
  time.now = Date.now() / 1000;
  time.dt = time.now - time.then;
  time.total += time.dt;
  time.then = time.now;
  handleOutOfBounds(logo, drawArea);
  updateObjPosition(logo, time.dt);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    logo,
    logo.position.x - logo.width / 2,
    logo.position.y - logo.height / 2,
  );
  ctx.strokeStyle = 'red';
  ctx.fillStyle = '#cc000066';
  ctx.fillRect(drawArea.startPointX, drawArea.startPointY, drawArea.width, drawArea.height);
}

function step() {
  update();
  render();

  requestAnimationFrame(step);
}

function run() {
  time.then = Date.now() / 1000;
  step();
}

logo.onload = () => {
  run();
};

export default canvas;
