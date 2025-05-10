const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.querySelectorAll(".slide");
const tabs = document.querySelectorAll(".tabs button");
const slidesContainer = document.querySelector(".slides");

let currentIndex = 0;
const totalSlides = slides.length;

// Function to navigate to a slide
function goToSlide(index) {
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }

  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
  updateActiveTab(index);
}

// Function to update active tab color
function updateActiveTab(index) {
  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.style.color = "#1B7200";
    } else {
      tab.style.color = "#464646";
    }
  });
}

// Previous & Next button event listeners
prevBtn.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => goToSlide(index));
});

goToSlide(0);

/*-------------Chatbot---------------------*/

// When the floating button is clicked
document.querySelector('.chatbot-btn').addEventListener('click', () => {
  document.querySelector('.chatbot-popup').style.display = 'block';
  document.querySelector('.chatbot-btn').style.display = 'none'; // hide floating button
});

// When the arrow down (close) button in the header is clicked
document.getElementById('close-botmoto').addEventListener('click', () => {
  document.querySelector('.chatbot-popup').style.display = 'none';
  document.querySelector('.chatbot-btn').style.display = 'flex'; // show floating button again
});

// Select DOM elements
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");

const API_KEY = "AIzaSyApqPqtbdDOyfEcPj6fV0FzfD0Bfh2lmD8";
const TEXT_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${API_KEY}`;
const IMAGE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${API_KEY}`;

const userData = {
  message: null
};
// Function to create a new message element
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const trimAsterisks = (text) => {
  return text.replace(/\*/g, '').trim();
};
// ========= IF WANT NYO AYUSIN SPACING HERE NYO BAGUHIN  ========= //

const appendBotMessage = (text, element = null) => {
  const botMessageText = element 
      ? element.querySelector(".message-text") // Get the bot message text if element is provided
      : document.querySelector(".bot-message.answer .message-text"); // Otherwise, use the default bot message text element

  if (botMessageText) {
      botMessageText.innerText += text;// Append new text to bot's message
      scrollToBottom();// Scroll chat to bottom
  }
};
// Function to generate a bot response
const generateBotResponse = async (answerContainer) => {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          contents: [{
              parts: [{ text: userData.message }]
          }]
      })
  };

  try {
      const response = await fetch(TEXT_API_URL, requestOptions);// Fetch bot response from API
      if (!response.ok) {
          const errorText = await response.text(); // Error handling if the API response is not okay
          throw new Error("Fetch error: " + errorText);
      }

      const reader = response.body.getReader();// Read the response body
      const decoder = new TextDecoder("utf-8");// Text decoder to process the response
      let buffer = ""; 

      // Continuously read response data
      while (true) {
          const { done, value } = await reader.read();
          if (done) break;// Break if done

          buffer += decoder.decode(value, { stream: true });// Decode and append the new chunk
          const lines = buffer.split("\n");// Split buffer into lines
          buffer = lines.pop();// Keep remaining buffer in case of incomplete line

          // Process each line from the response
          for (let line of lines) {
              line = line.trim();
              if (line.startsWith("data: ")) {
                  const jsonStr = line.replace("data: ", "");
                  if (jsonStr === "[DONE]") return;// End of response

                  try {
                      const parsed = JSON.parse(jsonStr);// Parse JSON response
                      const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (content) {
                          appendBotMessage(trimAsterisks(content), answerContainer);// Display bot message
                      }
                  } catch (err) {
                      console.error("JSON parse error:", err);// Log any JSON parsing errors
                  }
              }
          }
      }
  } catch (error) {
      console.error("generateBotResponse error:", error);// Log any other errors
  }
};

