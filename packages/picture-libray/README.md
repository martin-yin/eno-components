---
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
  order: 0
---

# 图片库

## 基本使用

```tsx
import React, { useState } from 'react'
import PictureLibray from './src/index'
import { message, Button } from 'antd'

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handlePageChange = (page, pageSize) => {
    console.log(page)
    console.log(pageSize)
  }

  const handleOk = (keys: string[]) => {
    console.log(keys, '=')
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const props = {
    visible: isModalVisible,
    onCategoryChange: category => {
      console.log(category)
    },
    onCategoryAdd: () => {},
    categoryList: ['全部', '电商', '公司资料', '其他'],
    onPageChange: handlePageChange,
    imgList: [
      {
        fileName: '文件名称',
        fileUrl: 'https://s1.ax1x.com/2022/04/06/qjNv5Q.jpg'
      }
    ],
    uploadProps: {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text'
      },
      showUploadList: false
    },
    onCancel: handleCancel,
    onOk: handleOk
  }

  for (let i = 0; i < 100; i++) {
    props.imgList.push({
      fileName: '文件名称' + i,
      fileUrl: 'https://s1.ax1x.com/2022/04/06/qjNv5Q.jpg'
    })
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        选择图片
      </Button>
      <PictureLibray {...props}></PictureLibray>
    </div>
  )
}
```

<API src="./src/index.ts" />
