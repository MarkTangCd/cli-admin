import { FC } from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'
import { ITemplate } from '../typings/api';

interface IProps {
  title: string;
  open: boolean;
  confirmLoading: boolean;
  confirmFn: (template: ITemplate) => void;
  cancelFn: () => void;
  template?: ITemplate;
}

const TemplateModal: FC<IProps> = ({ title, open, confirmLoading, confirmFn, cancelFn, template }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title={title}
      open={open}
      confirmLoading={confirmLoading}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields()
        cancelFn()
      }}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={template ?? { forceInstall: false }}
        onFinish={confirmFn}
        autoComplete="off"
      >
        <Form.Item<ITemplate>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the template name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ITemplate>
          label="NPM Name"
          name="npmName"
          rules={[{ required: true, message: 'Please input the template npm name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ITemplate>
          label="Value"
          name="value"
          rules={[{ required: true, message: 'Please input the template value!' }]}
        >
          <Input disabled={template ? true : false} />
        </Form.Item>

        <Form.Item<ITemplate>
          label="Version"
          name="version"
          rules={[{ required: true, message: 'Please input the template version!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ITemplate>
          name="forceInstall"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>force install</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TemplateModal