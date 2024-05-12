const initialState = [
    { month: 'January', items: [] },
    { month: 'February', items: [] },
    { month: 'March', items: [] },

    { month: 'April', 
      items: [  
            { itemName: 'Food', plannedAmount: 500, actualAmount: 450 },
            { itemName: 'Shopping', plannedAmount: 300, actualAmount: 280 },
            { itemName: 'Health', plannedAmount: 200, actualAmount: 220 }
        ] 
    },

    { month: 'May', items: [] },
    { month: 'June', items: [] },
    { month: 'July', items: [] },
    { month: 'August', items: [] },
    { month: 'September', items: [] },
    { month: 'October', items: [] },
    { month: 'November', items: [] },
    { month: 'December', items: [] }
  ];

const budgetReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SAVE_BUDGET':
            const { month, itemName, actualAmount, plannedAmount } = action.payload;

            
            const monthObj = state.find(m => m.month === month);

            // If month object is found
            if (monthObj) {
                // Check if the item name already exists in the month's items list
                const existingItemIndex = monthObj.items.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());
                
                // If the item exists, update its amount values
                if (existingItemIndex !== -1) {
                const updatedItems = monthObj.items.map((item, index) => {
                    if (index === existingItemIndex) {
                    return {
                        ...item,
                        actualAmount,
                        plannedAmount
                    };
                    }
                    return item;
                });

                return state.map(m => {
                    if (m.month === month) {
                    return {
                        ...m,
                        items: updatedItems
                    };
                    }
                    return m;
                });
                }
                // If the item does not exist, add the new item to the items list
                else {
                const newItem = { itemName, actualAmount, plannedAmount };
                return state.map(m => {
                    if (m.month === month) {
                    return {
                        ...m,
                        items: [...m.items, newItem]
                    };
                    }
                    return m;
                });
                }

                
            }

            // If month object is not found, return the state as is
            
            return state;

        

        default:
            return state;


    }
}

export default budgetReducer;