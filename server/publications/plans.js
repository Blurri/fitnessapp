Meteor.publish('singlePlan',function (id) {
  return Plans.find({_id: id, userId: this.userId});
})


Meteor.publish('allPlans', function () {
  return Plans.find({userId: this.userId});
})
