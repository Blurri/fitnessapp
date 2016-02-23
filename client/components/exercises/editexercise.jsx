EditExercise = React.createClass({
  mixins: [EnsureAuthenticated, ReactMeteorData],
  getMeteorData() {
    var data = {};
    var exerciseId = this.props.exerciseId;
    var handle = Meteor.subscribe('singleExercise', exerciseId);
    if(handle.ready()) {
      data.exercise = Exercises.findOne({_id: exerciseId});
    }
    return data;
  },
  getContent() {
    const {exercise} = this.data;
    return(
        <form>
          <div className="row">
            <div className="col-xs-9">
              <fieldset className="form-group input-group-sm">
                <label>Title</label>
                <input ref="titleRef" className="form-control" type="Text" defaultValue={exercise.title} placeholder="Enter your exercise title." />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Type</label>
                <select className="form-control" ref="typeRef" defaultValue={exercise.type} >
                  <option value="stammina">stammina</option>
                  <option value="strength">strength</option>
                  <option value="stretch">stretch</option>
                </select>
              </fieldset>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-12">
              <fieldset className="form-group input-group-sm">
                <label>description</label>
                <textarea ref="descriptionRef" className="form-control" defaultValue={exercise.description} rows="5" ></textarea>
              </fieldset>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Duration</label>
                <input type="number" className="form-control" defaultValue={exercise.duration} placeholder="Duration" ref="durationRef"  />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Distance</label>
                <input type="number" placeholder="Distance" ref="distanceRef" defaultValue={exercise.distance} className="form-control" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Weight</label>
                <input className="form-control" type="number" defaultValue={exercise.weight} placeholder="Weight" ref="weightRef"  />
              </fieldset>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label># of sets</label>
                <input type="number" className="form-control" defaultValue={exercise.numberOfSets} placeholder="# of Sets" ref="numberOfSetsRef" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label># of repetions in a set</label>
                <input type="number" className="form-control" defaultValue={exercise.repsInSet} placeholder="# of Sets" ref="repsInSetRef"  />
              </fieldset>
            </div>
          </div>
          <hr/>
          <button className="btn" onClick={this.updateExercise}>Update</button>
        </form>
    )
  },
  render() {
    return (
      <div className="edit-exercise">
        {this.data.exercise ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  },
  updateExercise(event) {
    event.preventDefault();
    const {exercise} = this.data;
    const {titleRef,typeRef,weightRef,durationRef,numberOfSetsRef,repsInSetRef,descriptionRef,distanceRef} = this.refs;
    const exerciseObject = {title: titleRef.value,type: typeRef.value,weight: weightRef.value,duration: durationRef.value,numberOfSets: numberOfSetsRef.value,repsInSet: repsInSetRef.value,description: descriptionRef.value,distance: distanceRef.value ,exerciseId: exercise._id};
    Meteor.call('updateExercise',exerciseObject, (err, res) => {
      if (err) {
        //TODO ERROR MESSAGE
      } else {
        FlowRouter.go('/exercise/'+exercise._id);
      }
    });
  }
})
