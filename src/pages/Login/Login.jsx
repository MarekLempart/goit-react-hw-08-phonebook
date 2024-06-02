// Login.jsx

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginization } from '../../Redux/Authorization/operations';
import css from './Login.module.css';

export default function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = values => {
    dispatch(loginization(values));
    form.resetFields();
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className={css.formWrap}
        >
          <h2 className={css.titleReg}>Log in</h2>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className={css.userIcon} />}
              placeholder="Email"
              className={css.inputForm}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className={css.passwordIcon} />}
              type="password"
              placeholder="Password"
              className={css.inputForm}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={css.logButton}>
              Log in
            </Button>
            <div className={css.regLink}>
              Or <Link to="/register">register now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
