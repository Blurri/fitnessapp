PlanExerciseList = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe('allExercises');
    if(handle.ready()) {
      data.exercises = Exercises.find().fetch();
    }
    return data;
  },
  getContent() {
    const {exercises} = this.data;
    return (
      <div className="row plan-exercise-list">
        <div className="col-md-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => (
                <PlanExerciseListRow exerciseId={exercise._id} planId={this.props.planId} key={index} index={index}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  render() {
    return (
      <div>
        {this.data.exercises ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  }
})
