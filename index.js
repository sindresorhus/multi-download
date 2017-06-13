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
			if (frame.contentWindow.document.readyState === 'complete'
			|| frame.contentWindow.document.readyState === 'interactive') {
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

function isFirefox() {
	// sad panda :(
	return /Firefox\//i.test(navigator.userAgent);
}

function sameDomain(url) {
	var a = document.createElement('a');
	a.href = url;

	return location.hostname === a.hostname && location.protocol === a.protocol;
}

function download(url, name) {
	var a = document.createElement('a');
	a.download = name || '';
	a.href = url;
	// firefox doesn't support `a.click()`...
	a.dispatchEvent(new MouseEvent('click'));
}

module.exports = function (urls, renameFn) {
	if (!urls) {
		throw new Error('`urls` required');
	}
	if (!renameFn) {
		renameFn = function () { return ''; };
	}

	if (typeof document.createElement('a').download === 'undefined') {
		return fallback(urls);
	}

	var delay = 0;

	urls.map(function (url, index, urls) {
		return {
			url: url,
			name: renameFn(url, index, urls)
		};
	}).forEach(function (obj) {
		// the download init has to be sequential for firefox if the urls are not on the same domain
		if (isFirefox() && !sameDomain(obj.url)) {
			return setTimeout(download.bind(null, obj.url, obj.name), 100 * ++delay);
		}

		download(obj.url, obj.name);
	});
};
