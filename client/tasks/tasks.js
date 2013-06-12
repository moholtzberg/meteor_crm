//============================ Model definition
Task = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Task.prototype = {
  constructor: Task
	
};

//============================ Transform the collection
Tasks = new Meteor.Collection("tasks", {
	transform: function (doc) {
		return new Task(doc);
	}
});

Meteor.subscribe("Tasks");

Template.tasks.selected = function() {
	console.log(Session.get("selectedModule") === "Tasks");
	return Session.get("selectedModule") === "Tasks";
}

Template.tasks.newTask = function() {
	return Session.get("newTask");
}

Template.tasks.editTask = function() {
	return Session.get("editTask");
}

Template.tasks.viewTask = function() {
	return Session.get("viewTask");
}

Template.tasks_list.record = function() {
	if (Session.get("taskId")) {
		return Tasks.find({customer_id: Session.get("taskId")});
	} else {
		return Tasks.find().fetch();
	}
};

// Template.tasks_show.record = function() {
// 	if (Session.get("viewTask")) {
// 		return Tasks.findOne({_id: Session.get("taskId")});
// 	};
// }
// 
// Template.tasks_create.customers = function() {
// 	return Customers.find().fetch();
// }
// 
// Template.tasks_create.contacts = function() {
// 	return Contacts.find().fetch();
// }

Template.tasks_list.events({
  
	'click button.view_task': function (event, template) {
		task_id = $("#" + event.currentTarget.id.toString()).attr("task_id");
		console.log(task_id);
		Session.set("viewTask", true);
		Session.set("editTask", false);
    Session.set("taskId", task_id);
  },
	
	'click button.edit_customer': function (event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("customer_id");
		Session.set("editTask", true);
		Session.set("viewTask", false);
    Session.set("customerId", customer_id);
  }
	
});

// Template.tasks_create.events({
// 	'click a#cancel, click button#close' : function(event) {
// 		event.preventDefault();
// 		Session.set("newTask", false);
// 	},
// 	
// 	'select a#cancel, click button#close' : function(event) {
// 		event.preventDefault();
// 		Session.set("newTask", false);
// 	},
// 	
// 	'submit form#create_task, click a#save_task' : function (event) {
// 		console.log("clicked from here");
// 		if (event.type === 'click' || event.type === 'submit') {
// 			event.preventDefault();
// 			
// 			var customer_id		 					= $("#task_customer_id").val();
// 			var contact_id							= $("#task_contact_id").val();
// 			var name										= $("#task_name").val();
// 			var description							= $("#task_description").val();
// 			var due_date								= $("#task_due_date").val();
// 			var complete								= $("#task_complete").val();
// 			
// 			if(Tasks.insert({user_id: Meteor.user()._id, customer_id: customer_id, contact_id: contact_id, name: name, description: description, due_date: due_date, complete: complete})) {
// 				
// 				$("#task_customer_id").val(null);
// 				$("#task_contact_id").val(null);
// 				$("#task_name").val(null);
// 				$("#task_description").val(null);
// 				$("#task_due_date").val(null);
// 				$("#task_complete").val(null);
// 				
// 				Session.set("newTask", false);
// 			}
// 		};
// 	}
// });
// 
// Template.tasks_show.events({
// 	'click a#cancel, click button#close' : function(event) {
// 		event.preventDefault();
// 		Session.set("viewTask", false);
// 		Session.set("taskId", null);
// 	}
// });
// 
// Template.customers_update.events({
// 	'click a#cancel, click button#close' : function(event) {
// 		event.preventDefault();
// 		console.log("-----");
// 		Session.set("editTask", false);
// 		Session.set("customerId", null);
// 	}
// });

Template.tasks.events({	
	'click button#new_task' : function (event) {
		
		if (event.type === 'click' || event.type === 'submit') {
			console.log(event.type);
			event.preventDefault();
			
			Session.set("newTask", true);
			
		};
	}
});