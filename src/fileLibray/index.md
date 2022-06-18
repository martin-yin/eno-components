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
import { FileLibray, FileLibrayProps } from 'eno-components'
import { message, Button } from 'antd'

export default () => {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const handleOk = keys => {
    console.log(keys, '===')
    setModalVisible(false)
  }

  const handleDelete = keys => {
    console.log(keys, '===')
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const props: FileLibrayProps = {
    visible: modalVisible,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onOk: handleOk,
    fileType: 0,
    pagination: {
      total: 30
    },
    category: {
      categoryList: ['相册1', '相册2']
    },
    fileList: [
      {
        fileName: 'Lisa Robinson',
        previewUrl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock',
        filePath: 'filePath',
        domain: 'http://dummyimage.com',
        id: '650000200202037870'
      },
      {
        fileName: 'Kimberly Miller',
        previewUrl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock',
        filePath: 'filePath',
        domain: 'http://dummyimage.com',
        id: '81000019860128967X'
      }
    ]
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        选择文件
      </Button>
      <FileLibray {...props} />
    </div>
  )
}
```

## 视频库

```tsx
import React, { useState, useEffect } from 'react'
import { FileLibray, FileLibrayProps } from 'eno-components'
import { message, Button } from 'antd'

export default () => {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const handleOk = keys => {
    console.log(keys, '===')
    setModalVisible(false)
  }

  const handleDelete = keys => {
    console.log(keys, '===')
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const props: FileLibrayProps = {
    visible: modalVisible,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onOk: handleOk,
    fileType: 1,
    pagination: {
      total: 30
    },

    category: {
      categoryList: ['视频文件夹1', '视频文件夹2']
    },
    fileList: [
      {
        fileName: 'Lisa Robinson',
        previewUrl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock',
        filePath: 'filePath',
        domain: 'http://dummyimage.com',
        id: '650000200202037870'
      },
      {
        fileName: 'Kimberly Miller',
        previewUrl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock',
        filePath: 'filePath',
        domain: 'http://dummyimage.com',
        id: '81000019860128967X'
      }
    ]
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        选择文件
      </Button>
      <FileLibray {...props} />
    </div>
  )
}
```

<API src="./index.ts" />