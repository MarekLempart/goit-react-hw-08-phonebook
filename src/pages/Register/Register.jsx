// Register.jsx

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../Redux/Authorization/operations';
import css from './Register.module.css';

export default function Register() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  // Obsługa zdarzenia onSubmit formy rejestracji
  const onFinish = values => {
    const { name, email, password, confirm } = values;

    // Sprawdzenie, czy hasła się zgadzają przed wysłaniem na serwer
    if (password === confirm) {
      dispatch(register({ name, email, password }));
      !isLoading && !error && form.resetFields();
    }
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '48',
          }}
          scrollToFirstError
          className={css.formReg}
        >
          <h2 className={css.titleReg}>Register new user</h2>
          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
            className={css.label}
          >
            <Input
              prefix={<UserOutlined className={css.regUser} />}
              className={css.inputReg}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            className={css.label}
          >
            <Input
              prefix={<MailOutlined className={css.regMail} />}
              className={css.inputReg}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
            className={css.label}
          >
            <Input.Password
              prefix={<LockOutlined className={css.regPassword} />}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 7 or more characters"
              className={css.inputPassword}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
            className={css.label}
          >
            <Input.Password
              prefix={<LockOutlined className={css.regPassword} />}
              className={css.inputPassword}
            />
          </Form.Item>

          <Form.Item className={css.label}>
            <Button
              type="primary"
              htmlType="submit"
              className={css.submitButton}
            >
              Register
            </Button>
            <div className={css.contLabel}>
              or{' '}
              <Link to="/login" className={css.linkToLog}>
                {' '}
                log in
              </Link>{' '}
              if you already have an account
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
