(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.multiDownload = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// TODO: Remove this sometime in the future
const fallback = urls => {
	let i = 0;

	(function createIframe() {
		const frame = document.createElement('iframe');
		frame.style.display = 'none';
		frame.src = urls[i++];
		document.documentElement.append(frame);

		// The download init has to be sequential otherwise IE only uses the first
		const intervalId = setInterval(() => {
			if (
				frame.contentWindow.document.readyState === 'complete' ||
				frame.contentWindow.document.readyState === 'interactive'
			) {
				clearInterval(intervalId);

				// Safari needs a timeout
				setTimeout(() => {
					frame.parentNode.removeChild(frame);
				}, 1000);

				if (i < urls.length) {
					createIframe();
				}
			}
		}, 100);
	})();
};

const isFirefox = () => /Firefox\//i.test(navigator.userAgent);

const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const sameDomain = url => {
	const a = document.createElement('a');
	a.href = url;
	return location.hostname === a.hostname && location.protocol === a.protocol;
};

const download = (url, name) => {
	const a = document.createElement('a');
	a.download = name;
	a.href = url;

	// Firefox doesn't support `a.click()`
	a.dispatchEvent(new MouseEvent('click'));
};

module.exports = (urls, options = {}) => {
	if (!urls) {
		throw new Error('`urls` required');
	}

	if (typeof document.createElement('a').download === 'undefined') {
		return fallback(urls);
	}

	let delay = 0;

	for (const [index, url] of urls.entries()) {
		const name = typeof options.rename === 'function' ? options.rename({url, index, urls}) : '';

		if (isFirefox() || isSafari()) {
			setTimeout(() => {
				download(url, name);
			}, ++delay * 100);

			continue;
		}

		download(url, name);
	}
};

},{}]},{},[1])(1)
});
