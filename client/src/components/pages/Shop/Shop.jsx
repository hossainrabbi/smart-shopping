import React, { Fragment } from 'react';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import { FaStar } from 'react-icons/fa';

import SingleProduct from '../../common/SingleProduct/SingleProduct';
import useProduct from '../../../hooks/useProduct';
import './Shop.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../../redux/action/categories-action';
import useFilter from '../../../hooks/useFilter';
import { useState } from 'react';
import formatCurrency from '../../../utils/formatCurrency';
import { sortProduct } from '../../../data/home.data';

const Shop = () => {
  const { productList, wishProductItem, cartProductItem } = useProduct();
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  const [category, setCategory] = useState('all');
  const [priceValue, setPriceValue] = useState(0);
  const [rattingValue, setRattingValue] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [clearFilter, setClearFilter] = useState(false);

  const allProducts = useFilter(
    searchData,
    category,
    priceValue,
    rattingValue,
    sortBy,
    clearFilter
  );

  const handleClearFilter = () => {
    setClearFilter(true);
    setSearchData('');
    setCategory('all');
    setPriceValue(0);
    setRattingValue(0);
    setSortBy('default');
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div className="shop__sidebar shadow-sm rounded-2 position-fixed px-4 my-3 py-2">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div className="pt-1 my-4">
            <h5>Category:</h5>
            <ul className="category">
              <li
                onClick={() => setCategory('all')}
                className={'all' === category && 'text-underline'}
              >
                all
              </li>
              {categories?.categories?.map((item) => (
                <li
                  key={item?._id}
                  onClick={() => setCategory(item?.categoryName)}
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
                  onClick={() => setRattingValue(item)}
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
            <p className="mb-1">{formatCurrency.format(priceValue)}</p>
            <Form.Range
              min={0}
              max={100}
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
            />
          </div>
          <Button className="w-100" onClick={handleClearFilter}>
            Clear Filter
          </Button>
        </div>

        <div className="shop__products">
          <Navbar className="shadow-sm my-3 rounded-2 p-2">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex ms-auto align-items-center gap-4">
                <span>Sort By:</span>
                <Form.Select
                  style={{ width: '150px' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortProduct.map((item) => (
                    <option value={item.item} key={item.item}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Navbar>
          {allProducts?.length > 0 ? (
            <Row>
              {allProducts?.map((product) => (
                <Col lg={6} key={product._id} className="mb-4">
                  <SingleProduct
                    iconLeft={
                      productList.wishList.some(
                        (item) => item._id === product._id
                      )
                        ? FaHeart
                        : FaRegHeart
                    }
                    iconRight={FaShoppingCart}
                    leftIconClass={
                      productList.wishList.some(
                        (item) => item._id === product._id
                      )
                        ? 'text-danger'
                        : 'text-primary'
                    }
                    rightIconClass="text-primary"
                    rightProductHandler={cartProductItem}
                    leftProductHandler={wishProductItem}
                    {...product}
                    showDetails
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center mt-3">Product Not Found!</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Shop;
