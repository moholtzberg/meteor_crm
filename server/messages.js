// process.env.MAIL_URL = 'smtp://postmaster%40moholtzberg.mailgun.org:3nvcayl0a1p8@smtp.mailgun.org:587';

Messages = new Meteor.Collection("messages");
	
Meteor.startup(function () {
	
	if (Messages.find({}).count() === 0) {
		Messages.insert({
			to: Meteor.user().emails[0].address, 
			from: Meteor.user().emails[0].address, 
			subject: "Test", 
			body: "Test", 
			html: "Test"});
	};
	
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
		// var msg_id = Messages.insert({user_id: this.userId, to: to, from: from, subject: subject, text: text, html: html,sent_at: new Date()});
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