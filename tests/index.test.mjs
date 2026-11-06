import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses signed decimal and unit', () => {
  assert.deepEqual(api.parseLength('-.5em'), { value: -0.5, unit: 'em' });
});
test('converts rem using explicit root size', () => {
  assert.equal(api.toPixels(api.parseLength('1.5rem'), { rootFontSize: 16 }), 24);
});
test('converts viewport units', () => {
  assert.equal(api.toPixels(api.parseLength('25vw'), { viewportWidth: 1200 }), 300);
  assert.equal(api.toPixels(api.parseLength('10vh'), { viewportHeight: 800 }), 80);
});
test('converts percentage using caller basis', () => {
  assert.equal(api.toPixels(api.parseLength('50%'), { percentBase: 240 }), 120);
});
test('requires context for relative units', () => {
  assert.throws(() => api.toPixels(api.parseLength('1em')), RangeError);
});
test('rejects compound expressions', () => {
  assert.throws(() => api.parseLength('calc(100% - 2px)'), TypeError);
});
