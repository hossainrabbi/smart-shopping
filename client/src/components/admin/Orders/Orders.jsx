import { useEffect} from 'react';
import { Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../../redux/action/order-action';
import { getUsers } from '../../../redux/action/users.action';
import Loading from '../../common/Loading';
import formatCurrency from '../../../utils/formatCurrency';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getLoading, orders } = useSelector((store) => store.order);
  const { users } = useSelector((store) => store.users);
  // const [statusChange, setStatusChange] = useState('Pending');

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  if (getLoading) {
    return <Loading />;
  }

  return (
    <div className="section__area p-3">
      {orders?.length > 0 ? (
        <Table striped bordered hover className="text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Product Name & Qty</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>
                  {users &&
                    users?.find((user) => user._id === item.userId).username}
                </td>
                <td>
                  {item.purchasedProduct?.map((product) => (
                    <p
                      className="mb-1 cursor-pointer"
                      onClick={() => handleProductClick(product?._id)}
                      key={product?._id}
                    >
                      <span className="me-2">{product?._id}</span>
                      <span>x{product?.qty}</span>
                    </p>
                  ))}
                </td>
                <td>
                  <span>{`${item?.address?.address},`}</span>
                  <br />
                  <span>{`${item?.address?.upozilla}, ${item?.address?.city}, ${item?.address?.division}`}</span>
                </td>
                <td>{item?.address?.phoneNo}</td>
                <td>{formatCurrency.format(item?.totalPrice)}</td>
                <td>
                  <Form.Select
                  // value={statusChange}
                  // onChange={(e) => setStatusChange(e.target.value)}
                  // className={
                  //   statusChange === 'Pending'
                  //     ? 'text-danger'
                  //     : statusChange === 'Delivered'
                  //     ? 'text-success'
                  //     : statusChange === 'Processing'
                  //     ? 'text-warning'
                  //     : ''
                  // }
                  >
                    <option className="text-danger" value="Pending">
                      Pending
                    </option>
                    <option className="text-warning" value="Processing">
                      Processing
                    </option>
                    <option className="text-success" value="Delivered">
                      Delivered
                    </option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">Order Not Found</div>
      )}
    </div>
  );
};

export default Orders;
