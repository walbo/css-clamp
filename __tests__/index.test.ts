/**
 * Internal dependencies
 */
import clamp from '../src';

const expected8to16 = 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)';
const expected16to32 = 'clamp(1rem, 0.6479rem + 1.1268vw, 2rem)';

describe('clamp', () => {
	it('should handle numbers', () => {
		expect(clamp(8, 16)).toBe(expected8to16);
		expect(clamp(16, 32)).toBe(expected16to32);
	});

	it('should handle strings without unit', () => {
		expect(clamp('8', '16')).toBe(expected8to16);
		expect(clamp('16', '32')).toBe(expected16to32);
	});

	it('should handle strings with px unit', () => {
		expect(clamp('8px', '16px')).toBe(expected8to16);
		expect(clamp('16px', '32px')).toBe(expected16to32);
	});

	it('should handle strings with rem unit', () => {
		expect(clamp('0.5rem', '1rem')).toBe(expected8to16);
		expect(clamp('1rem', '2rem')).toBe(expected16to32);
	});

	it('should handle mixed units', () => {
		expect(clamp('0.5rem', '16px')).toBe(expected8to16);
		expect(clamp('0.5rem', '16')).toBe(expected8to16);
		expect(clamp('0.5rem', 16)).toBe(expected8to16);
		expect(clamp('8px', 16)).toBe(expected8to16);
		expect(clamp('8', 16)).toBe(expected8to16);
		expect(clamp('16px', '2rem')).toBe(expected16to32);
	});

	it('should handle different widths', () => {
		expect(
			clamp(8, 16, {
				minWidth: 100,
				maxWidth: 200,
			}),
		).toBe('clamp(0.5rem, 0rem + 8vw, 1rem)');
	});

	it('should handle different root', () => {
		expect(
			clamp(8, 16, {
				minWidth: 100,
				maxWidth: 200,
				root: 20,
			}),
		).toBe('clamp(0.4rem, 0rem + 8vw, 0.8rem)');
	});

	it('should throw a warning if a unsupported unit is passed', () => {
		const consoleWarnMock = jest
			.spyOn(console, 'warn')
			.mockImplementation();

		// Run with a unsupported unit
		clamp('1cm', 10);

		// Check that the warning was called
		expect(consoleWarnMock).toHaveBeenCalledTimes(1);
		expect(consoleWarnMock).toHaveBeenLastCalledWith(
			'Expected a value without a unit or with a unit of "px" or "rem", but got "1cm"',
		);
	});
});
