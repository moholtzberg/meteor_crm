Module = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Module.prototype = {
  constructor: Module
	
};

//============================ Transform the collection
Modules = new Meteor.Collection("modules", {
	transform: function (doc) {
		return new Module(doc);
	}
});

Meteor.subscribe("Modules");

Template.modules.list = function () {
	return Modules.find().fetch();
}

Template.modules.events({
	'click ul#module_list > li > a.module': function (event) {
		event.preventDefault();
		module_id = $("#" + event.currentTarget.id.toString()).attr("module_id");
		module_name = Modules.findOne({_id: module_id}).name;
		Session.set("selectedModule", module_name);
	} 
});