function createEmployeeRecord(recordsArray) {
  return {
    firstName: recordsArray[0],
    familyName: recordsArray[1],
    title: recordsArray[2],
    payPerHour: recordsArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  const inEvent = {
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  };
  this.timeInEvents.push(inEvent);
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const outEvent = {
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  };
  this.timeOutEvents.push(outEvent);
  return this;
}

function hoursWorkedOnDate(targetDate) {
  const inEvent = this.timeInEvents.find(
    (inEvent) => inEvent.date === targetDate
  );
  const outEvent = this.timeOutEvents.find(
    (outEvent) => outEvent.date === targetDate
  );

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(targetDate) {
  return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function calculatePayroll(records) {
  const reducer = (acc, record) => {
    const wages = allWagesFor(record);

    return acc + wages;
  };
  return records.reduce(reducer, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((rec) => rec.firstName === firstName);
}

function calculatePayroll(recsArray) {
  return recsArray.reduce((total, rec) => {
    return total + allWagesFor.call(rec);
  }, 0);
}
