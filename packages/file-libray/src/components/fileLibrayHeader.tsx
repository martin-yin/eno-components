import { Button, Input, Upload } from 'antd'
import { FC } from 'react'
import { useFileLibrayContext } from '../provider/provider'
import { FileLibrayHeaderProps } from '../interface'

const { Search } = Input

const FileLibrayHeader: FC<FileLibrayHeaderProps> = props => {
  const { upload, onSearch } = props

  const { updateSelectedKeys } = useFileLibrayContext()
  const handleSearch = (fileName: string) => {
    onSearch?.(fileName)
    updateSelectedKeys([])
  }

  const renderUploadButton = (): React.ReactNode => {
    if (upload) {
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
    <div className="file-header">
      <div className="file-header__search">
        <Search placeholder="请输入文件名称" onSearch={handleSearch} style={{ width: 200 }} />
      </div>
      <div className="file-header__button">{renderUploadButton()}</div>
    </div>
  )
}

export default FileLibrayHeader
