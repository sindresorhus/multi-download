const delay = milliseconds => new Promise(resolve => {
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

export default async function multiDownload(urls, {rename} = {}) {
	if (!urls) {
		throw new Error('`urls` required');
	}

	for (const [index, url] of urls.entries()) {
		const name = typeof rename === 'function' ? rename({url, index, urls}) : '';

		await delay(index * 1000);
		download(url, name);
	}
}
