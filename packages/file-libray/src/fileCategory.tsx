import { Button, Form, Input, Popover } from 'antd'
import React, { FC } from 'react'
import { useFileCategory } from './hooks/useFileCategory'
import { FileCategoryProps } from './interface'

const FileCategory: FC<FileCategoryProps> = props => {
  const { categoryList, handleCategoryChange, selectIndex, onFinish, onFinishFailed } = useFileCategory(
    props.onCategoryChange,
    props.onCategoryAdd
  )

  const categoryAddRender = (
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

FileCategory.displayName = 'FileCategory'

export default FileCategory
