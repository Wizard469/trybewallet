import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func } from 'prop-types';
import { addExpenses, fetchCurrenciesCode } from '../redux/actions/index';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
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

  onHandleInputClick = () => {
    const { value } = this.state;
    if (value === '0') {
      this.setState({ value: '' });
    }
  }

  onHandleClick = () => {
    const { addExpense } = this.props;

    addExpense(this.state);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      description: '',
    });
  }

  render() {
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            onChange={ this.onHandleChange }
            onClick={ this.onHandleInputClick }
            type="text"
            id="value"
            name="value"
            value={ value }
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
        <button type="button" onClick={ this.onHandleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf(string),
  fetchCurr: func,
  addExpense: func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrenciesCode()),
  addExpense: (expense) => dispatch(addExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
