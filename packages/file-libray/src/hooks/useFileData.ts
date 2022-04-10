import { HttpRequestHeader } from 'antd/lib/upload/interface'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FileLibrayProps, FileResponse } from 'src/interface'
import { useFileLibrayContext } from '../fileLibrayProvider'

export const useFileData = <T = FileResponse>(
  requestUrl: string,
  headers?: HttpRequestHeader,
  onSuccess?: FileLibrayProps['onSuccess'],
  onFail?: FileLibrayProps['onFail']
) => {
  const { params, updateParams, updateFileList, updateCategoryList, fileList, categoryList, updatePaginate, paginate } =
    useFileLibrayContext()

  const [loading, setLoading] = useState(true)
  const getFileData = async () => {
    setLoading(true)
    return await axios.get<T>(requestUrl, {
      headers: headers,
      params: params
    })
  }

  const updateState = (data: FileResponse) => {
    updateCategoryList(data.category)
    updateFileList(data.list)
    updatePaginate({
      total: data.total,
      current: paginate.current
    })
    updateParams({ ...params, page: paginate.current as any })
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      const { data, status } = await getFileData().catch(error => {
        onFail?.(error)
        console.warn(`response error: ${error}`)
        return error
      })
      if (status === 200) {
        let result = null as unknown as FileResponse
        if (onSuccess) {
          result = onSuccess?.(data)
        } else {
          result = data
        }
        updateState(result)
      } else {
        console.warn(`接口请求错误`)
      }
    })()
  }, [params.fileName, params.category, paginate.current])

  return { fileList, categoryList, paginate, loading }
}
