import { useState, useEffect, useCallback } from 'react'
import { Layout, Space, Button, Table, message, TableColumnProps, Modal, Input, Checkbox } from 'antd'
import { ITemplate } from './typings/api'
import { createTemplate, getTemplateList } from './api/template'

const { Header, Footer, Content } = Layout

const columns: TableColumnProps<ITemplate>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'NPM Name',
    dataIndex: 'npmName',
    key: 'npmName'
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Is force install?',
    dataIndex: 'forceInstall',
    key: 'forceInstall',
    render: (_, { forceInstall }) => {
      return forceInstall ? 'Yes' : 'No'
    }
  }
]

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [list, setList] = useState<ITemplate[]>([])
  const [template, setTemplate] = useState<ITemplate>()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTemplateList()
      .then(res => setList(res.list))
      .catch(err => messageApi.error(err))
      .finally(() => setLoading(false))
  }, [messageApi])

  const handleCreate = useCallback(() => {
    if (template) {
      setConfirmLoading(true)
      createTemplate(template)
        .then(() => {
          messageApi.success('The template Created')
        })
        .catch(err => messageApi.error(err))
        .finally(() => setConfirmLoading(false))
    }
  }, [template, messageApi])

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
        {contextHolder}
        <Header style={{ color: 'white' }}>
          <h1 style={{ margin: '0' }}>CLI-server Admin</h1>
        </Header>
        <Content>
          <Space direction='vertical'>
            <div>
              <Button type="primary">Create Template</Button>
            </div>
            <div>
              <Table columns={columns} dataSource={list} loading={loading} />
            </div>
          </Space>
        </Content>
        <Footer>
          By MarkTang
        </Footer>
      </Space>
      <Modal
        title="Create a template"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
      >
        <div>
          <Input placeholder="Please enter name" />
        </div>
        <div>
          <Input placeholder="Please enter npm package name" />
        </div>
        <div>
          <Input placeholder="Please enter value" />
        </div>
        <div>
          <Input placeholder="Please enter version" />
        </div>
        <div>
          <Checkbox onChange={ }>force install</Checkbox>
        </div>
      </Modal>
    </>
  )
}

export default App
