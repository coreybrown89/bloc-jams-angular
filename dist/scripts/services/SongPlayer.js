(function() {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};

		/**
		* @desc Get current album
		* @param {Object} song
		*/
		var currentAlbum = Fixtures.getAlbum();

		/**
		* @function getSongIndex
		* @desc Gets the song number of the current song playing
		* @param {Object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		 var setSong = function(song) {
    		if (currentBuzzObject) {
        		stopSong(song);
    		}
 
    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});

    		currentBuzzObject.bind('timeupdate', function() {
    			$rootScope.$apply(function() {
    				SongPlayer.currentTime = currentBuzzObject.getTime();
    			});
    		});
 
    		SongPlayer.currentSong = song;
 		};

 		/**
 		* @desc Active song object from list of songs
 		* @type {Object}
 		*/
 		SongPlayer.currentSong = null;

 		/**
 		* @desc Current playback time (in seconds) of currently playing song
 		* @type {Number}
 		*/
 		SongPlayer.currentTime = null;

 		/**
 		* @function setCurrentTime
 		* @desc Set current time (in seconds) of currently playing song
 		* @param {Number} time
 		*/
 		SongPlayer.setCurrentTime = function(time) {
 			if (currentBuzzObject) {
 				currentBuzzObject.setTime(time);
 			}
 		};


 		/**
		* @function playSong
		* @desc Plays currently selected song and updates song.playing property
		* @param {Object} song
 		*/
 		var playSong = function(song) {
 			currentBuzzObject.play();
 			song.playing = true;	
 		};

 		/**
		* @function stopSong
		* @desc Stops current playing song and updates playing property
		* @param {Object} song
 		*/
 		var stopSong = function(song) {
 			currentBuzzObject.stop();
 			SongPlayer.currentSong.playing = null;
 		};

 		/**
		* @function play
		* @desc Play current or new song
		* @param {Object} song
 		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song); 
				playSong(song);
				
     		} else if (SongPlayer.currentSong === song) {
         		if (currentBuzzObject.isPaused()) {
             		playSong(song);
         		}
     		}
 		};
		
		/**
		* @function pause
		* @desc Pauses currently playing song 
		* @param {Object} song
 		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function previous
		* @desc Finds current song index and decrements by one 
		* @param {Object} song
 		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;


			if (currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function next
		* @desc Finds current song index and increments by one 
		* @param {Object} song
 		*/
 		SongPlayer.next = function() {
 			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
 			currentSongIndex++;

 			var song = currentAlbum.songs[currentSongIndex];
 			setSong(song);
 			playSong(song);

 			
 		};

 		/**
 		* @desc Volume of current playing song
 		* @type {Number}
 		*/
 		SongPlayer.volume = null;

 		/**
		* @function setVolume
		* @desc Sets volume of current playing song 
		* @param {Object} number
 		*/
 		SongPlayer.setVolume = function(value) {
 			if (currentBuzzObject) {
 				currentBuzzObject.setVolume(value);
 				SongPlayer.volume = value;
 			}
 		};


		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();