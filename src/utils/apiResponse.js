export const sendToAi = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Define predefined responses based on user input
  const responses = {
    hello: "Hi there!",
    "how are you": "I am a bot, I don't have feelings, but thanks for asking!",
    bye: "Goodbye!",
    // Add more responses as needed
  };

  // Get the predefined response or a default one
  // const aiResponse = responses[userMessage.toLowerCase()] || 'I didn\'t understand that.';

  // return aiResponse;
  return responses;
};
