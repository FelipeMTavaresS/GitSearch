import styled from "styled-components/native";

export const BoxContainer = styled.View`
  width: 320px;
  max-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
  padding: 15px;

  elevation: 2;
`;


export const BoxContainerStats = styled.View`
  width: 320px;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px; /* Adiciona um espaçamento na parte inferior */
`;
export const recentUsersContainer = styled.View`
      marginVertical: 20,
      width: '100%',
      paddingHorizontal: 20,
`;

export const recentUsersTitle = styled.View`
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
`;

export const recentUserItem = styled.View`
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
`;

export const BoxContainerRepos = styled.View`
  width: 320px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 50px;
  overflow: hidden;
  padding: 10px;
  z-index: -1;


  /* Sombras para iOS */
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;

  /* Sombras para Android */
  elevation: 2;
`;

export const ScrollRepos = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
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
  flex-direction: row;
  justify-content: space-around;
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
`;

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
  color: #0000EE;
  text-decoration-line: underline;
  margin-top: 10px;
  text-align: left;
`;

export const DataText = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-top: 10px;
  margin-right: 5px;
  text-align: right;
`;

export const ReposView = styled.View`
  padding-top: 10px;
  padding-left: 10px;
`;

export const TextGray = styled.Text`
  color: #808080;
`;

export const HorizontalLine = styled.View`
  height: 1px; /* Altura da linha (espessura) */
  width: auto; /* Largura da linha (preenche o espaço disponível) */
  background-color: #ccc; /* Cor da linha (ajuste conforme necessário) */
  margin: 10px 10px; /* Margem superior e inferior para espaçamento */
  margin-left: -5px;
  margin-right: 5px;
`;

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

export const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #808080;
  border-width: 0; /* Remove a borda */
  border-color: transparent;
`;

export const SearchButton = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const RecentUsersContainer = styled.View`
  margin-vertical: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;

export const RecentUsersTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const RecentUserItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const RecentUserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const RepoLink = styled.Text`
  color: blue;
  text-decoration: underline;
`;

export const ViewCenter = styled.View`
  align-items: center;
`;

export const SearchResultsContainer = styled.View`
  margin-vertical: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;

export const SearchResultAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 10px;
`;

export const Backgroud = styled.View`
  background-color: #eff2f5;

`;