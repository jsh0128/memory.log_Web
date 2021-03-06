import React from "react";
import "./ChangePosition.scss";
import Button from "../../common/Button";
import PaperCommentType from "../../../util/types/PaperComment";
import Draggable, { DraggableEventHandler } from "react-draggable";
import generateURL from "../../../lib/generateURL";

interface ChangePositionProps {
  paperComments: PaperCommentType[];
  handleOnMove: DraggableEventHandler;
  onSubmit: () => void;
  color: string;
  font: string;
  comment: string;
  imageUrl: string;
  modifyIdx?: number;
}

const ChangePosition = ({
  paperComments,
  handleOnMove,
  onSubmit,
  color,
  font,
  comment,
  imageUrl,
  modifyIdx
}: ChangePositionProps) => {
  return (
    <>
      <div className="position">
        <div className="position-box">
          <div className="position-box-title">원하는 위치에 글을 옮겨주세요</div>
          <div className="position-box-content">
            {modifyIdx ? (
              <>
                {paperComments.map((item: PaperCommentType, idx: number) => {
                  if (item.idx === modifyIdx) {
                    console.log(item.location_x);
                  }
                  return (
                    <React.Fragment key={idx}>
                      {item.idx === modifyIdx ? (
                        <Draggable
                          bounds="parent"
                          onStop={handleOnMove}
                          defaultPosition={{ x: item.location_x, y: item.location_y }}
                        >
                          {imageUrl ? (
                            <img
                              style={{ zIndex: 20 }}
                              className={`position-box-content-drag ${item.location_x}`}
                              src={generateURL(imageUrl)}
                              alt="image"
                            />
                          ) : (
                            <div
                              className="position-box-content-drag"
                              style={{
                                transform: `translate(${item.location_x}px, ${item.location_y}px`,
                                color: color,
                                fontFamily: font
                              }}
                            >
                              {comment}
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        <div
                          className="position-box-content-map"
                          style={{
                            transform: `translate(${item.location_x}px, ${item.location_y}px`,
                            fontFamily: item.fontFamily,
                            color: item.color
                          }}
                        >
                          {item.image ? <img src={generateURL(item.image)} /> : <div>{item.comment}</div>}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <>
                {paperComments.map((item: PaperCommentType, idx: number) => {
                  return (
                    <div
                      className="position-box-content-map"
                      style={{
                        transform: `translate(${item.location_x}px, ${item.location_y}px`,
                        fontFamily: item.fontFamily,
                        color: item.color
                      }}
                      key={idx}
                    >
                      {item.image ? <img src={generateURL(item.image)} /> : <div>{item.comment}</div>}
                    </div>
                  );
                })}
                <Draggable bounds="parent" onStop={handleOnMove}>
                  {imageUrl ? (
                    <img className="position-box-content-drag" src={generateURL(imageUrl)} alt="image" />
                  ) : (
                    <div className="position-box-content-drag" style={{ color: color, fontFamily: font }}>
                      {comment}
                    </div>
                  )}
                </Draggable>
              </>
            )}
          </div>
          <div className="position-box-btnarea">
            <Button
              onClick={() => {
                onSubmit();
              }}
              text="완료"
              style={{ height: "3.6rem", fontSize: "1.2rem" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePosition;
