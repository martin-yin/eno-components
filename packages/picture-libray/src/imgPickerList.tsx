import React, { FC } from "react";

interface ImgPickerListProps {
  imgList: Array<string>;
}

const ImgPickerList: FC<ImgPickerListProps> = ({ imgList }) => {
  return (
    <div className="img-picker__list__wrp">
      <div className="img-picker__list ">
        {imgList.map((item) => {
          return (
            <div className="img-picker__item">
              <img src={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImgPickerList;
