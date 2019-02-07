import moment from 'moment-timezone';


/**
 * Format event's ISO date-time to hours-minutes-meridiem (e.g. "4:30pm").
 *
 * @param isoValue {String}: ISO date-time string (same as db value)
 *
 * @returns {String}: formatted string
 */
export const formatDateTimeISOToHoursMinutesMeridiem = (isoValue) => {
    return moment(isoValue).format('h:mma').toString();
};
