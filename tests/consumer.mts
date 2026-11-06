import * as api from '@lp-labs/css-length-value';
import { parseLength, toPixels } from '@lp-labs/css-length-value';
const length = parseLength('1.5rem');
if (toPixels(length, { rootFontSize: 16 }) !== 24) throw new Error('Unexpected conversion');
// @ts-expect-error invalid argument must be rejected by declarations
api.parseLength(4);
