import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { CartItemsAmount } from '../Home';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, addProduct, removeProduct, updateProductAmount } = useCart();

  let products: Product[] = [];

  cart.forEach(product => {
    const findProduct = products.find((item) => item.id === product.id);

    if (!findProduct) {
      products.push(product);
    }
  });

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.id in sumAmount ? sumAmount[product.id] + 1 : 1;

    return sumAmount;
  }, {} as CartItemsAmount);

  const total = formatPrice(cart.reduce((sumTotal, product) => {
    sumTotal += product.price;

    return sumTotal;
  }, 0));

  function handleProductIncrement(product: Product) {
    addProduct(product.id);
  }

  function handleProductDecrement(product: Product) {
    // TODO
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} data-testid="product">
              <td>
                <img src={product.image} alt={product.title} />
              </td><td>
                  <strong>{product.title}</strong>
                  <span>{formatPrice(product.price)}</span>
                </td><td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={cartItemsAmount[product.id]} />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td><td>
                  <strong>{formatPrice(product.price * cartItemsAmount[product.id])}</strong>
                </td><td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
