/**
  Function to rename downloaded files.
 */
/**
	 * This function is used to determine the filename for each downloaded file.
	 * @param options - The options for renaming.
	 * @returns The new filename for the downloaded file.
	 */
export type RenameFunction = (options: {url: string; index: number; urls: string[]}) => string;

/**
  Options for the multiDownload function.
 */
export type MultiDownloadOptions = {
	/**
	  The function to rename the downloaded files.
	  @default undefined (use original filenames)
	 */
	rename?: RenameFunction;

	/**
	  The delay time between each file download in milliseconds.
	  @default 1000
	 */
	downloadInterval?: number;
};

/**
  Download multiple files from an array of URLs.
  @param urls - The URLs to download.
  @param options - The options for downloading.
  @returns A promise that resolves when all files have been downloaded.
  @example
  ```
  import { multiDownload } from 'multi-download';

  async function downloadFiles() {
    const urls = [
      'https://example.com/file1.txt',
      'https://example.com/file2.txt',
      'https://example.com/file3.txt',
    ];

    try {
      await multiDownload(urls, {
        rename: ({ url, index }) => `file${index + 1}.txt`,
        downloadInterval: 1000,
      });
      console.log('Files downloaded successfully');
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  }

  downloadFiles();
  ```
 */
export default function multiDownload(
	urls: string[],
	options?: MultiDownloadOptions
): Promise<void>;
