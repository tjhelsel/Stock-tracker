import React from 'react';
import Portfolio from './Portfolio';
import BuyStocks from './BuyStocks';

const UserHome = () => {
  return (
    <div className="main-container">
      <Portfolio />
      <BuyStocks />
    </div>
  );
};

export default UserHome;
