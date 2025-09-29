import React from 'react';
import { View } from 'react-native';
import { SkeletonLine, SkeletonAvatar } from '../styled';

export const ProfileSkeleton = () => (
  <View style={{alignItems: 'center'}}>
    <SkeletonAvatar />
    <SkeletonLine $h={20} $w="70%" />
    <SkeletonLine $h={16} $w="40%" />
    <SkeletonLine $h={12} $w="50%" />
    <SkeletonLine $h={12} $w="30%" />
  </View>
);

export const RepoListSkeleton: React.FC<{count?: number}> = ({ count = 5 }) => (
  <View>
    {Array.from({ length: count }).map((_, i) => (
      <View key={i} style={{marginBottom: 18}}>
        <SkeletonLine $h={18} $w="60%" />
        <SkeletonLine $h={12} $w="90%" />
        <SkeletonLine $h={12} $w="40%" />
      </View>
    ))}
  </View>
);
export default SkeletonLine;