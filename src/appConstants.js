export const DATE_ENUM = Object.freeze({
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


export const LABEL_COLORS = Object.freeze({
    BLUE:   'blue',
    GREEN:  'green',
    PURPLE: 'purple',
    RED:    'red',
    YELLOW: 'yellow'
});


// `keyup` and `keydown` codes (but NOT `keypress`):
export const KEY_CODES = Object.freeze({
    ESCAPE: 27
});


export const FIREBASE = Object.freeze({
    // see <https://firebase.google.com/docs/reference/js/firebase.database.Reference> about Firebase ref;
    // if a res is not set on your database, the default value should be a slash: `/`
    REFERENCE_NODE: 'events',

    // TODO: replace the api key with your own Firebase key:
    // the Firebase api key allows users to connect to the db; it's NOT a security risk that we're making it publicly visible
    API_KEY: {
        apiKey:             "AIzaSyCdeyI4ZS-YZCMouUEZ9On42VF2kdteBsE",
        authDomain:         "vuejs-calendar.firebaseapp.com",
        databaseURL:        "https://vuejs-calendar.firebaseio.com",
        projectId:          "vuejs-calendar",
        storageBucket:      "vuejs-calendar.appspot.com",
        messagingSenderId:  "40971087134"
    }
});
