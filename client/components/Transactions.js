import React from 'react';
import { connect } from 'react-redux';

const Transactions = ({ purchases }) => {
  return (
    <div id="transactions">
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Transaction type</th>
            <th scope="col">Ticker symbol</th>
            <th scope="col">Shares</th>
            <th scope="col">Share value</th>
            <th scope="col">Transaction amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => {
            const { symbol, qty, price, id, timestamp } = purchase;
            return (
              <tr key={id}>
                <td> Buy </td>
                <td> {symbol} </td>
                <td> {qty}</td>
                <td>${(price / 10000).toFixed(2)}</td>
                <td>${((price / 10000) * qty).toFixed(2)}</td>
                <td>
                  {timestamp.slice(0, 10)} <br />
                  {timestamp.slice(11, 19)}
                </td>
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
