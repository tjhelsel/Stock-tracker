import React from 'react';
import { connect } from 'react-redux';

const Transactions = ({ purchases }) => {
  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <tbody>
          <tr>
            <th scope="col">Transaction type</th>
            <th scope="col">Ticker symbol</th>
            <th scope="col">Shares</th>
            <th scope="col">Share value</th>
            <th scope="col">Transaction amount</th>
          </tr>
          {purchases.map(purchase => {
            const { symbol, qty, price } = purchase;
            return (
              <tr key={symbol}>
                <td> Buy </td>
                <td> {symbol} </td>
                <td> {qty}</td>
                <td>$ {price / 10000} </td>
                <td>$ {((price / 10000) * qty).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  purchases: state.auth.user.purchases
});

export default connect(mapStateToProps)(Transactions);
