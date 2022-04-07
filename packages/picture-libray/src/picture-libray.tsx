import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import './index.less'
import PictureCategory, { PictureCategoryProps } from './pictureCategory'
import PictureList, { PictureListProps } from './pictureList'

export interface PictureLibrayProps
  extends PictureCategoryProps,
    Omit<PictureListProps, 'selectKeys' | 'setSelectKeys'> {
  /**
   * @description 组件是否显示
   */
  visible: boolean
  /**
   * @description 点击确定按钮时会触发此方法,并返回当前选中的图片 index
   */
  onOk: (keys: number[]) => void
  /**
   * @description 关闭对话框
   */
  onCancel?: () => void
}

const PictureLibray: FC<PictureLibrayProps> = props => {
  const { onCategoryChange, categoryList, onCategoryAdd, uploadProps, imgList, visible, onCancel, onOk, onPageChange } =
    props
  const [selectKeys, setSelectKeys] = useState<Array<number>>([])

  const handleOk = () => {
    onOk(selectKeys)
    setSelectKeys([])
  }

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      destroyOnClose={true}
      title="选择图片"
      visible={visible}
      width={866}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className="picture-libray">
        <PictureCategory
          onCategoryAdd={onCategoryAdd}
          onCategoryChange={onCategoryChange}
          categoryList={categoryList}
        />
        <PictureList
          uploadProps={uploadProps}
          onPageChange={onPageChange}
          selectKeys={selectKeys}
          setSelectKeys={setSelectKeys}
          imgList={imgList}
        />
      </div>
    </Modal>
  )
}

PictureLibray.displayName = 'PictureLibray'

export default PictureLibray
