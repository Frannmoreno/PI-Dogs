import { 
GET_ALL_DOGS,
GET_ALL_TEMPERAMENTS,
GET_DOG_DETAIL,
GET_DOG_NAME,
FILTER_BY_NAME,
FILTER_BY_TEMPERAMENTS,
FILTER_BY_WEIGHT,
FILTER_CREATED_DOG,
CLEAR_DETAIL,
POST_DOG,
DELETE_DOG
} from "../Actions";


const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  dogDetail: []
}
function rootReducer (state = initialState, action) {

  switch(action.type) {
    
      case GET_ALL_DOGS:
        return{
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
      };
      
      case GET_DOG_NAME:
        return {
          ...state,
          dogs: action.payload,
        };
        
      case GET_DOG_DETAIL:
        return {
          ...state,
          dogDetail: action.payload
          };
    
      case GET_ALL_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload
        };
      
      case FILTER_BY_NAME:
        const filterDogs = action.payload === "A-Z" ? state.dogs.sort((a,b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          })
        : state.dogs.sort((a,b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
          });
        return {
          ...state,
          dogs: filterDogs,
      };


      // case 'FILTER_BY_HEIGHT':
        
      //   return{
      //     ...state
      //   }

      case FILTER_CREATED_DOG:
        const allDogs = state.allDogs;
        const filterCreated = action.payload === 'created' ? allDogs.filter(d => d.createdInDb) : allDogs.filter(d => !d.createdInDb)
        return {
          ...state,
          dogs: action.payload === 'all' ? state.allDogs : filterCreated
        };

      case FILTER_BY_WEIGHT:
        const allDogWeight = state.allDogs.filter(d => d.weight_min)
        const filterWeight = action.payload === 'min_weight' ? allDogWeight.sort((a, b) => {
          return a.weight_min - b.weight_min
        })  :
        allDogWeight.sort((a,b) =>{
          return a.weight_min - b.weight_min
      }).reverse()
        
        return {
          ...state,
          dogs: filterWeight,
      };
      
      case FILTER_BY_TEMPERAMENTS:
        const allDogs2 = state.allDogs
        const filteredTemp = action.payload === 'All'?  allDogs2 : allDogs2.filter(e => {
            return e.temperament?.includes(action.payload)
        })

        return {
          ...state,
          dogs: filteredTemp,
      };


      case CLEAR_DETAIL : {
        return {
          ...state ,
          dogDetail : {}
        }
      };

      case POST_DOG : 
        return {
          ...state
    };

    // case DELETE_DOG:
    //   return {
    //     ...state,
    //     dogs: state.dogs.filter(e => e.id !== action.payload)
    //   }



      default:
        return state;
  }
};
  
  export default rootReducer;