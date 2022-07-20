export const ADD_QR_SCANNED = "ADD_QR_SCANNED";
export const DELETE_ITEM = "DELETE_ITEM";
export const GET_CUIT = "GET_CUIT"


export const getCuit = (cuit) => (dispatch) => {
  return fetch("https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=" + cuit)
    .then((response) => response.json())
    .then(
      (data) => dispatch({ type: GET_CUIT, payload: data })
    );
};

export const addQr = function (payload) {
    console.log("PAYLOAD",payload)
  return {
    type: ADD_QR_SCANNED,
    payload: {
      ...payload,
    },
  };
};

export const deleteQR = function (payload) {
  return {
    type: DELETE_ITEM,
    payload,
  };
};
