$(function () {
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		console.log('SPだよ！');
		$('body').append('<script src="../js/main_sp.js"></script>');
		$('body').append('<script src="../js/vendor/sp_plugin.js"></script>');
	}else {
		console.log('PCだよ！');
		$('body').append('<script src="../js/main_pc.js"></script>');
		$('body').append('<script src="../js/vendor/pc_plugin.js"></script>');
	}
});