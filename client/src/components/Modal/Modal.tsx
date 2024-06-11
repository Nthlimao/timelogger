import { ReactElement, ReactNode, useState } from "react";
import Button from "../Button";
import ModalStyles, {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalWrapper,
} from "./Modal.styles";

interface IModal {
  children: ReactNode;
  isOpen: boolean;
  hideFooter?: boolean;
  onClose: () => void;
}

const Modal = ({
  children,
  isOpen,
  hideFooter = false,
  onClose,
}: IModal): ReactElement => {
  if (!isOpen) return <></>;

  return (
    <ModalWrapper>
      <ModalStyles>
        <ModalContainer>
          <ModalBody>{children}</ModalBody>
          {!hideFooter && (
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          )}
        </ModalContainer>
      </ModalStyles>
    </ModalWrapper>
  );
};

export default Modal;
