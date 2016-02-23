Exercise = React.createClass({
  mixins: [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    var data = {};
    var exerciseId = this.props.exerciseId;
    var handle = Meteor.subscribe('singleExercise', exerciseId);
    if(handle.ready()) {
      data.exercise = Exercises.findOne({_id: exerciseId});
    }
    return data;
  },
  getContent(){
    const {exercise} = this.data;
    return(
      <div className="jumbotron">
        <h1 className="display-3">{exercise.title} <span className="label label-default pull-xs-right">{exercise.type}</span></h1>
        <p className="lead">{exercise.description}</p>
        <hr/>
        <div className="row">
          {(exercise.weight > 0 || exercise.duration > 0 || exercise.distance) ?
            <div className="col-md-6">
              <div className="list-group">
                {exercise.weight > 0 ?
                  <div href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Weight</h4>
                    <p className="list-group-item-text">{exercise.weight} / kg</p>
                  </div>
                  :
                  null
                }
                {exercise.duration > 0 ?
                  <div href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Duration</h4>
                    <p className="list-group-item-text">{exercise.duration} / mins</p>
                  </div>
                  :
                  null
                }
                {exercise.distance > 0 ?
                  <div href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Distance</h4>
                    <p className="list-group-item-text">{exercise.distance} / km</p>
                  </div>
                  :
                  null
                }
              </div>
            </div>
            :
            null
          }
          {(exercise.repsInSet > 0 || exercise.numberOfSets > 0) ?
            <div className="col-md-6">
              <div className="list-group">
                {exercise.numberOfSets > 0 ?
                  <div href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Number of Sets</h4>
                    <p className="list-group-item-text">{exercise.numberOfSets}</p>
                  </div>
                  :
                  null
                }
                {exercise.repsInSet > 0 ?
                  <div href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Repetition in a set</h4>
                    <p className="list-group-item-text">{exercise.repsInSet}</p>
                  </div>
                  :
                  null
                }
              </div>
            </div>
            :
            null
          }
        </div>
        <hr/>
        <p className="lead">
          <a className="btn btn-info btn-lg" href={'/edit-exercise/'+ exercise._id} role="button">Edit</a>
        </p>
      </div>
    )
  },
  render() {
    return (
      <div className="exercise">
        {this.data.exercise ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  }
})
