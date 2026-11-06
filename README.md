# @lp-labs/css-length-value

Strict CSS length token parsing and conversion for px, rem, em, viewport and percentage units.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/css-length-value
```

## Working example

```js
import { parseLength, toPixels } from '@lp-labs/css-length-value';
const length = parseLength('1.5rem');
if (toPixels(length, { rootFontSize: 16 }) !== 24) throw new Error('Unexpected conversion');
```

CommonJS: `const api = require('@lp-labs/css-length-value')`.

## Behavior, customization and limits

Parses one signed decimal length token with px, rem, em, vw, vh or %. Conversion requires explicit finite root/font/viewport/percentage bases. It does not evaluate calc(), layout, writing modes or CSS cascade.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export type Unit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%';
export interface Length {
  readonly value: number;
  readonly unit: Unit;
}
export interface Bases {
  readonly rootFontSize?: number;
  readonly fontSize?: number;
  readonly viewportWidth?: number;
  readonly viewportHeight?: number;
  readonly percentBase?: number;
}
export declare function parseLength(text: string): Length;
export declare function toPixels(length: Length, bases?: Bases): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
