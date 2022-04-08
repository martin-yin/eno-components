import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import './index.less'
import PictureCategory, { PictureCategoryProps } from './pictureCategory'
import PictureList, { PictureListProps, ImageList } from './pictureList'

export interface PictureLibrayProps
  extends Omit<PictureCategoryProps, 'setSelectedKeys'>,
    Omit<PictureListProps, 'selectedKeys' | 'setSelectedKeys'> {
  /**
   * @description 组件是否显示
   */
  visible: boolean
  /**
   * @description 点击确定按钮时会触发此方法, 并返回当前选中的图片列表
   */
  onOk: (imageList: ImageList) => void
  /**
   * @description 关闭对话框
   */
  onCancel?: () => void
}

const PictureLibray: FC<PictureLibrayProps> = ({
  onCategoryChange,
  categoryList,
  onCategoryAdd,
  uploadProps,
  imageList,
  visible,
  onCancel,
  onOk,
  onPageChange,
  onDelete,
  total
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Array<number>>([])

  const handleOk = () => {
    const selectedImages: ImageList = []
    selectedKeys.some(index => {
      selectedImages.push(imageList[index])
    })
    onOk(selectedImages)
    setSelectedKeys([])
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
          setSelectedKeys={setSelectedKeys}
          categoryList={categoryList}
        />
        <PictureList
          total={total}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          uploadProps={uploadProps}
          onPageChange={onPageChange}
          onDelete={onDelete}
          imageList={imageList}
        />
      </div>
    </Modal>
  )
}

PictureLibray.displayName = 'PictureLibray'

export default PictureLibray
