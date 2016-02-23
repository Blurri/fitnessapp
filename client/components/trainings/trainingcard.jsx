TrainingCard = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    let data = {};
    let exerciseId = this.props.exerciseId;
    let handle = Meteor.subscribe('singleExercise', exerciseId);

    if(handle.ready()){
      data.exercise = Exercises.findOne({_id : exerciseId});
    }
    return data;
  },
  getContent() {
    const {exercise} = this.data;
    const {title,description,distance, duration, weight, numberOfSets, repsInSet} = exercise;
    let distanceStyle = exercise.distance > 0 ? null : {display: 'none'};
    let durationStyle = exercise.duration > 0 ? null : {display: 'none'};
    let weightStyle = exercise.weight > 0 ? null : {display: 'none'};
    let numberOfSetsStyle = exercise.numberOfSets > 0 ? null : {display: 'none'};
    let repsInSetStyle = exercise.repsInSet > 0 ? null : {display: 'none'};
    return (
      <div className="card card-inverse">
        <div className="card-block">
          <h4 className="card-title">{title}<span className="label label-default pull-xs-right">{this.props.exercisesLeft} left</span></h4>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item clearfix" style={distanceStyle}  >
            <input type="number" ref="distanceRef" defaultValue={distance} onChange={ this.handleChange } /> Distance
          </li>
          <li className="list-group-item clearfix" style={durationStyle}  >
            <input type="number" ref="durationRef" defaultValue={duration} onChange={ this.handleChange } /> / Minutes
          </li>
          <li className="list-group-item clearfix" style={weightStyle}>
            <input type="number" ref="weightRef" defaultValue={weight} onChange={ this.handleChange } /> / Kg
          </li>
          <li className="list-group-item clearfix" style={numberOfSetsStyle} >
            <input type="number" ref="numberOfSetsRef" defaultValue={numberOfSets} onChange={ this.handleChange } /> Sets
          </li>
          <li className="list-group-item clearfix" style={repsInSetStyle}>
            <input type="number" ref="repsInSetRef"  defaultValue={repsInSet} onChange={ this.handleChange } /> Repetions in a set
          </li>
        </ul>
        <div className="card-block">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group" role="group">
              <button className="btn btn-primary" onClick={this.nextClick.bind(this,true,exercise._id)}>Done!</button>
            </div>
              <div className="btn-group" role="group">
                <button className="btn btn-primary" onClick={this.nextClick.bind(this,false,exercise._id)}>Another Exercise</button>
              </div>
          </div>
        </div>
      </div>
    )
  },
  handleChange(event) {
    this.setState({
      value: $(event.target).val()
    });
  },
  nextClick(finished,exerciseId,event){
    event.preventDefault();
    this.props.onClick(finished,exerciseId,this.refs);
  },
  render(){
    return (
      <div>
        {this.data.exercise ? this.getContent() : <p>Loading ...</p>}
      </div>
    )
  }
 })
