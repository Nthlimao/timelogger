import styled, { css } from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #11182780;
`;

const ModalStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.div`
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  max-width: 600px;
  width: 100%;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000),
    0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 24px;
  background-color: #f9fafb;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  button {
    width: unset;
  }
`;

export default ModalStyles;
