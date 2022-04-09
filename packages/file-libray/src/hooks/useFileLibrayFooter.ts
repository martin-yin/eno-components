import { FileLibrayProps } from 'src/interface'
import { useFileLibrayContext } from '../fileLibrayProvider'

export const useFileLibrayFooter = (
  pagination?: FileLibrayProps['pagination'],
  onDelete?: FileLibrayProps['onDelete']
) => {
  const { fileList, selectedKeys, updateSelectedKeys, paginate, updatePaginate } = useFileLibrayContext()

  const handlePageChange = (page: number, pageSize: number) => {
    updateSelectedKeys([])
    updatePaginate({
      ...paginate,
      current: page
    })
    pagination?.onChange?.(page, pageSize)
  }

  const handleDelete = () => {
    const ids = selectedKeys.map(index => {
      return fileList[index].id
    })
    onDelete?.(ids)
  }

  return { handleDelete, handlePageChange, paginate }
}
