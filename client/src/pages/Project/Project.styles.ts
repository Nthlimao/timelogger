import styled from "styled-components";

const ProjectStyles = styled.div``;

export const ProjectDetailsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #6b728066;
  h2,
  p {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
    color: #ffffff;
  }

  h2 {
    margin-bottom: 20px;
  }

  p {
    color: #d1d5db;
    margin-bottom: 10px;
  }

  div > button {
    font-size: 14px;
    margin-bottom: 10px;
    &:last-of-type {
      color: #FFFFFF;
      background-color: #ef4444;
    }
  }
`;

export const ProjectDetails = styled.div``;

export const ProjectPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h3,
  p {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
    color: #ffffff;
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