// Function to handle outgoing messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();// Get the trimmed user input
  if (!userData.message) return;// If no message, do nothing
  messageInput.value = "";// Clear input field

  // Create and append outgoing message
  const messageContent = `<div class="message-text"></div>`;
  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").innerText = trimAsterisks(userData.message);
  chatBody.appendChild(outgoingMessageDiv);// Append to chat body

  // bot avater response
  setTimeout(() => {
      const answerMessage = createMessageElement(
          `<svg class="botmot-avatar" xmlns="http://www.w3.org/2000/svg"  
          width="50" height="50" viewBox="0 0 64 64"><defs><style>.cls-1
          {fill:#afb4c8}.cls-2{fill:#e1e4ed}.cls-4{fill:#cdd2e1}.cls-7
          {fill:#99a1b1}.cls-8{fill:#f26973}.cls-9{fill:#ffca6b}.cls-10
          {fill:#e65263}.cls-11{fill:#393045}</style></defs><g id="_22-bot" 
          data-name="22-bot"><path class="cls-1" d="m41 47 2 8H21l2-8h18z"/>
          <path class="cls-2" d="M46 55a2.006 2.006 0 0 1 2 2 2.015 2.015 0 
          0 1-2 2H18a2.006 2.006 0 0 1-2-2 2.015 2.015 0 0 1 2-2h28zM63 
          41v2a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-2z"/><path d="M63 9v32H1V9a4 
          4 0 0 1 4-4h54a4 4 0 0 1 4 4z" style="fill:#ade1fa"/><path class="
          cls-4" d="M7 43v-2H1v2a4 4 0 0 0 4 4h6a4 4 0 0 1-4-4z"/><path 
          d="M11 5H5a4 4 0 0 0-4 4v32h6V9a4 4 0 0 1 4-4z" style="fill:#8ed8f8"/>
          <path class="cls-4" d="M57 43v-2h6v2a4 4 0 0 1-4 4h-6a4 4 0 0 0 4-4z"/>
          <path d="M53 5h6a4 4 0 0 1 4 4v32h-6V9a4 4 0 0 0-4-4z" style="fill:#d4effc"/>
          <path class="cls-7" d="M41 47H23l-1 4h20l-1-4z"/><path class="cls-4" d="M18 
          59h28a2.015 2.015 0 0 0 2-2H16a2.006 2.006 0 0 0 2 2z"/><path class="cls-1" 
          d="M47 39v2H17v-2a2.006 2.006 0 0 1 2-2h26a2.006 2.006 0 0 1 2 2z"/><path 
          class="cls-2" d="M41 29v5h-6v-3a2.006 2.006 0 0 0-2-2h-2a2.006 2.006 0 0 
          0-2 2v3h-6V18h18v11zm-3-5a2 2 0 1 0-2 2 2.006 2.006 0 0 0 2-2zm-8 0a2 2 0 
          1 0-2 2 2.006 2.006 0 0 0 2-2z"/><path class="cls-8" d="M47 23v6a2.006 
          2.006 0 0 1-2 2h-2a2.006 2.006 0 0 1-2-2v-6a2.006 2.006 0 0 1 2-2h2a2.006 
          2.006 0 0 1 2 2z"/><circle class="cls-9" cx="36" cy="24" r="2"/><path 
          class="cls-7" d="M37 34v3H27v-3h10z"/><path class="cls-8" d="M35 
          31v3h-6v-3a2.006 2.006 0 0 1 2-2h2a2.006 2.006 0 0 1 2 2z"/><circle 
          class="cls-9" cx="28" cy="24" r="2"/><path class="cls-8" d="M23 
          23v6a2.006 2.006 0 0 1-2 2h-2a2.006 2.006 0 0 1-2-2v-6a2.006 2.006 
          0 0 1 2-2h2a2.006 2.006 0 0 1 2 2z"/><path class="cls-10" d="M45 
          21h-2a1.923 1.923 0 0 0-.5.072A2 2 0 0 1 44 23v6a2 2 0 0 
          1-1.5 1.928A1.923 1.923 0 0 0 43 31h2a2.006 2.006 0 0 0 
          2-2v-6a2.006 2.006 0 0 0-2-2zM21 21h-2a1.923 1.923 0 0 
          0-.5.072A2 2 0 0 1 20 23v6a2 2 0 0 1-1.5 1.928A1.923 1.923 
          0 0 0 19 31h2a2.006 2.006 0 0 0 2-2v-6a2.006 2.006 0 0 0-2-2z"/>
          <path class="cls-11" d="M59 4H5a5.006 5.006 0 0 0-5 5v34a5.006 
          5.006 0 0 0 5 5h16.719l-1.5 6H18a3.015 3.015 0 0 0-3 3 3 3 0 0 0 
          3 3h28a3.015 3.015 0 0 0 3-3 3 3 0 0 0-3-3h-2.219l-1.5-6H59a5.006
           5.006 0 0 0 5-5V9a5.006 5.006 0 0 0-5-5zM5 6h54a3 3 0 0 1 3 
           3v31H48v-1a3 3 0 0 0-3-3h-7v-1h3a1 1 0 0 0 1-1v-2.184A2.966 
           2.966 0 0 0 43 32h2a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-.051a12.987 
           12.987 0 0 0-25.9 0H19a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h2a2.966 2.966 
           0 0 0 1-.184V34a1 1 0 0 0 1 1h3v1h-7a3 3 0 0 0-3 3v1H2V9a3 3 
           0 0 1 3-3zm37 17a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 
           1h-2a1 1 0 0 1-1-1zm0-2.816V18a1 1 0 0 0-1-1H23a1 1 0 0 0-1 
           1v2.184a2.993 2.993 0 0 0-.95-.179 10.995 10.995 0 0 1 21.9 0 
           2.993 2.993 0 0 0-.95.179zM21 22a1 1 0 0 1 1 1v6a1 1 0 0 1-1 
           1h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm3 7V19h16v14h-4v-2a3 3 0 
           0 0-3-3h-2a3 3 0 0 0-3 3v2h-4zm10 4h-4v-2a1 1 0 0 1 1-1h2a1 1 
           0 0 1 1 1zm2 2v1h-8v-1zm9 3a1 1 0 0 1 1 1v1H18v-1a1 1 0 0 1 
           1-1zm2 19a.978.978 0 0 1-.306.713A.965.965 0 0 1 46 58H18a1 
           1 0 0 1-1-1 .978.978 0 0 1 .306-.713A.965.965 0 0 1 18 56h28a1
          1 0 0 1 1 1zm-24.719-3 1.5-6h16.438l1.5 6zM59 46H5a3 3 0 0 
          1-3-3v-1h60v1a3 3 0 0 1-3 3z"/><path class="cls-11" d="M28 
          27a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 
          1-1zM36 27a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 
          1 0 0 1 1-1z"/></g></svg>
          <div class="message-text">
              <div class="thinking-indicator">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
              </div>
          </div>`, 
          "bot-message", "thinking"
      );
      chatBody.appendChild(answerMessage);

      generateBotResponse(answerMessage);
  }, 600);
};
// Scroll the chat to the bottom
const scrollToBottom = () => {
  chatBody.scrollTop = chatBody.scrollHeight;// Set scroll to the bottom
};
// Event listener for 'Enter' key to send message
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();// Get the trimmed message
  if (e.key === "Enter" && userMessage) {
      handleOutgoingMessage(e);// Handle the message
      scrollToBottom();// Scroll to the bottom
  }
});

