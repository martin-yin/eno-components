import { Button, Input, Modal, Pagination } from 'antd'
import React, { FC } from 'react'
import FileCategory from './fileCategory'
import { FileLibrayProvider, useFileLibrayContext } from './fileLibrayProvider'
import FileList from './fileList'
import { useFileData } from './hooks/useFileData'
import { useFileLibray } from './hooks/useFileLibray'
import { useFileLibrayFooter } from './hooks/useFileLibrayFooter'
import { useFileLibrayHeader } from './hooks/useFileLibrayHeader'
import './index.less'
import { FileLibrayProps } from './interface'

const { Search } = Input

const FileLibray: FC<FileLibrayProps> = props => {
  const FileLibrayRender: FC<FileLibrayProps> = props => {
    const { visible, onCancel, category, onDelete, pagination } = props

    useFileData(props.requestUrl, props.headers)

    const { selectedKeys } = useFileLibrayContext()
    const { handleOk, title } = useFileLibray(props)
    const { handleDelete, handlePageChange, paginate } = useFileLibrayFooter(props.pagination, props.onDelete)
    const { handleSearch, renderUploadButton } = useFileLibrayHeader(props)

    return (
      <Modal
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
        title={`${title}库`}
        visible={visible}
        width={866}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <div className="file-libray">
          <FileCategory {...category} />
          <div className="file">
            <div className="file-header">
              <div className="file-header__search">
                <Search placeholder="请输入文件名称" onSearch={handleSearch} style={{ width: 200 }} />
              </div>
              <div className="file-header__button">{renderUploadButton()}</div>
            </div>
            <FileList />
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
                  defaultPageSize={16}
                  size="small"
                  total={paginate.total}
                  current={paginate.current}
                  onChange={handlePageChange}
                />
              </div>
            </div>
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
