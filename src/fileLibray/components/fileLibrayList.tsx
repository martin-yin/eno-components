import { CheckOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useFileLibrayList } from '../hooks/useFileLibrayList'
import { FileLibrayListProps, FileLibrayTypeEnum } from '../interface'

const FileLibrayList: FC<FileLibrayListProps> = ({ fileType, fileList }) => {
  const { handleSelectItem, selectedKeys } = useFileLibrayList()

  return (
    <div className="file-list">
      {fileList &&
        fileList.map((item, key) => {
          return (
            <div
              className={`file-list-item ${selectedKeys.includes(key) ? 'file-list-item__acitve' : ''} `}
              key={key}
              onClick={() => handleSelectItem(key)}
            >
              <div
                className="file-list-item__cover"
                style={{
                  background: `url(${item.previewUrl}) no-repeat 50% / 100%`,
                  width: fileType === FileLibrayTypeEnum.VIDEO ? '55px' : '95px'
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

FileLibrayList.displayName = 'FileLibrayList'

export default FileLibrayList
