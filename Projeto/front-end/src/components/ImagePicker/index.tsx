import { ChangeEvent, FC, useCallback, useState } from "react";
import { Container, MissingImage } from "./styles";
import { IImagePicker } from "./interfaces";
import { FiCamera, FiImage } from "react-icons/fi";

export const ImagePicker: FC<IImagePicker> = ({ defaultImage, onPick, type }) => {
  const [image, setImage] = useState(defaultImage);

  const handlePickImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (!files || !files[0]) {
        console.log("User did not pick any image!");
        onPick(null);
        return;
      }

      const file = files[0];

      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      onPick(file);
    },
    [onPick]
  );

  return (
    <Container type={type}>
      {image ? (
        <img src={image} alt="Selected image" />
      ) : (
        <MissingImage>
          <FiImage size={24} color="#282828" />
        </MissingImage>
      )}

      <input type="file" onChange={handlePickImage} />

      <div className="icon">
        <FiCamera size={11} color="#fff" />
      </div>
    </Container>
  );
};
