import React from "react";
import { View } from "react-native";
import {
  ViewSpaceRepos,
  H2TextRepos,
  DataText,
  TextSubTitle,
  HorizontalLine
} from "../styled";

// Interface para as props do componente
interface RepositoryItemProps {
  repo: {
    name: string;
    description: string | null;  // Aceita string ou null
    created_at: string;
    pushed_at: string;
  };
  formatTextTitle: (text: string) => string;
  formatTextDesc: (text: string) => string;
}

// Componente RepositoryItem
const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo, formatTextTitle, formatTextDesc }) => {
  return (
    <View>
      <ViewSpaceRepos>
        <H2TextRepos>{formatTextTitle(repo.name)}</H2TextRepos>
        <DataText>
          Criado em: {'\n'} {new Date(repo.created_at).toLocaleDateString()}
        </DataText>
      </ViewSpaceRepos>
      <ViewSpaceRepos>
        <TextSubTitle>
          {repo.description ? formatTextDesc(repo.description) : "Sem descrição"}
        </TextSubTitle>
        <TextSubTitle>
          Último push: {new Date(repo.pushed_at).toLocaleDateString()}
        </TextSubTitle>
      </ViewSpaceRepos>
      <HorizontalLine />
    </View>
  );
};

export default RepositoryItem;
