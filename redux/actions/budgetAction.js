export const saveBudget=(budget)=>({
    type:'SAVE_BUDGET',
    payload:budget
})

export const getBudget=(monthName)=>({
    type:'GET_BUDGET',
    payload:monthName,
})