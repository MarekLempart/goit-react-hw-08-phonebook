// UseMenu.jsx

import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/Authorization/operations';
import css from './Usermenu.module.css';

export const UserMenu = () => {
  const { email } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className={css.wrap}>
      <Avatar>{email.slice(0, 1).toUpperCase()}</Avatar>
      <p>{email}</p>
      <Button type="primary" onClick={() => dispatch(logOut())}>
        <LogoutOutlined /> Log out
      </Button>
    </div>
  );
};
