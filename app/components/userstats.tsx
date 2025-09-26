import React from "react";
import { View } from "react-native";
import {
  TextTitle,
  TextSubTitle,
  ViewSpace,
  BoxContainerStats
} from "../styled";

interface UserStatsProps {
  followers: number;
  publicRepos: number;
}


const UserStats: React.FC<UserStatsProps> = ({ followers, publicRepos }) => (
  <BoxContainerStats>
    <ViewSpace>
      <TextTitle>{formatNumber(followers)}</TextTitle>
      <TextTitle>{formatNumber(publicRepos)}</TextTitle>
    </ViewSpace>
    <ViewSpace>
      <TextSubTitle>Seguidores</TextSubTitle>
      <TextSubTitle>Repos</TextSubTitle>
    </ViewSpace>
  </BoxContainerStats>
);

function formatNumber(value: number): string {
  if (value >= 1000 && value < 1000000) {
    return (value / 1000).toFixed(1).replace(".0", "") + "k"; // Ex: 1500 -> 1.5k
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(".0", "") + "M"; // Ex: 1500000 -> 1.5M
  } else {
    return value.toString(); // Ex: 500 -> 500
  }
}

export default UserStats;
