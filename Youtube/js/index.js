document.addEventListener("DOMContentLoaded",function (event){
  var inputSearch = document.getElementById("keyword");
  inputSearch.onkeydown = function (event){
    if (event.keyCode == 13){
      loadVideo(this.value);
    }
  }
  loadVideo("buitruonglinh");
});
var model = document.getElementById('myModel');
var span = document.getElementsByClassName("close")[0];
var videoFrame = document.getElementById("video-frame");
span.onclick = function (){
  closeVideo();
}
window.onclick = function (event){
  if (event.target == model){
    closeVideo();
  }
}
function loadVideo(keyword){
  var youtube_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&maxResults=9&part=snippet&key=AIzaSyDrcQ-lf7woZaEzyh39zuRDo5b1f1nVaX4";
  var xhr = new XMLHttpRequest();
  xhr.open("GET",youtube_API,true);
  xhr.onreadystatechange = function (){
    if(this.readyState == 4 && this/status == 200) {

      var responseJson = JSON.parse((this.responseText));//parse tra ve JSON
      var htmlContent = "";

      for (var i = 0; i < responseJson.items.length; i++) {
        if (responseJson.items[i].id.kind == 'youtube#channel') {
          continue;
        }
        var videoID = responseJson.items[i].id.videoId;
        var videoTitle = responseJson.items[i].snippet.title;
        var videoDescription = responseJson.items[i].snippet.description;
        var videoThumbnail = responseJson.items[i].snippet.thumbnails.medium.url;
        htmlContent += '<div class="video" onclick="showVideo(\'' + videoID + '\')">'
        htmlContent += '<img src ="' + videoThumbnail + '">'
        htmlContent += '<div class="title">' + videoTitle + '</div>'
        htmlContent += '</div>'
      }

      document.getElementById("list-video").innerHTML = htmlContent;
    }else if(this.readyState == 4){
      console.log("load fails");
    }
  };
  xhr.send();
}

function closeVideo(){
  model.style.display = "none";
  videoFrame.scr = "";
}

function showVideo(videoId){
  videoFrame.scr = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
  setTimeout(function (){
    model.style.display = "block";
  },300);
}

