import moment from 'moment-timezone';


/**
 * Get formatted hours-minutes-meridiem text from moment object
 * N.b. formatted time assumes 12-hour clock.
 *
 * @param isoString {String}: date-time stamp in ISO format
 *
 * @returns {Object}: object with properties of hours, minutes, and meridiem
 */
export const getHoursMinutesMeridiumFromISO = (isoString) => {
    // convert ISO string to moment object, then query hours and minutes:
    const momentObj = moment(isoString);
    const hours     = momentObj.hours();
    const minutes   = momentObj.minutes();

    return {
        hours:      hours <= 12 ? hours : hours - 12,
        minutes:    minutes,
        meridiem:   hours < 12 ? 'AM' : 'PM'
    }
};


/**
 * Creates a Moment.js object from given year-month-day.
 * Applies the month offset and specifies correct format.
 *
 * @param year {Number || String}: year
 * @param month {Number || String}: month [0-11]
 * @param day {Number || String}: day [1-31]
 *
 * @returns {moment}: moment object
 *
 * Example:
 * createMomentObjectFromYearMonthDay(1991, 8, 8);
 */
export const createMomentObjectFromYearMonthDay = (year, month, day) => {
    // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
    // thus, `this.$store.state.selectedMonth` is 0-indexed, so we add `1` to offset it:
    let momentObj = moment(`${year}-${month+1}-${day}`, 'YYYY-M-D');

    if (momentObj.isValid() === true) {
        return momentObj;
    }
    else {
        throw new Error('Invalid Moment.js object (are you sure date arguments are valid?)');
    }
};


/**
 * Creates an ISO date-time string from given year-month-day values.
 * Applies the month offset and specifies correct format.
 *
 * @param year {Number || String}: year
 * @param month {Number || String}: month [0-11]
 * @param day {Number || String}: day [1-31]
 * @param hours {Number || String}: hours [0-23]
 * @param minutes {Number || String}: minutes [0-59]
 * @param meridiem {String}: either 'AM' or 'PM'
 *
 * @returns {String}: date-time stamp in ISO format
 */
export const createISOStringFromYearMonthDayHoursMinutesMeridiem = (year, month, day, hours, minutes, meridiem) => {
    // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
    // thus, `this.$store.state.selectedMonth` is 0-indexed, so we add `1` to offset it:
    let momentObj = moment(`${year}-${month+1}-${day}-${hours}-${minutes}-${meridiem}`, 'YYYY-M-D-hh:mm a');

    if (momentObj.isValid() === true) {
        return momentObj.toISOString();
    }
    else {
        throw new Error('Invalid Moment.js object (are you sure date-time arguments are valid?)');
    }
};


/**
 * Creates a unique ID
 *
 * The function uses both a time-stamp as well as a random number generator, similar to MongoDB's ObjectID
 * @returns {Number}
 */
export const createUniqueId = () => {
    let timeStamp = new Date().getTime();
    let randomNum = Math.round(Math.random() * 100000);

    return parseInt(`${timeStamp}${randomNum}`, 10);
};


/**
 * Return a random element from an array
 *
 * @param arr {Array}
 *
 * @returns {*}: an Array element
 */
export const randomSample = (arr) => {
    // n.b. `Math.random()` never returns exactly `1`
    return arr[Math.floor( Math.random() * arr.length )];
};
