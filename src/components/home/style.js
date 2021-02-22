import styled from 'styled-components'
import {getStatusBarHeight} from "react-native-status-bar-height"


export const Container = styled.View`
flex:1;
padding-top: ${getStatusBarHeight(true)}px;
background-color:white
`
export const List = styled.FlatList.attrs({
  contentContainerStyle:{ paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
padding-top:100px;
`