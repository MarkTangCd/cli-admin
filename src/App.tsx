import { useState, useEffect, useCallback, memo } from 'react'
import { Layout, Space, Button, Table, message, Popconfirm } from 'antd'
import { ITemplate } from './typings/api'
import { createTemplate, deleteTemplate, getTemplateList, updateTemplate } from './api/template'
import TemplateModal from './components/TemplateModal'
import useLatest from './hooks/useLatest'

const { Header, Footer, Content } = Layout
const { Column } = Table

const App = memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [list, setList] = useState<ITemplate[]>([])
  const [updateTmp, setUpdateTmp] = useState<ITemplate>()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const ref = useLatest(updateTmp)

  useEffect(() => {
    handleList()
  }, [])

  const handleDelete = (value: string) => {
    setLoading(true)
    deleteTemplate(value)
      .then(count => {
        if (count) {
          messageApi.success('The template deleted!')
          handleList()
        }
      })
      .catch(err => messageApi.error(err))
      .finally(() => setLoading(false))
  }

  const handleList = useCallback(() => {
    setLoading(true)
    getTemplateList()
      .then(res => setList(res.list))
      .catch(err => messageApi.error(err))
      .finally(() => setLoading(false))
  }, [messageApi])

  const handleCreate = useCallback((template: ITemplate) => {
    setConfirmLoading(true)
    createTemplate(template)
      .then(() => {
        messageApi.success('The template Created')
        handleList()
        setOpen(false)
      })
      .catch(err => messageApi.error(err))
      .finally(() => setConfirmLoading(false))
  }, [messageApi, handleList])

  const handleUpdate = useCallback((template: ITemplate) => {
    setConfirmLoading(true)
    updateTemplate(template)
      .then(() => {
        messageApi.success('The template Updated')
        handleList()
        setOpen(false)
      })
      .catch(err => messageApi.error(err))
      .finally(() => setConfirmLoading(false))
  }, [messageApi, handleList])

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
              <Button type="primary" onClick={() => setOpen(true)}>Create Template</Button>
            </div>
            <div>
              <Table dataSource={list} loading={loading} rowKey={'value'}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="NPM Name" dataIndex="npmName" key="npmName" />
                <Column title="Value" dataIndex="value" key="value" />
                <Column title="Version" dataIndex="version" key="version" />
                <Column title="Is force install?" dataIndex="forceInstall" key="forceInstall" render={(forceInstall) => forceInstall ? 'Yes' : 'No'} />
                <Column
                  title="Action"
                  key="action"
                  render={(_, record: ITemplate) => (
                    <Space size="middle">
                      <a onClick={() => {
                        console.log('test---------------')
                        console.log(record)
                        setUpdateTmp(() => record)
                        setOpen(true)
                      }}>Update</a>
                      <Popconfirm
                        title="Delete the template"
                        description="Are you sure to delete this template?"
                        onConfirm={() => handleDelete(record.value)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>Delete</a>
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </Space>
        </Content>
        <Footer>
          By MarkTang
        </Footer>
      </Space>
      <TemplateModal
        title={updateTmp ? 'Update the template' : 'Create a template'}
        open={open}
        confirmLoading={confirmLoading}
        confirmFn={updateTmp ? handleUpdate : handleCreate}
        cancelFn={() => {
          setOpen(false)
          setUpdateTmp(() => undefined)
        }}
        template={ref.current}
      />
    </>
  )
})

export default App
