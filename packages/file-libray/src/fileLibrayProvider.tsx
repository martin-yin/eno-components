import { PaginationProps } from 'antd'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { CategoryListType, FileListType, PaginationType, Params, SelectedKeysType } from './interface'

const defaultData: {
  params: Params
  selectedKeys: SelectedKeysType
  fileList: FileListType
  categoryList: CategoryListType
  paginate: PaginationType
} = {
  params: {
    page: 1,
    category: '',
    fileName: ''
  },
  selectedKeys: [],
  fileList: [],
  categoryList: [],
  paginate: {
    total: 0,
    current: 1
  }
}

export const FileLibrayContext = createContext<{
  params: Params
  selectedKeys: SelectedKeysType
  fileList: FileListType
  categoryList: CategoryListType
  paginate: Pick<PaginationProps, 'total' | 'current'>
  updateParams: (value: Params) => void
  updateSelectedKeys: (value: SelectedKeysType) => void
  updateFileList: (value: FileListType) => void
  updateCategoryList: (value: CategoryListType) => void
  updatePaginate: (value: PaginationType) => void
}>({
  params: defaultData.params,
  selectedKeys: defaultData.selectedKeys,
  fileList: defaultData.fileList,
  categoryList: defaultData.categoryList,
  paginate: defaultData.paginate,
  updateParams(value: Params): void {
    throw new Error('FileLibrayContext not yet initialized.')
  },
  updateSelectedKeys(value: SelectedKeysType): void {
    throw new Error('FileLibrayContext not yet initialized.')
  },
  updateFileList(value: FileListType): void {
    throw new Error('FileLibrayContext not yet initialized.')
  },
  updateCategoryList(value: CategoryListType): void {
    throw new Error('FileLibrayContext not yet initialized.')
  },
  updatePaginate(value: PaginationType): void {
    throw new Error('FileLibrayContext not yet initialized.')
  }
})

export const useFileLibrayContext = () => {
  const value = useContext(FileLibrayContext)
  return value
}

export const FileLibrayProvider = ({ children }: { children: React.ReactChild }) => {
  const [params, setParams] = useState<Params>(defaultData.params)
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeysType>([])
  const [fileList, setFileList] = useState<FileListType>([])
  const [categoryList, setCategoryList] = useState<CategoryListType>([])

  const [paginate, setPaginate] = useState<PaginationType>(defaultData.paginate)

  const value = useMemo(
    () => ({
      params,
      selectedKeys,
      fileList,
      categoryList,
      paginate,
      updateParams: setParams,
      updateSelectedKeys: setSelectedKeys,
      updateFileList: setFileList,
      updateCategoryList: setCategoryList,
      updatePaginate: setPaginate
    }),
    [
      params,
      selectedKeys,
      fileList,
      categoryList,
      paginate,
      setParams,
      setSelectedKeys,
      setFileList,
      setCategoryList,
      setPaginate
    ]
  )

  return <FileLibrayContext.Provider value={value}>{children}</FileLibrayContext.Provider>
}
