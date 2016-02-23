NewPlan = React.createClass({
  mixins : [EnsureAuthenticated],
  render() {
    return (
      <div className="new-plan">
        <h2>Add New Plan</h2>
        <form>
          <fieldset className="form-group">
            <label>Plan Title</label>
            <input className="form-control" ref="titleRef" type="Text" placeholder="Enter your plan title." id="plantitle" />
          </fieldset>
          <button className="btn btn-default" id="addplan" onClick={this.createPlan}>Add New</button>
        </form>
      </div>
    )
  },
  createPlan(event){
    event.preventDefault();
    const {titleRef} = this.refs;
    if(titleRef.value != ''){
      Meteor.call('insertPlan', {title : titleRef.value}, (err, res)=>{
        if(err){
          //TODO SHOW ERROR MESSAGE
          return err;
        }
        FlowRouter.go('/edit-plan/'+res);
      })
    }
  }
})
