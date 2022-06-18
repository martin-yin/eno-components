import { useState } from 'react'
import { useFileLibrayContext } from '../provider/provider'
import { FileLibrayCategoryProps } from '../interface'
import { FormInstance } from 'antd'

export const useFileLibrayCategory = (
  form: FormInstance<{ category: string }>,
  onCategoryChange?: FileLibrayCategoryProps['onCategoryChange'],
  onCategoryAdd?: FileLibrayCategoryProps['onCategoryAdd']
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
