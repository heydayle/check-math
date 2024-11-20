import { computed, reactive } from 'vue';
import { useLocalStorage } from '@vueuse/core'
const isDark = useLocalStorage('isDark', false)
const layoutConfig = reactive({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  darkTheme: isDark.value,
  menuMode: 'static'
});

export function useLayout() {
  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();
      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const executeDarkModeToggle = () => {
    isDark.value = !layoutConfig.darkTheme;
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle('app-dark');
  };

  const executeDarkModeAuto = () => {
    isDark.value = true
    document.documentElement.classList.toggle('app-dark');
  };

  return {
    isDarkTheme,
    toggleDarkMode,
    executeDarkModeAuto,
  }
}
