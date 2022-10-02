import { ADD_QR_SCANNED, DELETE_ITEM, GET_CUIT, SORT_LIST } from "../Redux/actions";

const initialState = {
  facturas: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case ADD_QR_SCANNED:
      return {
        ...state,
        facturas: [...state.facturas, action.payload],
      };

    case DELETE_ITEM:
      return {
        ...state,
        facturas: state.facturas.filter((m) => m.nroDocRec !== action.payload),
      };
    case SORT_LIST:
      return {
        ...state,
        facturas: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
