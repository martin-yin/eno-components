import { Button, Upload } from 'antd'
import { useFileLibrayContext } from '../fileLibrayProvider'
import { FileLibrayProps, FileListType } from '../interface'

export const useFileLibray = (props: FileLibrayProps) => {
  const { onOk, upload, fileType } = props
  const { params, fileList, selectedKeys, updateSelectedKeys, updateParams } = useFileLibrayContext()

  const handleOk = () => {
    const selectedImages: FileListType = []
    selectedKeys.some(index => {
      selectedImages.push(fileList[index])
    })
    onOk(selectedImages)
    updateSelectedKeys([])
  }

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

  const title = ['图片', '视频', '附件'][fileType]

  return {
    handleOk,
    renderUploadButton,
    handleSearch,
    title
  }
}
