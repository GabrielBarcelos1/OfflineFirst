import styled from 'styled-components'
import {getStatusBarHeight} from "react-native-status-bar-height"
import { ListItem ,Button } from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';


export const Container = styled.View`
flex:1;
padding-top: ${getStatusBarHeight(true)}px;
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
export const Title = styled.Text`
font-size:18px;
font-weight:bold;
text-align:center;
`
export const BoxModalView = styled.View`
flex: 1;
align-items:center;
justify-content: center;
`
export const BoxModalViewMinor = styled.View`
  width:300px;
  height:300px;
  background-color:white;
  align-items:center;
  justify-content:center;
`
export const IconDelete = styled(Icon)`
  margin-bottom: 30px;
`
export const TitleModal = styled.Text`
  font-size:30px;
  color:black;
  margin-bottom: 30px;

`
export const TextModal = styled.Text`
 text-align:center;
 margin-bottom: 30px;
`
export const ViewButtonsModal = styled.View`
display: flex;
flex-direction:row;
justify-content:space-around;
align-items: center;
`
export const ButtonCancel = styled(Button)`
margin-left:7px;
width:120px;
display:flex;
justify-content:center;
`
export const ButtonDelete = styled(Button)`
margin-left:7px;
width:120px;
display:flex;
justify-content:center;
`