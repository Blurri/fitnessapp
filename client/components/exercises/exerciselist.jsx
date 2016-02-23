ExerciseList = React.createClass({
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
    return (
      <div className="col-md-12">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.data.exercises.map((exercise, index) => (
              <tr key={exercise._id}>
                <td>{index+1}</td>
                <td>{exercise.title}</td>
                <td><a href={'/exercise/'+exercise._id}><i className="fa fa-eye"></i></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
  render() {
    return(
      <div className="row">
        {this.data.exercises ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  }
})
