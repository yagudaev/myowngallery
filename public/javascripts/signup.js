(function () {
	var el = '#signup',
		$el = $('#signup');

	/**
	 * Createa an md5 based on the email as the gvatar specifictaion says.
	 */
	function createImageHash(str) {
	    var result = '';

	    str = str.trim().toLowerCase();

	    if (str) {
	        result = $.MD5(str);
	    }

	    return result;
	}

	$(document).ready(function() {
		$('#txtEmail', el).blur(function() {
			$('#profilePicture').attr('src', 'http://www.gravatar.com/avatar/' + createImageHash($(this).val()));
		});
	});
}());