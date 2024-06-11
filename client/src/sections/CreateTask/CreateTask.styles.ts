import styled from "styled-components";

const CreateTaskStyles = styled.div``;

export const TaskCreateForm = styled.form`
  h2 {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
    margin-bottom: 20px;
  }
`;

export const TaskCreateFormFooter = styled.div`
  display: flex;
  align-items: center;

  button {
    color: #ffffff;
    display: flex;
    justify-content: center;
    margin-right: 10px;

    &:first-of-type {
      background-color: #ef4444;
    }

    &:last-of-type {
      background-color: #22c55e;
      margin-right: 0;
    }
  }
`;

export default CreateTaskStyles;
