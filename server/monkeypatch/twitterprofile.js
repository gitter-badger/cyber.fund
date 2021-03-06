Meteor.methods({
  "patchProfile": function(){
    if (!this.userId) return;
    var user = Meteor.users.findOne({_id: this.userId});
    if (!user) return;
    CF.Profile.patch(user);
  }
});

Accounts.onCreateUser(function(options, user) {
  //var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
  //user.dexterity = d6() + d6() + d6();
  // We still want the default hook's 'profile' behavior.

  if (user.services && user.services.twitter) {
    options.profile = options.profile || {};
    options.profile.twitterName = user.services.twitter.screenName;
    options.profile.twitterIconUrl = user.services.twitter.profile_image_url;
    options.profile.twitterIconUrlHttps = user.services.twitter.profile_image_url_https;
  }
  options.profile.firstLogin = true;
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Meteor.methods({
  afterFirstLogin: function(){
    if (!Meteor.userId()) return;
    Meteor.users.update({
      _id: Meteor.userId()
    },{$unset: {'profile.firstLogin': true}})
  }
});

// reason for that is user.services.twitter.screenName is delivered by subscriptions,
// while we also want avatar url and name
CF.Profile.patch = function(user){
  if (!user) return;
  if (!user.services.twitter) return;
  var set = {}
  if (user.profile.twitterName != user.services.twitter.screenName) {
    set["profile.twitterName"] = user.services.twitter.screenName;
  }
  if (user.profile.twitterIconUrlHttps != user.services.twitter.profile_image_url_https)
  {
    set["profile.twitterIconUrl"] = user.services.twitter.profile_image_url;
    set["profile.twitterIconUrlHttps"] = user.services.twitter.profile_image_url_https;
  };
  if (_.keys(set).length)
    Meteor.users.update({_id: user._id}, {$set: set})
};

SyncedCron.add({
  name: 'update profiles',
  schedule: function (parser) {
    return parser.cron('19 * * * *', false);
  },
  job: function () {
    Meteor.users.find({}).forEach(function(user){
      CF.Profile.patch(user)
    });
  }
});