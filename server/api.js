if (Meteor.isServer) {
	Meteor.startup(function () {
		
		collectionApi = new CollectionAPI({
			authToken: undefined,              // Require this string to be passed in on each request
			apiPath: 'collectionapi',          // API path prefix
			standAlone: false,                 // Run as a stand-alone HTTP(S) server
			sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
			listenPort: 3005,                  // Port to listen to (stand-alone only)
			listenHost: undefined,             // Host to bind to (stand-alone only)
			privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
			certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
		});
		
	// Starts the API server
	collectionApi.start();
	
	});
}