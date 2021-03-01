
export const Order = {
  name: "Order",
  primaryKey: "idOrder",
  properties: {
    idOrder: {type: 'int', indexed : true},
    name: "string",
    orderDate: "date",
    itensOrder: "ItensOrder[]"
  }
}


export const ItensOrder = {
  name: "ItensOrder",
    primaryKey: "idItenOrder",
    properties: {
      idItenOrder:{type: 'int', indexed : true},
      IdSku:'string',
      amount: "string",

  }
}

