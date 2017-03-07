# HVAC Monitor

## Description

The application displays HVAC usage for a 30-day date range from a specified date at Portland International Airport (PDX).
HVAC usage is determined as follows: For each hour in the day, if the temperature is above 75 deg F, the A/C is on. Similarly,
if the temperature is below 62 deg F, the heat is on. The application totals the number of hours each day the A/C and/or the 
heat are on and displays it on a usage graph. The application also displays a time-series graph of the hourly temperatures
with the thresholds for A/C and heat indicated on the graph.

Weather data is obtained from the API at https://darksky.net/dev.

## See the app in action

The working app is deployed at https://hvac-monitor.herokuapp.com. Just choose a start date to see a 30-day window of
temperature and usage data displayed.

## Tests

The accompanying test suite can be run using the 'npm test' command.

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

## License

The MIT License (MIT)
Copyright (c) 2016 Mark Greenwood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
