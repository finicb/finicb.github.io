(function () {
  var texts = [
    '记录一些数字生活的碎片',
    '不赶路，只感受路过的光',
    '捡拾，拼凑，让光完整',
    '今日无事，只拾微光',
    '这里的光，不刺眼，只温柔',
    '路过，拾光，然后离开',
    '运行加载缓慢，不许情绪过载',
    '日子碎了，光还在',
    '盒子开着，收纳散落的光屑',
	'写下来，光就不会消失',
    '拾光，不止是记录',
	'在细碎的时光里，打捞温柔的光',
	'光的意义，在于被看见',
  ];

// ===== 打字机效果配置 =====  
  
var typeSpeed = 150;    // 【打字速度】每个字出现的间隔（毫秒），数值越大打字越慢  
                        // 推荐范围：80~200，160 属于中等偏慢，比较从容  
  
var deleteSpeed = 90;   // 【删除速度】每个字被删除的间隔（毫秒），数值越大删除越慢  
                        // 推荐范围：60~150，90 属于较快，删除干净利落  
  
var holdDelay = 2600;   // 【停留延迟】一句话打完后停留的时间（毫秒）  
                        // 2600ms = 2.6 秒，结束后才开始删除并打出下一句  
                        // 推荐范围：1500~4000  

  // 全局保存定时器，PJAX 重新执行前清除旧的
  var typeTimer = null;

  function initTypewriter() {
    // 清除之前的定时器
    if (typeTimer) {
      clearTimeout(typeTimer);
      typeTimer = null;
    }

    var el = document.getElementById('announcement-typed');
    if (!el) return;

    // ✅ 只负责文字，不负责光标
    el.style.display = 'inline-block';
    el.style.minHeight = '1.5em';
    el.style.lineHeight = '1.5';
    el.style.verticalAlign = 'baseline';
    el.style.position = 'relative';

    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function tick() {
      var current = texts[textIndex];

      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          typeTimer = setTimeout(tick, holdDelay);
          return;
        }
        typeTimer = setTimeout(tick, typeSpeed);
      } else {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeTimer = setTimeout(tick, 500);
          return;
        }
        typeTimer = setTimeout(tick, deleteSpeed);
      }
    }

    typeTimer = setTimeout(tick, 600);
  }

  // 页面加载时执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
  } else {
    initTypewriter();
  }

  // PJAX 切换页面后重新执行
  document.addEventListener('pjax:complete', initTypewriter);
})();