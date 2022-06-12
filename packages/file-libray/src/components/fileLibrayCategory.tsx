import { Button, Form, Input, Popover } from 'antd'
import { FC } from 'react'
import { useFileCategory } from '../hooks/useFileCategory'
import { FileCategoryProps } from '../interface'

const FileLibrayCategory: FC<FileCategoryProps> = props => {
  const { onCategoryChange, onCategoryAdd, categoryList } = props
  const [form] = Form.useForm<{ category: string }>()

  const { handleCategoryChange, selectIndex, onFinish, onFinishFailed } = useFileCategory(
    form,
    onCategoryChange,
    onCategoryAdd
  )

  const categoryAddRender = (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="分类" name="category" rules={[{ required: true, message: '请输入分类' }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className="category">
      <div className="category-menu">
        {categoryList &&
          categoryList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCategoryChange(item, index)}
                className={`category-menu__item ${index === selectIndex ? 'category-menu__item-current' : ''}`}
              >
                <p className="category-menu__item-title text-hide">{item}</p>
              </div>
            )
          })}
      </div>
      <div className="category-button">
        <Popover trigger="click" content={categoryAddRender}>
          新增分类
        </Popover>
      </div>
    </div>
  )
}

FileLibrayCategory.displayName = 'FileLibrayCategory'

export default FileLibrayCategory
