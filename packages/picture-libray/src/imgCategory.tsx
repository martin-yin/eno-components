import { Button, Form, Input, Popover } from 'antd'
import React, { FC, useState } from 'react'

function noop() {}

export interface ImgCategoryProps {
  /**
   * @description 左侧菜单列表
   */
  categoryList: Array<string>
  /**
   * @description 左侧分类切换回调
   */
  onCategoryChange: (category: string) => void
  /**
   * @description 添加左侧分类回调
   */
  onCategoryAdd?: (category: string) => void
}

const ImgCategory: FC<ImgCategoryProps> = ({ categoryList, onCategoryChange, onCategoryAdd = noop }) => {
  const [selectIndex, setSelectIndex] = useState(0)

  const handleSelectIndex = (item: string, index: number) => {
    setSelectIndex(index)
    onCategoryChange(item)
  }
  const onFinish = (value: any) => {
    if (onCategoryAdd) {
      onCategoryAdd(value)
    }
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
    <div id="img-category">
      <div className="menu">
        {categoryList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectIndex(item, index)}
              className={`menu__link menu__link-self ${index === selectIndex ? 'menu__item_current' : ''}`}
            >
              <strong className="img-category__title">{item}</strong>
            </div>
          )
        })}
      </div>
      <div className="img-category__add">
        <Popover trigger="click" content={categoryAdd}>
          新增分类
        </Popover>
      </div>
    </div>
  )
}

ImgCategory.displayName = 'ImgCategory'

export default ImgCategory
