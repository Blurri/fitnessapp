let Future = Npm.require('fibers/future');
Meteor.methods({
  'updatePlan'({title, planId}) {
    let future = new Future();
    new SimpleSchema({title : {type: 'String'}, planId : {type: 'String'}}).validate({title, planId})

    Plans.update(planId, {$set : {title : title}}, (err, count) => {
      if(err){
        future.return(err);
      }
      future.return(count);
    });
    return future.wait();
  },
  'addExerciseToPlan'({planId, exerciseId}) {
    new SimpleSchema({planId: {type: 'String'}, exerciseId: {type: 'String'}}).validate({planId,exerciseId});
    Plans.update(planId, {$addToSet : {exercises : exerciseId}})
  },
  'removeExerciseFromPlan'({planId, exerciseId}) {
    new SimpleSchema({planId: {type: 'String'}, exerciseId: {type: 'String'}}).validate({planId,exerciseId});
    Plans.update(planId, {$pull : {exercises : exerciseId}});
  }
});
