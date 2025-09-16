document.getElementById("msgForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    document.getElementById("status").innerText = "⚠️ Both fields required!";
    return;
  }

  try {
    const res = await fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });

    const data = await res.json();
    document.getElementById("status").innerText = data.msg;
    document.getElementById("msgForm").reset();
  } catch (err) {
    document.getElementById("status").innerText = "❌ Error sending message!";
    console.error(err);
  }
});
