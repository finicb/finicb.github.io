(function () {
  function addPostEnd() {
    var post = document.querySelector('.post-content');
    if (!post) return;
    if (document.querySelector('.post-end-fixed')) return;

    var box = document.createElement('div');
    box.className = 'post-end-fixed';
    box.innerHTML = `
      <hr class="post-end-hr">
      <blockquote class="post-end-quote">
        <p><strong>不赶路，只感受路过的光。</strong></p>
        <footer>—— 拾光者 · 于云端小本</footer>
      </blockquote>
    `;
    post.after(box);
  }

  // 页面加载时执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPostEnd);
  } else {
    addPostEnd();
  }

  // PJAX 切换页面后重新执行
  document.addEventListener('pjax:complete', addPostEnd);
})();