'use strict';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const download = async (url, name) => {
	const a = document.createElement('a');
	a.download = name;
	a.href = url;
	a.style.display = 'none';
	document.body.append(a);
	a.click();

	// Chrome requires the timeout
	await delay(100);
	a.remove();
};

module.exports = async (urls, options = {}) => {
	if (!urls) {
		throw new Error('`urls` required');
	}

	for (const [index, url] of urls.entries()) {
		const name = typeof options.rename === 'function' ? options.rename({url, index, urls}) : '';

		await delay(index * 1000);
		download(url, name);
	}
};
