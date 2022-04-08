import React, { FC } from 'react'
import { Button, Pagination, Upload, UploadProps } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

export interface PictureListProps {
  /**
   * @description antd 上传组件 UploadProps
   */
  uploadProps?: UploadProps
  /**
   * @description 图片集合
   */
  imageList: Array<{
    fileName: string
    fileUrl: string
  }>
  selectKeys: number[]
  setSelectKeys: (value: number[]) => void
  /**
   * @description 分页切换回调
   */
  onPageChange: (page: number, pageSize: number) => void
  /**
   * @description 总图片数量，用于分页使用
   */
  total: number
}

const PictureList: FC<PictureListProps> = ({
  imageList,
  uploadProps,
  selectKeys,
  setSelectKeys,
  onPageChange,
  total
}) => {
  const handleSelect = (index: number) => {
    if (isSelect(index)) {
      const indexof = selectKeys.indexOf(index)
      selectKeys.splice(indexof, 1)
    } else {
      selectKeys.push(index)
    }
    setSelectKeys([...selectKeys])
  }

  const isSelect = (index: number) => {
    return selectKeys.indexOf(index) >= 0
  }

  // Todo: 待定实现
  const handleDelete = () => {}

  const handlePageChange = (page: number, pageSize: number) => {
    onPageChange(page, pageSize)
    setSelectKeys([])
  }

  const renderUploadButton = (): any => {
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
        {imageList.map((item, index) => {
          return (
            <div
              className={`picture-list-item ${isSelect(index) ? 'picture-list-item__acitve' : ''} `}
              key={index}
              onClick={() => handleSelect(index)}
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
          {selectKeys.length > 0 ?? (
            <>
              <span className="footer-select__text">已选择 {selectKeys.length}项</span>
              <Button size="small" onClick={() => handleDelete()}>
                删除
              </Button>
            </>
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
