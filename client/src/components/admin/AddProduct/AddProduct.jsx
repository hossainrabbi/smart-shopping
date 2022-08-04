import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { getCategories } from '../../../redux/action/categories-action';
import './AddProduct.scss';
import { createProduct } from '../../../redux/action/product-action';

const productInitialsState = {
  productName: '',
  price: '',
  inStock: '',
  discount: '',
  category: '',
  images: [],
  description: '',
};

const AddProduct = () => {
  const [productsValue, setProductsValue] = useState({
    ...productInitialsState,
  });
  const [error, setError] = useState('');
  const categories = useSelector((store) => store.categories);
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (products?.createError) {
      toast.error(products?.createError);
    }

    if (products?.isCreate) {
      toast.success('Product Created Successfully');
      setProductsValue({ ...productInitialsState });
    }
  }, [products?.createError, products?.isCreate]);

  const handleProductChange = (e) => {
    setProductsValue((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));

    setError('');
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (productsValue.images.length >= 5 || files.length > 5) {
      console.log(productsValue.images.length > 5);
      return setError('Maximum 5 image can upload');
    }

    let file;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      file = files[i];
      reader.onloadend = () => {
        const findImage = productsValue.images.find(
          (image) => image === reader.result
        );

        if (findImage) {
          return setError('This image already exist');
        }
        setProductsValue((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }

    setError('');
  };

  const removeImage = (image) => {
    const filterImage = productsValue.images.filter(
      (singleImage) => singleImage !== image
    );
    setProductsValue((prevProduct) => ({
      ...prevProduct,
      images: filterImage,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (
      !productsValue.productName ||
      !productsValue.price ||
      !productsValue.inStock ||
      !productsValue.category ||
      !productsValue.description
    ) {
      return setError('Please set Product all Credentials!');
    }

    if (productsValue.category === 'Select Category') {
      return setError('Select Valid Category');
    }

    if (productsValue.images.length === 0) {
      return setError('Choose Product Image');
    }

    if (productsValue.images.length > 5) {
      return setError('Maximum 5 image can upload');
    }

    setError('');

    return dispatch(
      createProduct({
        ...productsValue,
        price: parseFloat(productsValue.price),
        inStock: parseFloat(productsValue.inStock),
        discount: productsValue.discount
          ? parseFloat(productsValue.discount)
          : 0,
      })
    );
  };

  return (
    <div className="section__area p-3">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
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
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="$ Price"
                name="price"
                value={productsValue.price}
                onChange={handleProductChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
          <Col md={6}>
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
          <Col md={6}>
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
          <Col md={6}>
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
          <Col md={6}>
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
        <Button disabled={products?.createLoading} type="submit">
          {products?.createLoading ? 'Product Creating...' : 'Add Product'}
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
