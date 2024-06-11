import styled from "styled-components";

const ProjectStyles = styled.div``;

export const ProjectPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2,
  h3,
  p {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
    color: #ffffff;
  }

  h2 {
    margin-bottom: 20px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    color: #d1d5db;
  }

  button {
    width: auto;
    font-size: 14px;
  }
`;

export default ProjectStyles;
