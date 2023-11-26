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
const allMusics = document.querySelector('.items');
let newaudio = new Audio();
//                                  SONGS OBJECT

let editAudio = [
  {
    title: 'Dekha Ek Khwab',
    url: `${root}/DekhaEk.mp3`,
    singer: 'Kishore Kumar',
    type: '90\'s, 90s',
    cover: 'https://th.bing.com/th?id=OVP.zGJ9loXWXd4kjzkDv2FasQHgFo&w=530&h=298&c=7&rs=1&qlt=90&o=6&pid=1.7'
  }, {
    title: 'Aam Jahe Munde Bande',
    url: `${root}/aam_Jahe_munde.m4a`,
    singer: `Parmish`,
    cover: 'https://tse1.mm.bing.net/th?&id=OVP.J7oMMDlyrYIMWK01nbSMXgHgFo&w=528&h=298&c=7&pid=1.7&rs=1',
    type: `punjabi,haryanvi,hindi,modern`
  }, {
    title: 'Baazigar Edit Audio',
    url: `${root}/baazigar_editaudio.m4a`,
    singer: `Sahrukh`,
    type: '90s, 90\'s',
    cover: 'https://th.bing.com/th?id=OVP.apbbXsDzg9gQZ8FNhMJ6zQHgFo&w=206&h=115&c=7&rs=1&qlt=90&o=6&pid=1.7'
  }, {
    title: 'Cheques Subh',
    url: `${root}/cheques_edit.m4a`,
    singer: 'subh',
    type: 'gangsta, punjabi, goosebumps',
    cover: 'https://th.bing.com/th/id/OIP.4fiQ88mi2BtHjXZGAHShRAHaEK?w=328&h=184&c=7&r=0&o=5&pid=1.7'
  }, {
    title: 'Bom Diggy Diggy',
    url: `${root}/bom diggy diggy [edit audio].m4a`,
    singer: 'unknown',
    type: 'romantic, mood, cool, study, chill',
    cover: 'https://th.bing.com/th?id=OSK.d680fdb168bdbd19cc6dcabf4274e8aa&w=648&h=339&c=3&rs=1&o=6&pid=SANGAM'
  }, {
    title: 'Baller Subh',
    url: `${root}/baller_edit.m4a`,
    singer: 'subh',
    type: 'gangsta, punjabi, goosebumps',
    cover: 'https://th.bing.com/th?id=OVP.a5GqvRvw8sO_U79L2IRbSwEsDh&w=197&h=110&c=7&rs=1&qlt=90&o=6&pid=1.7'
  }, {
    title: 'No Love',
    url: `${root}/NO LOVE - SHUBH [Audio Edit] Foreverrainj.m4a`,
    singer: 'subh',
    type: 'gangsta, punjabi, attitude',
    cover: 'https://tse1.mm.bing.net/th?&id=OVP.qIeEJyUxNDL_j5oAXB6Q8wEsDh&w=608&h=342&c=7&pid=1.7&rs=1'
  }
];

// Assuming audioElement is declared as: let audioElement = new Audio();

editAudio.forEach(function (elem, index) {
  // Create a new Audio element for each iteration
  let newaudio = new Audio(elem.url);

  // Add an event listener to the new Audio element
  newaudio.addEventListener('loadedmetadata', function (e) {
    // This event listener will be executed for each new audio element
    list = true;

    allMusics.innerHTML += `
      <li class="item">
        <img src=${elem.cover} alt="cover" />
        <h1 class="title">${elem.title}</h1>
        <p class="company">${elem.singer}</p>
        <p class="helo">
          <span class="duration">${intialTime(newaudio)}</span>
          <i class="fa-solid fa-play playPause event" id=${index} title="play" style="margin-left: 12px; outline: 1px solid rgb(250, 247, 247); border-radius: 50%; outline-offset: 5px; padding: 0px 3px;"></i>
        </p>
      </li>
    `;

    const events = document.querySelectorAll('.event');
    events.forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        console.log(editAudio[elem.id]);
        audioElement.src = editAudio[elem.id].url;
        input.value = 0;
        document.getElementById('thumnail').src = editAudio[elem.id].cover;
        playPause();
      });
    });
  });

  // Set the src after adding the event listener
  newaudio.src = elem.url;
});


