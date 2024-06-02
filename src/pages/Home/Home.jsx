// Home.jsx

import {
  ContactsOutlined,
  EditOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Home.module.css';

export default function Home() {
  const { isLoaggedIn } = useSelector(state => state.auth);

  return (
    <section className={css.section}>
      <h1 className={css.title}>Welcome to your PhoneBook</h1>
      <div className={css.wrap}>
        <EditOutlined className={`${css.icon} ${css.fadeAnimation}`} />
        <PhoneOutlined className={`${css.icon} ${css.fadeAnimation}`} />
        <UsergroupAddOutlined className={`${css.icon} ${css.fadeAnimation}`} />
        <ContactsOutlined className={`${css.icon} ${css.fadeAnimation}`} />
      </div>
      {!isLoaggedIn ? (
        <h2 className={css.underTitle}>
          Please
          <Link to="/register" className={css.homeLink}>
            Register
          </Link>
          or
          <Link to="/login" className={css.homeLink}>
            Log in
          </Link>
          to be able to use your PhoneBook
        </h2>
      ) : (
        <h2 className={css.underTitle}>
          Go to the tab
          <Link to="/contacts" className={css.homeLink}>
            Contacts
          </Link>
          and manage your contacts
        </h2>
      )}
    </section>
  );
}
