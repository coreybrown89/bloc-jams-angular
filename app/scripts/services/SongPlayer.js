(function() {
	function SongPlayer(Fixtures) {
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
        		currentBuzzObject.stop();
        		SongPlayer.currentSong.playing = null;
    		}
 
    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});
 
    		SongPlayer.currentSong = song;
 		};

 		/**
 		* @desc Active song object from list of songs
 		* @type {Object}
 		*/
 		SongPlayer.currentSong = null;

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
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};


		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);

})();