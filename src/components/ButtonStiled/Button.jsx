import styled from '@emotion/styled';

const Button = styled.button`
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  :hover {
    background-color: ${p => p.theme.colors.secondary};
  }
`;

export default Button;
