import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/login';
import { validateAuthField, loginUser, credentialsUpdate } from '../../actions';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        email: null,
        password: null,
      },
    };

    this.handleAuthAction = this.handleAuthAction.bind(this);
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleValidateField = this.handleValidateField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user && nextProps.auth.user.token) {
      // redirect
      this.props.changePage();
    }
  }

  handleFieldUpdate(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let credentials = this.props.auth.credentials;
    credentials = Object.assign({}, credentials, { [name]: value.trim() });
    this.props.credentialsUpdate(credentials);
    this.props.validateAuthField(name);
  }

  handleValidateField(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if(name === 'email') {
      let isEmailCorrect = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(value);
      if(!isEmailCorrect) {
        this.setState({ errors: Object.assign({}, this.state.errors, {email: 'Incorrect email format'}) });
      } else {
        this.setState({ errors: Object.assign({}, this.state.errors, {email: null}) })
      }
    }
    if(name === 'password') {
      let isPasswordAcceptable = /^(?=.*[.,?!])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(value);
      if(!isPasswordAcceptable) {
        this.setState({
          errors: Object.assign(
            {},
            this.state.errors,
            {password: 'Password must be at least 6 characters and must contain an upper case letter, lower case letter, number and special character'}
          ) 
        });
      } else {
        this.setState({ errors: Object.assign({}, this.state.errors, {password: null}) })
      }
    }
  }

  handleAuthAction() {
    this.props.loginUser(this.props.auth.credentials);
  }

  render() {
    return (
      <Login
        onAuthAction={this.handleAuthAction}
        onFieldUpdate={this.handleFieldUpdate}
        onValidateField={this.handleValidateField}
        errors={this.state.errors}
        {...this.props}
      />
    );
  }
}

LoginPageContainer.defaultProps = {
  auth: {
    isShowingLogin: true,
    isFetching: false,
    credentials: {},
    validations: {},
  },
};

LoginPageContainer.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      token: PropTypes.string,
    }),
    isShowingLogin: PropTypes.bool,
    isFetching: PropTypes.bool,
    credentials: PropTypes.object,
    validations: PropTypes.object,
  }),
};

const mapStateToProps = (state) => ({
  auth: state.authentication
});

const mapDispatchToProps = dispatch => bindActionCreators({
  validateAuthField,
  loginUser,
  credentialsUpdate,
  changePage: () => push('/')
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);