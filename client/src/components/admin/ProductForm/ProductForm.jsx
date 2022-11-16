import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import './ProductForm.scss';

const ProductForm = ({
  error,
  handleError,
  handleProductSubmit,
  productsValue,
  handleProductChange,
  categories,
  handleImagesChange,
  removeImage,
  products,
  updateProduct,
}) => {
  return (
    <>
      {error && (
        <Alert variant="danger" onClose={handleError} dismissible>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleProductSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="productName"
                value={productsValue.productName}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (BDT)"
                name="price"
                value={productsValue.price}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="productInStock">
              <Form.Label>InStock:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Is Stock"
                name="inStock"
                value={productsValue.inStock}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="productDiscount">
              <Form.Label>Product Discount:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount %"
                name="discount"
                value={productsValue.discount}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Choose Category:</Form.Label>
            <Form.Select
              aria-label="category selected"
              name="category"
              value={productsValue.category}
              onChange={handleProductChange}
            >
              <option className="d-none" value="Select Category">
                Select Category
              </option>
              {categories?.categories?.length > 0 &&
                categories.categories.map((category) => (
                  <option value={category.categoryName} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col md={6} className="mb-3">
            <div className="h-100 d-flex align-items-center user-select-none mt-3">
              <Form.Check
                type="checkbox"
                id="featured"
                label="Featured Product"
                name="featured"
                checked={productsValue.featured}
                onChange={handleProductChange}
              />
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="productImageUpload" className="mb-3">
              <Form.Label>Upload Images:</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex">
              {productsValue?.images?.map((image, i) => (
                <div
                  className="add__product__images px-1 position-relative"
                  key={new Date().getTime() * Math.random()}
                >
                  <img
                    src={image}
                    className=" shadow-lg rounded"
                    aria-hidden
                    alt={`product-image-${i}`}
                  />
                  <span
                    onClick={() => removeImage(image)}
                    className="closeBtn position-absolute shadow rounded-circle"
                  >
                    <IoClose />
                  </span>
                </div>
              ))}
            </div>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productsValue.description}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          disabled={products?.createLoading || products?.updateLoading}
          type="submit"
        >
          {products?.createLoading
            ? 'Product Creating...'
            : products?.updateLoading
            ? 'Product Updating...'
            : updateProduct
            ? 'Update Product'
            : 'Add Product'}
        </Button>
      </Form>
    </>
  );
};

export default ProductForm;
