import { Location, Basket } from "../icons/";
import { Product } from "../../shared/types";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  AppDispatch } from "../../store/store";
import { updateOrderStatus } from "../../features/basket/basketSlice";
import '../../assets/index.css'
import {FC} from "react";

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const goToInfoPage = (id: number) => {
    navigate(`/info/${id}`);
  };
  return (
    <div className="card-main">
      <div className="lg:flex">
        <div className="product-info">
          <img className="product-img" src={product?.img} alt="" />
          <div className="mt-4">
            <h5 className="name">
              {product?.name}
            </h5>
            <div className="location">
              <div className="mr-2">
                <Location />
              </div>
              <span className="text-secondaryColor text-sm">{product?.city}</span>
            </div>
            <div className="mb-[15px] text-sm">
              <span className="text-secondaryColor ">Продавец: <span className="text-main ">{product?.seller}</span></span>
            </div>
            <div className="mb-[15px] text-sm">
              <span className="text-secondaryColor ">Бренд: <span className="text-main ">{product?.brand}</span></span>
            </div>
            <div className="product-type">
              <span className="text-secondaryColor">Категория товара: <span className="text-main"> {product?.type}</span></span>
            </div>
          </div>
        </div>
        <div className="actions">
          <div>
            <div className="text-[20px] text-main font-semibold">
              {product?.price} смн
            </div>
            <div className="count">
              <span className="text-secondaryColor">Количество</span>
              <span className="text-main">{product?.count}</span>
            </div>
            <div className="price">
              <span className="text-secondaryColor">Стоимость за штуку</span>
              <span className="text-main">{product?.price}</span>
            </div>
          </div>
          <div className="flex w-full">
            <button onClick={() => goToInfoPage(product?.id)} className="button bg-bgColor mr-[10px]">
              Посмотреть
            </button>
            <button onClick={() => dispatch(updateOrderStatus(product))} className={`button ${product?.is_in_basket ? 'bg-main' : 'bg-bgColor'} max-w-[50px] flex justify-center items-center`}>
              <div style={{ fill: product?.is_in_basket ? '#fff' : '#2D3B87' }} className="w-[20px]">
                <Basket />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard