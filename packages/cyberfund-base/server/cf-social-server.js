// todo: move to dedicated package.
// move /profile template there, too.
Meteor.methods({
  followUser: function(targetId, options){
    options = options || {};
    var  userId = this.userId,
      selTarget = {_id: targetId},
      selOwn = {_id: userId};
    if (!userId || !Meteor.users.find(selTarget).count()) return;
    if (options.unfollow) {
      Meteor.users.update(selOwn, {$pull: {"profile.followingUsers": targetId}});
      Meteor.users.update(selTarget, {$pull: {"profile.followedBy": userId}});
    } else {
      Meteor.users.update(selOwn, {$push: {"profile.followingUsers": targetId}});
      Meteor.users.update(selTarget, {$push: {"profile.followedBy": userId}});
    }
  }
})

Meteor.publish("friendlyUsers", function(userId){
  if (!userId) return this.ready();
  var user = Meteor.users.findOne({_id: userId});
  if (!user) {
    console.log("no user by id: " +userId+ ".");
    return this.ready();
  }
  if (!user.profile) return this.ready;
  var uids = _.union(user.profile["followedBy"] || [], user.profile["followingUsers"] || []);
  return Meteor.users.find({_id: {$in: uids}}, {fields: {
    "profile.name": 1,
    "profile.twitterName": 1,
    "profile.twitterIconUrlHttps": 1,
    "profile.twitterIconUrl": 1
  }})
});