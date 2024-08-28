import React, {useState, useRef} from 'react'

import { 
  View, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Linking,
  Text
   } from "react-native";
import {
  TextInput,
  ProfileIconContainer,
  ProfileImage
  

} from './styled';

const ProfileIcon = () => {
  return (
    <ProfileIconContainer>
      <ProfileImage source={{ uri: 'https://via.placeholder.com/100' }} />
    </ProfileIconContainer>
  );
};


export default function Index() {

  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput>
        
      </TextInput>
      
      <Text>Hello World</Text>
      <ProfileIcon />

    </View>
    
  );
}
