import { Form, Input, Button, Checkbox, message, Icon } from 'antd';
import React from 'react';
import { history } from "../../utils/history";
import 'antd/dist/antd.css';
import './login.css'
import AuthService from "./AuthService";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        AuthService.login(values.username, values.password).then(
            () => {
                message.success("登录成功！", 1)
                console.log('login success!')
                history.push('#/')
                window.location.reload()
            },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();
                message.error(resMessage, 1)
                console.log(resMessage)
            })
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="#/register">现在注册!</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
