import {
  dispatchCommonPayloadWired,
  dispatchTestingPayloadWired,
  dispatchRemoveOverStepQuestionsWired,
  unblockSandBoxSessionWired,
} from '../actions'

// all needed values listed here;
let currentLanguage,
  currentSandBoxResultStatus,
  currentSandBoxChangingQuestionStep;

export const storeSubscriptions = store =>
  store.subscribe(() => {
    //set old values not knowing if they have changed in the store
    let previousLanguage                    = currentLanguage;
    let previousSandBoxChangingQuestionStep = currentSandBoxChangingQuestionStep;
    let previousSandBoxResultStatus         = currentSandBoxResultStatus;

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
        testId,
      },
    } = store.getState();

    // set new values to [current...] variables
    if (language) {
      currentLanguage = language;
    }

    currentSandBoxChangingQuestionStep = changingQuestionStep;
    currentSandBoxResultStatus         = result_status;

    if (previousLanguage !== currentLanguage) {
      dispatchCommonPayloadWired({ currentLanguage: commonReducer.languages[currentLanguage] });
    }
    if (previousSandBoxChangingQuestionStep !== currentSandBoxChangingQuestionStep) {
      if (currentSandBoxChangingQuestionStep < step) {
        dispatchRemoveOverStepQuestionsWired(currentSandBoxChangingQuestionStep)
        if (currentSandBoxResultStatus) {
          // send unblock request
          unblockSandBoxSessionWired(testId);
          // clear result status
          dispatchTestingPayloadWired({ result_status: null })
        }
      }

    }

  });