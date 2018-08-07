(function(){
    playlist = document.getElementById('playlist');
    audioPlayer = document.getElementById('audio-player');
    videoPlayer = document.getElementById('video-player');
    var busy = false;

    var neverPlayed = true;
    var songPlaying = false;
    console.log(songPlaying);

    window.onload = function() {
        populatePlaylist();
        $('.select-song').on("click", function(){
            determineSongSwitch(this);
        });
        $('#pause-song').on("click", function(){
            pauseSong();
        });
        $('#continue-song').on("click", function(){
            unpauseSong();
        });
        $('#about-link').on("click", function(){
           $('#modal-overlay').fadeIn(500);
        });
        $('#close-icon').on("click", function(){
            $('#modal-overlay').fadeOut(500);
        });
    }

    function populatePlaylist() {
        for (var songTitle in songList) {
            if (songList.hasOwnProperty(songTitle)) {
                console.log(songTitle + " -> " + songList[songTitle]);
                var newSong = document.createElement("LI");
                newSong.innerHTML = songTitle;
                newSong.classList.add("select-song");
                playlist.prepend(newSong);
            }
        }
    }

    function determineSongSwitch(obj){

        if (busy == true) {
            return;
        }

        // if ($('#song-title').is(":visible")) {  // Ensure multiple songs cannot be selected simulataneously
        //     return; 
        // }

        busy = true;
        
        if (neverPlayed === false) { 
            $(videoPlayer).fadeOut(3000, function(){
                displaySongTitle(obj);
            }); 
        } else {
                displaySongTitle(obj);
        }
        $('.select-song').removeClass('active');
        $(obj).addClass('active'); 
    }


    function displaySongTitle(obj) {
        var songName = $(obj).text();

        neverPlayed = false;
  
        $('#pause-song').show();
        $('#continue-song').hide();
        $('#song-title').text(songName);
        $('#song-title').fadeIn(1000); 
        $('#song-title').fadeOut(2000);

        determineSongFade(songName);

    }

        function determineSongFade(obj) {
            if (songPlaying == true) {
                $(audioPlayer).animate({volume: 0}, 2000, function(){
                    changeSongSource(obj);
                });
            } else {
                changeSongSource(obj);
            }
        }

    
    function changeSongSource(obj){
        console.log(songList[obj].audio)



        $(audioPlayer).attr("src", songList[obj].audio);
        $(videoPlayer).attr("src", songList[obj].video);
        $(audioPlayer).autobuffer = true;   
        $(audioPlayer).attr("preload", "auto");
        $(audioPlayer).animate({volume: 1}, 0,);
        $(audioPlayer).trigger('load');
        $(videoPlayer).trigger('load');
        playSong();

    }

    function playSong() {
        $(videoPlayer).hide();
        $(videoPlayer).trigger('play');
        $(audioPlayer).trigger('play');
        $(videoPlayer).fadeIn(3000);
        $('#pause-song').show();
        $('#continue-song').hide();
        songPlaying = true;
        console.log(songPlaying)
        busy = false;
    }

    function pauseSong() {

        if (songPlaying == false) {
            return;
        }

        $(videoPlayer).trigger('pause');
        $(audioPlayer).trigger('pause');
        $('#pause-song').hide();
        $('#continue-song').show();
        songPlaying = false;
    }

    function unpauseSong() {
        $(videoPlayer).trigger('play');
        $(audioPlayer).trigger('play');
        $('#pause-song').show();
        $('#continue-song').hide();
        songPlaying = true;
    }


    var songList = {
        "Orbit": {
            audio: "./resources/audio/orbit.mp3",
            video: "./resources/video/orbit.mp4",
        },
        "Interval": {
            audio: "./resources/audio/interval.mp3",
            video: "./resources/video/interval.mp4",
        },
        "Sonar": {
            audio: "./resources/audio/sonar.mp3",
            video: "./resources/video/sonar.mp4",
        },
        "Rotor": {
            audio: "./resources/audio/rotor.mp3",
            video: "./resources/video/rotor.mp4",
        },
        "Wave": {
            audio: "./resources/audio/wave.mp3",
            video: "./resources/video/wave.mp4",
        },
        "Loom": {
            audio: "./resources/audio/loom.mp3",
            video: "./resources/video/loom.mp4",
        },
    }

})()
