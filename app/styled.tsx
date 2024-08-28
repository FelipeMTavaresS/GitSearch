
import styled from 'styled-components/native'




export const TextInput = styled.TextInput`
  background-color: gray;
  color: black;
  padding: 10px 20%;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1000;
`;
export const ProfileIconContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  border: 2px solid #4CAF50;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
