import React from "react";
import { View, TouchableOpacity, Linking, ScrollView } from "react-native";
import { formatNumber, formatTextDesc, formatTextTitle } from "./utils";
import { Repository } from "./types";
import { BoxContainerRepos, DataText, H2TextBold, H2TextRepos, HorizontalLine, ReposView, TextGray, TextSubTitle, ViewCenter, ViewSpaceRepos } from "../styled";

interface RepositoryListProps {
  repositories: Repository[];
  publicRepos: number;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  publicRepos,
}) => {
  return (
    <ViewCenter>
    <BoxContainerRepos>
      <ScrollView nestedScrollEnabled={true}>
        <ReposView>
          <H2TextBold>Repositórios</H2TextBold>
          <TextGray>
            {publicRepos ? formatNumber(publicRepos) : 0} Repositórios
          </TextGray>
          <HorizontalLine />
          {repositories.map((repo, index) => (
            <View key={index}>
              <ViewSpaceRepos>
                <TouchableOpacity onPress={() => Linking.openURL(repo.html_url)}>
                  <H2TextRepos>{formatTextTitle(repo.name)}</H2TextRepos>
                </TouchableOpacity>
                <DataText>
                  Criado em: {'\n'} {new Date(repo.created_at).toLocaleDateString()}
                </DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
                <TextSubTitle>
                  {repo.description
                    ? formatTextDesc(repo.description)
                    : "Sem descrição"}
                </TextSubTitle>
                <TextSubTitle>
                  {repo.language
                    ? formatTextDesc(repo.language)
                    : "Sem linguagem definida"}
                </TextSubTitle>
                <TextSubTitle>
                  Último push: {new Date(repo.pushed_at).toLocaleDateString()}
                </TextSubTitle>
              </ViewSpaceRepos>
              <HorizontalLine />
            </View>
          ))}
        </ReposView>
      </ScrollView>
    </BoxContainerRepos>
    </ViewCenter>
  );
};

export default RepositoryList;