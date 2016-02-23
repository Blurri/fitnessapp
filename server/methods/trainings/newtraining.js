let Future = Npm.require('fibers/future');


Meteor.methods({
  'newtraining'({planId}){
    let future = new Future();
    new SimpleSchema({planId: {type: 'String'}}).validate({planId});
    let training = Trainings.findOne({planId : planId, finished : false});
    if(training == undefined){
      const plan = Plans.findOne({_id: planId});
      Trainings.insert({planId:planId, finished : false, exercises : plan.exercises , finisedExercises : [], userId : Meteor.userId()},(err,_id) => {
        if(err){future.return(err);}
        future.return(_id)
      })
    }else{
      future.return(training._id);
    }
    return future.wait();
  }
})
