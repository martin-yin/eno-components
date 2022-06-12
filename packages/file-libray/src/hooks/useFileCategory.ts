import { useState } from 'react'
import { useFileLibrayContext } from '../provider/provider'
import { FileCategoryProps } from '../interface'
import { FormInstance } from 'antd'

export const useFileCategory = (
  form: FormInstance<{ category: string }>,
  onCategoryChange?: FileCategoryProps['onCategoryChange'],
  onCategoryAdd?: FileCategoryProps['onCategoryAdd']
) => {
  const [selectIndex, setSelectIndex] = useState(0)

  const { updateSelectedKeys } = useFileLibrayContext()
  const handleCategoryChange = (item: string, index: number) => {
    updateSelectedKeys([])
    setSelectIndex(index)
    onCategoryChange?.(item, index)
  }

  const onFinish = (value: { category: string }) => {
    updateSelectedKeys([])
    onCategoryAdd?.(value.category)
    form.setFieldsValue({
      category: ''
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    updateSelectedKeys([])
    console.log('Failed:', errorInfo)
  }

  return { handleCategoryChange, selectIndex, onFinish, onFinishFailed }
}
