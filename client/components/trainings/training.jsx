Training = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    let data = {};
    let trainingId = this.props.trainingId;
    let handle = Meteor.subscribe('singleTraining', trainingId);

    if(handle.ready()){
      data.training = Trainings.findOne({_id :trainingId,finished : false});
    }
    return data;
  },
  getContent(){
    const {training} = this.data;
    let exerciseId = training.exercises[this.state.currentIndex];
    let exercisesLeft = training.exercises.length;
    return (
      <div>
        <h1>TRAINING</h1>
        <TrainingCard onClick={this.nextExercise} exerciseId={exerciseId} exercisesLeft={exercisesLeft} />
      </div>
    )
  },
  getInitialState() {
    return {
      currentIndex : 0
    }
  },
  nextExercise(finished,exerciseId,refs) {
    const {training} = this.data;
    this.updateValues(refs,exerciseId, training);
    const indexOfId = training.exercises.indexOf(exerciseId);
    let nextIndex = indexOfId < (training.exercises.length - 1) ? indexOfId + 1 : 0;
    if(finished){
      if(training.exercises.length === 1){
        Meteor.call('edittraining',{finished: true, trainingId: training._id, exerciseId}, (err, res) => {
          FlowRouter.go('/');
        });
      }else{
        if(nextIndex === training.exercises.length - 1){
          nextIndex = 0;
        }
        Meteor.call('edittraining',{finished: false, trainingId: training._id, exerciseId});
      }
    }
    this.setState({
      currentIndex : nextIndex
    })
  },
  updateValues(refs,exerciseId, training) {
    const {weightRef,durationRef,numberOfSetsRef,repsInSetRef,distanceRef} = refs;
    const exerciseObject = {weight: weightRef.value,duration: durationRef.value,numberOfSets: numberOfSetsRef.value,repsInSet: repsInSetRef.value,distance: distanceRef.value ,exerciseId, trainingId : training._id, planId : training.planId};
    Meteor.call('updateExerciseForPlan',exerciseObject, (err, res) => {
      if (err) {
        //TODO ERROR MESSAGE
      }
    });
  },
  render() {
    return (
      <div>
        {this.data.training ? this.getContent() : <p>Loading ....</p>}
      </div>
    )
  }
})
