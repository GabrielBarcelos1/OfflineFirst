
export const Order = {
  name: "Order",
  primaryKey: "name",
  properties: {
    name: "string",
    orderDate: "string",
    itensOrder: "ItensOrder[]"
  }
}


export const ItensOrder = {
  name: "ItensOrder",
    primaryKey: "IdSku",
    properties: {
      IdSku:{type: 'int', indexed : true},
      amount: "string",

  }
}
