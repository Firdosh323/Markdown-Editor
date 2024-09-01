// Markdown to HTML conversion
document.getElementById('markdown-input').addEventListener('input', function() {
    const markdownText = this.value;
    const htmlContent = marked.parse(markdownText);
    document.getElementById('markdown-preview').innerHTML = htmlContent;
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
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
