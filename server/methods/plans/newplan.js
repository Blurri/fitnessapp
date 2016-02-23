let Future = Npm.require('fibers/future');
Meteor.methods({
  'insertPlan'({title}) {
    let future = new Future();
    new SimpleSchema({title : {type: 'String'}}).validate({title})
    Plans.insert({title, trainings : [], exercises : [], userId : Meteor.userId()},(err,id) => {
      if(err){future.return(err);}
      future.return(id);
    });
    return future.wait();
  }
});
