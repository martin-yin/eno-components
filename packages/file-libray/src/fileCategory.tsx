import { Button, Form, Input, Popover } from 'antd'
import React, { FC, useState } from 'react'

export interface FileCategoryProps {
  categoryList: Array<string>
  onCategoryChange: (category: string, index: number) => void
  onCategoryAdd?: (category: string) => void
}

const FileCategory: FC<FileCategoryProps> = ({ categoryList, onCategoryChange, onCategoryAdd }) => {
  const [selectIndex, setSelectIndex] = useState(0)

  const handleSelectIndex = (item: string, index: number) => {
    setSelectIndex(index)
    onCategoryChange?.(item, index)
  }

  const onFinish = (value: { category: string }) => {
    onCategoryAdd?.(value.category)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const categoryAdd = (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
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
    </>
  )
  return (
    <div className="category">
      <div className="category-menu">
        {categoryList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectIndex(item, index)}
              className={`category-menu__item ${index === selectIndex ? 'category-menu__item-current' : ''}`}
            >
              <p className="category-menu__item-title text-hide">{item}</p>
            </div>
          )
        })}
      </div>
      <div className="category-button">
        <Popover trigger="click" content={categoryAdd}>
          新增分类
        </Popover>
      </div>
    </div>
  )
}

FileCategory.displayName = 'FileCategory'

export default FileCategory
