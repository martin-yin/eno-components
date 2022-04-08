import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import { Modal, PaginationProps, UploadProps } from 'antd'
import './index.less'
import FileCategory, { FileCategoryProps } from './fileCategory'
import FileList, { FileListProps, FileListType } from './fileList'
import type { HttpRequestHeader } from 'antd/lib/upload/interface'

import axios from 'axios'

// 文件类型
export enum FILETYPE {
  IMAGE,
  VIDEO,
  ANNEX
}

export interface FileLibrayProps<T = any> {
  /**
   * @description 组件是否显示
   */
  visible: boolean
  /**
   * @description 点击确定按钮时会触发此方法, 并返回当前选中的列表
   */
  onOk: (fileList: FileListType) => void
  /**
   * @description 关闭对话框
   */
  onCancel?: () => void
  /**
   * @description 请求接口
   */
  requestUrl: string
  /**
   * @description axios请求头
   */
  headers?: HttpRequestHeader
  /**
   * @description 接口请求成功时回调
   */
  onRequestSuccess?: (value: T) => void
  /**
   * @description 文件类型
   */
  fileType: FILETYPE
  /**
   * @description 分类
   */
  category: FileCategoryProps
  /**
   * @description antd 上传组件 UploadProps，如果不传递则不显示上传按钮
   */
  upload?: UploadProps
  /**
   * @description antd 分页组件props
   */
  pagination?: PaginationProps
  /**
   * @description  删除文件回调，如果不传递则不显示删除按钮
   */
  onDelete?: (ids: Array<number>) => void
}

export interface Params {
  page: number
  fileName: string
  category: string
}

const FileLibray: FC<FileLibrayProps> = ({
  visible,
  onCancel,
  onOk,
  fileType,
  headers,
  requestUrl,
  category,
  upload,
  pagination,
  onRequestSuccess,
  onDelete
}) => {
  // 获取组件标题
  const title = ['图片', '视频', '附件'][fileType]
  const [params, setParams] = useState<Params>({
    page: 1,
    fileName: '',
    category: ''
  })
  const [selectedKeys, setSelectedKeys] = useState<Array<number>>([])
  const [fileList, setFileList] = useState<FileListType>([])
  const [categoryList, setCategoryList] = useState<Array<string>>([])

  const [total, setTotal] = useState<number>(0)

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
      const { data: data } = await getFileData()
      onRequestSuccess?.(data)
      if (category.categoryList.length == 0) {
        setCategoryList(data.data.category)
      }
      setFileList(data.data.list)
      setTotal(data.data.total)
    })()
  }, [params.fileName, params.category, params.page])

  const handleOk = () => {
    const selectedImages: FileListType = []
    selectedKeys.some(index => {
      selectedImages.push(fileList[index])
    })
    onOk(selectedImages)
    setSelectedKeys([])
  }

  const handleCategoryChange = (item: string, index: number) => {
    setParams((value: Params) => {
      return { ...value, category: item }
    })
    category.onCategoryChange(item, index)
  }

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      destroyOnClose={true}
      title={`${title}库`}
      visible={visible}
      width={866}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className="file-libray">
        <FileCategory {...category} categoryList={categoryList} onCategoryChange={handleCategoryChange} />
        <FileList
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          setParams={setParams}
          upload={upload}
          pagination={pagination}
          onDelete={onDelete}
          fileList={fileList}
          total={total}
        />
      </div>
    </Modal>
  )
}

FileLibray.displayName = 'FileLibray'

FileLibray.defaultProps = {
  category: {
    categoryList: [],
    onCategoryChange() {}
  }
}

export default FileLibray
