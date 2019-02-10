# Vue.js Calendar
###### Demo: http://calendar.deepankara.com
A monthly calendar where users can add custom events, times, and event notes. N.b. this is (currently) a front-end only project.


## Running the app via Docker:
1. Unsure you have installed Docker
2. In Bash, pull and run the image from the remote public repo:
```bash
$ docker run -it -p 8080:80 --rm deesus/calendar-vue:1
```
3. In your browser, you can access the app on http://localhost:8080

    
## Development Quickstart:
1. Clone repo and cd to directory
2. Install packages: `$ npm install`
3. Run the dev server: `$npm run dev` (code changes will automatically be updated in the browser)
4. To use your own Firebase realtime database:
    - Create a new Google Dev account if you don't already have one
    - In the Firebase console, create a new project and select the *Realtime Database* option
    - Rename the reference node for your database to `events`
    - Click *Authentication > Web setup* to access your db's API key
    - Replace the `API_KEY` property in `appConstants.js` with the API key that the Firebase console provides


## Production:
1. To build for production: `$npm run buid`
2. To run production version of app: `$npm run prod`


## Technologies utilized:
* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Firebase](https://firebase.google.com/)
* [Sass](http://sass-lang.com/)
* [Webpack](https://webpack.js.org/)
* [Docker](https://docs.docker.com/)
* [Nginx](https://docs.nginx.com/)


## License:
Copyright © 2018-2019 Dee Reddy. BSD-2 license.
