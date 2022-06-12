import { PaginationProps, UploadProps } from 'antd'

export type SelectedKeysType = Array<number>

// 文件类型
export enum FileLibrayTypeEnum {
  IMAGE,
  VIDEO,
  ANNEX
}

export type FileLibrayProps = {
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
   * @description antd 上传组件 UploadProps，不传递则不显示上传按钮
   */
  upload?: UploadProps
} & FileLibrayHeaderProps &
  FileLibrayFooterProps & {
    /**
     * @description 分类
     */
    category: FileCategoryProps
  } & FileLibrayListProps

export type FileLibrayHeaderProps = {
  /**
   * @description antd 上传组件 UploadProps，不传递则不显示上传按钮
   */
  upload?: UploadProps
  /**
   * @description 搜索回调
   */
  onSearch?: (value: string) => void
}

export type FileLibrayFooterProps = {
  /**
   * @description antd 分页组件props
   */
  pagination: PaginationProps
  /**
   * @description  删除文件回调，不传递则不显示删除按钮
   */
  onDelete?: (ids: Array<number>) => void

  fileList: FileListType
}

export type FileListType = Array<FileType>

export type FileType = {
  fileName: string
  domain: string
  filePath: string
  previewUrl: string
  externalUrl: string
  id: number
}

export type FileLibrayListProps = {
  /**
   * @description 文件类型
   */
  fileType: FileLibrayTypeEnum
  /**
   * @description 文件列表
   */
  fileList: FileListType
}

export type FileCategoryProps = {
  categoryList: string[]
  onCategoryChange?: (category: string, index: number) => void
  onCategoryAdd?: (category: string) => void
}
