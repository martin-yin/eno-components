import { HttpRequestHeader } from 'antd/lib/upload/interface'
import axios from 'axios'
import { useEffect } from 'react'
import { FileCategoryProps } from '../fileCategory'
import { useFileLibrayContext } from '../fileLibrayProvider'

export const useFileData = (requestUrl: string, headers?: HttpRequestHeader) => {
  const { params, updateParams, updateFileList, updateCategoryList, fileList, categoryList, updatePaginate, paginate } =
    useFileLibrayContext()
  const getFileData = async () => {
    return await axios({
      headers: headers,
      method: 'GET',
      params: params,
      url: `${requestUrl}`
    })
  }

  useEffect(() => {
    ;(async () => {
      const {
        data: { data }
      } = await getFileData()
      updateCategoryList(data.category)
      updateFileList(data.list)
      updatePaginate({
        total: data.total,
        current: paginate.current
      })
      updateParams({ ...params, page: paginate.current as any })
    })()
  }, [params.fileName, params.category, paginate.current])

  return { fileList, categoryList, paginate }
}
