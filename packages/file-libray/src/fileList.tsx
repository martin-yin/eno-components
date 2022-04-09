import { CheckOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useFileList } from './hooks/useFileList'
import { FileListProps } from './interface'

const FileList: FC<FileListProps> = () => {
  const { fileList, handleSelectItem, selectedKeys } = useFileList()

  return (
    <div className="file-list">
      {fileList.map((item, key) => {
        return (
          <div
            className={`file-list-item ${selectedKeys.includes(key) ? 'file-list-item__acitve' : ''} `}
            key={key}
            onClick={() => handleSelectItem(key)}
          >
            <div
              className="file-list-item__cover"
              style={{
                background: `url(${item.fileUrl}) no-repeat 50% / 100%`
              }}
            ></div>
            <p className="file-list-item__name text-hide">{item.fileName}</p>
            <div className="selected-mask">
              <CheckOutlined className="selected-mask_icon" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

FileList.displayName = 'FileList'

export default FileList
