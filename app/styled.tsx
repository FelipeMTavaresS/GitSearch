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
  margin-bottom: 70px;
  padding-left: 15px;
`;

export const BoxContainer = styled.View`
  width: 320px;
  height: auto;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px; /* Adiciona um espaçamento na parte inferior */
`;

export const BoxContainerRepos = styled.View`
  width: 320px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
  overflow: hidden;
  padding: 10px;
  z-index: -1;
`;

export const ScrollRepos = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
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
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden; /* Faz o container flutuar sobre outros elementos */
  top: -60px; /* Ajuste conforme necessário */
  z-index: 100;
  align-items: center;
  justify-content: center;
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
  bottom: 30px;
`;

export const ViewSpaceRepos = styled.View`
  flex-direction: row; /* Coloca os subtítulos em linha */
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProfileText = styled.View`
  align-items: center;
  bottom: 40px;
`

export const H1Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const H2Text = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: #333;
`;

export const H2TextBold = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const H2TextRepos = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-top: 10px;
`;

export const DataText = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-top: 10px;
  margin-right: 5px;

`

export const ReposView = styled.View`
  padding-top: 10px;
  padding-left: 10px;

`;

export const TextGray = styled.Text`
  color: #808080;

`

export const HorizontalLine = styled.View`
  height: 1px; /* Altura da linha (espessura) */
  width: auto; /* Largura da linha (preenche o espaço disponível) */
  background-color: #ccc; /* Cor da linha (ajuste conforme necessário) */
  margin: 10px 10px; /* Margem superior e inferior para espaçamento */
  margin-left: -5px;
  margin-right: 5px;
`;

