export default async function animateHomeMask() {
  const container = document.querySelector('.home-container__mask');
  if (!container) return;

  const svg = container.querySelector('svg');
  if (!svg) return;

  const gradients = [];
  for (let i = 0; i <= 49; i++) {
    const gradient = svg.querySelector(`#linearGradient-${i}`);
    if (gradient) {
      const x1 = parseFloat(gradient.getAttribute('x1') || '0');
      const x2 = parseFloat(gradient.getAttribute('x2') || '0');
      const y1 = parseFloat(gradient.getAttribute('y1') || '0');
      const y2 = parseFloat(gradient.getAttribute('y2') || '0');

      gradients.push({
        element: gradient,
        deltaX: x2 - x1,
        deltaY: y2 - y1,
        x1,
        y1,
      });
    }
  }

  setInterval(() => {
    gradients.forEach((grad) => {
      const offset = +(Math.random() * (0 - 0.1) + 0.1).toFixed(4);

      let newX1 = grad.x1 + offset;
      let newY1 = grad.y1 + offset;

      // Reset to 0 if going beyond 100%
      if (newX1 + grad.deltaX > 100 || newY1 + grad.deltaY > 100) {
        newX1 = 0;
        newY1 = 0;
      }

      grad.x1 = newX1;
      grad.y1 = newY1;

      const newX2 = newX1 + grad.deltaX;
      const newY2 = newY1 + grad.deltaY;

      grad.element.setAttribute('x1', `${newX1.toFixed(4)}%`);
      grad.element.setAttribute('x2', `${newX2.toFixed(4)}%`);
      grad.element.setAttribute('y1', `${newY1.toFixed(4)}%`);
      grad.element.setAttribute('y2', `${newY2.toFixed(4)}%`);
    });
  }, 10);
}
