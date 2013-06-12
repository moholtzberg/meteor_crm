Modules = new Meteor.Collection("modules");

Meteor.publish("Modules", function () {
  return Modules.find();
});

Modules.allow({
	insert: function (userId, doc) {
		return userId === doc.user_id;
	},
	update: function (userId, doc) {
		return userId === doc.user_id;
	}
});