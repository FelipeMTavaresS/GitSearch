import React from "react";
import {Image,} from "react-native";
import {
  InputContainer,
  StyledTextInput,
  SearchButton,
} from "../styled";


const LupaIcon = "https://img.icons8.com/ios-filled/50/000000/search--v1.png";

interface SearchBarProps {
  userName: string;
  setUserName: (text: string) => void;
  onSearch: () => void;
}


const SearchBarComponent: React.FC<SearchBarProps> = ({ userName, setUserName, onSearch }) => {
  return (
    <InputContainer>
      <StyledTextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Nome do usuário"
      />
      <SearchButton onPress={onSearch}>
        <Image
          source={{ uri: LupaIcon }}
          style={{ width: 20, height: 20 }}
        />
      </SearchButton>
    </InputContainer>
  );
};

export default SearchBarComponent;
