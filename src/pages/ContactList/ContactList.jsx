// ContactList.jsx

import {
  DeleteOutlined,
  EditOutlined,
  PhoneOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Spin } from 'antd';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
  redactContatc, // Zmiana tutaj na poprawne "redactContatc"
} from '../../Redux/Contacts/operations';
import css from './ContactList.module.css';

export default function Contactlist() {
  const [subName, setSubName] = useState('');
  const [subNumber, setSubNumber] = useState('');
  const [subId, setSubId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Funkcja obsługi zatwierdzenia edycji kontaktu
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(redactContatc({ id: subId, name: subName, number: subNumber }));
  };

  // Funkcja otwarcia modala z danymi kontaktu do edycji
  const showModal = (name, number, id) => {
    setSubNumber(number);
    setSubName(name);
    setSubId(id);
    setIsModalOpen(true);
  };

  // Funkcja zamknięcia modala
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Pobranie kontaktów przy pierwszym renderze komponentu
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { isLoading } = useSelector(state => state.contacts);
  const contacts = useSelector(state => state.contacts.items);
  const filterData = useSelector(state => state.filter).toLowerCase();

  // Filtracja kontaktów na podstawie wartości filtra
  const visibleContacts = contacts.filter(subscriber =>
    subscriber.name.toLowerCase().includes(filterData)
  );

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div>
          {contacts.length < 1 ? (
            <h2 className={css.title}>Add your first contact</h2>
          ) : (
            <Filter />
          )}
          <ContactForm />
          {isLoading && <Spin className={css.spinner} />}
        </div>
        <ul className={css.list}>
          {visibleContacts.map(({ id, name, number }) => (
            <li key={id} className={css.item}>
              <div className={css.divName}>
                <UserOutlined className={css.userIconList} />
                {name}:
              </div>
              <PhoneOutlined className={css.phoneIconList} /> {number}
              <Button
                onClick={() => showModal(name, number, id)}
                className={css.buttonRedact}
                title="Edit contact"
              >
                <EditOutlined />
                Edit
              </Button>
              <Popconfirm
                title="Are you sure delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => dispatch(deleteContact(id))}
              >
                <Button title="delete contact" type="primary">
                  <DeleteOutlined /> Delete
                </Button>
              </Popconfirm>
            </li>
          ))}

          <Modal
            title="Edit a contact"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className={css.modalRedact}
          >
            <Input
              prefix={<UserSwitchOutlined />}
              value={subName}
              onChange={event => {
                setSubName(event.target.value);
              }}
              className={css.inputForm}
            />
            <Input
              prefix={<PhoneOutlined />}
              value={subNumber}
              onChange={event => {
                setSubNumber(event.target.value);
              }}
              pattern="^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
              className={css.inputForm}
            />
          </Modal>
        </ul>
      </div>
    </section>
  );
}
