// Add copy buttons to all code blocks
document.addEventListener("DOMContentLoaded", function () {
  // Find all code blocks (both .highlight and regular pre > code)
  const codeBlocks = document.querySelectorAll(
    "pre code, .highlight pre code, pre.highlight code"
  );

  codeBlocks.forEach(function (codeBlock) {
    // Skip if already has a copy button
    if (codeBlock.parentElement.querySelector(".copy-code-btn")) {
      return;
    }

    // Get the pre element (parent of code)
    const pre = codeBlock.parentElement;

    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.className = "copy-code-btn";
    copyButton.setAttribute("aria-label", "Copy code to clipboard");
    copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';

    // Position button relative to pre element
    if (pre.style.position !== "relative") {
      pre.style.position = "relative";
    }

    // Insert button into pre element
    pre.appendChild(copyButton);

    // Copy functionality
    copyButton.addEventListener("click", function () {
      const text = codeBlock.textContent || codeBlock.innerText;

      // Use modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            // Visual feedback
            copyButton.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            copyButton.classList.add("copied");

            setTimeout(function () {
              copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
              copyButton.classList.remove("copied");
            }, 2000);
          })
          .catch(function (err) {
            console.error("Failed to copy:", err);
            // Fallback for older browsers
            fallbackCopy(text, copyButton);
          });
      } else {
        // Fallback for older browsers
        fallbackCopy(text, copyButton);
      }
    });
  });
});

// Fallback copy method for older browsers
function fallbackCopy(text, button) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    button.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    button.classList.add("copied");

    setTimeout(function () {
      button.innerHTML = '<i class="fa-regular fa-copy"></i>';
      button.classList.remove("copied");
    }, 2000);
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }

  document.body.removeChild(textArea);
}
