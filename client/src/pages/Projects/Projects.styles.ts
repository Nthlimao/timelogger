import styled from "styled-components";

const ProjectsStyles = styled.div``;

export const ProjectsPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2,
  p {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.3px;
  }
  h2 {
    color: #ffffff;
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

export default ProjectsStyles;
