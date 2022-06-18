import { Modal } from 'antd'
import React, { FC } from 'react'
import { FileCategory, FileLibrayHeader, FileLibrayList, FileLibrayFooter } from './components'
import { useFileLibray } from './hooks/useFileLibray'
import './index.less'
import { FileLibrayProps } from './interface'
import { FileLibrayProvider, useFileLibrayContext } from './provider/provider'

const FileLibray: FC<FileLibrayProps> = props => {
  const FileLibrayRender: FC<FileLibrayProps> = props => {
    const { visible, fileList, onCancel, category, onDelete, pagination, fileType, upload, onSearch } = props
    const { updateSelectedKeys } = useFileLibrayContext()
    const { handleOk, title } = useFileLibray(props)

    return (
      <Modal
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
        title={`${title}库`}
        visible={visible}
        width={866}
        onOk={handleOk}
        onCancel={() => {
          onCancel?.()
          updateSelectedKeys([])
        }}
      >
        <div className="file-libray">
          <FileCategory {...category} />
          <div className="file">
            <FileLibrayHeader upload={upload} onSearch={onSearch} />
            <FileLibrayList fileType={fileType} fileList={fileList} />
            <FileLibrayFooter pagination={pagination} onDelete={onDelete} fileList={fileList}></FileLibrayFooter>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <FileLibrayProvider>
      <FileLibrayRender {...props} />
    </FileLibrayProvider>
  )
}

FileLibray.displayName = 'FileLibray'

export default FileLibray
