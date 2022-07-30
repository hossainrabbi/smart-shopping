import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {
  createCategories,
  getCategories,
  removeCategory,
} from '../../../redux/action/categories-action';
import './Categories.scss';

const Categories = () => {
  const [categoryInput, setCategoryInput] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Category Create SideEffect
  useEffect(() => {
    if (categories?.createError) {
      toast.error(categories?.createError);
    }

    if (categories?.isCreate) {
      setCategoryInput('');
    }
  }, [categories?.createError, categories?.isCreate]);

  // Category Remove SideEffect
  useEffect(() => {
    if (categories?.isRemove) {
      toast.success('Category Remove Successfully');
    }
  }, [categories?.isRemove]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryInput) return toast.error('Please Type Category');
    dispatch(createCategories({ categoryName: categoryInput }));
  };

  const handleRemoveCategory = (id) => {
    dispatch(removeCategory(id));
  };

  return (
    <div className="section__area p-3">
      <Row>
        <Col md={6}>
          <h3 className="text-center mb-4">Create Categories</h3>
          <ListGroup className="list__group">
            {categories?.categories?.map((categoryItem) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={categoryItem?._id}
              >
                {categoryItem?.categoryName}
                <span>
                  <button className="action__btn text-success">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemoveCategory(categoryItem?._id)}
                    className="action__btn text-danger"
                  >
                    <FaTrash />
                  </button>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleAddCategory}>
            <InputGroup
              className={`list__group__input ${
                categories?.categories?.length > 0 ? 'empty__list' : ''
              }`}
            >
              <Form.Control
                placeholder="Type Category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              />
              <Button
                disabled={categories?.createLoading}
                type="submit"
                variant="primary"
              >
                {categories?.createLoading ? 'Creating...' : 'Add Category'}
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={6}>{/* <h3 className="text-center">Create Brand</h3> */}</Col>
      </Row>
    </div>
  );
};

export default Categories;
