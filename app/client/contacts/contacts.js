//============================ Model definition
Contact = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Contact.prototype = {
  constructor: Contact,
	
  fullName: function () {
		return this.first_name + " " + this.last_name;
  },

	customer: function () {
		return Customers.findOne({_id: this.customer_id});
	}
	
};

//============================ Transform the collection
Contacts = new Meteor.Collection("contacts", {
	transform: function (doc) {
		return new Contact(doc);
	}
});

Meteor.subscribe("Contacts");

Template.contacts.selected = function() {
	console.log(Session.get("selectedModule") === "Contacts");
	return Session.get("selectedModule") === "Contacts";
}

Template.contacts.newContact = function() {
	return Session.get("newContact");
}

Template.contacts.editContact = function() {
	return Session.get("editContact");
}

Template.contacts.viewContact = function() {
	return Session.get("viewContact");
}

Template.contacts_list.record = function() {
	return Contacts.find();
};

Template.contacts_show.record = function() {
	if (Session.get("viewContact")) {
		return Contacts.findOne({_id: Session.get("contactId")});
	};
}

Template.contacts_create.customers = function() {
	return Customers.find().fetch();
}

Template.contacts_list.events({
  
	'click button.view_contact': function (event, template) {
		contact_id = $("#" + event.currentTarget.id.toString()).attr("contact_id");
		console.log(contact_id);
		Session.set("viewContact", true);
		Session.set("editContact", false);
		Session.set("contactId", contact_id);
		},
		
	'click button.edit_contact': function (event, template) {
		contact_id = $("#" + event.currentTarget.id.toString()).attr("contact_id");
		Session.set("editContact", true);
		Session.set("viewContact", false);
		Session.set("contactId", contact_id);
		},
		
	'click button.email_contact': function (event, template) {
		contact_id = $("#" + event.currentTarget.id.toString()).attr("contact_id");
		Session.set("currentAction", "email");
		Session.set("contactId", contact_id);
		
		// contact = Contacts.findOne({_id: contact_id});
		// Meteor.call(
		// 	"sendEmail", contact.email, Meteor.user().emails[0].address, "Test Email", "Test email body......", Template.welcome_email({to: contact.first_name})
		// 	);
		}
	
});

Template.contacts_create.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		Session.set("newContact", false);
	},
	
	'submit form#create_contact, click a#save_contact' : function (event) {
		console.log("clicked from here");
		if (event.type === 'click' || event.type === 'submit') {
			event.preventDefault();
			
			var customer_id		 					= $("#contact_customer_id").val();
			var first_name							= $("#contact_first_name").val();
			var last_name								= $("#contact_last_name").val();
			var email										= $("#contact_email").val();
			var phone										= $("#contact_phone").val();
			
			if(Contacts.insert({user_id: Meteor.user()._id, customer_id: customer_id, first_name: first_name, last_name: last_name, email: email, phone: phone})) {
				
				$("#contact_customer_id").val(null);
				$("#contact_first_name").val(null);
				$("#contact_last_name").val(null);
				$("#contact_email").val(null);
				$("#contact_phone").val(null);
				
				Session.set("newContact", false);
			}
		};
	}
});

Template.contacts_show.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		Session.set("viewContact", false);
		Session.set("contactId", null);
	}
});

Template.contacts_update.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		console.log("-----");
		Session.set("editContact", false);
		Session.set("contactId", null);
	}
});

Template.contacts.events({	
	'click button#new_contact' : function (event) {
		
		if (event.type === 'click' || event.type === 'submit') {
			console.log(event.type);
			event.preventDefault();
			
			Session.set("newContact", true);
			
		};
	}
});