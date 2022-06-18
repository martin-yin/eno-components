import { FileLibrayProps, FileListType } from '../interface'
import { useFileLibrayContext } from '../provider/provider'

export const useFileLibray = (props: FileLibrayProps) => {
  const { onOk, fileType, fileList, onSearch } = props
  const { selectedKeys, updateSelectedKeys } = useFileLibrayContext()

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
    onSearch?.(fileName)
  }

  const title = ['图片', '视频', '附件'][fileType]

  return {
    handleOk,
    handleSearch,
    title
  }
}
