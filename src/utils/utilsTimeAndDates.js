import moment from 'moment-timezone';

/**
 * Creates a Momemt.js object from given year-month-day
 *
 * Applies the month offset and specifies correct format. N.b.
 *
 * @param year (Number): year
 * @param month (Number): month [0-11]
 * @param day (Number): day [1-31]
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


function createMomentObjectFromYearMonthDayHoursMinutesMeridiem(year, month, day, hours, minutes, meridiem) {
    let momentObj = moment(`${year}-${month+1}-${day}-${hours}-${minutes}-${meridiem}`, 'YYYY-M-D-hh:mm a');

    if (momentObj.isValid() === true) {
        return momentObj;
    }
    else {
        throw new Error('Invalid Moment.js object (are you sure date-time arguments are valid?)');
    }
}


export {
    createMomentObjectFromYearMonthDay,
    createMomentObjectFromYearMonthDayHoursMinutesMeridiem
};
