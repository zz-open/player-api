import assert from 'assert';

function sum(a, b) {
  return a + b;
}

describe("base_test", () => {
  test('sum', () => {
    assert.equal(sum(1, 2), 3);
});
})
