export function noButtonMechanics(attempts: number) {
  if (attempts >= 13) {
    return {
      hidden: true,
      message: "देखा... even this website knows we're meant to be 😊",
    };
  }

  if (attempts >= 11) {
    return {
      text: "Actually... Maybe Yes?",
      shouldMove: false,
      scale: 1,
      message: "सारे इशारे 'YES' की तरफ़ हैं 💕",
    };
  }

  if (attempts >= 8) {
    const texts = ["Think Again 💭", "Not Convinced? 🤔", "You're Really Stubborn! 😤"];
    return {
      text: texts[attempts - 8] || texts[0],
      shouldMove: true,
      scale: 0.8,
      message: "Remember our kiss? 💋 Remember Class 8th? 📓",
    };
  }

  if (attempts >= 7) {
    return {
      text: "Still No?? 🤔",
      shouldMove: false,
      scale: 0.8,
      message: "पक्का? You're really sure about this?",
    };
  }

  if (attempts >= 4) {
    const scale = 1 - (attempts - 3) * 0.2;
    return {
      text: "No ❌",
      shouldMove: true,
      scale,
      message: "It's getting smaller... क्योंकि 'no' really isn't an option here 😉",
    };
  }

  if (attempts >= 1) {
    const messages = [
      "अरे! ये button शर्मा गया... try again? 😊",
      "Oops! It ran away...",
      "The button is playing hard to get 😉",
    ];
    return {
      text: "No ❌",
      shouldMove: true,
      scale: 1,
      message: messages[attempts - 1] || messages[0],
    };
  }

  return {
    text: "No ❌",
    shouldMove: false,
    scale: 1,
  };
}
