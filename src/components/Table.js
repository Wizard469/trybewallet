import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { editExpenses, removeExpenses } from '../redux/actions';

class Table extends Component {
  expensesEditor = (id) => {
    const { editExpense } = this.props;
    editExpense(id);
  }

  deleteExpenses = (id) => {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const three = 3;
    const { expenses } = this.props;
    const tableDis = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <table>
        <thead>
          <tr>
            { tableDis.map((item) => <th key={ item }>{ item }</th>) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Math.round(
                  Number(expense.exchangeRates[expense.currency].ask) * 100,
                ) / 100}
              </td>
              <td>
                {
                  (parseFloat(expense.value)
                    * parseFloat(expense.exchangeRates[expense.currency].ask)
                  ).toFixed(three)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.expensesEditor(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpenses(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expense: object,
}.isRequired;

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpenses(id)),
  editExpense: (id) => dispatch(editExpenses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
