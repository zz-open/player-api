import assert from 'node:assert'

function sum(a, b) {
  return a + b
}

describe('base_test', () => {
  it('sum', () => {
    assert.equal(sum(1, 2), 3)
  })
})
