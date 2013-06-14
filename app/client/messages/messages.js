//============================ Model definition
Message = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Message.prototype = {
  constructor: Message,
};

//============================ Transform the collection
Messages = new Meteor.Collection("messages", {
	transform: function (doc) {
		return new Message(doc);
	}
});

//============================ Subscribe  
Meteor.subscribe("Messages");

Template.messages.selected = function() {
	return Session.get("selectedModule") === "Messages";
}

Template.messages.action = function(action) {
	return Session.get("currentAction") === action;
}

Template.messages_list.record = function() {
	return Messages.find().fetch();
};