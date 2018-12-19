import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import Quizzes from './components/Quizzes/Quizzes';
import Quiz from './components/Quiz';
import {connect} from 'react-redux';

//{this.props.isLoggedIn ? <UserDashboard /> : <LandingPage />}
class App extends Component {
  // why can't i just put isLoggedIn here and skip authenticate?
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/quizzes" render={props => <Quizzes {...props} />} />
        <Route path="/quiz/:id" component={Quiz} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(
  connect(mapStateToProps)(App),
); /* withRouter is apparently not the most efficent solution to
blocked updates. need to read more on this and figure out a better way to get around the problem.
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
