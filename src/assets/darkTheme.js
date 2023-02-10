let isDark = true

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("toggleDarkTheme").addEventListener("click", toggleDarkTheme);
})

function toggleDarkTheme() {
    if (isDark) {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        isDark = false
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        isDark = true
    }
}