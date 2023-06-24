/**
 * External dependencies
 */
import { cosmiconfigSync } from 'cosmiconfig';

/**
 * Default configuration.
 */
const defaultConfig = {
	root: 16,
	minWidth: 500,
	maxWidth: 1920,
};

/**
 * Creates a CSS clamp() function that is supported by all modern browsers.
 */
function clamp(
	minSize: string | number,
	maxSize: string | number,
	minWidth?: string | number,
	maxWidth?: string | number,
	rootSize?: string | number,
): string {
	if (!minSize || !maxSize) {
		return '';
	}
	const root = parseFloat(String(rootSize || defaultConfig.root));

	const config = getConfig();

	const minSizeRem = convertToRem(minSize, root);
	const maxSizeRem = convertToRem(maxSize, root);
	const minWidthRem = convertToRem(minWidth || config.minWidth, root);
	const maxWidthRem = convertToRem(maxWidth || config.maxWidth, root);

	if (
		[minSizeRem, maxSizeRem, minWidthRem, maxWidthRem].some((v) => isNaN(v))
	) {
		return '';
	}

	const slope = (maxSizeRem - minSizeRem) / (maxWidthRem - minWidthRem);
	const yAxisIntersection = toFixed(-minWidthRem * slope + minSizeRem);

	const min = `${toFixed(minSizeRem)}rem`;
	const max = `${toFixed(maxSizeRem)}rem`;
	const preferred = `${yAxisIntersection}rem + ${toFixed(slope * 100)}vw`;

	return `clamp(${min}, ${preferred}, ${max})`;
}

/**
 * Parses a number and unit from a value.
 */
function parseUnit(value: string | number): [number, string] {
	value = String(value).trim();
	const num = parseFloat(value);

	const unitMatches = value.match(/-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
	const unit = unitMatches
		? value.substring(unitMatches[0].length).trim()
		: '';

	return [num, unit];
}

/**
 * Converts a value to rem.
 */
function convertToRem(value: string | number, root: number): number {
	const [num, unit] = parseUnit(value);

	if (unit === 'rem') {
		return num;
	}

	if (unit && unit !== 'px') {
		console.warn(
			`Expected a value without a unit or with a unit of "px" or "rem", but got "${value}"`,
		);
	}

	return num / root;
}

/**
 * Rounds a number to a specified precision.
 */
function toFixed(value: number, precision = 4) {
	return parseFloat(value.toFixed(precision));
}

/**
 * Gets the configuration.
 */
function getConfig(): typeof defaultConfig {
	const explorerSync = cosmiconfigSync('css-clamp');

	const config = explorerSync.search() || { config: {} };

	return {
		...defaultConfig,
		...config.config,
	};
}

export default clamp;