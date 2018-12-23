import axios from 'axios';

export const REGISTERING = 'REGISTERING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGGING_IN = 'LOGGING_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOGGING_OUT = 'LOGGING_OUT';

export const FETCHING = 'FETCHING';
export const FETCH_QUIZZES_SUCCESS = 'FETCH_QUIZZES_SUCCESS';
export const FETCH_QUIZZES_FAILURE = 'FETCH_QUIZZES_FAILURE';

export const FETCHING_QUIZ = 'FETCHING_QUIZ';
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_FAILURE = 'FETCH_QUIZ_FAILURE';

export const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';

export const FETCHING_TOPICS = 'FETCHING_TOPICS';
export const FETCHING_TOPICS_SUCCESS = 'FETCHING_TOPICS_SUCCESS';

export const FILTER_QUIZZES = 'FILTER_QUIZZES';
export const CLEAR_QUIZ_FILTER = 'CLEAR_QUIZ_FILTER';

export const ADDING_QUIZ = 'ADDING_QUIZ';
export const ADD_QUIZ_SUCCESS = 'ADD_QUIZ_SUCCESS';
export const ADD_QUIZ_FAILURE = 'ADD_QUIZ_FAILURE';

export const EDIT_MODE_ON = 'EDIT_MODE_ON';
export const EDIT_MODE_OFF = 'EDIT_MODE_OFF';

// change axios config to make things simpler
const ax = axios.create({
  baseURL: 'https://lambda-study-app.herokuapp.com/api/',
});

const auth = axios.create({
  baseURL: 'https://lambda-study-app.herokuapp.com/api/',
});

function addAuthorization() {
  if (localStorage.getItem('quiz_token')) {
    ax.defaults.headers.common['Authorization'] = localStorage.getItem(
      'quiz_token',
    );
  }
}

export const registerUser = user => dispatch => {
  dispatch({ type: REGISTERING });
  ax.post('auth/register', user)
    .then(res => {
      console.log('response:', res);
      dispatch({ type: REGISTER_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log('error:', err);
      dispatch({ type: REGISTER_FAILURE, payload: err });
    });
};

export const logInUser = user => dispatch => {
  dispatch({ type: LOGGING_IN });
  ax.post('auth/login', user)
    .then(res => {
      console.log('login res:', res);
      console.log(auth);
      //auth.defaults.headers.common['Authorization'] = res.data.token; // better to use local storage?
      //localStorage.setItem('quiz_token', res.data.token);
      dispatch({ type: LOG_IN_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log('login err:', err);
      console.log(err.response.message);
      dispatch({ type: LOG_IN_FAILURE, payload: err });
    });
};

export const logOutUser = () => dispatch => {
  delete ax.defaults.headers.common['Authorization'];
  dispatch({ type: LOGGING_OUT });
};

export const getQuizzes = () => dispatch => {
  dispatch({ type: FETCHING });
  ax.get('/quizzes')
    .then(res => {
      console.log('fetch response:', res);
      dispatch({ type: FETCH_QUIZZES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_QUIZZES_FAILURE });
    });
};

export const getQuiz = id => dispatch => {
  addAuthorization();
  dispatch({ type: FETCHING_QUIZ });
  ax.get(`/quizzes/${id}`)
    .then(res => {
      console.log('get quiz', res);
      dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data });
    })
    .catch(err => console.log());
};

export const getQuestions = id => dispatch => {
  dispatch({ type: FETCHING_QUESTIONS });
  ax.get(`quizzes/${id}/questions`)
    .then(res => {
      console.log('questions respons:', res);
      dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTopics = () => dispatch => {
  dispatch({ type: FETCHING_TOPICS });
  ax.get('/quizzes/topics')
    .then(res => {
      console.log(res);
      dispatch({ type: FETCHING_TOPICS_SUCCESS, payload: res.data });
    })
    .catch(err => console.log());
};

export const filterQuizzes = topic => dispatch => {
  console.log('topic', topic);
  if (topic === 'None') {
    dispatch({ type: CLEAR_QUIZ_FILTER });
  } else {
    dispatch({ type: FILTER_QUIZZES, payload: topic });
  }
};

export const addQuiz = quiz => dispatch => {
  console.log('adding quiz:', quiz);
  addAuthorization();
  dispatch({ type: ADDING_QUIZ });
  ax.post('/quizzes', quiz)
    .then(res => {
      console.log('add quiz res:', res);
      dispatch({ type: ADD_QUIZ_SUCCESS });
    })
    .catch(err => {
      console.log('add quizz err:', err);
      dispatch({ type: ADD_QUIZ_FAILURE, payload: err });
    });
};

export const deleteQuiz = id => dispatch => {
  console.log('delete quiz');

  addAuthorization();
  ax.delete(`/quizzes/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log());
};

export const setEditModeOn = () => ({
  type: EDIT_MODE_ON,
});

export const setEditModeOff = () => ({
  type: EDIT_MODE_OFF,
});
