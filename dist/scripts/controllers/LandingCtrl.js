(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn the Music up!";
	}

	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();