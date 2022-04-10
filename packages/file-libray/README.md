---
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
  order: 0
---

# 文件库

### 注意事项

1. `FileLibrayProps` 泛型默认为 `FileResponse`。如果接口返回的数据不是`FileResponse`，可以通过`onSuccess`对接口数据进行转换清洗。

2. `upload` 不传递时，则不显示上传按钮。 `onDelete`不传递时同样不显示删除按钮。

## 图片库

```tsx
import React, { useState, useEffect } from 'react'
import PictureLibray, { FileLibrayProps } from './src/index'
import { message, Button } from 'antd'
import axios from 'axios'

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = keys => {
    console.log(keys, '===')
    setIsModalVisible(false)
  }

  const handleDelete = keys => {
    console.log(keys, '===')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const props = {
    visible: isModalVisible,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onOk: handleOk,
    requestUrl: 'https://www.fastmock.site/mock/41fa03b4c7422029e00ec4ee0c8063d2/api/api/imageList',
    fileType: 0
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        选择文件
      </Button>
      <PictureLibray {...props}></PictureLibray>
    </div>
  )
}
```

## 视频库

```tsx
import React, { useState, useEffect } from 'react'
import PictureLibray, { FileLibrayProps } from './src/index'
import { message, Button } from 'antd'
import axios from 'axios'

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = keys => {
    console.log(keys, '===')
    setIsModalVisible(false)
  }

  const handleDelete = keys => {
    console.log(keys, '===')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const props = {
    visible: isModalVisible,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onOk: handleOk,
    requestUrl: 'https://www.fastmock.site/mock/41fa03b4c7422029e00ec4ee0c8063d2/eno-component/api/video',
    fileType: 1,
    upload: {}
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        选择文件
      </Button>
      <PictureLibray {...props}></PictureLibray>
    </div>
  )
}
```

<API src="./src/index.ts" />
