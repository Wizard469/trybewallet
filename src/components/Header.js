import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => (
        acc
        + parseFloat(curr.value)
        * parseFloat(curr.exchangeRates[curr.currency].ask)), 0);

    return (
      <header>
        <span>
          Email:
          {' '}
          <span data-testid="email-field">{ email }</span>
        </span>
        <br />
        <span>
          Valor total:
          {' '}
          <span data-testid="total-field">{ total.toFixed(2) }</span>
        </span>
        <br />
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
}.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
