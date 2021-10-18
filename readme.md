# multi-download

> Download multiple files at once in the browser

![](screenshot.gif)

It works by abusing the `a`-tag [`download` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download).

## [Demo](https://sindresorhus.com/multi-download/)

## Install

```sh
npm install multi-download
```

*Note: This package targets the latest versions of Chrome, Firefox, and Safari.*

## Usage

```html
<button id="download-button" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
import multiDownload from 'multi-download';

document.querySelector('#download-button').addEventListener('click', event => {
	const files = event.target.dataset.files.split(' ');
	multiDownload(files);
});
```

```js
import multiDownload from 'multi-download';

// With jQuery
$('#download-button').on('click', () => {
	const files = $(this).data('files').split(' ');
	multiDownload(files);
});
```

```js
import multiDownload from 'multi-download';

// With Blob
const unicorn = URL.createObjectURL(new Blob(['🦄'], {type: 'text/plain'}));
const goat = URL.createObjectURL(new Blob(['🐐'], {type: 'text/plain'}));
multiDownload([unicorn, goat]);
```

## API

### multiDownload(urls, options?)

Returns a `Promise` that resolves when all the downloads have started.

Note that there's a delay of 1 second between each download.

#### urls

Type: `string[]`

The URLs to files you want to download. Can be absolute or relative, even cross-origin.

#### options

Type: `object`

##### rename

Type: `Function`

A function tht accepts an object containing `url`, `index`, and `urls` properties and is expected to return the new filename.

```html
<button id="download-button" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
import multiDownload from 'multi-download';

document.querySelector('#download-button').addEventListener('click', event => {
	const files = event.target.dataset.files.split(' ');
	multiDownload(files, {
		rename: ({url, index, urls}) => 'New name.pdf'
	});
});
```

## Caveats

If the user has enabled "Ask where to save each file before downloading" in Chrome, it will only download the first file.
