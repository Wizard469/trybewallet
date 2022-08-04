import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { setUserEmail } from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
  }

  validateEmailAndPassword = () => {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return !(filter.test(email) && password.length >= passwordMinLength);
  }

  onHandleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value },
      () => { this.setState({ isBtnDisabled: this.validateEmailAndPassword() }); });
  }

  onHandleClick = () => {
    const { history, setEmail } = this.props;
    const { email } = this.state;

    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;

    return (
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            onChange={ this.onHandleChange }
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            onChange={ this.onHandleChange }
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={ password }
          />
        </label>
        <button
          onClick={ this.onHandleClick }
          type="button"
          disabled={ isBtnDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setEmail: func,
  history: shape({
    push: func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
