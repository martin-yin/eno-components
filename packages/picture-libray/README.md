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
import React, { useState, useEffect } from 'react'
import PictureLibray from './src/index'
import { message, Button } from 'antd'
import axios from 'axios'

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [imageList, setImageList] = useState([])
  const [category, setCategory] = useState([])

  const getImageList = async page => {
    const {
      data: { data }
    } = await axios.get(
      `https://www.fastmock.site/mock/41fa03b4c7422029e00ec4ee0c8063d2/api/api/imageList?page=${page}`
    )
    setImageList(data.list)
    setCategory(data.category)
  }

  useEffect(() => {
    ;(async () => {
      await getImageList(1)
    })()
  }, [])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handlePageChange = async (page, pageSize) => {
    await getImageList()
  }

  const handleOk = (keys: string[]) => {
    message.success(`当前选中的 image index ${keys.toString()}`)
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
    categoryList: category,
    onPageChange: handlePageChange,
    imageList: imageList,
    uploadProps: {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text'
      },
      showUploadList: false
    },
    onCancel: handleCancel,
    onOk: handleOk,
    total: 30
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
