var now=new Date();  
function createtime(){  
  var grt=new Date("2022-08-02 00:00:00");  
  now.setTime(now.getTime()+250);  
  var days=(now-grt)/1000/60/60/24;  
  var dnum=Math.floor(days);  
  var hours=(now-grt)/1000/60/60-24*dnum;  
  var hnum=Math.floor(hours);  
  if(String(hnum).length==1)hnum="0"+hnum;  
  var minutes=(now-grt)/1000/60-24*dnum*60-hnum*60;  
  var mnum=Math.floor(minutes);  
  if(String(mnum).length==1)mnum="0"+mnum;  
  var seconds=(now-grt)/1000-24*dnum*60*60-hnum*60*60-mnum*60;  
  var snum=Math.round(seconds);  
  if(String(snum).length==1)snum="0"+snum;  
  document.getElementById("timeDate").innerHTML="本站已运行 "+dnum+" 天 ";  
  document.getElementById("times").innerHTML=hnum+" 小时 "+mnum+" 分 "+snum+" 秒";  
}  
createtime();  
setInterval("createtime()",250);  
  
// 公众号弹窗  
function showQR(){  
  var modal = document.getElementById("qrModal");  
  if(modal){  
    modal.style.display = modal.style.display === "none" ? "block" : "none";  
  }else{  
    var m = document.createElement("div");  
    m.id = "qrModal";  
    m.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;background:#fff;padding:20px;border-radius:10px;box-shadow:0 0 20px rgba(0,0,0,0.5);text-align:center;";  
    m.innerHTML = '<img src="/img/qrcode.jpg" style="width:200px;height:200px;" alt="公众号二维码"><p style="margin-top:10px;color:#333;">扫码关注</p><button onclick="this.parentElement.style.display=\'none\'" style="margin-top:10px;padding:5px 15px;border:none;background:#ff6b81;color:#fff;border-radius:5px;cursor:pointer;">关闭</button>';  
    document.body.appendChild(m);  
  }  
}  
  
// 同步不蒜子统计  
function updateBusuanzi(){  
  var uv = document.getElementById("busuanzi_value_site_uv");  
  var pv = document.getElementById("busuanzi_value_site_pv");  
  if(uv && uv.innerHTML) document.getElementById("footer_site_uv").innerHTML = uv.innerHTML;  
  if(pv && pv.innerHTML) document.getElementById("footer_site_pv").innerHTML = pv.innerHTML;  
}  
setInterval(updateBusuanzi, 1000);  
