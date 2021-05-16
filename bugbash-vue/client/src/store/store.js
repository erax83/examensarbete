import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    errors: Array,
    // allErrors: Array,
    errorsList: Array,
    allErrorsList: Array,
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
    completeGoogleUser: null,
  },
  mutations: {
    changeErrors(state, errors) {
      // state.allErrors = errors;
      state.errors = errors;
    },
    changeErrorsList(state, errorsList) {
      state.allErrorsList = errorsList;
      state.errorsList = errorsList;
    },
    changeCurrentMessage(state, message) {
      state.currentMessage = message;
    },
    changeCurrentOccurrence(state, occurrence) {
      state.currentOccurrence = occurrence;
    },
    onFilterChange(state, searchWord) {
      if (!searchWord) {
        state.errorsList = state.allErrorsList;
      } else {
        state.errorsList = state.allErrorsList.filter((error) =>
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
    changeCompleteGoogleUser(state, completeGoogleUser) {
      state.completeGoogleUser = completeGoogleUser;
    },
  },
  getters: {
    // Tror att detta är occurrences från occurrences collection
    errors: (state) => state.errors,
    //Mixade errors i ErrorList: från två collections
    errorsList: (state) => state.errorsList,
    //Ett error från listan i errorsList, från id
    error: (state) => (id) => {
      return state.errorsList.find((err) => err.occurrenceDetails[0]._id == id);
    },
    //Alla errors då användaren kommenterat
    userErrors: (state) => (id) => {
      return state.errorsList.find((err) => err.comments.userId == id);
    },
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
    completeGoogleUser: (state) => state.completeGoogleUser,
  },
});
