/**
  @param options   -  The options for renaming.

  @returns         -  The new filename for the downloaded file.

  @description     -  This function is used to determine the filename for each downloaded file.
*/
export type RenameFunction = (options: {
	url: string;
	index: number;
	urls: string[];
}) => string;

/*
  Options for the multiDownload function.
 */
export type Options = {
	/**
	  @default undefined  - (use original filenames)

	  @description        - A function that returns the new filename for each downloaded file.
    */
	rename?: RenameFunction;
	/**
	  The delay time between each file download in milliseconds.
	  @default 1000
	 */
	downloadInterval?: number;
};

/**
  @param urls     - The URLs to download.

  @param options  - The options for downloading.

  @returns        - A promise that resolves when all files have been downloaded.

  @description    - Download multiple files from an array of URLs.

  @example
  ```
  import { multiDownload } from "multi-download";

  async function downloadFiles() {

  	const urls = [
  		"https://example.com/file1.txt",
  		"https://example.com/file2.txt",
  		"https://example.com/file3.txt",
  	];

  	try {
  		await multiDownload(urls, {
  			rename: ({ url, index }) => `file${index + 1}.txt`,
  			downloadInterval: 1000,
  		});
  		console.log("Files downloaded successfully");
  	} catch (error) {
  		console.error("Error downloading files:", error);
  	}

  }

  await downloadFiles();
  ```
 */
export default function multiDownload(
	urls: string[],
	options?: Options
): Promise<void>;
