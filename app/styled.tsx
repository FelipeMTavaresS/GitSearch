import styled from 'styled-components/native';

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 45px;
  width: 80%;
  border-radius: 22px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); 
  elevation: 1; 
  margin-top: 20px;
  margin-bottom: 40px;
  padding-left: 15px;
`;

export const BoxContainer = styled.View`
  position: absolute;
  margin-top: 150;
  width: 320px;
  height: 280px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;


export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #808080;
`;

export const SearchButton = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 10px; /* Espaço à direita para o botão */
  justify-content: center;
  align-items: center;
`;

export const ProfileIconContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextTitle = styled.Text`
  color: #333;
  font-size: 48px; 
  font-weight: bold; 
  text-align: center;
  
`;

export const TextSubTitle = styled.Text`
  color: #333;
  font-size: 12px;
  text-align: center;
  
`;


export const ViewSpace = styled.View`
  flex-direction: row; /* Coloca os subtítulos em linha */
  justify-content: space-around; /* Espaça os subtítulos uniformemente */
  align-items: center;
  width: 100%;
  margin-top: 10px; /* Espaçamento entre títulos e subtítulos */
`;

export const ProfileText = styled.View`
  margin-top: 20px;
  align-items: center;
`