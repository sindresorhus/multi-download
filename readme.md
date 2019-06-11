# multi-download

> Download multiple files at once in the browser

![](screenshot.gif)

It works by abusing the `a`-tag [`download` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) and falling back to iframes on older browsers.


## [Demo](http://sindresorhus.com/multi-download)


## Install

```
$ npm install multi-download
```

*Note: This package targets the latest versions of Chrome, Firefox, and Safari. It's up to you to transpile the code if you want to support older browsers.*


## Usage

```html
<button id="download-btn" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-btn').addEventListener('click', event => {
	const files = event.target.dataset.files.split(' ');
	multiDownload(files);
});
```

```js
// With jQuery
$('#download-btn').on('click', () => {
	const files = $(this).data('files').split(' ');
	multiDownload(files);
});
```

### Rename

```html
<button id="download-rename-btn" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-rename-btn').addEventListener('click', event => {
	const files = e.target.dataset.files.split(' ');
	multiDownload(files, ({url, index, urls}) => 'New name.pdf');
});
```

Note: Rename doesn't work when using the fallback.


## API

### multiDownload(urls, options?)

#### urls

Type: `string[]`

URLs to files you want to download.

#### options

Type: `object`

##### rename

Type: `Function`

A function tht accepts an object containing `url`, `index`, and `urls` properties and is expected to return the new filename.


## Caveats

Chrome will ask the user before downloading multiple files (once per domain).

If the user has enabled "Ask where to save each file before downloading" in Chrome, it will only download the first file.

For the fallback to work, you need to make sure the server sends the correct header for the browser to download the file rather than displaying it. This is usually achieved with the header `Content-Disposition: attachment; filename="<file name.ext>" `.
