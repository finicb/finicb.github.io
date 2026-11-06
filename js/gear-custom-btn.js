(function () {
  function addExtraBtns() {
    var panel = document.getElementById('rightside-config-hide');
    if (!panel) return;

    // ===== 按钮1：分类 → 内部打开 =====
    if (!document.getElementById('gear-btn-categories')) {
      var btn1 = document.createElement('button');
      btn1.id = 'gear-btn-categories';
      btn1.type = 'button';
      btn1.title = '分类';
      btn1.setAttribute('data-pjax', '');
      btn1.innerHTML = '<i class="fas fa-folder-open"></i>';  // 改图标
      btn1.onclick = function (e) {
        e.stopPropagation();
        var url = '/categories/';
        if (window.pjax && window.pjax.loadUrl) {
          window.pjax.loadUrl(url);      // pjax 无刷新内部跳转
        } else {
          location.href = url;            // 普通内部跳转
        }
      };
      panel.appendChild(btn1);
    }

    // ===== 按钮2：友链 → 内部打开 =====
    if (!document.getElementById('gear-btn-link')) {
      var btn2 = document.createElement('button');
      btn2.id = 'gear-btn-link';
      btn2.type = 'button';
      btn2.title = '友链';
      btn2.setAttribute('data-pjax', '');
      btn2.innerHTML = '<i class="fas fa-link"></i>';  // 改图标
      btn2.onclick = function (e) {
        e.stopPropagation();
        var url = '/link/';
        if (window.pjax && window.pjax.loadUrl) {
          window.pjax.loadUrl(url);      // pjax 无刷新内部跳转
        } else {
          location.href = url;            // 普通内部跳转
        }
      };
      panel.appendChild(btn2);
    }

    // ===== 按钮3：拾光 → 新窗口打开 =====
    if (!document.getElementById('gear-btn-shiguang')) {
      var btn3 = document.createElement('button');
      btn3.id = 'gear-btn-shiguang';
      btn3.type = 'button';
      btn3.title = '拾光';
      btn3.innerHTML = '<i class="fas fa-heart"></i>';  // 爱心
      btn3.onclick = function (e) {
        e.stopPropagation();
        window.open('https://2xboo.picp.vip/', '_blank'); // 新窗口打开
      };
      panel.appendChild(btn3);
    }
  }

  // 首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addExtraBtns);
  } else {
    addExtraBtns();
  }

  // pjax 跳转后重新补上
  document.addEventListener('pjax:complete', addExtraBtns);
})();