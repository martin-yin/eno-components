import { CheckOutlined } from '@ant-design/icons'
import { Button, Input, Pagination, PaginationProps, Upload, UploadProps } from 'antd'
import React, { FC } from 'react'
import { Params } from './fileLibray'
const { Search } = Input

export interface FileType {
  fileName: string
  fileUrl: string
  id: number
}

export type FileListType = Array<FileType>

export interface FileListProps {
  upload?: UploadProps
  fileList: FileListType
  selectedKeys: Array<number>
  setSelectedKeys: (index: Array<number>) => void
  onDelete?: (ids: Array<number>) => void
  setParams: (value: any) => void
  pagination?: PaginationProps
  total: number
}

const FileList: FC<FileListProps> = props => {
  const { fileList, selectedKeys, setSelectedKeys, upload, pagination, total, onDelete, setParams } = props

  const handleSelectItem = (key: number) => {
    const index = selectedKeys.indexOf(key)
    if (index >= 0) {
      selectedKeys.splice(index, 1)
    } else {
      selectedKeys.push(key)
    }
    setSelectedKeys([...selectedKeys])
  }

  const handleDelete = () => {
    const ids = selectedKeys.map(index => {
      return fileList[index].id
    })
    onDelete?.(ids)
  }

  const handlePageChange = (page: number, pageSize: number) => {
    pagination?.onChange?.(page, pageSize)
    setSelectedKeys([])
    setParams((value: Params) => {
      return { ...value, page }
    })
  }

  const handleSearch = (fileName: string) => {
    setSelectedKeys([])
    setParams((value: Params) => {
      return { ...value, fileName }
    })
  }

  const renderUploadButton = (): React.ReactNode => {
    if (upload) {
      // Todo: 做一层兼容
      if (upload.onChange) {
      }
      return (
        <Upload {...upload} showUploadList={false}>
          <Button>上传</Button>
        </Upload>
      )
    }
  }

  return (
    <div className="file">
      <div className="file-header">
        <div className="file-header__search">
          <Search placeholder="请输入文件名称" onSearch={handleSearch} style={{ width: 200 }} />
        </div>
        <div className="file-header__button">{renderUploadButton()}</div>
      </div>
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
      <div className="footer">
        <div className="footer-select">
          {selectedKeys.length > 0 ? (
            <>
              <span className="footer-select__text">已选择 {selectedKeys.length}项</span>
              {onDelete ? (
                <Button size="small" onClick={() => handleDelete()}>
                  删除
                </Button>
              ) : (
                ''
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="footer-page">
          <Pagination
            {...pagination}
            showSizeChanger={false}
            total={total}
            defaultPageSize={16}
            size="small"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

FileList.displayName = 'FileList'

export default FileList
