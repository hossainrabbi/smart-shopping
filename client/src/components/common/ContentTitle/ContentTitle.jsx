import React from 'react';
import './ContentTitle.scss';

const ContentTitle = ({ title }) => {
  return (
    <div className="title my-5">
      <span></span>
      <h4 className="text-center text-uppercase mb-0 mt-2 px-3"> {title}</h4>
      <span></span>
    </div>
  );
};

export default ContentTitle;