//                          JALDI WAHA SE HATO
function playPause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    console.log('clicked on paly');
    play_pause.forEach(function (elem) {
      console.log(play_pause);
      elem.classList.replace('fa-play', 'fa-pause');
      elem.title = 'pause';
    });

  } else {
    audioElement.pause();
    console.log('clicked on pause')
    play_pause.forEach(function (elem) {

      elem.classList.replace('fa-pause', 'fa-play');
      elem.title = 'play';
    });
  };
}

function intialTime(target) {
  console.log(target.duration);
  let durMin = Math.floor(target.duration / 60);
  durMin = durMin > 9 ? durMin : `0${durMin}`;

  let durSec = Math.floor(target.duration % 60);

  durSec = durSec > 9 ? durSec : `0${durSec}`;

  fullDuration = `${durMin}:${durSec}`;
  if (list) {

    // target.textContent = `${fullDuration}`;
    return fullDuration;
  } else {

    target.textContent = `00:00/${fullDuration}`;
  }
}

!function () {

  //            LOADED META DATA EVENT - DURATION SET TO MUSICS
  audioElement.addEventListener('loadeddata', function (e) {
    intialTime(playback);
    listDuration(duration);
  });

  //                   PLAY PAUSE STATE CHANGE WITH  

  play_pause.forEach(function (elem) {
    elem.addEventListener('click', playPause);
  });

  //                   PLAY PAUSE FUNCTION


  //                    AUDIO TIME CHANGE EVENT LISTENER

  audioElement.addEventListener('timeupdate', function () {

    //     UPDATING PROGRESS BAR/SEEK BAR
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
    bar.style.width = `${progress}%`;

    //            PLAY BACK DURATION UPDATING
    playBackUpdate();
    //   console.log(audioElement.duration - audioElement.currentTime);

    // duration.textContent = durationLeft(audioElement);
  });

  //                     MANUAL SONG'S TIME CHANGE WITH SEEK BAR

  progressBar.addEventListener('change', function (x) {
    audioElement.currentTime = ((progressBar.value / 100) * audioElement.duration);
    audioElement.play();
    console.log(x);
  });

  //                        WHEN AUDIO FINISHED PLAYING

  audioElement.onended = function () {
    console.log('Song Ended');
  }



  function playBackUpdate() {
    let minute = Math.floor(audioElement.currentTime / 60);

    minute = minute > 9 ? minute : `0${minute}`;

    let second = Math.floor(audioElement.currentTime % 60);
    second = second > 9 ? second : `0${second}`;

    let durMin = Math.floor(audioElement.duration / 60);
    durMin = durMin > 9 ? durMin : `0${durMin}`;

    let durSec = Math.floor(audioElement.duration % 60);

    durSec = durSec > 9 ? durSec : `0${durSec}`;



    currentTime = `${minute}:${second}`;
    fullDuration = `${durMin}:${durSec}`;
    playback.textContent = `${currentTime}/${fullDuration}`;
  };


  function listDuration(elem) {
    list = true;
    intialTime(elem);
    list = false;
  }

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
      playPause();
    }
  });

  function durationLeft(elem) {
    let timeLeft = elem.duration - elem.currentTime;
    let leftMin = Math.floor((timeLeft / 60)).toFixed();

    leftMin = leftMin > 9 ? leftMin : `0${leftMin}`;

    let leftSec = Math.floor(timeLeft % 60).toFixed();
    leftSec = leftSec > 9 ? leftSec : `0${leftSec}`;

    return `${leftMin}:${leftSec}`;
  };

}();