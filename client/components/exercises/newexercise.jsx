NewExercise = React.createClass({
  mixins : [EnsureAuthenticated],
  render() {
    return(
      <div className="new-exercise">
        <h2>Add New Exercise</h2>
        <form>
          <div className="row">
            <div className="col-xs-9">
              <fieldset className="form-group input-group-sm">
                <label>Exercise Title</label>
                <input ref="titleRef" type="Text" placeholder="Enter your exercise title." className="form-control" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Example select</label>
                <select className="form-control" ref="typeRef" defaultValue="stammina">
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
                <label>Description</label>
                <textarea ref="descriptionRef" rows="5" className="form-control" ></textarea><br/>
              </fieldset>
            </div>
          </div>
          <hr/>

          <div className="row">
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Duration</label>
                <input type="number" placeholder="Duration" ref="durationRef" className="form-control" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Distance</label>
                <input type="number" placeholder="Distance" ref="distanceRef" className="form-control" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label>Weight</label>
                <input type="number" placeholder="Weight" ref="weightRef" className="form-control" />
              </fieldset>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label># of Sets</label>
                <input type="number" placeholder="# of Sets" ref="numberOfSetsRef" className="form-control" />
              </fieldset>
            </div>
            <div className="col-xs-3">
              <fieldset className="form-group input-group-sm">
                <label># of repetions in a set</label>
                <input type="number" placeholder="# of Sets" ref="repsInSetRef" className="form-control" />
              </fieldset>
            </div>
          </div>
          <hr/>
          <button onClick={this.createExercise} className="btn">Add New</button>
        </form>
      </div>
    )
  },
  createExercise(event) {
    event.preventDefault();
    const {titleRef,typeRef,weightRef,durationRef,numberOfSetsRef,repsInSetRef,descriptionRef,distanceRef} = this.refs;
    let exerciseObject = {title : titleRef.value,type : typeRef.value,weight : weightRef.value,duration: durationRef.value,numberOfSets: numberOfSetsRef.value,repsInSet: repsInSetRef.value,description: descriptionRef.value,distance: distanceRef.value};
    if(titleRef.value != "" && typeRef.value != ""){
      Meteor.call('insertExercise',exerciseObject, (err, res) => {
        if (err) {
          //TODO ERROR MESSAGE
        } else {
          FlowRouter.go('/exercise/'+res);
        }
      });
    }
  }
})
