# css-clamp

## Installation

```sh
npm install css-clamp
```

## Usage

The `clamp` function takes 3 arguments:

-   `minSize`: The minimum size in number, pixels or rems.
-   `maxSize`: The maximum size in number, pixels or rems.
-   `config`: The config object. Optional. The object can have the following
    properties:
    -   `minWidth`: The minimum viewport width in number, pixels or rems.
    -   `maxWidth`: The maximum viewport width in number, pixels or rems.
    -   `root`: The root font size in number or pixels.

```js
import clamp from 'css-clamp';

// With default min and max width
clamp(16, 32); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'
clamp('16px', '32px'); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'
clamp('1rem', '2rem'); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'

// With custom min and max width
clamp(16, 32, {
	minWidth: 400,
	maxWidth: 1000,
}); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'
clamp('16px', '32px', {
	minWidth: '400px',
	maxWidth: '1000px',
}); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'
clamp('1rem', '2rem', {
	minWidth: '25rem',
	maxWidth: '62.5rem',
}); // 'clamp(0.5rem, 0.3239rem + 0.5634vw, 1rem)'

// With custom root font size
clamp(16, 32, {
	root: 20,
}); // 'clamp(0.8rem, 0.2667rem + 2.6667vw, 1.6rem)'
```

## Setting default config

The function supports cosmiconfig and you can set default `minWidth`, `maxWidth`
and `rootSize` in your package.json file:

```json
{
	"css-clamp": {
		"minWidth": 500,
		"maxWidth": 1920,
		"rootSize": 16
	}
}
```
