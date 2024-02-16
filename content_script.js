document.body.style.border = "10px solid green";
console.log("test");
var vid_info = document.getElementsByClassName("fp-engine")[0].src;
var trimmedUrl = vid_info.replace(/\.mp4.*$/, ".mp4");
console.log(vid_info);
console.log(trimmedUrl);
browser.runtime.sendMessage(trimmedUrl);