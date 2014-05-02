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

	function multiDownload(urls) {
		if (!urls) {
			throw new Error('`urls` required');
		}

		if (typeof document.createElement('a').download === 'undefined') {
			return fallback(urls);
		}

		urls.forEach(function (url) {
			var a = document.createElement('a');
			console.log('yo');
			a.download = '';
			a.href = url;
			// firefox doesn't support `a.click()`...
			a.dispatchEvent(new MouseEvent('click'));
		});
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = multiDownload;
	} else {
		window.multiDownload = multiDownload;
	}
})();
