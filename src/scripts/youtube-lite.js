document.querySelectorAll('.youtube-lite').forEach(el => {
  el.addEventListener('click', () => {
    const videoId = el.dataset.id;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.frameBorder = 0;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.width = "100%";
    iframe.height = "315";
    el.innerHTML = '';
    el.appendChild(iframe);
  });
});
