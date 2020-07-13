let jasmineCore = require('jasmine-core');

// Override build expectation result: Passed string problem
let buildExpectationResult = jasmineCore.buildExpectationResult();
  jasmineCore.buildExpectationResult = function() {
  function buildExpectationResultWrapper(options) {
    //let message = options ? options.message : '';
    let result = buildExpectationResult(options);
    if (result.passed) {
      if(options.expected instanceof Array)
        result.message = options.expected[1];
      else
        result.message = options.actual + ' ' + options.matcherName + ' ' + options.expected; 
    }
    
    return result;
  }
  return buildExpectationResultWrapper;
}

const Colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
     Black: "\x1b[30m",
     Red: "\x1b[31m",
     Green: "\x1b[32m",
     Yellow: "\x1b[33m",
     Blue: "\x1b[34m",
     Magenta: "\x1b[35m",
     Cyan: "\x1b[36m",
     White: "\x1b[37m",
     Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
     Black: "\x1b[40m",
     Red: "\x1b[41m",
     Green: "\x1b[42m",
     Yellow: "\x1b[43m",
     Blue: "\x1b[44m",
     Magenta: "\x1b[45m",
     Cyan: "\x1b[46m",
     White: "\x1b[47m",
     Crimson: "\x1b[48m"
    }
   };

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:4200',

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/easy_tests.js','../tests/medium_tests.js','../tests/hard_tests.js','../tests/harder_tests.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 999999
  },
  
  // Assign the test reporter to each running instance
  onPrepare: function() {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    browser.manage().timeouts().setScriptTimeout(60000);

    jasmine.getEnv().addReporter({
      specDone: function(result) {
          if(result.status === 'passed')
              console.log(Colors.bg.Green, Colors.fg.Black, result.description + " => " + result.status.toUpperCase(), Colors.Reset);
          else if(result.status === 'pending' || result.status === 'disabled')         
              console.log(Colors.bg.White, Colors.fg.Black, result.description + " => " + result.status.toUpperCase(), Colors.Reset);     
          else
              console.log(Colors.bg.Red, Colors.fg.Black, result.description + " => " + result.status.toUpperCase(), Colors.Reset);

          let allExpectations = [].concat(result.failedExpectations, result.passedExpectations);
          console.log('Failed Assertions: ' + result.failedExpectations.length + '/' + allExpectations.length);    
          
          for(var i = 0; i < result.failedExpectations.length; i++) {
              console.log(Colors.fg.Red, 'x ' + result.failedExpectations[i].message, Colors.Reset);
          }

          for(var i = 0; i < result.passedExpectations.length; i++) {
              console.log(Colors.fg.Green, '/ ' + result.passedExpectations[i].message, Colors.Reset);
          }

          console.log('\n');
        }
  });
  },
};