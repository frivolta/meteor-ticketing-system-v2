import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';


/**If the user is the first user will be assigned Admin role */
Accounts.onCreateUser(function (options, user){
  let role;
  if (Meteor.users.find().count() === 0) {
    role=['admin'];
    console.log(`User is the first user and will be assigned Admin superpowers!`)
  }
  else{
    role=['user']
    console.log(`User is NOT the first user and will be assigned standard powers!`)
  }
  
  user.roles = role;
  return user;
})

/**Publish User List */
/**Expose publish */
Meteor.publish('listUsers', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({}, {});
  }
  return this.ready();
});


/**Define Methods */
Meteor.methods({
  'user.delete'({userId}){
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      Meteor.users.remove(userId);
    } else {
      throw new Meteor.Error(400, 'Permission to delete user denied!');
    }
  }
})
