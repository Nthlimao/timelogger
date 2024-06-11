import styled from "styled-components";

const TaskDetailsStyles = styled.div``;

export const TaskDetailsInner = styled.div`
  h2,
  p {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
  }

  h2 {
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 10px;
  }

  button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const TaskDetailsForm = styled.form`
  h2 {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
    margin-bottom: 20px;
  }
`;

export const TaskDetailsFormFooter = styled.div`
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

export default TaskDetailsStyles;
