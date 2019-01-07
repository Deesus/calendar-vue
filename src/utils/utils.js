import moment from 'moment-timezone';



// ==================================================
// functions:
// ==================================================

/**
 * Creates a Moment.js object from given year-month-day
 *
 * Applies the month offset and specifies correct format.
 *
 * @param year (Number || String): year
 * @param month (Number || String): month [0-11]
 * @param day (Number || String): day [1-31]
 *
 * @returns {moment}: moment object
 *
 * Example:
 * createMomentObjectFromYearMonthDay(1991, 8, 8);
 * TODO: make function name shorter.
 */
function createMomentObjectFromYearMonthDay(year, month, day) {
    // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
    // thus, `this.$store.state.selectedMonth` is 0-indexed, so we add `1` to offset it:
    let momentObj = moment(`${year}-${month+1}-${day}`, 'YYYY-M-D');

    if (momentObj.isValid() === true) {
        return momentObj;
    }
    else {
        throw new Error('Invalid Moment.js object (are you sure date arguments are valid?)');
    }
}


/**
 * Creates a Moment.js object from given year-month-day
 *
 * Applies the month offset and specifies correct format.
 *
 * @param year (Number || String): year
 * @param month (Number || String): month [0-11]
 * @param day (Number || String): day [1-31]
 * @param hours (Number || String): hours [0-23]
 * @param minutes (Number || String): minutes [0-59]
 * @param meridiem (String): either 'AM' or 'PM'
 * @returns {*}
 */
function createMomentObjectFromYearMonthDayHoursMinutesMeridiem(year, month, day, hours, minutes, meridiem) {
    // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
    // thus, `this.$store.state.selectedMonth` is 0-indexed, so we add `1` to offset it:
    let momentObj = moment(`${year}-${month+1}-${day}-${hours}-${minutes}-${meridiem}`, 'YYYY-M-D-hh:mm a');

    if (momentObj.isValid() === true) {
        return momentObj;
    }
    else {
        throw new Error('Invalid Moment.js object (are you sure date-time arguments are valid?)');
    }
}


/**
 * Creates a unique ID
 *
 * The function uses both a time-stamp as well as a random number generator, similar to MongoDB's ObjectID
 * @returns {Number}
 */
function createUniqueId() {
    let timeStamp = new Date().getTime();
    let randomNum = Math.round(Math.random() * 100000);

    return parseInt(`${timeStamp}${randomNum}`, 10);
}


/**
 * Return a random element from an array
 *
 * @param arr {Array}
 * @returns {*}: an Array element
 */
function randomSample(arr) {
    // n.b. `Math.random()` never returns exactly `1`
    return arr[Math.floor( Math.random() * arr.length )];
}


// ==================================================
// exports:
// ==================================================

export {
    createMomentObjectFromYearMonthDay,
    createMomentObjectFromYearMonthDayHoursMinutesMeridiem,
    createUniqueId,
    randomSample
};
