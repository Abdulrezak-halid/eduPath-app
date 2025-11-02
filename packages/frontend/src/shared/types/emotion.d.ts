import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

declare module '@mui/material/styles' {
  interface Theme {
    palette: MuiTheme['palette'];
    spacing: MuiTheme['spacing'];
  }
  interface ThemeOptions {
    palette?: Partial<MuiTheme['palette']>;
    spacing?: MuiTheme['spacing'];
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    neutral?: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}