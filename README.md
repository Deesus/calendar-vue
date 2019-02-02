# Vue.js Calendar
###### Demo: http://calendar.deepankara.com
A monthly calendar where users can add custom events, times, and event notes. N.b. this is (currently) a front-end only project.

## Running the app via Docker:
1. Unsure you have installed Docker.
2. In Bash, pull and run the image from the remote public repo:
```bash
$ docker run -it -p 8080:80 --rm deesus/calendar-vue:1
```
3. In your browser, you can access the app on http://localhost:8080

    
## Development Quickstart:
1. clone repo and cd to directory
2. install packages: `$ npm install`
3. run the dev server: `$npm run dev` (code changes will automatically be updated in the browser)
4. You'll want to delete the dummy data (i.e. the calendar events) in the Vuex store (`\src\store\index.js`)


## Production:
1. To build for production: `$npm run buid`
2. To run production version of app: `$npm run prod`


## Technologies utilized:
- Vue
- Vue Router
- Vuex
- Docker
- MomentJS
- CSS Grids
- Sass (SCSS)
- Webpack
- Nginx


## License:
Copyright © 2018 Dee Reddy. BSD-2 license.
