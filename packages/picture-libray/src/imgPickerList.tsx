import React, { FC } from 'react'
import { Button, Pagination } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

export interface ImgPickerListProps {
  /**
   * @description 图片list
   */
  imgList: Array<{
    fileName: string
    fileUrl: string
  }>
  selectKeys: number[]
  setSelectKeys: (value: number[]) => void
  /**
   * @description 分页切换回调
   */
  onPageChange: (page: number, pageSize: number) => void
}

const ImgPickerList: FC<ImgPickerListProps> = ({ imgList, selectKeys, setSelectKeys, onPageChange }) => {
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

  return (
    <div className="img-picker__list__wrp">
      <div className="img-picker__list ">
        {imgList.map((item, index) => {
          return (
            <div
              className={`img-picker__item ${isSelect(index) ? 'acitve' : ''} `}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <div
                className="img-picker__item-cover"
                style={{
                  background: `url(${item.fileUrl}) no-repeat 50% / 100%`
                }}
              ></div>
              <p className="img-picker__item-file-name">{item.fileName}</p>
              <div className="select-mask">
                <CheckOutlined className="selected-icon" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="img-picker__operate">
        <div className="img-picker__operate_select">
          {selectKeys.length > 0 ?? (
            <>
              <span className="footer-desc">已选择 {selectKeys.length}项</span>
              <Button size="small" onClick={() => handleDelete()}>
                删除
              </Button>
            </>
          )}
        </div>
        <div className="img-picker__operate_page">
          <Pagination
            showSizeChanger={false}
            total={imgList.length}
            defaultPageSize={16}
            size="small"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

ImgPickerList.displayName = 'ImgPickerList'

export default ImgPickerList
