// ContactForm.jsx

import {
  PhoneOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../Redux/Contacts/operations';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const currentContacts = useSelector(state => state.contacts.items);
  const loader = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  const showModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const submit = value => {
    const formatTel = () => {
      const number = value.number;
      const phoneLength = number.length;

      if (phoneLength < 7) {
        return `(${number.slice(0, 3)}) ${number.slice(3)}`;
      }

      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
        6,
        10
      )}`;
    };

    const newContact = { name: value.name, number: formatTel() };
    const newContactName = newContact.name.toLowerCase();

    if (
      currentContacts.find(
        contact => contact.name.toLowerCase() === newContactName
      )
    ) {
      alert(`${newContact.name} is already in contact`);
    } else {
      dispatch(addContact(newContact));

      if (!loader) {
        form.resetFields();
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Button
        className={css.openAddModal}
        type="primary"
        onClick={showModal}
        title="add new contact"
        size="large"
      >
        <PlusCircleOutlined />
        Add contact
      </Button>

      <Modal
        className={css.addModal}
        footer={null}
        title="Add new contact"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={submit}
          className={css.formWrap}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Name!',
                type: 'text',
              },
            ]}
          >
            <Input
              className={css.inputForm}
              prefix={<UserAddOutlined className={css.userIcon} />}
              placeholder="Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
          </Form.Item>

          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input Number!',
                type: 'phone',
              },
            ]}
          >
            <Input
              className={css.inputForm}
              prefix={<PhoneOutlined className={css.phoneIcon} />}
              type=""
              placeholder="Number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={css.addModalBtn}
            >
              Create contact
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
