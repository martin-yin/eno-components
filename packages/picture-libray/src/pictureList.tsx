import { CheckOutlined } from '@ant-design/icons'
import { Button, Pagination, Upload, UploadProps } from 'antd'
import React, { FC } from 'react'

export interface Image {
  fileName: string
  fileUrl: string
  id: number
}

export type ImageList = Array<Image>

export interface PictureListProps {
  /**
   * @description antd 上传组件 UploadProps，如果不传递则不显示上传按钮
   */
  uploadProps?: UploadProps
  /**
   * @description 图片集合
   */
  imageList: ImageList
  selectedKeys: Array<number>
  setSelectedKeys: (index: Array<number>) => void
  /**
   * @description 删除图片回调，如果不传递则不显示删除按钮
   */
  onDelete?: (ids: Array<number>) => void

  /**
   * @description 分页切换回调
   */
  onPageChange: (page: number, pageSize: number) => void
  /**
   * @description 总图片数量，用于分页使用
   */
  total: number
}

const PictureList: FC<PictureListProps> = props => {
  const { imageList, selectedKeys, setSelectedKeys, uploadProps, onPageChange, total, onDelete } = props
  const handleSelectItem = (key: number) => {
    const index = selectedKeys.indexOf(key)
    if (index >= 0) {
      selectedKeys.splice(index, 1)
    } else {
      selectedKeys.push(key)
    }
    setSelectedKeys([...selectedKeys])
  }

  // Todo: 待定实现
  const handleDelete = () => {
    const ids = selectedKeys.map(index => {
      return imageList[index].id
    })
    onDelete?.(ids)
  }

  const handlePageChange = (page: number, pageSize: number) => {
    onPageChange(page, pageSize)
    setSelectedKeys([])
  }

  const renderUploadButton = (): React.ReactNode => {
    return uploadProps ? (
      <Upload {...uploadProps}>
        <Button>上传图片</Button>
      </Upload>
    ) : (
      <></>
    )
  }

  return (
    <div className="picture">
      <div className="picture-button">{renderUploadButton()}</div>
      <div className="picture-list">
        {imageList.map((item, key) => {
          return (
            <div
              className={`picture-list-item ${selectedKeys.includes(key) ? 'picture-list-item__acitve' : ''} `}
              key={key}
              onClick={() => handleSelectItem(key)}
            >
              <div
                className="picture-list-item__cover"
                style={{
                  background: `url(${item.fileUrl}) no-repeat 50% / 100%`
                }}
              ></div>
              <p className="picture-list-item__name text-hide">{item.fileName}</p>
              <div className="selected-mask">
                <CheckOutlined className="selected-mask_icon" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <div className="footer-select">
          {selectedKeys.length > 0 ? (
            <>
              <span className="footer-select__text">已选择 {selectedKeys.length}项</span>
              {onDelete ? (
                <Button size="small" onClick={() => handleDelete()}>
                  删除
                </Button>
              ) : (
                ''
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="footer-page">
          <Pagination
            showSizeChanger={false}
            total={total}
            defaultPageSize={16}
            size="small"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

PictureList.displayName = 'PictureList'

export default PictureList
