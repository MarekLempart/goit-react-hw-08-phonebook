// Filter.jsx

import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { filtration } from '../../Redux/Contacts/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  return (
    <div className={css.wrapperFilter}>
      <p className={css.filterP}>Find contacts by name</p>
      <div className={css.filterInputContainer}>
        <SearchOutlined className={css.filterIcon} />
        <input
          className={css.filterInput}
          type="text"
          value={filter}
          onChange={event => dispatch(filtration(event.target.value))}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};
