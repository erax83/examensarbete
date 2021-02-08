import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
         state: {
           errors: Array,
           allErrors: Array,
           hashCount: Array,
           allHashCount: Array,
           dataList: Array,
           allDataList: Array,
           currentMessage: String,
           currentOccurrence: Array,
           idState: true,
           dateState: true,
           messageState: true,
           urlState: true,
           componentToggleState: "error-list",
         },
         mutations: {
           changeErrors(state, errors) {
             state.allErrors = errors;
             state.errors = errors;
           },
           changeHashCount(state, hashCount) {
             state.allHashCount = hashCount;
             state.hashCount = hashCount;
           },
           changeDataList(state, dataList) {
             state.allDataList = dataList;
             state.dataList = dataList;
           },
           changeCurrentMessage(state, message) {
             state.currentMessage = message;
           },
           changeCurrentOccurrence(state, occurrence) {
             state.currentOccurrence = occurrence;
           },
           onFilterChange(state, searchWord) {
             // debugger;
             if (!searchWord) {
               state.errors = state.allErrors;
             } else {
               state.errors = state.allErrors.filter((error) =>
                 error.message.includes(searchWord)
               );
             }
           },
           changeIdToggle(state, idToggle) {
             state.idState = idToggle;
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
           changeComponentToggle(state, componentToggle) {
             state.componentToggleState = componentToggle;
           },
         },
         getters: {
           errors: (state) => state.errors,
           hashCount: (state) => state.hashCount,
           dataList: (state) => state.dataList,
           currentMessage: (state) => state.currentMessage,
           currentOccurrence: (state) => state.currentOccurrence,
           idState: (state) => state.idState,
           dateState: (state) => state.dateState,
           messageState: (state) => state.messageState,
           urlState: (state) => state.urlState,
           componentToggleState: (state) => state.componentToggleState,
         },
       });
