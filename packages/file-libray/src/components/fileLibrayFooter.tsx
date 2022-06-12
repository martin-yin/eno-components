import { Button, Pagination } from 'antd'
import { FC } from 'react'
import { useFileLibrayContext } from '../provider/provider'
import { FileLibrayFooterProps, SelectedKeysType } from '../interface'

const FileLibrayFooter: FC<FileLibrayFooterProps> = props => {
  const { onDelete, pagination, fileList } = props
  const { selectedKeys, updateSelectedKeys } = useFileLibrayContext()

  const handleDelete = () => {
    const ids = selectedKeys.map(index => {
      return fileList[index].id
    })
    onDelete?.(ids)
    updateSelectedKeys([])
  }

  const handlePageChange = (page: number, pageSize: number) => {
    updateSelectedKeys([])
    pagination?.onChange?.(page, pageSize)
  }

  const renderFooterSelect = (selectedKeys: SelectedKeysType) => {
    if (selectedKeys.length > 0) {
      return (
        <>
          <span className="footer-select__text">已选择 {selectedKeys.length}项</span>
          {onDelete ? (
            <Button size="small" onClick={() => handleDelete()}>
              删除
            </Button>
          ) : null}
        </>
      )
    }
  }

  return (
    <div className="footer">
      <div className="footer-select">{renderFooterSelect(selectedKeys)}</div>
      <div className="footer-page">
        <Pagination
          {...pagination}
          showSizeChanger={false}
          defaultPageSize={16}
          size="small"
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

FileLibrayFooter.displayName = 'FileLibrayFooter'

export default FileLibrayFooter
