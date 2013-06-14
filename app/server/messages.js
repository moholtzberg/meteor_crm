Messages = new Meteor.Collection("messages");
	
Meteor.startup(function () {
	
	if (Messages.find({}).count() === 0) {
		Messages.insert({
			user_id: "AeuELzksdfLNrx4XS",
			to: "info@worldtradecopiers.com", 
			from: "info@worldtradecopiers.com", 
			subject: "Test", 
			body: "Test", 
			html: "Test",
			sent_at: new Date()});
	};

	// collectionApi.addCollection(Messages, 'messages', {
	// 	authToken: undefined, 
	// 	methods: ['POST'],
	// 	before: {
	// 		POST: undefined
	// 	}
	// });
	
});

Messages.allow({
	insert: function() {
		return true;
	}
});

Meteor.publish("Messages", function () {
  return Messages.find({user_id: this.userId});
});

Meteor.methods({
  // sendEmail: function (to, from, subject, text, html) {
  //       check([to, from, subject, text], [String]);
  //   		
  //   		this.unblock();
  //   		
  //   		var msg_id = Messages.insert({user_id: this.userId, to: to, from: from, subject: subject, text: text, html: html,sent_at: new Date()});
  // 			console.log(msg_id);
  //   		Email.send({ "h:X-Mailgun-Variables": {"tracking_id": msg_id},"to": to, "from": from, "subject": subject, "text": text, "html": html});
  //   		
  //   		return true;
  //   	}
	
	sendEmail: function(to, from, subject, text, html) {
		var msg_id = Messages.insert({user_id: this.userId, to: to, from: from, subject: subject, text: text, html: html,sent_at: new Date(), events: {
		    deliverd: {
		      status: false,
		      time_stamp: null
		    },
		    opened: {
		      status: false,
		      time_stamp: null,
		      ip_address: null,
		      city: null,
		      client_name: null,
		      client_os: null,
		      device_type: null
		    }
		  }});
		Meteor.http.post("https://api.mailgun.net/v2/moholtzberg.mailgun.org/messages",
			{auth:"api:" + "key-88943ko5dq95izwzge8xxe7kn5-s9ka4",
			params: {
				"from": from,
				"to": to,
				"subject": subject,
				"html": html,
				"h:X-Mailgun-Variables": JSON.stringify({user_id:this.userId}),
				"o:tracking": "True"
				}
			}, function(error, result){
		});
		console.log("line 60");
	}
});