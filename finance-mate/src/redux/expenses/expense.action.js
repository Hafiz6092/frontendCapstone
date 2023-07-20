import expenseTypes from "./expense.type";
import axios from "axios";

export const getExpenses = (expenses) => ({
  type: expenseTypes.GET_EXPENSES,
  payload: expenses,
});
export const createExpenses = (expenses) => ({
  type: expenseTypes.CREATE_OR_UPDATE_EXPENSES,
  payload: expenses,
});
export const updateAExpense = (expense) => ({
  type: expenseTypes.UPDATE_A_EXPENSES,
  payload: expense,
});

export const deleteAExpense = (expense) => ({
  type: expenseTypes.DELETE_EXPENSE,
  payload: expense,
});

export const addExpense = (expense) => ({
  type: expenseTypes.ADD_EXPENSE,
  payload: expense,
});

//----------------------Thunks----------------------
export const getExpensesThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/expense/getExpenses",
        { withCredentials: true }
      );
      const expenses = await response.data;
      console.log("User Expenses in Thunk:", expenses);
      dispatch(getExpenses(expenses));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addExpenseThunk = (expenseData) => {
  return async (dispatch) => {
    try {
      // Make a POST request to the API endpoint to add the expense
      const response = await axios.post(
        "http://localhost:8080/api/expense/addExpense",
        expenseData,
        { withCredentials: true }
      );
      const expense = response.data;

      dispatch(addExpense(expenseData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createExpensesThunk = (expenses) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/expense",
        { expenses },
        {
          withCredentials: true,
        }
      );
      const expensesList = await response.data;
      console.log("Created Expense List:", expensesList);
      dispatch(createExpenses(expensesList));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateExpenseThunk = (expenseToUpdpate) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/expense/${expenseToUpdpate.id}`,
        expenseToUpdpate,
        {
          withCredentials: true,
        }
      );
      const updatedExpense = await response.data;
      console.log("Updated Expense", updatedExpense);
      dispatch(updateAExpense(updatedExpense));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteExpenseThunk = (expenseToDelete) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/expense/${expenseToDelete.id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(deleteAExpense(expenseToDelete));
    } catch (error) {
      console.log(error);
    }
  };
};