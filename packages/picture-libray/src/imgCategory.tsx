import { Input, Popover } from "antd";
import React, { FC } from "react";
interface ImgCategoryProps {
  categoryList: Array<string>;
}

const ImgCategory: FC<ImgCategoryProps> = ({ categoryList }) => {
  const categoryAdd = (
    <>
      <Input />
    </>
  );
  return (
    <div id="img-category">
      <div className="menu">
        {categoryList.map((item, index) => {
          return (
            <div
              key={index}
              className={`menu__link menu__link-self ${
                index === 0 ? "menu__item_current" : ""
              }`}
            >
              <strong className="img-category__title">{item}</strong>
            </div>
          );
        })}
      </div>
      <div className="img-category__add">
        <Popover content={categoryAdd}>新增分类</Popover>
      </div>
    </div>
  );
};

export default ImgCategory;
