const should = require('chai').should()

const addTimeStampToEvents = require("./add-time-stamp-to-events")

describe('source/controllers/event-controller/util/add-time-stamp-to-events.js', function() {
  it('should add a timestamp to the given event', function() {
    const event = [{}]
    const [result] = addTimeStampToEvents(event)
    result.should.have.property("timeStamp").is.not.null
  });
});
