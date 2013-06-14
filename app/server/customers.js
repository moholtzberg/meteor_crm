Customers = new Meteor.Collection("customers");

Meteor.publish("Customers", function () {
  return Customers.find({user_id: this.userId});
});

Customers.allow({
	insert: function (userId, doc) {
		return userId === doc.user_id;
	},
	update: function (userId, doc) {
		return userId === doc.user_id;
	}, 
	remove: function (userId, doc) {
		console.log(doc);
		return userId === doc.user_id;
	}
});

// var isPresent = Match.Where(function(string){
// 	console.log(string);
// 	console.log(" - " + check(string, String) && string.length > 0 && string[0] !== " ");
// 	return check(string, String) && string.length > 0 && string[0] !== " ";
// });

// Meteor.methods({
// 	createRecord: function (doc) {
// 		console.log("FROM createRecord >>> " + EJSON.stringify(doc));
// 		
// 		check(doc, {
// 			name: isPresent,
// 		});
// 		
// 		return Customers.insert({
// 			user_id: this.userId,
// 			name: doc.name,
// 			address: doc.address,
// 			city: doc.city,
// 			state: doc.state,
// 			zip: doc.zip,
// 			phone: doc.phone,
// 			fax: doc.fax,
// 			eda_number: doc.eda_number,
// 			duns_number: doc.duns_number,
// 			notes: doc.notes
// 			});
// 	}
// });