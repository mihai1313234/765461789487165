// console.log('Jay Shree Krishna');

let audioElement = new Audio('./DekhaEk.mp3');
const progressBar = document.querySelector('#progressBar');
const play_pause = document.querySelectorAll('.playPause');
let input = document.getElementsByTagName('input')[0];
console.log(play_pause);
let progress = null;

play_pause.forEach(function(elem){
    elem.addEventListener('click', playPause);
});

function playPause(){
    if(audioElement.paused || audioElement.currentTime <= 0){
             audioElement.play();
        console.log('clicked on paly');
       play_pause.forEach(function(elem){

           elem.classList.replace('fa-play', 'fa-pause');
           elem.title = 'pause';
        });
        
    }else{
        audioElement.pause();
        console.log('clicked on pause')
           play_pause.forEach(function(elem){

               elem.classList.replace('fa-pause', 'fa-play');
               elem.title = 'play';
            });
    };
}

audioElement.addEventListener('timeupdate', function(){
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(progress);
    progressBar.value = progress;
});

progressBar.addEventListener('change', function(x){
      audioElement.currentTime = ((progressBar.value / 100) * audioElement.duration);
      playPause();
});
audioElement.onended = function(){
    playPause();
}
input.onseeking = function(){
    console.log('seeking');
}