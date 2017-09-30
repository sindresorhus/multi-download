# multi-download

> Download multiple files at once

![](screenshot.gif)

It works by abusing the `a`-tag [`download` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) and falling back to iframes on older browsers.


## [Demo](http://sindresorhus.com/multi-download)


## Install

```
$ npm install --save multi-download
```


## Usage

```html
<button id="download-btn" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-btn').addEventListener('click', function (e) {
	var files = e.target.dataset.files.split(' ');
	multiDownload(files);
});
```

```js
// with jQuery
$('#download-btn').on('click', function () {
	var files = $(this).data('files').split(' ');
	multiDownload(files);
});
```

## Usage (rename)

```html
<button id="download-rename-btn" data-files="unicorn.jpg rainbow.jpg">Download</button>
```

```js
document.querySelector('#download-rename-btn').addEventListener('click', function (e) {
	var files = e.target.dataset.files.split(' ');
	multiDownload(files, function ({ url, index, urls}) {
		return 'new name.pdf'
	});
});
```

Rename doesn't work when using the fallback

## API

### multiDownload(urls)
### multiDownload({ urls, renameFn })

#### urls

Type: `array`

URLs to files you want to download.

#### renameFn

Type: `function`

Function which accepts an object containing `url`, `index` and `urls` and
returns the `filename` it should be downloaded with

## Caveats

Chrome will ask the user before downloading multiple files (once per domain).

For the fallback to work you need to make sure the server sends the correct header for the browser to download the file rather than displaying it. This is usually achieved with the header `Content-Disposition: attachment; filename="<file name.ext>" `.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
