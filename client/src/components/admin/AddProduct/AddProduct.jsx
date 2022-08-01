import React, { useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../redux/action/categories-action';

const AddProduct = () => {
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="section__area p-3">
      <Form>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price:</Form.Label>
              <Form.Control type="number" placeholder="$ Price" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productInStock">
              <Form.Label>InStock:</Form.Label>
              <Form.Control type="number" placeholder="Is Stock" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productDiscount">
              <Form.Label>Product Discount:</Form.Label>
              <Form.Control type="number" placeholder="Discount %" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Label>Choose Category:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option className="d-none">Select Category</option>
              {categories?.categories?.length > 0 ? (
                categories.categories.map((category) => (
                  <option value={category.categoryName} key={category._id}>
                    {category.categoryName}
                  </option>
                ))
              ) : (
                <Link to="/admin/categories">Create Category</Link>
              )}
            </Form.Select>
          </Col>
        </Row>
        <Button type="submit">Add Product</Button>
      </Form>
    </div>
  );
};

export default AddProduct;
