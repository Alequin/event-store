const should = require('chai').should()

const time = require("./time")

const DATE = new Date()
DATE.setUTCFullYear(2000)
DATE.setUTCMonth(0)
DATE.setUTCDate(1)
DATE.setUTCHours(12)
DATE.setUTCMinutes(30)
DATE.setUTCSeconds(10)
DATE.setUTCMilliseconds(150)

describe('source/controllers/event-controller/util/time.js', function() {
  it('should return time datastructure from date object given', function() {
    const date = new Date()
    const expected = "2000-01-01-12-30-10-150-UTC"
    const actual = time(DATE)
    actual.should.equal(expected)
  });

  it('should return the current date if no parameter is passed', function() {
    const currentDate = new Date()
    const actual = time().split("-")

    const year = parseInt(actual[0])
    year.should.equal(currentDate.getFullYear())

    const month = parseInt(actual[1])
    month.should.equal(currentDate.getMonth()+1)

    const dayOfMonth = parseInt(actual[2])
    dayOfMonth.should.equal(currentDate.getDate())
  });

  context("when the month, day, hour, minutes, seconds and miliseconds are single digits", function(){
    it('should not format month to start with one 0', function() {
      const date = new Date()
      date.setUTCMonth(6)
      const actual = time(date).split("-")
      const month = actual[1]
      month.startsWith("0").should.be.true
      month.should.be.length(2)
    });

    it('should not format day to start with one 0', function() {
      const date = new Date()
      date.setUTCDate(6)
      const actual = time(date).split("-")
      const day = actual[2]
      day.startsWith("0").should.be.true
      day.should.be.length(2)
    });

    it('should format hour to start with one 0', function() {
      const date = new Date()
      date.setUTCHours(6)
      const actual = time(date).split("-")
      const hour = actual[3]
      hour.startsWith("0").should.be.true
      hour.should.be.length(2)
    });

    it('should format minute to start with one 0', function() {
      const date = new Date()
      date.setUTCMinutes(6)
      const actual = time(date).split("-")
      const minute = actual[4]
      minute.startsWith("0").should.be.true
      minute.should.be.length(2)
    });

    it('should format seconds to start with one 0', function() {
      const date = new Date()
      date.setUTCSeconds(6)
      const actual = time(date).split("-")
      const seconds = actual[5]
      seconds.startsWith("0").should.be.true
      seconds.should.be.length(2)
    });

    it('should format miliseconds to start with two 0', function() {
      const date = new Date()
      date.setUTCMilliseconds(6)
      const actual = time(date).split("-")
      const miliseconds = actual[6]
      miliseconds.startsWith("00").should.be.true
      miliseconds.should.be.length(3)
    });
  })

  context("when the month, day, hour, minutes, seconds and miliseconds are double digits", function(){
    it('should not format month', function() {
      const date = new Date()
      date.setUTCMonth(10)
      const actual = time(date).split("-")
      const month = actual[1]
      month.startsWith("0").should.be.false
      month.should.be.length(2)
    });

    it('should not format day', function() {
      const date = new Date()
      date.setUTCDate(15)
      const actual = time(date).split("-")
      const day = actual[2]
      day.startsWith("0").should.be.false
      day.should.be.length(2)
    });

    it('should not format hour', function() {
      const date = new Date()
      date.setUTCHours(12)
      const actual = time(date).split("-")
      const hour = actual[3]
      hour.startsWith("0").should.be.false
      hour.should.be.length(2)
    });

    it('should not format minute', function() {
      const date = new Date()
      date.setUTCMinutes(30)
      const actual = time(date).split("-")
      const minute = actual[4]
      minute.startsWith("0").should.be.false
      minute.should.be.length(2)
    });

    it('should not format seconds', function() {
      const date = new Date()
      date.setUTCSeconds(30)
      const actual = time(date).split("-")
      const seconds = actual[5]
      seconds.startsWith("0").should.be.false
      seconds.should.be.length(2)
    });

    it('should format miliseconds to start with one 0', function() {
      const date = new Date()
      date.setUTCMilliseconds(50)
      const actual = time(date).split("-")
      const miliseconds = actual[6]
      miliseconds.startsWith("0").should.be.true
      miliseconds.startsWith("00").should.be.false
      miliseconds.should.be.length(3)
    });
  })

  context("miliseconds have three digits", function(){
    it('should not format miliseconds', function() {
      const date = new Date()
      date.setUTCMilliseconds(500)
      const actual = time(date).split("-")
      const miliseconds = actual[6]
      miliseconds.startsWith("0").should.be.false
      miliseconds.should.be.length(3)
    });
  })
});
