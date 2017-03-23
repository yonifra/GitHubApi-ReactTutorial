var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data) {
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div className="jumbotron">
        <img src={this.state.avatar_url} className="img-rounded" width="80"/>
          <h3><b>{this.state.name}</b></h3>
          <i>@{this.state.login}</i>
          <h6>{this.state.bio}</h6>
          <h6>From {this.state.location}</h6>
          <h6>Works at {this.state.company}</h6>
        <hr/>
      </div>
    );
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
        <input placeholder="github login" ref="login" type="text" className="form-control" />
        <button type="button" className="btn btn-default">Add</button>
      </form>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card login={login} />);
    });
    return (
      <div>
        <Form addCard={this.addCard} /> 
        <br />
        {cards}
      </div>
    )
  }
});

React.render(<Main />, document.getElementById("root"));