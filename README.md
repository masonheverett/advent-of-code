# Advent of Code 🎄

> Scaffolding for solving the [Advent of Code (AoC)](https://adventofcode.com) problems in JavaScript

### Writing a Solution

To write a solution for a specific problem, navigate to the `.js` file for the solution. For example, the solution to part 01 published on day 01 of 2019 can be found at `./2019/day01/part01.js`.

A stubbed method called `solve` has been provided for each solution that is already set up to receive the input data for that day from the `input.txt` in the same directory as an array of strings, one for each line in the input file.

Please note that the scaffolding will assume there is a new line at the end of the input file.

##### Tips for Success

* Update `input.txt` locally to try out different, smaller datasets as you work before tackling the large dataset provided by AoC
* Do all your work in the provided file, but don't try to fit it all into the `solve` method; using best coding practices and split out logical chunks into smaller methods
* Don't reinvent the wheel: the hardest part of these problems is the math, so do the hard work early by figuring out the best mathematical solution before turning it into code
* Use [`lodash`](https://lodash.com/docs/4.17.15), it's imported into every file already
* If lots of problems use some shared logic, consider moving that logic to a separate file in a shared folder (see `2019/shared/intcode.js`)

### Testing a Solution

To test a specific problem, run the following command:

```bash
# Command Usage
npm start <year> <day> <part>

# Command Example
npm start 2019 01 01
```

### Archived Solutions

Please note that archived solutions are not updated as dependencies are updated, and testing an archived solution is not possible with `npm start`.
