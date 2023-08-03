declare module "multi-download" {
	/**
	 * Download multiple files at once
	 * @param urls The urls to download
	 * @param options The options
	 * @param options.rename The function to rename the file
	 * @param options.delayTime The delay time between each download
	 */
	export default async function multiDownload(
		urls: string[],
		options?: {
			rename?: (options: {
				url: string;
				index: number;
				urls: string[];
			}) => string;
			delayTime?: number;
		}
	): void;
}
