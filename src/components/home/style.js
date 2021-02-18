import styled from 'styled-components'

export const Container = styled.View`
flex:1;
display:flex;
align-items:center;

`
export const Input = styled.TextInput`


`
export const TextInput = styled.Text`


`
export const SaveButton = styled.TouchableOpacity`

background-color:red;

`
export const List = styled.FlatList.attrs({
  contentContainerStyle:{ paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
margin-top:20px;
`