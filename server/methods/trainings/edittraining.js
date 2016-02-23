let Future = Npm.require('fibers/future');

Meteor.methods({
  'edittraining'({finished, trainingId, exerciseId}) {
    let future = new Future();
    new SimpleSchema({finished: {type : 'Boolean'}, trainingId: {type: 'String'}, exerciseId: {type: 'String'}}).validate({finished, trainingId, exerciseId});
    if(finished){
        Trainings.update(trainingId, {$pull : {exercises : exerciseId},$push : {finisedExercises : exerciseId},$set : {finished : true}}, (err, count) => {
          if(err){
            future.return(err);
          }
          future.return(count)
        });
      }else{
        Trainings.update(trainingId, {$pull : {exercises : exerciseId},$push : {finisedExercises : exerciseId}}, (err, count) => {
          if(err){
            future.return(err);
          }
          future.return(count)
        });
      }
      return future.wait();
    }
  })
