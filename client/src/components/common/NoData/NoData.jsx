import React from 'react';
import NoDataImage from '../../../images/no-data.jpg';
import './NoData.scss';

const NoData = ({ title = 'Error Found' }) => {
  return (
    <div className="no__data">
      <h5>{title}</h5>
      <div className="error__image mx-auto">
        <img
          src={NoDataImage}
          alt="Error"
          className="w-100 d-inline-block h-100"
        />
      </div>
    </div>
  );
};

export default NoData;