// Event listener for send message button click
sendMessageButton.addEventListener("click", (e) => {
  handleOutgoingMessage(e); // Handle message on button click
  scrollToBottom(); // Scroll to the bottom
});
// Event listener for emoji button click
document.addEventListener("DOMContentLoaded", () => {
  const emojiBtn = document.getElementById('emoji-btn');
  const emojiModal = document.getElementById('emoji-modal');
  const emojiList = document.querySelectorAll('.emoji');
  const messageInput = document.getElementById('message-input');

  // Toggle the emoji modal when the emoji button is clicked
  emojiBtn.addEventListener('click', () => {
      emojiModal.style.display = emojiModal.style.display === 'none' ? 'block' : 'none';
  });

  // Add click listener to each emoji to insert it into the message input
  emojiList.forEach(emoji => {
      emoji.addEventListener('click', () => {
          messageInput.value += emoji.textContent; // Add emoji to the text input
      });
  });
});




document.getElementById('file-btn').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const fileName = file.name;
      messageInput.value += ` [File: ${fileName}]`;

      const filePreview = document.createElement('div');
      filePreview.classList.add("file-preview");

// If the file is an image, display it
if (file.type.startsWith('image/')) {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file); // Create image URL
  img.alt = fileName;
  img.classList.add("file-preview-image");
  filePreview.appendChild(img);
} else {
  const fileText = document.createElement('p');
  fileText.innerText = `File: ${fileName} (${file.type})`;
  filePreview.appendChild(fileText); // Display file info
}

// Only display the file preview in the chat, no file name in message input
chatBody.appendChild(filePreview);
scrollToBottom();


      chatBody.appendChild(filePreview);// Append file preview
      scrollToBottom(); // Scroll to the bottom
  }
});
// Event listener for chat form submit
document.getElementById('chat-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
      displayUserMessage(message); // Display the user message
      messageInput.value = '';// Clear input field
  }
});
// Display the bot's response in the chat
function displayBotResponse(response) {
  const chatBox = document.getElementById('chat-box');
  const responseDiv = document.createElement('div');
  responseDiv.classList.add('bot-response');
  responseDiv.innerHTML = response; // Set the response content
  chatBox.appendChild(responseDiv); // Append the response
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ========= IMAGE GENERATION FEATURE ========= //
// Event listener for image request button
document.getElementById("image-request-btn").addEventListener("click", () => {
  const prompt = prompt("Enter your image prompt:");// Ask user for image prompt
  if (prompt) {
      generateImageFromPrompt(prompt);// Generate image from prompt
  }
});
// Function to generate an image based on a prompt
async function generateImageFromPrompt(prompt) {
  const body = {
      contents: [{ parts: [{ text: prompt }] }],// Send the prompt text to the API
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] } // Request text and image response
  };

  try {
      const response = await fetch(IMAGE_API_URL, {
          method: "POST", // Send POST request to image generation API
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });

      const json = await response.json();
      const imageBase64 = json.candidates?.[0]?.content?.parts?.find(part => part.inlineData)?.inlineData?.data;
      
              // If image is found, display it
      if (imageBase64) {
          displayGeneratedImage(imageBase64);
      } else {
          console.error("No image found in response", json); // Log if no image is found
      }
  } catch (error) {
      console.error("Image generation error:", error); // Log any errors
  }
}

// Display the generated image in the chat
function displayGeneratedImage(base64Data) {
  const chatBox = document.querySelector(".chat-body");
  const img = document.createElement("img");
  img.src = `data:image/png;base64,${base64Data}`; // Set the image source
  img.alt = "Generated Image"; // Set image alt text
  img.classList.add("generated-image"); // Add CSS class for styling
  chatBox.appendChild(img); // Append image to chat
  scrollToBottom(); // Scroll to the bottom
}