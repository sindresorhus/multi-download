export type RenameInfo = {
	/**
	The URL being downloaded.
	*/
	readonly url: string;

	/**
	The index of the URL in the array.
	*/
	readonly index: number;

	/**
	The array of all URLs being downloaded.
	*/
	readonly urls: readonly string[];
};

export type Options = {
	/**
	A function to rename the downloaded files.

	**Note:** Only works for same-origin URLs or blob/data URLs due to browser security restrictions. Cross-origin URLs will download with their original names.

	@example
	```
	multiDownload(urls, {
		rename: ({url, index}) => `file-${index}.txt`
	});
	```
	*/
	readonly rename?: (info: RenameInfo) => string;
};

/**
Download multiple files at once in the browser.

@param urls - The URLs to download. Can be absolute or relative, even cross-origin.
@returns A promise that resolves when all downloads have started.

@example
```
import multiDownload from 'multi-download';

const urls = [
	'https://example.com/file1.jpg',
	'https://example.com/file2.jpg'
];

await multiDownload(urls);
```

@example
```
import multiDownload from 'multi-download';

await multiDownload(urls, {
	rename: ({url, index}) => `renamed-file-${index}.txt`
});
```
*/
export default function multiDownload(urls: readonly string[], options?: Options): Promise<void>;
