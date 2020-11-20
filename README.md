# Advent of Code 🎄

> Scaffolding for solving the [Advent of Code (AoC)](https://adventofcode.com) problems in JavaScript

![Age of COVID](./age-of-covid.png)

### Writing a Solution

To write a solution for a specific problem, navigate to the `.js` file for the solution. For example, the solution to problem 1 published on day 1 of 2020 can be found at `./2020/day01/part01.js`.

A stubbed method called `solve` has been provided for each solution that is already set up to receive the input data for that day from the `input.txt` in the same directory as an array of strings, one for each line in the input file.

Please note that the scaffolding will assume there is a new line at the end of the input file.

##### Tips for Success

* Update `input.txt` locally to try out different, smaller datasets as you work before tackling the large dataset provided by AoC
* Do all your work in the provided file, but don't try to fit it all into the `solve` method; using best coding practices and split out logical chunks into smaller methods
* Don't reinvent the wheel: the hardest part of these problems is the math, so do the hard work early by figuring out the best mathematical solution before turning it into code
* Use [`lodash`](https://lodash.com/docs/4.17.15), it's imported into every file already
* If the problem uses an Intcode Computer (a common theme in 2019), use the `runProgram` method that takes a computer state and input, found in `intcode.js`

### Testing a Solution

To test a specific problem, update the constants at the top of `index.js`, then run `npm start`. An example is provided below.

```js
const YEAR = '2020'
const DAY = '01'
const PART = '01'
```

### Checking the Leaderboard

To check the competition leaderboard, run `npm run scores`. If the command doesn't return a printout of the leaderboard, a possible cause is that the session cookie has expired. Contact a Team Leader to get another one.

TODO: Quintin please update the scores script once you can login.

### Logging in as our team leader

To log into AoC as the team leader, add the following as a bookmark:

```javascript
javascript:(function(){if (document.location.hostname !== 'adventofcode.com') {alert('Go to adventofcode.com first');} else {document.cookie = 'session=REDACTED'; window.location.reload();}})()
```

This script will first verify you are on adventofcode.com. If you are, the script will add a session cookie and refresh the page.
