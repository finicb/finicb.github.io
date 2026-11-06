// 点击出字（原生 JS 版，不依赖 jQuery）
(function () {
  var words = ["拾光", "流年", "微光", "浅忆", "半夏", "清欢", "归处", "云间", "听风", "余温", "晚舟", "暖记"];
  var idx = 0;

  function initClickText() {
    // 避免重复绑定
    if (document.body.dataset.clickTextBound) return;
    document.body.dataset.clickTextBound = 'true';

    document.addEventListener('click', function (e) {
      var span = document.createElement('span');
      span.textContent = words[idx];
      idx = (idx + 1) % words.length;

      var x = e.pageX;
      var y = e.pageY - 20;

      span.style.cssText = 'z-index:9999;top:' + y + 'px;left:' + x + 'px;position:absolute;font-weight:bold;color:rgb(' +
        ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) +
        ');pointer-events:none;transition:all 3s ease-out;opacity:1;';

      document.body.appendChild(span);

      // 触发重排后开始动画
      requestAnimationFrame(function () {
        span.style.top = (y - 160) + 'px';
        span.style.opacity = '0';
      });

      // 3秒后移除
      setTimeout(function () {
        if (span.parentNode) span.parentNode.removeChild(span);
      }, 3000);
    });
  }

  // 页面加载时绑定
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClickText);
  } else {
    initClickText();
  }

  // PJAX 切换后确保绑定（事件绑定在 document 上，实际不需要，但保险起见）
  document.addEventListener('pjax:complete', initClickText);
})();
