import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const tableDis = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tbody>
          <tr>
            { tableDis.map((item) => <th key={ item }>{ item }</th>) }
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect()(Table);
