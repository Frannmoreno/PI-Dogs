import { GET_DOGS } from "../Actions";


const initialState = {
  dogs: []
}
function rootReducer (state = initialState, action) {

  switch(action.type) {
    
    case GET_DOGS:
      return{
        ...state,
        dogs: action.payload 
      };



      default:
        return initialState;



  }

}
  
  export default rootReducer;