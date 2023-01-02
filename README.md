# html5-mobile-game-2

**All assets included in this repo are copyright by me - do not use them.**

Another attempt at publishing an html5 app to mobile. This version uses cordova (PhoneGap).

AS of 10-6-2022, I've packaged a basic PIXI JS html5 canvas app with cordova. All of the source files are included here.

### To publish the JS source files:

-   `npm i` (install dependencies)
-   `npm run production` (package all html, js, etc and publish to www/ folder)

### To run the app on Android:

-   ~~start an android emulator~~ (no longer necessary)
-   `cordova emulate android`

### To run the app on iOS:

-   TBD

## PROBLEMS?

-   **App runs fine with `npm run build` but fails when I run it in production mode on the emulator?** This is probably an issue with the way the code is being transpiled by webpack/babel. To replicate the issue:
    -   Open package.json
    -   modify the "production" script to do `webpack serve`
    -   do `npm run production` - this will run the production build in a browser - use devtools to debug
    -   don't forget to remove `webpack serve` when you're done
