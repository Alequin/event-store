const should = require('chai').should()

const applyPositionNumbers = require("./apply-position-numbers")

describe('source/controllers/event-controller/util/prepare-events/apply-position-numbers.js', function() {
  it('should return empty array if given an empty array', function() {
    const result = applyPositionNumbers([], 0)
    result.should.deep.equal([])
  });

  it('should add the position property to all events, incrementing each time', function() {
    const events = [{}, {}, {}]
    const result = applyPositionNumbers(events, 0)
    result.should.deep.equal([{position: 1}, {position: 2}, {position: 3}])
  });

  it('should not accept values less than -1 as the lastPosition', function() {
    (() => {applyPositionNumbers([], 10)}).should.not.throw();
    (() => {applyPositionNumbers([], -1)}).should.not.throw();
    (() => {applyPositionNumbers([], -2)}).should.throw();
    (() => {applyPositionNumbers([], -1000)}).should.throw();
  });
});
