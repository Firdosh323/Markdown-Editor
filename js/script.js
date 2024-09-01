// Function to calculate reading time
function calculateReadingTime(text) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
}

// Function to update editor stats
function updateEditorStats(text) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    const readingTime = calculateReadingTime(text);

    document.getElementById('word-count').textContent = wordCount;
    document.getElementById('char-count').textContent = charCount;
    document.getElementById('reading-time').textContent = readingTime;
}

// Function to update preview stats
function updatePreviewStats(htmlContent) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    const charCount = textContent.length;
    const readingTime = calculateReadingTime(textContent);

    document.getElementById('preview-word-count').textContent = wordCount;
    document.getElementById('preview-char-count').textContent = charCount;
    document.getElementById('preview-reading-time').textContent = readingTime;
}

// Event listener for markdown input
document.getElementById('markdown-input').addEventListener('input', function() {
    const markdownText = this.value;
    const htmlContent = marked.parse(markdownText);
    document.getElementById('markdown-preview').innerHTML = htmlContent;

    updateEditorStats(markdownText);
    updatePreviewStats(htmlContent);
});

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('mode-icon');
    icon.classList.toggle('fa-sun', !isDarkMode);
    icon.classList.toggle('fa-moon', isDarkMode);
});

// Download Markdown
document.getElementById('download-markdown').addEventListener('click', function() {
    const markdownText = document.getElementById('markdown-input').value;
    downloadFile('markdown.md', markdownText);
});

// Download HTML
document.getElementById('download-html').addEventListener('click', function() {
    const htmlContent = document.getElementById('markdown-preview').innerHTML;
    downloadFile('preview.html', htmlContent);
});

// Apply Custom CSS
document.getElementById('apply-css').addEventListener('click', function() {
    const customCss = document.getElementById('custom-css').value;
    let styleElement = document.getElementById('custom-style');
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'custom-style';
        document.head.appendChild(styleElement);
    }
    
    styleElement.innerHTML = customCss;
});

// Helper function to download files
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
