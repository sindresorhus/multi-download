(function () {
	'use strict';

	function fallback(urls) {
		var i = 0;

		(function createIframe() {
			var frame = document.createElement('iframe');
			frame.style.display = 'none';
			frame.src = urls[i++];
			document.documentElement.appendChild(frame);

			// the download init has to be sequential otherwise IE only use the first
			var interval = setInterval(function () {
				if (frame.contentWindow.document.readyState === 'complete') {
					clearInterval(interval);

					// Safari needs a timeout
					setTimeout(function () {
						frame.parentNode.removeChild(frame);
					}, 1000);

					if (i < urls.length) {
						createIframe();
					}
				}
			}, 100);
		})();
	}
	
	function sameDomain(url) {
	  	// detect (protocol:)//
		if (! /^([a-z]+:)?\/\//i.test(url)) {
	  		return true;
	  	}
	  	
	  	var host = location.protocol + '//' + location.hostname;
	  	
	  	// detect the same domain AND protocol
	  	return (! url.replace(/^\/\//, location.protocol + '//').indexOf(host));
	}
	
	function download(url) {
		var a = document.createElement('a');
		a.download = '';
		a.href = url;
		// firefox doesn't support `a.click()`...
		a.dispatchEvent(new MouseEvent('click'));
	}

	function multiDownload(urls) {
		if (!urls) {
			throw new Error('`urls` required');
		}

		if (typeof document.createElement('a').download === 'undefined') {
			return fallback(urls);
		}
		
		var delay = 0;

		urls.forEach(function (url) {
			if (sameDomain(url)) {
				download(url);	
			} else {
				// the download init has to be sequential for firefox if the urls are not on the same domain
				setTimeout( download.bind( null, url ), 100 * (++delay));
			}
		});
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = multiDownload;
	} else {
		window.multiDownload = multiDownload;
	}
})();
