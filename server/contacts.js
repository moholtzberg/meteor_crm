Contacts = new Meteor.Collection("contacts");

Meteor.publish("Contacts", function () {
  return Contacts.find({user_id: this.userId});
});

Contacts.allow({
	insert: function (userId, doc) {
		return userId === doc.user_id;
	},
	update: function (userId, doc) {
		console.log(EJSON.stringify(doc));
		return userId === doc.user_id;
	}
});