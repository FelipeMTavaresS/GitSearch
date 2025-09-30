import React, { useEffect, useRef, useState } from "react";
import { Animated, useWindowDimensions, Platform } from "react-native";
import {
  BoxContainerStats,
  StatItem,
  StatValue,
  StatLabel,
  StatDivider
} from "../styled";
import { formatNumber } from './utils';

interface UserStatsProps {
  followers: number;
  publicRepos: number;
}


const animateValue = (anim: Animated.Value, to: number) => {
  Animated.timing(anim, {
    toValue: to,
    duration: 900,
    useNativeDriver: false,
  }).start();
};

const UserStats: React.FC<UserStatsProps> = ({ followers, publicRepos }) => {
  const followersAnim = useRef(new Animated.Value(0)).current;
  const reposAnim = useRef(new Animated.Value(0)).current;
  const [followersDisplay, setFollowersDisplay] = useState(0);
  const [reposDisplay, setReposDisplay] = useState(0);
  const { width } = useWindowDimensions();
  const stack = width < 320; // breakpoint estreito

  useEffect(() => {
    // listeners para atualizar valor exibido durante animação
    const sub1 = followersAnim.addListener(({ value }) => {
      setFollowersDisplay(Math.round(value));
    });
    const sub2 = reposAnim.addListener(({ value }) => {
      setReposDisplay(Math.round(value));
    });
    return () => {
      followersAnim.removeListener(sub1);
      reposAnim.removeListener(sub2);
    };
  }, [followersAnim, reposAnim]);

  useEffect(() => {
    followersAnim.stopAnimation();
    // Reinicia a partir do valor exibido atual para suavizar
    followersAnim.setValue(followersDisplay);
    animateValue(followersAnim, followers);
  }, [followers]);

  useEffect(() => {
    reposAnim.stopAnimation();
    reposAnim.setValue(reposDisplay);
    animateValue(reposAnim, publicRepos);
  }, [publicRepos]);

  return (
    <BoxContainerStats
      $stack={stack}
      {...(Platform.OS === 'web' ? { role: 'group', 'aria-label': 'Estatísticas do usuário' } : { accessibilityRole: 'summary', accessibilityLabel: 'Estatísticas do usuário' })}
    >
  <StatItem {...(Platform.OS === 'web' ? { 'aria-label': `Seguidores: ${followers}` } : { accessibilityLabel: `Seguidores: ${followers}` })}>
        <StatValue>
          {formatNumber(followersDisplay)}
        </StatValue>
        <StatLabel>Seguidores</StatLabel>
      </StatItem>
      {!stack && <StatDivider />}
  <StatItem {...(Platform.OS === 'web' ? { 'aria-label': `Repositórios públicos: ${publicRepos}` } : { accessibilityLabel: `Repositórios públicos: ${publicRepos}` })}>
        <StatValue>
          {formatNumber(reposDisplay)}
        </StatValue>
        <StatLabel>Repos</StatLabel>
      </StatItem>
    </BoxContainerStats>
  );
};

export default UserStats;
