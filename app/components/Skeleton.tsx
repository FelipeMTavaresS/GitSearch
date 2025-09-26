import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Line = styled.View<{h?: number; w?: string}>`
  height: ${({h}) => h || 14}px;
  width: ${({w}) => w || '100%'};
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  margin-bottom: 10px;
`;

const Avatar = styled.View<{size?: number}>`
  width: ${({size}) => size || 120}px;
  height: ${({size}) => size || 120}px;
  border-radius: ${({size}) => (size ? size/2 : 60)}px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  margin-bottom: 16px;
`;

export const ProfileSkeleton = () => (
  <View style={{alignItems: 'center'}}>
    <Avatar />
    <Line h={20} w="70%" />
    <Line h={16} w="40%" />
    <Line h={12} w="50%" />
    <Line h={12} w="30%" />
  </View>
);

export const RepoListSkeleton: React.FC<{count?: number}> = ({ count = 5 }) => (
  <View>
    {Array.from({ length: count }).map((_, i) => (
      <View key={i} style={{marginBottom: 18}}>
        <Line h={18} w="60%" />
        <Line h={12} w="90%" />
        <Line h={12} w="40%" />
      </View>
    ))}
  </View>
);

export default Line;