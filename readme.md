# multi-download

> Download multiple files at once in the browser

![](screenshot.gif)

It works by abusing the `a`-tag [`download` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download).


## [Demo](http://sindresorhus.com/multi-download)


## Install

```
$ npm install multi-download
```

*Note: This package targets the latest versions of Chrome, Firefox, and Safari.*


## Usage

```html
<button id="download-button" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-button').addEventListener('click', event => {
	const files = event.target.dataset.files.split(' ');
	multiDownload(files);
});
```

```js
// With jQuery
$('#download-button').on('click', () => {
	const files = $(this).data('files').split(' ');
	multiDownload(files);
});
```


## API

### multiDownload(urls, options?)

Returns a `Promise` that resolves when all the downloads have started.

Note that there's a delay of 1 second between each download.

#### urls

Type: `string[]`

URLs to files you want to download. Can be absolute or relative, even cross-origin.

#### options

Type: `object`

##### rename

Type: `Function`

A function tht accepts an object containing `url`, `index`, and `urls` properties and is expected to return the new filename.

```html
<button id="download-button" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-button').addEventListener('click', event => {
	const files = event.target.dataset.files.split(' ');
	multiDownload(files, ({url, index, urls}) => 'New name.pdf');
});
```


## Caveats

If the user has enabled "Ask where to save each file before downloading" in Chrome, it will only download the first file.
