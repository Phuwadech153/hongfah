const dataUser = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_DATA':
            return state.concat([action]);
        case 'CLEAR_DATA':
            return state=[];
    
        default:
            return state; 
    }
}

export default dataUser;