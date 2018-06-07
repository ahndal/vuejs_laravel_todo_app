import Vue from 'vue'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

const storage = {
    fetch() {
        const uri = '/todos';

        axios.get(uri).then((response) => {
            console.log(response);
            return response.data;
        });
    }
};

const state = {
    todoItems: []
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
};

const mutations = {
    loadData(state, todoItems) {
        state.todoItems = todoItems.todoItems;
    },
    addOneItem(state, todoItem) {
        state.todoItems.push(todoItems.todoItems);
    },
    removeOneItem(state, payload) {
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
            
        state.todoItems[payload.index] = response.data;

        payload.todoItem.is_completed = payload.todoItem.is_completed!=='false'?'false':'true';
        axios.patch('/todos/'+payload.todoItem.id, payload.todoItem).then(response => {
            state.todoItems[payload.index] = response.data;
        });
    },
    clearAllItems(state) {
        axios.post('/todos/truncate').then(response => {
            console.log(response);
            state.todoItems = [];
        });
    }
};

const actions = {
    loadData(context) {
        axios.get('/todos').then((response) => {
            context.commit('loadData', {
                todoItems: response.data
            });
        });
    },
    addOneItem(context, todoItem) {
        const obj = { is_completed: 'false', todo: todoItem };
        axios.post('/todos', obj).then(response => {
            context.commit('addOneItem', {
                todoItems: response.data
            });
        });
    },
    removeOneItem(context, payload) {
        axios.delete('/todos/'+payload.todoItem.id).then(response => {
            context.commit('removeOneItem', {
                todoItems: response.data,
                index: payload.index
            });
        });
    },
    toggleOneItem(context, payload) {
        payload.todoItem.is_completed = payload.todoItem.is_completed!=='false'?'false':'true';
        axios.patch('/todos/'+payload.todoItem.id, payload.todoItem).then(response => {
            context.commit('removeOneItem', {
                todoItems: response.data
            });
        });
        
    },
    clearAllItems(context) {
        
    }
}

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};