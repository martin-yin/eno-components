import { useState } from 'react'
import { FileCategoryProps } from '../fileCategory'
import { useFileLibrayContext } from '../fileLibrayProvider'

export const useFileCategory = (
  onCategoryChange?: FileCategoryProps['onCategoryChange'],
  onCategoryAdd?: FileCategoryProps['onCategoryAdd']
) => {
  const { categoryList } = useFileLibrayContext()
  const [selectIndex, setSelectIndex] = useState(0)

  const { params, updateSelectedKeys, updateParams } = useFileLibrayContext()
  const handleCategoryChange = (item: string, index: number) => {
    if (index + '' == params.category) {
      return
    }
    updateParams({ ...params, category: item, page: 1 })
    updateSelectedKeys([])
    setSelectIndex(index)
    onCategoryChange?.(item, index)
  }

  const onFinish = (value: { category: string }) => {
    onCategoryAdd?.(value.category)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return { handleCategoryChange, selectIndex, onFinish, onFinishFailed, categoryList }
}
