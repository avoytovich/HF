import {
  dispatchCommonPayloadWired,
  dispatchRemoveOverStepQuestionsWired,
} from '../actions'

// all needed values listed here;
let currentLanguage,
  currentResultStatus,
  currentChangingQuestionStep;

export const storeSubscriptions = store =>
  store.subscribe(() => {
    //set old values not knowing if they have changed in the store
    let previousLanguage             = currentLanguage;
    let previousChangingQuestionStep = currentChangingQuestionStep;
    let previousResultStatus         = currentResultStatus;

    // get new values
    const {
      commonReducer,
      userReducer: {
        language,
      },
      testingReducer: {
        changingQuestionStep,
        step,
        result_status,
      },
    } = store.getState();

    // set new values to [current...] variables
    currentLanguage             = language;
    currentChangingQuestionStep = changingQuestionStep;
    currentResultStatus         = result_status;

    if (previousLanguage !== currentLanguage) {
      dispatchCommonPayloadWired({ currentLanguage: commonReducer.languages[currentLanguage] });
    }

    if (previousChangingQuestionStep !== currentChangingQuestionStep) {
      if (currentChangingQuestionStep < step) {
        dispatchRemoveOverStepQuestionsWired(currentChangingQuestionStep)
      }
    }

    if (currentResultStatus !== previousResultStatus) {
      // send unblock request
      // clear result status
    }

  });