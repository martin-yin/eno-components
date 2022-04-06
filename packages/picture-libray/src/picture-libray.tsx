import React, { FC, useState } from 'react'
import { Button, Modal, Upload } from 'antd'
import './index.less'
import ImgCategory, { ImgCategoryProps } from './imgCategory'
import ImgPickerList, { ImgPickerListProps } from './imgPickerList'
import { UploadProps } from 'antd/lib/upload'

export interface PictureLibrayProps extends ImgCategoryProps, Omit<ImgPickerListProps, 'selectKeys' | 'setSelectKeys'> {
  /**
   * @description antd 上传组件 UploadProps
   */
  uploadProps?: UploadProps
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
    <div>
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
        <div id="img_picker" className="flex">
          <ImgCategory onCategoryAdd={onCategoryAdd} onCategoryChange={onCategoryChange} categoryList={categoryList} />
          <div id="img_picker__list">
            <div className="img-upload__button">
              <Upload {...uploadProps}>
                <Button>上传图片</Button>
              </Upload>
            </div>
            <ImgPickerList
              onPageChange={onPageChange}
              selectKeys={selectKeys}
              setSelectKeys={setSelectKeys}
              imgList={imgList}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

PictureLibray.displayName = 'PictureLibray'

export default PictureLibray
