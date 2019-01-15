const DATE_ENUM = Object.freeze({
    // ---------- day of week: ----------
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,

    // ---------- months: ----------
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
});


const LABEL_COLORS = Object.freeze({
    BLUE:   'blue',
    GREEN:  'green',
    PURPLE: 'purple',
    RED:    'red',
    YELLOW: 'yellow'
});


// `keyup` and `keydown` codes (but NOT `keypress`):
const KEY_CODES = Object.freeze({
    ESCAPE: 27
});


// ==================== exports: ====================
export {
    DATE_ENUM,
    KEY_CODES,
    LABEL_COLORS
};
