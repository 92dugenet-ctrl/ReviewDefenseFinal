(function () {
  'use strict';

  const stages = document.querySelectorAll('[data-stage]');
  const mosaics = document.querySelectorAll('.rd-how-mosaic');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealStage(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  }

  if (reduced) {
    stages.forEach((stage) => stage.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(revealStage);
    }, { threshold: 0.18 });
    stages.forEach((stage) => observer.observe(stage));
  }

  mosaics.forEach((mosaic) => {
    for (let i = 0; i < 36; i += 1) {
      const square = document.createElement('span');
      square.style.setProperty('--i', i);
      mosaic.appendChild(square);
    }
  });

  const layers = document.querySelectorAll('.rd-layer');
  if (!reduced) {
    let layerIndex = 0;
    window.setInterval(() => {
      layers.forEach((layer) => layer.classList.remove('active'));
      if (layers.length) {
        layers[layerIndex % layers.length].classList.add('active');
        layerIndex += 1;
      }
    }, 1500);
  }
})();
