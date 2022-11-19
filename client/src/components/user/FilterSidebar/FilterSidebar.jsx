import React, { Fragment } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiOutlineMinus } from 'react-icons/ai';
import ReactStars from 'react-rating-stars-component';
import { Button, Form } from 'react-bootstrap';
import formatCurrency from '../../../utils/formatCurrency';
import './FilterSidebar.scss';

const FilterSidebar = ({
  categories,
  searchData,
  handleChangeSearchData,
  category,
  handleChangeCategory,
  rattingValue,
  handleRattingValue,
  maximum,
  handleChangeMaximumPrice,
  minimum,
  handleChangeMinimumPrice,
  priceValue,
  handleChangePriceValue,
  handleClearFilter,
}) => {
  return (
    <div className="shop__sidebar shadow-sm rounded-2 px-4 py-2 bg-white">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchData}
        onChange={handleChangeSearchData}
      />
      <div className="pt-1 my-4">
        <h5>Category:</h5>
        <ul className="category">
          <li
            onClick={() => handleChangeCategory('all')}
            className={'all' === category && 'text-underline'}
          >
            all
          </li>
          {categories?.categories?.map((item) => (
            <li
              key={item?._id}
              onClick={() => handleChangeCategory(item?.categoryName)}
              className={
                item?.categoryName === category ? 'text-underline' : ''
              }
            >
              {item?.categoryName}
            </li>
          ))}
        </ul>
      </div>
      <div className="ratting my-4">
        <h5>Ratting:</h5>
        {[1, 2, 3, 4, 5].reverse().map((item) => (
          <Fragment key={item}>
            <div
              onClick={() => handleRattingValue(item)}
              className="d-inline-flex cursor-pointer"
            >
              <ReactStars
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
                activeColor="#ffa534"
                color={'#ddd'}
                size={25}
                value={item}
                edit={false}
                classNames="me-1 py-0 my-0"
              />{' '}
              <span
                className={
                  item === rattingValue ? 'active-color' : 'light-color'
                }
              >
                {item < 5 ? 'and Up' : ''}
              </span>
            </div>
            <br />
          </Fragment>
        ))}
      </div>
      <div className="mb-4">
        <h5>Price:</h5>
        <div className="d-flex align-items-center justify-content-between gap-1">
          <input
            type="number"
            className="text-center"
            style={{ width: '90px' }}
            min={0}
            value={minimum}
            onChange={handleChangeMinimumPrice}
          />
          <AiOutlineMinus />
          <input
            type="number"
            className="text-center"
            style={{ width: '90px' }}
            value={maximum}
            onChange={handleChangeMaximumPrice}
          />
        </div>
        <p className="mb-1 mt-2">{formatCurrency.format(priceValue)}</p>
        <Form.Range
          min={minimum}
          max={maximum}
          value={priceValue}
          onChange={handleChangePriceValue}
        />
      </div>
      <Button className="w-100" onClick={handleClearFilter}>
        Clear Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
