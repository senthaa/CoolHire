import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {connect} from "react-redux";

class InputLocationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'location/saveLocation',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Current Location Details</h1>
        <Form.Item>
          {getFieldDecorator('longtitude', {
            rules: [{ required: true, message: 'Please input your current longtitude!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Longtitude"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('lattitde', {
            rules: [{ required: true, message: 'Please input your current lattitde!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Lattitude"
            />,
          )}
        </Form.Item>
        <Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedinputlocationForm = Form.create({ name: 'normal_login' })(InputLocationForm);

export default connect(({InputLocation,loading }) => ({
  InputLocation : InputLocation,
  submitting: loading.effects['location/location'],
}))(WrappedinputlocationForm);
