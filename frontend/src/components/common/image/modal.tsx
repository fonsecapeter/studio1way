import React, { ReactNode, MouseEventHandler } from "react";

interface ImageModalProps {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  children: ReactNode;
  withTopGap?: boolean;
}

const ImageModal = ({
  isOpen,
  closeModal,
  children,
  withTopGap = false,
}: ImageModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="image-modal-background">
      <button className="image-modal-close-button" onClick={closeModal}>
        x
      </button>
      {withTopGap && (
        <div
          className="image-modal-top-gap"
          data-testid="image-modal-top-gap"
        ></div>
      )}
      {children}
    </div>
  );
};

export default ImageModal;
