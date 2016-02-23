Navigation = React.createClass({
  render() {
    return (
      <li className={this.routeClass()} >
        <a className="nav-link" id={this.props.id} href={this.props.href}>{this.props.title} {this.activeRouteElement()}</a>
      </li>
    )
  },

  routeClass() {
    return FlowRouter.current().path === this.props.href ? 'nav-item active' : 'nav-item';
  },

  activeRouteElement() {
    return FlowRouter.current().path === this.props.href ? <span className="sr-only">(current)</span> : null;
  }
})
