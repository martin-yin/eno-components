import { Button, Upload } from 'antd'
import { FileLibrayProps } from 'src/interface'
import { useFileLibrayContext } from '../fileLibrayProvider'

export const useFileLibrayHeader = (props: FileLibrayProps) => {
  const { upload } = props
  const { params, updateSelectedKeys, updateParams } = useFileLibrayContext()

  const handleSearch = (fileName: string) => {
    updateSelectedKeys([])
    updateParams({ ...params, fileName })
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

  return { handleSearch, renderUploadButton }
}
