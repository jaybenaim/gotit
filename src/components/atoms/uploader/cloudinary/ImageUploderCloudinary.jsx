import React from "react";
import { Button } from "react-bootstrap";
import { cloudinaryConfig } from "../../config/cloudinary";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ImageUploader = ({ handleClick, styleClass, btnText }) => {
  const uploadWidget = () => {
    // eslint-disable-next-line
    cloudinary.openUploadWidget(
      {
        cloud_name: cloudinaryConfig.cloudName,
        upload_preset: cloudinaryConfig.uploadPreset,
        tags: ["dating"],
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          handleClick(result[0].secure_url);
        }
      }
    );
  };
  const renderTooltip = (props) => {
    return (
      <Tooltip id="add-image-tooltip" {...props}>
        Add Image
      </Tooltip>
    );
  };

  return (
    <div className="main">
      <div className="upload">
        <Button onClick={uploadWidget.bind(this)} className={styleClass}>
          {styleClass === "upload-button" ? (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 50, hide: 300 }}
              overlay={renderTooltip}
            >
              <div className="">{btnText}</div>
            </OverlayTrigger>
          ) : (
            <div>{btnText}</div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
