exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    //'facebookLoginSpec.js',
    //'createRideSpec.js'
    'searchRideSpec.js'
    //'showVehicleSpec.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000
  }
};
