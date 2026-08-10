(function () {
  var texts = [
    '记录一些数字生活的碎片',
    '不赶路，只感受路过的光',
    '闲人慢慢写，光慢慢落',
    '今日无事，只拾微光',
    '这里的光，不刺眼，只温柔',
    '路过，拾光，然后离开',
    '运行加载缓慢，不许情绪过载'
  ];

  var typeSpeed = 160;
  var deleteSpeed = 90;
  var holdDelay = 2600;

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
        setTimeout(tick, holdDelay);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  setTimeout(tick, 600);
})();