import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func } from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchCurr } = this.props;
    fetchCurr();
  }

  onHandleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { price, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="price">
          Valor:
          <input
            data-testid="value-input"
            onChange={ this.onHandleChange }
            type="text"
            id="price"
            name="price"
            value={ price }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            onChange={ this.onHandleChange }
            name="currency"
            id="currency"
            value={ currency }
          >
            { currencies.map((curr) => (
              <option key={ curr } value={ curr }>
                { curr }
              </option>)) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            onChange={ this.onHandleChange }
            name="method"
            id="method"
            value={ method }
          >
            { payment.map((paymentMethod) => (
              <option key={ paymentMethod } value={ paymentMethod }>
                { paymentMethod }
              </option>)) }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            onChange={ this.onHandleChange }
            name="tag"
            id="tag"
            value={ tag }
          >
            { categories.map((category) => (
              <option key={ category } value={ category }>
                { category }
              </option>)) }
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            onChange={ this.onHandleChange }
            type="text"
            id="description"
            name="description"
            value={ description }
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf(string),
  fetchCurr: func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
