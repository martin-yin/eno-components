import React, { FC, useState } from "react";
import { Button, Card, Input, Popover } from "antd";
import "./index.less";
import ImgCategory from "./imgCategory";
import ImgPickerList from "./imgPickerList";

const PictureLibray: FC = () => {
  const [categoryList] = useState(["全部", "电商", "公司资料", "其他"]);

  return (
    <div id="img_picker" className="flex">
      <ImgCategory categoryList={categoryList} />
      <div id="img_picker__list">
        <div className="img-upload__button">
          <Button>上传文件</Button>
        </div>
        <ImgPickerList imgList={["https://cdn.hyyar.com/logo.jpg"]} />
      </div>
    </div>
  );
};

PictureLibray.displayName = "PictureLibray";

export default PictureLibray;
