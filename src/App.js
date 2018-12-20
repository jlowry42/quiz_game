import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import Quizzes from './components/Quizzes/Quizzes';
import QuizContainer from './containers/Quiz';
import {connect} from 'react-redux';
import HomeContainer from './containers/Home';

//{this.props.isLoggedIn ? <UserDashboard /> : <LandingPage />}
class App extends Component {
  // why can't i just put isLoggedIn here and skip authenticate?
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route
          exact
          path="/"
          component={props =>
            this.props.isLoggedIn ? (
              <HomeContainer />
            ) : (
              <LandingPage {...props} />
            )
          }
        />
        <Route path="/quizzes" component={Quizzes} />
        <Route path="/quiz/:id" component={QuizContainer} />
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
