// console.log('Jay Shree Krishna');

//                         INITIALING VALUE OF ALL ELEMENT

let audioElement = new Audio('./musics/DekhaEk.mp3');
const progressBar = document.querySelector('#progressBar');
const play_pause = document.querySelectorAll('.playPause');
let input = document.getElementsByTagName('input')[0];
let playback = document.querySelector('.played');
let duration = document.querySelector('.duration');
const bar = document.querySelector('.bar-progress');
let fullDuration;
let currentTime;
let progress = null;
let list = false;
let root = './musics';
let coverRoot = './covers';

//                                  SONGS OBJECT

let editAudio = [
  {
    title: 'DekhaEk',
    url : `${root}/DekhaEk.mp3`,
    singer: 'Kishore Kumar',
    type: '90\'s, 90s',
    cover: 'https://th.bing.com/th?id=OVP.zGJ9loXWXd4kjzkDv2FasQHgFo&w=530&h=298&c=7&rs=1&qlt=90&o=6&pid=1.7'
  },{
    title : 'Aam Jahe Munde Bande',
    url: `${root}/aam_Jahe_munde.m4a`,
    singer: `Parmish Verma`, 
    cover: 'https://tse1.mm.bing.net/th?&id=OVP.J7oMMDlyrYIMWK01nbSMXgHgFo&w=528&h=298&c=7&pid=1.7&rs=1',
    type: `punjabi,haryanvi,hindi,modern`
  },{
    title : 'Baazigar Edit Audio',
    url: `${root}/baazigar_editaudio.m4a`,
    singer: `Sahrukh Khan (SRK)`,
    type: '90s, 90\'s',
    cover: 'https://th.bing.com/th?id=OVP.apbbXsDzg9gQZ8FNhMJ6zQHgFo&w=206&h=115&c=7&rs=1&qlt=90&o=6&pid=1.7'
  },{
    title: 'Cheques -Edit audi',
    url: `${root}/cheques_edit.m4a`,
    singer: 'subh',
    type: 'gangsta, punjabi, goosebumps'
  }
];

//                          JALDI WAHA SE HATO

audioElement.addEventListener('loadeddata', function(e){
intialTime(playback);
listDuration(duration);
})

//                   PLAY PAUSE BUTTON EVENT LISTENER

play_pause.forEach(function(elem){
    elem.addEventListener('click', playPause);
});

//                   PLAY PAUSE FUNCTION

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

//                    AUDIO TIME CHANGE EVENT LISTENER

audioElement.addEventListener('timeupdate', function(){

    //     UPDATING PROGRESS BAR/SEEK BAR
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = progress;
    bar.style.width = `${progress}%`;

    //            PLAY BACK DURATION UPDATING
        playBackUpdate();
        //   console.log(audioElement.duration - audioElement.currentTime);

        duration.textContent = durationLeft(audioElement);
});

//                     MANUAL SONG'S TIME CHANGE WITH SEEK BAR

progressBar.addEventListener('change', function(x){
      audioElement.currentTime = ((progressBar.value / 100) * audioElement.duration);
      audioElement.play();
});

//                        WHEN AUDIO FINISHED PLAYING

audioElement.onended = function(){
    playPause();
}

function playBackUpdate(){
    let minute = Math.floor(audioElement.currentTime / 60);

    minute = minute > 9 ? minute : `0${minute}`;
 
    let second = Math.floor(audioElement.currentTime % 60);
    second = second > 9 ? second : `0${second}`;

    let durMin = Math.floor(audioElement.duration/60);
    durMin = durMin > 9 ? durMin : `0${durMin}`;
    
    let durSec = Math.floor(audioElement.duration % 60);
    
    durSec = durSec > 9 ? durSec : `0${durSec}`;
    
    
    
    currentTime = `${minute}:${second}`;
    fullDuration = `${durMin}:${durSec}`;
    playback.textContent = `${currentTime}/${fullDuration}`;
};

function intialTime(target){
      console.log(audioElement.duration);
    let durMin = Math.floor(audioElement.duration/60);
    durMin = durMin > 9 ? durMin : `0${durMin}`;
    
    let durSec = Math.floor(audioElement.duration % 60);
    
    durSec = durSec > 9 ? durSec : `0${durSec}`;

    fullDuration = `${durMin}:${durSec}`;
    if(list){

        target.textContent = `${fullDuration}`;
    }else{
        
        target.textContent = `00:00/${fullDuration}`;
    }

}

function listDuration(elem){
     list = true;
     intialTime(elem);
     list = false;
}

document.addEventListener('keydown', function(e){
    console.log(e);
    if(e.code === 'Space'){
        playPause();
    }
});

function durationLeft(elem){
let timeLeft = elem.duration - elem.currentTime;
let leftMin = Math.floor((timeLeft/60)).toFixed();

leftMin = leftMin > 9 ? leftMin : `0${leftMin}`;

let leftSec = Math.floor(timeLeft % 60).toFixed();
leftSec = leftSec > 9 ? leftSec : `0${leftSec}`;

return `${leftMin}:${leftSec}`;
};