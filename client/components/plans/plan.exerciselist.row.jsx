PlanExerciseListRow = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    var data = {};
    var planId = this.props.planId;
    var exerciseId = this.props.exerciseId;
    var handlePlan = Meteor.subscribe('singlePlan', planId);
    var handleExercise = Meteor.subscribe('singleExercise', exerciseId);
    if(handlePlan.ready() && handleExercise.ready()){
      data.plan = Plans.findOne({_id:planId});
      data.exercise = Exercises.findOne({_id:exerciseId});
    }
    return data;
  },
  addExercise(event) {
    event.preventDefault();
    Meteor.call('addExerciseToPlan', {planId: this.props.planId, exerciseId: this.props.exerciseId});
  },
  removeExercise(event) {
    event.preventDefault();
    
    Meteor.call('removeExerciseFromPlan', {planId: this.props.planId, exerciseId: this.props.exerciseId});
  },
  render() {
    if(this.data.plan && this.data.exercise){
      const {exercise,plan} = this.data;
      let className = 'success';
      let buttonText = 'add';
      let action = this.addExercise;
      plan.exercises.map((id) => {
        if(id === exercise._id){
          className = 'danger';
          buttonText = 'remove';
          action = this.removeExercise;
        }
      });

      return (
        <tr>
          <td>{this.props.index+1}</td>
          <td>{exercise.title}</td>
          <td>{exercise.type}</td>
          <td>
              <button className={'btn btn-sm btn-' + className} onClick={action} >{buttonText}</button>
              <a className="btn btn-link btn-sm" href={'/exercises/'+exercise._id}><i className="fa fa-eye"></i></a>
          </td>
        </tr>
      )
    }else{ 
      return (
        <tr>
          <td>Loading...</td>
          <td></td>
          <td></td>
          <td>
          </td>
        </tr>
      )
    }
  }
})
