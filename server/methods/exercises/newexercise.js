let Future = Npm.require( 'fibers/future' );
Meteor.methods({
  'insertExercise'({title, type, weight, duration, numberOfSets, repsInSet, description, distance}) {
    let future = new Future();
    new SimpleSchema({
      title : {type: 'String'}, type : {type: 'String'}, description: {type: 'String',optional: true},weight : {type: 'Number',optional: true}, duration : {type: 'Number',optional: true},numberOfSets : {type: 'Number',optional: true},repsInSet : {type: 'Number',optional: true},distance : {type: 'Number',optional: true}
    }).validate({title, type, weight, duration, numberOfSets, repsInSet, description, distance})
    const insertObject = createInsertObject({title, type, weight, duration, numberOfSets, repsInSet, description, distance})
    Exercises.insert( insertObject , (err, exerciseId) => {
      if(err){
        return future.return(err);
      }
      return future.return(exerciseId);
    })
    return future.wait();
  }
});



let createInsertObject = ({title, type, weight, duration, numberOfSets, repsInSet, description, distance}) => {
  let iOb = {title, type, weight, duration, numberOfSets, repsInSet, description, distance,userId : Meteor.userId(),createdAt : new Date()};
  weight ? iOb.start_weight = {value : weight, createdAt : new Date()} : null;
  duration ? iOb.start_duration = {value : duration, createdAt : new Date()} : null;
  numberOfSets? iOb.start_numberOfSets = {value : numberOfSets, createdAt : new Date()} : null;
  repsInSet ? iOb.start_repsInSet = {value : repsInSet, createdAt : new Date()} : null;
  distance ? iOb.start_distance = {value : distance, createdAt : new Date()} : null;
  return iOb;
}
