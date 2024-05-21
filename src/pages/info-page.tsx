import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from "../store/store.ts";
import { getProductInfo } from "../features/products/productsSlice.ts";
import { updateOrderStatus } from "../features/basket/basketSlice.ts";
import { Basket, Location } from '../components/icons/';

const InfoPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const id = useParams()
  console.log(id.id);

  const productInfo = useSelector((state: RootState) => state.products.productInfo);
  useEffect(() => {
    if (id) {
      dispatch(getProductInfo(id.id));
    } else {
      navigate(`/`);
    }
  }, []);
  return (
    <div>
      <div className="lg:flex mb-10">
        <div className="flex flex-col flex-grow justify-center items-center w-full">
          <img className="product-img" src={productInfo?.img} alt={productInfo?.name} />
        </div>
        <div className="lg:border-l-[1px] border-[1px] border-solid rounded-[20px] p-5 lg:w-1/4 w-full flex-none flex flex-col justify-between">
          <div>
            <h5 className="name">{productInfo?.name}</h5>
            <div className="text-[20px] text-main font-semibold">{productInfo?.price} смн</div>
            <div className="count">
              <span className="text-secondaryColor">Количество</span>
              <span className="text-main">{productInfo?.count}</span>
            </div>
            <div className="price">
              <span className="text-secondaryColor">Стоимость за штуку</span>
              <span className="text-main">{productInfo?.price}</span>
            </div>
            <div className="mt-4">
              <div className="location">
                <div className="mr-2" >
                  <Location/>
                </div>
                <span className="text-secondaryColor text-sm">{productInfo?.city}</span>
              </div>
              <div className="mb-[15px] text-sm">
                <span className="text-secondaryColor">
                  Продавец: <span className="text-main">{productInfo?.seller}</span>
                </span>
              </div>
              <div className="mb-[15px] text-sm">
                <span className="text-secondaryColor">
                  Бренд: <span className="text-main">{productInfo?.brand}</span>
                </span>
              </div>
              <div className="product-type">
                <span className="text-secondaryColor">
                  Категория товара: <span className="text-main">{productInfo?.type}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <button onClick={() => dispatch(updateOrderStatus(productInfo))}
              className={`button ${productInfo?.is_in_basket ? 'bg-main' : 'bg-bgColor'} max-w-[50px] flex justify-center items-center`}
            >
              <div style={{ fill: productInfo?.is_in_basket ? '#fff' : '#2D3B87' }} className="w-[20px]">
                <Basket />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="description">{productInfo?.description}</div>
    </div>
  )
}

export default InfoPage