import React from 'react';
import './QuizForm.css';
import {addQuiz} from '../../store/actions';
import {connect} from 'react-redux';

// add quiz just takes a title and a topic
class QuizForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      topic: '',
    };
  }

  clearState = () => {
    this.setState({title: '', topic: ''});
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
    console.log(this.state);
    this.props.addQuiz(this.state);
    this.clearState();
  };

  makeInput = (name, type = name) => {
    return (
      <input
        className="quiz-form-input"
        name={name}
        type={type}
        onChange={this.handleChange}
        value={this.state[name]}
        placeholder={name}
      />
    );
  };
  render() {
    return (
      <div className="quiz-form">
        <h2>Form component</h2>
        <form onSubmit={this.handleSubmit}>
          {this.makeInput('title', 'text')}
          {this.makeInput('topic', 'text')}
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {addQuiz},
)(QuizForm);
