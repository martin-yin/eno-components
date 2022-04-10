import { PaginationProps, UploadProps } from 'antd'
import { HttpRequestHeader } from 'antd/lib/upload/interface'

export interface FileType {
  fileName: string
  domain: string
  filePath: string
  previewUrl: string
  externalUrl: string
  id: number
}

export type FileListType = Array<FileType>

export interface Params {
  page: number
  fileName: string
  category: string
}

export type SelectedKeysType = Array<number>
export type CategoryListType = Array<string>
export type PaginationType = Pick<PaginationProps, 'total' | 'current'>

// 文件类型
export enum FileTypeEnum {
  IMAGE,
  VIDEO,
  ANNEX
}

export interface FileResponse {
  category: CategoryListType
  list: FileListType
  page: number
  total: number
}

export interface Params {
  page: number
  fileName: string
  category: string
}

export interface FileLibrayProps<T = FileResponse> {
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
  onSuccess?: (value: T) => FileResponse
  /**
   * @description 接口请求失败时回调
   */
  onFail?: (value: any) => void
  /**
   * @description 文件类型
   */
  fileType: FileTypeEnum
  /**
   * @description 分类
   */
  category?: FileCategoryProps
  /**
   * @description antd 上传组件 UploadProps，不传递则不显示上传按钮
   */
  upload?: UploadProps
  /**
   * @description antd 分页组件props
   */
  pagination?: PaginationProps
  /**
   * @description  删除文件回调，不传递则不显示删除按钮
   */
  onDelete?: (ids: Array<number>) => void
}

export interface FileListProps {
  upload?: UploadProps
  onDelete?: (ids: Array<number>) => void
  pagination?: PaginationProps
}

export interface FileCategoryProps {
  onCategoryChange?: (category: string, index: number) => void
  onCategoryAdd?: (category: string) => void
}
