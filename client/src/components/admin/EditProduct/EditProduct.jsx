import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCategories } from '../../../redux/action/categories-action';
import { updateProduct } from '../../../redux/action/product-action';
import ProductForm from '../ProductForm/ProductForm';
const productInitialsState = {
  productName: '',
  price: '',
  inStock: '',
  discount: '',
  featured: false,
  category: '',
  images: [],
  description: '',
};

const EditProduct = () => {
  const products = useSelector((store) => store.products);
  const { productId } = useParams();
  const editProductValue = products?.products?.find(
    (item) => item._id === productId
  );
  const [productsValue, setProductsValue] = useState(
    editProductValue ? { ...editProductValue } : { ...productInitialsState }
  );
  const [error, setError] = useState('');
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (products?.updateError) {
      toast.error(products?.updateError);
    }

    if (products?.isUpdate) {
      toast.success('Product Update Successfully');
      setProductsValue({ ...productInitialsState });
      navigate('/admin/products');
    }
  }, [products?.updateError, products?.isUpdate, navigate]);

  const handleProductChange = (e) => {
    if (e.target.name === 'featured') {
      setProductsValue((prevProduct) => ({
        ...prevProduct,
        featured: e.target.checked,
      }));
    } else {
      setProductsValue((prevProduct) => ({
        ...prevProduct,
        [e.target.name]: e.target.value,
      }));
    }

    setError('');
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (productsValue.images.length >= 5 || files.length > 5) {
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
      updateProduct(productId, {
        ...productsValue,
        price: parseFloat(productsValue.price),
        inStock: parseFloat(productsValue.inStock),
        discount: productsValue.discount
          ? parseFloat(productsValue.discount)
          : 0,
      })
    );
  };

  const handleError = () => {
    setError('');
  };
  return (
    <div className="section__area p-3">
      <ProductForm
        error={error}
        handleError={handleError}
        handleProductSubmit={handleProductSubmit}
        productsValue={productsValue}
        handleProductChange={handleProductChange}
        categories={categories}
        handleImagesChange={handleImagesChange}
        removeImage={removeImage}
        products={products}
        updateProduct={true}
      />
    </div>
  );
};

export default EditProduct;
