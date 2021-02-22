import styled from 'styled-components'
import {getStatusBarHeight} from "react-native-status-bar-height"
import { ListItem } from 'native-base';

export const Container = styled.View`
flex:1;
padding-top: ${30 + getStatusBarHeight(true)}px;
background-color: white;
`
export const ContainerList = styled(ListItem)`
display:flex;
justify-content: space-between;
flex-direction:row;
padding-right: 20px;
align-items: center;
`
export const ContainerAdd = styled.TouchableOpacity`
height:60px;
width:60px;
border-radius:100px;
background-color:#184077;
position: absolute;
bottom: 40px;
right: 40px;
align-items:center;
justify-content:center;
`