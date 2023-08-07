const delay = milliseconds =>
	new Promise(resolve => {
		setTimeout(resolve, milliseconds);
	});

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

const getName = ({url}) => {
	const match = url.match(/\/([^/]+)$/);
	return match ? match[1] : 'file';
};

export default async function multiDownload(urls = [], options = {}) {
	const {downloadInterval = 1000, rename = getName} = options;
	if (!urls?.length) {
		throw new Error('`urls` required');
	}

	if (urls.every(url => typeof url !== 'string')) {
		throw new Error('`urls` must be an array of strings');
	}

	if (typeof downloadInterval !== 'number') {
		throw new TypeError('`downloadInterval` must be a number');
	}

	if (typeof rename !== 'function') {
		throw new TypeError('`rename` must be a function');
	}

	for (const [index, url] of urls.entries()) {
		const name = rename({url, index, urls});
		await delay(index * downloadInterval); // eslint-disable-line no-await-in-loop
		download(url, name);
	}
}
