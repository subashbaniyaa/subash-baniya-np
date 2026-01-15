export interface Point {
  x: number;
  y: number;
}

export const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const drawRainbow = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, size: number) => {
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
  const step = size / colors.length;
  
  ctx.save();
  colors.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = step;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y + i * step - size / 2);
    ctx.lineTo(p2.x, p2.y + i * step - size / 2);
    ctx.stroke();
  });
  ctx.restore();
};

export const drawPixel = (ctx: CanvasRenderingContext2D, p: Point, size: number, color: string) => {
  const pixelSize = 4;
  ctx.fillStyle = color;
  for (let i = -size; i < size; i += pixelSize) {
    for (let j = -size; j < size; j += pixelSize) {
      if (Math.random() > 0.5) {
        ctx.fillRect(p.x + i, p.y + j, pixelSize, pixelSize);
      }
    }
  }
};

export const drawMesh = (ctx: CanvasRenderingContext2D, p: Point, history: Point[], color: string) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  history.forEach(prevPoint => {
    const dist = getDistance(p, prevPoint);
    if (dist < 50 && dist > 2) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(prevPoint.x, prevPoint.y);
      ctx.stroke();
    }
  });
};
