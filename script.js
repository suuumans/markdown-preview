const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');
const clearButton = document.getElementById('clear-button');
const copyButton = document.getElementById('copy-button');

// Load saved content
const savedContent = localStorage.getItem('markdownContent');
// If there is saved content, set the input value to it
if (savedContent) {
    markdownInput.value = savedContent;
}

// Update the preview when the input changes
function updatePreview() {
    try {
        markdownPreview.classList.add('loading');
        // Save the markdown content to local storage
        const markdownText = markdownInput.value;
        localStorage.setItem('markdownContent', markdownText);
        // Parse the markdown content to HTML
        const html = marked.parse(markdownText);
        markdownPreview.innerHTML = html;
    } catch (error) {
        markdownPreview.innerHTML = `<p class="error">Error parsing markdown: ${error.message}</p>`;
    } finally {
        markdownPreview.classList.remove('loading');
    }
}

// update the preview when the input changes
markdownInput.addEventListener('input', updatePreview);

// Clear the input and preview
clearButton.addEventListener('click', () => {
    markdownInput.value = '';
    markdownPreview.innerHTML = '';
    // Remove the markdown content from local storage
    localStorage.removeItem('markdownContent');
});

// Add a copy button to the preview
copyButton.addEventListener('click', () => {
    const textToCopy = markdownPreview.innerText;
    // If there is no text to copy, show an alert
    if (!textToCopy) {
        alert('Nothing to copy!');
        return
    }

    // Copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Change the button text to 'Copied!' when the text is copied
        copyButton.textContent = 'Copied!';
        // Reset the button text after 2 seconds to 'Copy'
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
})

// Initial update
updatePreview();