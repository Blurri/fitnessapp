Meteor.publish('singleTraining', function (id){
  return Trainings.find({
    _id : id,
    userId: this.userId
  });
})

Meteor.publish('allTrainings', function (){
  return Trainings.find({
    userId: this.userId
  });
})
