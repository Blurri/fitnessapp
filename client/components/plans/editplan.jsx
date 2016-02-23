EditPlan = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    var data = {};
    var planId = this.props.planId;
    var handle = Meteor.subscribe('singlePlan', planId);
    if(handle.ready()) {
      data.plan = Plans.findOne({_id : planId})
    }
    return data;
  },
  getContent() {
    return(
      <div className="edit-plan">
        <form>
          <div className="row">
            <div className="col-xs-9">
              <fieldset className="form-group input-group-sm">
                <label>Title</label>
                <input ref="titleRef" id="updateinput" className="form-control" type="Text" defaultValue={this.data.plan.title} placeholder="Enter your exercise title." />
              </fieldset>
            </div>
          </div>
          <hr/>
          <button className="btn" onClick={this.updatePlan}>Update</button>
        </form>
        <hr/>
        <PlanExerciseList planId={this.data.plan._id} />
      </div>
    )
  },
  render() {
    return (
      <div>
        {this.data.plan ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  },
  updatePlan(event){
    event.preventDefault();
    const {plan} = this.data;
    const {titleRef} = this.refs;
    Meteor.call('updatePlan',{title: titleRef.value, planId : plan._id},() => {
      if(err){
        //TODO HADLE ERROR
      }
    })
  }
})
