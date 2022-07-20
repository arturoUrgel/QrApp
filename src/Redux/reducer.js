import { ADD_QR_SCANNED, DELETE_ITEM, GET_CUIT } from "../Redux/actions";

const initialState = {
  facturas: [],
  house: {},
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
/*     case GET_ALL_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    case GET_HOUSE:
      return {
        ...state,
        house: action.payload,
      }; */
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
