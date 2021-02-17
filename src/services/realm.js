import Realm from 'realm'
import {ItensOrder,Order} from '../schemas/AllSchelmas'

export default function getRealm(){
  return Realm.open({
    schema: [Order, ItensOrder],
  })
}