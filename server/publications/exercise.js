
Meteor.publish('singleExercise',function (id) {
  return Exercises.find({_id: id, userId: this.userId});
})

Meteor.publish('getAllExerciseInList',function (list) {
  return Exercises.find({_id: {$in : list}, userId: this.userId});
})

Meteor.publish('allExercises', function () {
  return Exercises.find({userId: this.userId});
})
