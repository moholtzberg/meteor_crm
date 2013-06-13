// process.env.MAIL_URL = 'smtp://postmaster%40moholtzberg.mailgun.org:3nvcayl0a1p8@smtp.mailgun.org:587';

Messages = new Meteor.Collection("messages");
	
// Meteor.startup(function () {
// 	
// 	if (Messages.find({}).count() === 0) {
// 		Messages.insert({
// 			to: Meteor.user().emails[0].address, 
// 			from: Meteor.user().emails[0].address, 
// 			subject: "Test", 
// 			body: "Test", 
// 			html: "Test"});
// 	};
// 
// });


Messages.allow({
	insert: function() {
		return true;
	}
});

Meteor.publish("Messages", function () {
  return Messages.find({user_id: this.userId});
});

Meteor.methods({
  sendEmail: function (to, from, subject, text, html) {
    check([to, from, subject, text], [String]);
		
		this.unblock();
		
		if (Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text,
			html: html
			})) {
				Emails.insert({to: to, from: from, subject: subject, text: text, html: html,sent_at: Time.now()})
				};
		console.log("sentFromHere");
		return true;
  }
});