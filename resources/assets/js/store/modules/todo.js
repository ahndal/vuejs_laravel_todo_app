import Vue from 'vue'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

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
        console.log(todoItem);
        state.todoItems.push(todoItem.todoItem);
    },
    removeOneItem(state, payload) {
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
        state.todoItems[payload.index] = payload.todoItem;
    },
    clearAllItems(state) {
        state.todoItems = [];
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
                todoItem: response.data
            });
        });
    },
    removeOneItem(context, payload) {
        axios.delete('/todos/' + payload.todoItem.id).then(response => {
            context.commit('removeOneItem', {
                index: payload.index
            });
        });
    },
    toggleOneItem(context, payload) {
        payload.todoItem.is_completed = payload.todoItem.is_completed!=='false'?'false':'true';
        axios.patch('/todos/' + payload.todoItem.id, payload.todoItem).then(response => {
            context.commit('toggleOneItem', {
                todoItem: response.data,
                index: payload.index
            });
        });
        
    },
    clearAllItems(context) {
        axios.post('/todos/truncate').then(response => {
            context.commit('clearAllItems');
        });
    }
}

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};