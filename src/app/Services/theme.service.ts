// // src/app/core/services/theme.service.ts
// import { Injectable, signal } from '@angular/core';

// type Theme = 'light' | 'dark';

// @Injectable({
//   providedIn: 'root'
// })
// export class ThemeService {
//   private readonly STORAGE_KEY = 'dashboard-theme';
//   private currentTheme = signal<Theme>('light');

//   constructor() {
//     this.initializeTheme();
//   }

//   theme = this.currentTheme.asReadonly();

//   private initializeTheme(): void {
//     const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    
//     // Check localStorage first
//     if (savedTheme) {
//       this.setTheme(savedTheme, false);
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       // Fallback to system preference
//       this.setTheme('dark', false);
//     } else {
//       // Default to light
//       this.setTheme('light', false);
//     }
//   }
//   getCssVariable(name: string): string {
//     // Get the computed style of the document body (where CSS variables are defined)
//     return getComputedStyle(document.body).getPropertyValue(name).trim();
//   }

//   toggleTheme(): void {
//     const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
//     this.setTheme(newTheme, true);
//   }

//   private setTheme(theme: Theme, persist: boolean = true): void {
//     this.currentTheme.set(theme);
//     // Key action: sets the attribute read by styles.css
//     document.body.setAttribute('data-theme', theme); 

//     if (persist) {
//       localStorage.setItem(this.STORAGE_KEY, theme);
//     }
//   }
// }

// src/app/core/services/theme.service.ts
import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'dashboard-theme';
  private currentTheme = signal<Theme>('light');

  constructor() {
    this.initializeTheme();
  }

  /**
   * Public read-only Signal for components to react to theme changes.
   * Components must call this signal like a function (e.g., this.theme()) to read its value.
   */
  theme = this.currentTheme.asReadonly();

  /**
   * Initializes the theme from localStorage or system preference.
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    
    // 1. Check localStorage first
    if (savedTheme) {
      this.setTheme(savedTheme, false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 2. Fallback to system preference
      this.setTheme('dark', false);
    } else {
      // 3. Default to light
      this.setTheme('light', false);
    }
  }

  /**
   * Toggles the theme between light and dark.
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true);
  }

  /**
   * Sets the theme, updates the body attribute, and persists the choice.
   */
  private setTheme(theme: Theme, persist: boolean = true): void {
    this.currentTheme.set(theme);
    
    // KEY ACTION: Sets the 'data-theme' attribute on the <body> element,
    // which triggers the CSS variable overrides defined in src/styles.css.
    document.body.setAttribute('data-theme', theme); 

    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  /**
   * Utility function to retrieve the actual computed value of a CSS variable.
   * This is necessary because ECharts cannot directly interpret 'var(--color-name)'.
   */
  getCssVariable(name: string): string {
    // getComputedStyle is needed to read the *current* active value from the DOM
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }
}