import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { sortProduct } from '../../../data/home.data';
import useFilter from '../../../hooks/useFilter';
import useProduct from '../../../hooks/useProduct';
import { getCategories } from '../../../redux/action/categories-action';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData/NoData';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import FilterSidebar from '../../user/FilterSidebar/FilterSidebar';

const Shop = () => {
  const {
    productList,
    productGetLoading,
    productGetError,
    wishProductItem,
    cartProductItem,
  } = useProduct();
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  const [category, setCategory] = useState('all');
  const [rattingValue, setRattingValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(30000);
  const [sortBy, setSortBy] = useState('default');
  const [clearFilter, setClearFilter] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const allProducts = useFilter(
    searchData,
    category,
    priceValue,
    rattingValue,
    sortBy,
    clearFilter
  );

  const handleChangeSearchData = (e) => {
    setSearchData(e.target.value);
  };

  const handleChangeCategory = (categoryName) => {
    setCategory(categoryName);
  };

  const handleRattingValue = (item) => {
    setRattingValue(item);
  };

  const handleChangeMinimumPrice = (e) => {
    setMinimum(e.target.value);
    setPriceValue(e.target.value);
  };

  const handleChangeMaximumPrice = (e) => {
    setMaximum(e.target.value);
  };

  const handleChangePriceValue = (e) => {
    setPriceValue(e.target.value);
  };

  const handleClearFilter = () => {
    setClearFilter(true);
    setSearchData('');
    setCategory('all');
    setPriceValue(0);
    setRattingValue(0);
    setSortBy('default');
    setMinimum(0);
    setMaximum(30000);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Container>
      {productGetLoading ? (
        <Loading />
      ) : productGetError ? (
        <NoData title={productGetError} />
      ) : (
        <>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-primary">
                Filter Products:
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <FilterSidebar
                categories={categories}
                searchData={searchData}
                handleChangeSearchData={handleChangeSearchData}
                category={category}
                handleChangeCategory={handleChangeCategory}
                rattingValue={rattingValue}
                handleRattingValue={handleRattingValue}
                maximum={maximum}
                handleChangeMaximumPrice={handleChangeMaximumPrice}
                minimum={minimum}
                handleChangeMinimumPrice={handleChangeMinimumPrice}
                priceValue={priceValue}
                handleChangePriceValue={handleChangePriceValue}
                handleClearFilter={handleClearFilter}
              />
            </Offcanvas.Body>
          </Offcanvas>

          <div className="d-flex justify-content-between w-100">
            <div className="w-100">
              <Navbar className="shadow-sm my-3 rounded-2 p-2">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <Button
                    variant="light"
                    className="d-flex justify-content-center align-items-center gap-2"
                    style={{ height: '39px' }}
                    onClick={handleShow}
                  >
                    <BsFilter /> <span>Filter</span>
                  </Button>

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
                    <Col lg={4} md={6} key={product._id} className="mb-4">
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
                <NoData title="Product Not Found!" />
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Shop;
