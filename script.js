const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numPoints = 50;
const pointSpeed = 0.5;

class MovingPoint {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.vy = -this.vy;
    }
  }
}

const points = Array.from({ length: numPoints }, () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * pointSpeed;
  const vy = Math.sin(angle) * pointSpeed;
  return new MovingPoint(x, y, vx, vy);
});

function getClosestPoint(x, y) {
  let minDist = Infinity;
  let closestPoint = null;

  for (const point of points) {
    const dx = x - point.x;
    const dy = y - point.y;
    const dist = dx * dx + dy * dy;

    if (dist < minDist) {
      minDist = dist;
      closestPoint = point;
    }
  }

  return closestPoint;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += 10) {
    for (let y = 0; y < canvas.height; y += 10) {
      const closestPoint = getClosestPoint(x, y);
      const hue = (Math.atan2(closestPoint.y - y, closestPoint.x - x) + Math.PI) / (Math.PI * 2) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(x, y, 10, 10);
    }
  }

  points.forEach((point) => {
    point.update();
  });

  requestAnimationFrame(draw);
}

draw();
