import React from 'react';
import NavItem from './elements/nav-link';
import { Basket } from '../icons/';
import '../../assets/index.css'

const Header: React.FC = () => {

  return (
    <header className="mb-[50px]">
      <div className="notch"></div>
      <nav className="flex items-center mt-[15px] justify-between">
        <div className="text-2xl font-semibold text-main">Shop</div>
        <ul className="flex relative">
          <NavItem route="/" name="Каталог" />
          <NavItem route="/basket">
            <div style={{ fill: '#2D3B87' }} className="basket">
            <Basket />
            </div>
          </NavItem>
          {/* {basketProducts.length > 0 && <div className="have-products"></div>} */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
