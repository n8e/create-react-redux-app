import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import LogoutView from '../../components/login/logout';
import { logoutUser } from '../../actions';

class LogoutPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
    };
  }

  componentDidMount() {
    this.props.logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      // redirect
      this.props.changePage();
    }
  }

  render() {
    return (<LogoutView {...this.props} />);
  }
}

LogoutPageContainer.defaultProps = {
  auth: {
    isShowingLogin: true,
    isFetching: false,
    credentials: {},
    validations: {},
  },
};

LogoutPageContainer.propTypes = {
  auth: PropTypes.shape({
    isShowingLogin: PropTypes.bool,
    isFetching: PropTypes.bool,
    credentials: PropTypes.object,
    validations: PropTypes.object,
    user: PropTypes.object,
  })
};

const mapStateToProps = state => ({
  auth: state.authentication
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutUser,
  changePage: () => push('/login')
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPageContainer);