const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(content, role) {
  const div = document.createElement("div");
  div.className = "message " + role;
  div.textContent = content;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // Fake assistant response for now
  setTimeout(() => {
    addMessage("🤖 (Assistant): I’ll help you with — " + text, "assistant");
  }, 600);

  // Later: connect to backend AI
  /*
  try {
    const res = await fetch("http://localhost:4000/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    addMessage(data.reply, "assistant");
  } catch (err) {
    addMessage("❌ Error: Could not connect to AI service.", "assistant");
  }
  */
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
