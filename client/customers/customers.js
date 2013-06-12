//============================ Model definition
Customer = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Customer.prototype = {
  constructor: Customer,
	
  owner: function () {
		user = Meteor.users.findOne({_id: this.user_id});
		console.log(user.emails);
		return user.username || user.emails[0].address;
  }, 
	
	contacts: function () {
		contacts = Contacts.find({customer_id: this._id}).fetch();
		return contacts;
	}
	
};

//============================ Transform the collection
Customers = new Meteor.Collection("customers", {
	transform: function (doc) {
		return new Customer(doc);
	}
});

//============================ Subscribe  
Meteor.subscribe("Customers");

Template.customers.selected = function() {
	return Session.get("selectedModule") === "Customers";
}

Template.customers.action = function(action) {
	return Session.get("currentAction") === action;
}

Template.customers_list.record = function() {
	return Customers.find().fetch();
}

Template.customers_show.record = function() {
	return Customers.findOne({_id: Session.get("customerId")});
}

Template.customers_update.record = function() {
	return Customers.findOne({_id: Session.get("customerId")});
}

Template.customers_delete.record = function() {
	return Customers.findOne({_id: Session.get("customerId")});
}

Template.customers_list.events({
  'click button#new_customer' : function (event) {
		event.preventDefault();
		Session.set("currentAction", "new");
		console.log(Session.get("currentAction"));
	},
	
	'click button.view_customer': function (event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("customer_id");
		Session.set("currentAction", "view");
		console.log(Session.get("currentAction"));
    Session.set("customerId", customer_id);
  },
	
	'click button.edit_customer': function (event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("customer_id");
		Session.set("currentAction", "edit");
		console.log(Session.get("currentAction"));
    Session.set("customerId", customer_id);
  },
	
	'click button.delete_customer': function (event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("customer_id");
		Session.set("currentAction", "delete");
		console.log(Session.get("currentAction"));
		Session.set("customerId", customer_id);
	}
	
});

Template.customers_create.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		Session.set("currentAction", false);
	},
	
	'submit form#create_customer, click a#save_customer' : function (event) {
		
		if (event.type === 'click' || event.type === 'submit') {
			event.preventDefault();
			
			var customer_name 					= $("#customer_name").val();
			var customer_address				= $("#customer_address").val();
			var customer_city						= $("#customer_city").val();
			var customer_state					= $("#customer_state").val();
			var customer_zip						= $("#customer_zip").val();
			var customer_phone					= $("#customer_phone").val();
			var customer_fax						= $("#customer_fax").val();
			var customer_eda						=	$("#eda_number").val();
			var customer_duns						= $("#duns_number").val();
			var customer_notes					= $("#customer_notes").val();
			
			if(Customers.insert({user_id: Meteor.user()._id, name: customer_name, address: customer_address, city: customer_city, state: customer_state, zip: customer_zip, phone: customer_phone, fax: customer_fax, eda_number: customer_eda, duns_number: customer_duns, notes: customer_notes})) {
				
				$("#customer_name").val(null);
				$("#customer_address").val(null);
				$("#customer_city").val(null);
				$("#customer_state").val(null);
				$("#customer_zip").val(null);
				$("#customer_phone").val(null);
				$("#customer_fax").val(null);
				$("#eda_number").val(null);
				$("#duns_number").val(null);
				$("#customer_notes").val(null);
				
				Session.set("currentAction", false);
			}
		};
	}
});

Template.customers_show.events({
	'click button#close' : function(event) {
		event.preventDefault();
		Session.set("currentAction", false);
		Session.set("customerId", null);
	},
	
	'click a#edit_customer' : function (event) {
		event.preventDefault();
		Session.set("currentAction", "edit");
		// Session.set("customerId", null);
	},
	
	'click a.show_contact' : function (event) {
		event.preventDefault();
		Session.set("currentAction", "view");
		Session.set("contactId", $("#" + event.currentTarget.id.toString()).attr("contact_id"));
		console.log(Session.get("contactId"));
	}
});

Template.customers_update.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		Session.set("currentAction", false);
		Session.set("customerId", null);
	},

	'click input[type=submit], submit form#create_customer' : function (event) {
		event.preventDefault();
		
		var customer_name 					= $("#customer_name").val();
		var customer_address				= $("#customer_address").val();
		var customer_city						= $("#customer_city").val();
		var customer_state					= $("#customer_state").val();
		var customer_zip						= $("#customer_zip").val();
		var customer_phone					= $("#customer_phone").val();
		var customer_fax						= $("#customer_fax").val();
		var customer_eda_number			=	$("#eda_number").val();
		var customer_duns_number		= $("#duns_number").val();
		var customer_notes					= $("#customer_notes").val();
		
		if (!Customers.update(Session.get("customerId"), {$set: 
			{
				name: customer_name,
				address: customer_address,
				city: customer_city,
				state: custom_er_state,
				zip: custome_zip,
				phone: customer_phone,
				fax: customer_fax,
				eda_number: customer_eda_number,
				duns_number: customer_duns_number,
				notes: customer_notes
			}
		})) {
			Session.set("currentAction", false);
			Session.set("customerId", null);
		};
	}
});

Template.customers_delete.events({
	'click a#cancel, click button#close' : function(event) {
		event.preventDefault();
		Session.set("currentAction", false);
		Session.set("customerId", null);
	},

	'click a#delete_customer, submit form#delete_customer' : function (event) {
		event.preventDefault();
		if (!Customers.remove(Session.get("customerId"))) {
			Session.set("currentAction", false);
			Session.set("customerId", null);
		};
	}
});
