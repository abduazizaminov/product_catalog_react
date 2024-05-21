import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../store/store.ts";
import { fetchBasketProducts } from "../features/basket/basketSlice.ts";
import ProductCard from '../components/product-card/ProductCard.tsx';

const BasketPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.basket.items);

  useEffect(() => {
    dispatch(fetchBasketProducts());
  }, [ ,dispatch]);


  return (
    <div>
      <div className="">
        <div className="">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-product">
              Товаров пока что нет :(
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
