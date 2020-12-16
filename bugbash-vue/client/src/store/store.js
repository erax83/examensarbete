import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    flavor: "",
    errors: Array,
    allErrors: Array,
    dateState: true,
    messageState: true,
    urlState: true,
  },
  mutations: {
    change(state, flavor) {
      state.flavor = flavor;
    },
    changeErrors(state, errors) {
      state.allErrors = errors;
      state.errors = errors;
    },
    onFilterChange(state, searchWord) {
      debugger;
      if (!searchWord) {
        state.errors = state.allErrors;
      } else {
        state.errors = state.allErrors.filter((error) =>
          error.message.includes(searchWord)
        );
      }
    },
    changeDateToggle(state, dateToggle) {
      state.dateState = dateToggle;
    },
    changeMessageToggle(state, messageToggle) {
      state.messageState = messageToggle;
    },
    changeUrlToggle(state, urlToggle) {
      state.urlState = urlToggle;
    },
  },
  getters: {
    flavor: (state) => state.flavor,
    errors: (state) => state.errors,
    dateState: (state) => state.dateState,
    messageState: (state) => state.messageState,
    urlState: (state) => state.urlState,
  },
  //  actions: {
  //    changeErrors(context) {
  //     context.commit("changeErrors");
  //    }
  //  },
});
