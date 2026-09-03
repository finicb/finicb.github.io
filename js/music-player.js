/* ============================================
 * 侧边音乐播放器配置
 * 修改歌曲名/歌手/文件路径只需改下面的 musicList 数组
 * ============================================ */

// 歌曲列表 —— 以后加歌/改歌名只改这里
var musicList = [
  {
    name: 'DAN DAN 心魅かれて',
    artist: 'ZARD',
    url: '/music/渐渐被你吸引.mp3',
    cover: '/img/music-cover.jpg'
  },
  {
    name: 'secret base ~君がくれたもの~',
    artist: 'ZONE',
    url: '/music/未闻花名.mp3',
    cover: '/img/music-cover.jpg'
  },
  {
    name: 'さくら ~あなたに出会えてよかった~',
    artist: 'RSP',
    url: '/music/樱花~遇见你真好.mp3',
    cover: '/img/music-cover.jpg'
  }
  // 加歌格式：
  // ,{
  //   name: '歌曲名',
  //   artist: '歌手',
  //   url: '/music/文件名.mp3',
  //   cover: '/img/封面.jpg'
  // }
];

// 对 URL 进行编码，处理中文/日文/空格/特殊字符，避免音频加载失败
musicList.forEach(function (song) {
  if (song.url) song.url = encodeURI(song.url);
});

// 播放器配置 —— 一般不用改
var playerConfig = {
  theme: '#49b1f5',    // 主题色
  loop: 'all',         // 循环模式：all / one / none
  order: 'random',     // 播放顺序：list 顺序 / random 随机
  volume: 0.3          // 默认音量 0~1
};

// 初始化播放器
function initMusicPlayer() {
  if (typeof APlayer === 'undefined' || window.globalAplayer) return;

  var el = document.getElementById('global-aplayer');
  if (!el) return;

  window.globalAplayer = new APlayer(Object.assign({
    container: el,
    audio: musicList,
    preload: 'auto'  // 页面打开即缓冲音频
  }, playerConfig));

  // 创建"点击播放音乐"提示
  var tip = document.createElement('div');
  tip.id = 'music-play-tip';
  tip.innerHTML = '🎵 点击播放音乐';
  tip.style.cssText = 'position:fixed;right:40px;bottom:30px;background:#49b1f5;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;cursor:pointer;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2);animation:musicTipBounce 1.5s ease-in-out infinite;';
  var style = document.createElement('style');
  style.textContent = '@keyframes musicTipBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}';
  document.head.appendChild(style);
  document.body.appendChild(tip);

  // 自动播放：用户首次点击/触摸/按键后立即播放
  var autoPlayed = false;
  function autoPlay() {
    if (autoPlayed) return;
    autoPlayed = true;
    window.globalAplayer.play();
    if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
    document.removeEventListener('click', autoPlay);
    document.removeEventListener('touchstart', autoPlay);
    document.removeEventListener('keydown', autoPlay);
  }
  document.addEventListener('click', autoPlay);
  document.addEventListener('touchstart', autoPlay);
  document.addEventListener('keydown', autoPlay);
  // 点击提示也触发播放
  if (tip) tip.addEventListener('click', autoPlay);

  // 切换按钮：点击滑出/收起
  var toggle = document.getElementById('aplayer-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      el.classList.toggle('show');
      toggle.classList.toggle('hide');
    });
  }
}

// DOM 已就绪就直接初始化，否则等 DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMusicPlayer);
} else {
  initMusicPlayer();
}
