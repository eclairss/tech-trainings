// An example configuration file.
exports.config = {
  directConnect: true,
  //restartBrowserBetweenTests: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'shardTestFiles': true,
    'maxInstances' : 2
  },

  // Framework to use. Jasmine is recommended.
  framework: 'mocha',
	

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/mochachai_func_tests.js','../tests/mochachai_e2e_tests.js'],
  //specs: ['../tests/mochachai_e2e_tests.js'],

  // Options to be passed to Jasmine.
  //jasmineNodeOpts: {
  //  defaultTimeoutInterval: 30000
  //}
  mochaOpts: {
    timeout: 30000
  },
};
