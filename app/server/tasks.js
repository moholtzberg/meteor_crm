Tasks = new Meteor.Collection("tasks");

Meteor.publish("Tasks", function () {
  return Tasks.find({user_id: this.userId});
});

Tasks.allow({
	insert: function (userId, doc) {
		return userId === doc.user_id;
	},
	update: function (userId, doc) {
		return userId === doc.user_id;
	},
	remove: function (userId, doc) {
		return userId === doc.user_id;
	}
});