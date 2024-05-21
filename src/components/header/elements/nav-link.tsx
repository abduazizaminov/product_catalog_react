import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../assets/index.css'
interface Props {
  name?: string;
  svg?: string;
  route: string; // required
  children?: React.ReactNode;
}

const NavItem: React.FC<Props> = ({ name, route, children }) => {
  const location = useLocation();

  return (
    <li className={`nav-item ${location.pathname === route ? 'bg-bgColor' : ''}`}>
      <Link to={route}>
        <span>{name}</span>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
