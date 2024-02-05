import axios from "axios";

const BACKEND_URL = "https://expense-tracker-26942-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData, authToken) {
    const response = await axios.post(
        BACKEND_URL + "/expenses.json?auth=" + authToken,
        expenseData
    );

    const id = response.data.name;

    return id;
}

export async function fetchExpenses(authToken) {
    const response = await axios.get(BACKEND_URL + "/expenses.json?auth=" + authToken);

    const expenses = [];

    for(const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };

        expenses.push(expenseObj);
    }

    return expenses;
}

export async function updateExpense(id, expenseData, authToken) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json?auth=${authToken}`, expenseData);
}

export function deleteExpense(id, authToken) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=${authToken}`);
}