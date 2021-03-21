import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    errors: Array,
    //  allErrors: Array,
    errorsList: Array,
    //  allErrorsList: Array,
    currentMessage: String,
    currentOccurrence: Array,
    idState: true,
    dateState: true,
    messageState: true,
    urlState: true,
    avatarImage: null,
    userInfo: null,
    signedIn: false,
    userInitials: null,
    userAuth: null,
  },
  mutations: {
    // initialiseStore(state) {
		// 	// Check if the ID exists
		// 	if(localStorage.getItem('store')) {
		// 		// Replace the state object with the stored item
		// 		this.replaceState(
		// 			Object.assign(state, JSON.parse(localStorage.getItem('store')))
		// 		);
		// 	}
		// },
    changeErrors(state, errors) {
      // state.allErrors = errors;
      state.errors = errors;
    },
    changeErrorsList(state, errorsList) {
      //  state.allErrorsList = errorsList;
      state.errorsList = errorsList;
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
    changeAvatarImage(state, avatarImage) {
      state.avatarImage = avatarImage;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeSignedIn(state, signedIn) {
      state.signedIn = signedIn;
    },
    changeUserInitials(state, userInitials) {
      state.userInitials = userInitials;
    },
    changeUserAuth(state, userAuth) {
      state.userAuth = userAuth;
    },
  },
  getters: {
    // Tror att detta är occurrences från occurrences collection
    errors: (state) => state.errors,

    // hashCount: (state) => state.hashCount,

    //Mixade errors i ErrorList: från två collections
    errorsList: (state) => state.errorsList,
    //Ett error från listan i errorsList, från id
    error: (state) => (id) => {
      return state.errorsList.find((err) => err.occurrenceDetails[0]._id == id);
    },
    // errorTest: (state) => (id) => {
    //   return state.errorsList.find((err) => err.hashNumber == id);
    // },

    currentMessage: (state) => state.currentMessage,
    currentOccurrence: (state) => state.currentOccurrence,

    idState: (state) => state.idState,
    dateState: (state) => state.dateState,
    messageState: (state) => state.messageState,
    urlState: (state) => state.urlState,

    avatarImage: (state) => state.avatarImage,
    userInfo: (state) => state.userInfo,
    signedIn: (state) => state.signedIn,
    userInitials: (state) => state.userInitials,
    userAuth: (state) => state.userAuth,
  },
});

// // Subscribe to store updates
// store.subscribe((mutation, state) => {
// 	// Store the state object as a JSON string
// 	localStorage.setItem('store', JSON.stringify(state));
// });
