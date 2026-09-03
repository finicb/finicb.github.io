(function () {  
  // 慢呼吸参数（核心）  
  const SPEED = 0.006; // 越小越慢（0.008 = 极慢治愈）  
  const MIN_OPACITY = 0.45;  
  const MAX_OPACITY = 1;  
  const MIN_SCALE = 0.88;  
  const MAX_SCALE = 1.18;  
  
  function init() {  
    var aside = document.querySelector('#aside-content');  
    if (!aside) return;  
  
    // 找归档卡片  
    var card = null;  
    aside.querySelectorAll('*').forEach(function (el) {  
      var t = (el.innerText || '').trim();  
      if (t === '光的轨迹' || t === '归档' || t === 'Archive') {  
        card = el.closest('.card-widget, div[id], section') || el.parentElement;  
      }  
    });  
    if (!card) return;  
  
    // 给每个链接加星星（真实 DOM，主题压不住）  
    card.querySelectorAll('a').forEach(function (a, i) {  
      if (a.dataset.slowGlow) return;  
      a.dataset.slowGlow = 'true';  
      a.style.position = 'relative';  
      a.style.paddingLeft = '1.6rem';  
  
      var dot = document.createElement('span');  
      dot.className = 'slow-glow-dot';  
      dot.textContent = '✨';  
      dot.style.cssText = `  
        position:absolute;left:0;top:50%;  
        transform:translateY(-50%) scale(0.9);  
        font-size:16px;line-height:1;  
        pointer-events:none;user-select:none;  
        transition:none;  
      `;  
      a.appendChild(dot);  
    });  
  
    // 呼吸动画  
    var dots = card.querySelectorAll('.slow-glow-dot');  
    if (!dots.length) return;  
  
    function breathe() {  
      var t = Date.now() * SPEED;  
      dots.forEach(function (d, i) {  
        var phase = t + i * 0.5;  
        var opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * (0.5 + 0.5 * Math.sin(phase));  
        var scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (0.5 + 0.5 * Math.sin(phase + 1.2));  
        d.style.opacity = opacity;  
        d.style.transform = 'translateY(-50%) scale(' + scale + ')';  
      });  
      requestAnimationFrame(breathe);  
    }  
    breathe();  
  }  
  
  if (document.readyState === 'loading') {  
    document.addEventListener('DOMContentLoaded', init);  
  } else {  
    init();  
  }  

  // PJAX 切换页面后重新初始化星星
  document.addEventListener('pjax:complete', init);
})();  
