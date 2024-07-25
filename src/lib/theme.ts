const themeToggler = document.querySelector("#theme-toggler");
const localStorageTheme = getStorageTheme();
const userPreferenceTheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = loadUserTheme({ localStorageTheme, userPreferenceTheme });

interface LoadUserThemeProps {
  localStorageTheme: string | null;
  userPreferenceTheme: MediaQueryList;
}

setTheme(currentTheme);

if (themeToggler) themeToggler.addEventListener("click", handleClick);

//
// Theme stuff
//
function loadUserTheme({
  localStorageTheme,
  userPreferenceTheme,
}: LoadUserThemeProps) {
  if (localStorageTheme !== null) return localStorageTheme;

  if (userPreferenceTheme.matches) return "dark";

  return "light";
}

function setTheme(theme: string) {
  setStorageTheme(theme);

  document.documentElement.dataset.theme = theme;
}

//
// Click stuff
//
function handleClick() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);

  currentTheme = newTheme;
}

//
// Local storage stuff
//
function setStorageTheme(theme: string) {
  localStorage.setItem("theme", theme);
}

function getStorageTheme() {
  return localStorage.getItem("theme");
}
