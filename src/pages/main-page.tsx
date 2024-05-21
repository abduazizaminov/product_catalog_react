import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../store/store.ts";
import { fetchProducts, getCategory, getBrands, setFilter } from "../features/products/productsSlice.ts";
import ProductCard from '../components/product-card/ProductCard.tsx';

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<number>();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const categories = useSelector((state: RootState) => state.products.category);
  const brands = useSelector((state: RootState) => state.products.brands);
  const filter = useSelector((state: RootState) => state.products.filter);
  useEffect(() => {
    dispatch(fetchProducts(filter));
    dispatch(getCategory());
    if (selectedCategory !== null) {
      dispatch(getBrands(selectedCategory));
    } else {
      dispatch(getBrands(undefined));
    }
  }, [filter, dispatch, selectedCategory]);

  const getFilterData = () => {
    dispatch(setFilter({
      brand_id: selectedBrand ? selectedBrand : null,
      price_gte: fromPrice || null,
      price_lte: toPrice || null,
      type_id: selectedCategory ? selectedCategory : null
    }));
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-10">
        <div className="filter-block lg:col-span-3 col-span-12">
          <h4 className="filter-title">
            Фильтры:
          </h4>
          <div className="lg:block flex">
          <div>
          <div className="mt-5">
                <h5>Категория:</h5>
                <div>
                  <label htmlFor="allCategories">
                    <input
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      id="allCategories"
                      type="radio"
                    />
                    Все категории
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} htmlFor={category.name}>
                      <input
                        checked={selectedCategory === category.id}
                        value={category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        id={category.name}
                        type="radio"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>
          </div>
            <div>
              <div className="lg:mt-5 lg:ml-0 ml-5 mt-0">
                <h5>Бренды:</h5>
                <div>
                  <label htmlFor="allBrands">
                    <input
                      checked={!selectedBrand} 
                      onChange={() => setSelectedBrand(null as unknown as number)}
                      id="allBrands"
                      type="radio"
                    />
                    Все бренды
                  </label>
                  {brands.map((brand) => (
                    <label key={brand.id} htmlFor={brand.name}>
                      <input
                        checked={selectedBrand === brand.id}
                        value={brand.id}
                        onChange={() => setSelectedBrand(brand.id)}
                        id={brand.name}
                        type="radio"
                      />
                      {brand.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-5 lg:ml-0 ml-5">
                <h5>Цена:</h5>
                <div className="flex">
                  <div className="mr-[10px]">
                    <label htmlFor="">От:</label>
                    <input
                      value={fromPrice}
                      onChange={(e) => setFromPrice(e.target.value)}
                      className="priceInput"
                      type="number"
                    />
                  </div>
                  <div>
                    <label htmlFor="">До:</label>
                    <input
                      value={toPrice}
                      onChange={(e) => setToPrice(e.target.value)}
                      className="priceInput"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={getFilterData} className="button bg-bgColor mr-[10px]">
            Применить
          </button>
        </div>
        <div className="w-full lg:col-span-9 col-span-12">
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

export default MainPage;
