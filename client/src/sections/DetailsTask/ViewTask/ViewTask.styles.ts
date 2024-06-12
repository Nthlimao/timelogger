import styled from "styled-components";

const ViewTaskDetails = styled.div`
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
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    &:first-of-type {
      margin-top: 20px;
    }
    &:last-of-type {
      margin-bottom: 0;
      color: #ffffff;
      background-color: #ef4444;
    }
  }
`;

export default ViewTaskDetails;
