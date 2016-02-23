let Future = Npm.require('fibers/future');
Meteor.methods({
  'updateExercise'({title, type, weight, duration, numberOfSets, repsInSet, description, distance, exerciseId}) {
    let future = new Future();
    new SimpleSchema({
      title : {type: 'String'}, type : {type: 'String'}, description: {type: 'String',optional: true},weight : {type: 'Number',optional: true}, duration : {type: 'Number',optional: true},numberOfSets : {type: 'Number',optional: true},repsInSet : {type: 'Number',optional: true},distance : {type: 'Number',optional: true}, exerciseId: {type: 'String'}
    }).validate({title, type, weight, duration, numberOfSets, repsInSet, description, distance, exerciseId})
    const updateValues = createUpdateObject({title, type, weight, duration, numberOfSets, repsInSet, description, distance, exerciseId});
    Exercises.update(exerciseId, {$set : updateValues}, (err, count) => {
      if(err) {future.return(err);};
      return future.return(count);
    });
    return future.wait();
  },


  'updateExerciseForPlan'({weight, duration, numberOfSets, repsInSet, distance, exerciseId, trainingId, planId}) {
    let future = new Future();
    new SimpleSchema({
      weight : {type: 'Number',optional: true}, duration : {type: 'Number',optional: true},numberOfSets : {type: 'Number',optional: true},repsInSet : {type: 'Number',optional: true},distance : {type: 'Number',optional: true}, exerciseId: {type: 'String'}, trainingId: {type: 'String'}, planId: {type: 'String'}
    }).validate({weight, duration, numberOfSets, repsInSet, distance, exerciseId,trainingId, planId})
    const updateValues = createUpdateObjectForPlan({weight, duration, numberOfSets, repsInSet, distance, exerciseId});
    Exercises.update(exerciseId, {$set : updateValues}, (err, count) => {
      if(err) {future.return(err);};
      return future.return(count);
    });
    return future.wait();
  }
});

let createUpdateObjectForPlan = ({weight, duration, numberOfSets, repsInSet, distance, exerciseId}) => {
  const oldExercise = Exercises.findOne({_id: exerciseId});
  let uV = {weight, duration, numberOfSets, repsInSet, distance}
  oldExercise.weight ? null :  (weight ? (oldExercise.start_weight ? null: uV.start_weight = {value : weight, createdAt : new Date()} ):null);
  oldExercise.duration ? null :  (duration ? (oldExercise.start_duration ? null : uV.start_duration = {value : duration, createdAt : new Date()}) :null);
  oldExercise.distance ? null :  (distance ? (oldExercise.start_distance ? null : uV.start_distance = {value : distance, createdAt : new Date()}) :null);
  oldExercise.numberOfSets ? null :  (numberOfSets ? (oldExercise.start_numberOfSets ? null : uV.start_numberOfSets = {value : numberOfSets, createdAt : new Date()}) :null);
  oldExercise.repsInSet ? null :  (repsInSet ?(oldExercise.start_repsInSet ? null : uV.start_repsInSet = {value : repsInSet, createdAt : new Date()}) :null);
  return uV;
}
let createUpdateObject = ({title, type, weight, duration, numberOfSets, repsInSet, description, distance, exerciseId}) => {
  const oldExercise = Exercises.findOne({_id: exerciseId});
  let uV = {title, type, weight, duration, numberOfSets, repsInSet, description, distance, updatedAt : new Date()}
  oldExercise.weight ? null :  (weight ? (oldExercise.start_weight ? null: uV.start_weight = {value : weight, createdAt : new Date()} ):null);
  oldExercise.duration ? null :  (duration ? (oldExercise.start_duration ? null : uV.start_duration = {value : duration, createdAt : new Date()}) :null);
  oldExercise.distance ? null :  (distance ? (oldExercise.start_distance ? null : uV.start_distance = {value : distance, createdAt : new Date()}) :null);
  oldExercise.numberOfSets ? null :  (numberOfSets ? (oldExercise.start_numberOfSets ? null : uV.start_numberOfSets = {value : numberOfSets, createdAt : new Date()}) :null);
  oldExercise.repsInSet ? null :  (repsInSet ?(oldExercise.start_repsInSet ? null : uV.start_repsInSet = {value : repsInSet, createdAt : new Date()}) :null);
  return uV;
}
