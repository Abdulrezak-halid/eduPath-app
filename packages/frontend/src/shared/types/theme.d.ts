import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    palette: MuiTheme['palette'];
    spacing: MuiTheme['spacing'];
  }
  interface ThemeOptions extends Partial<Theme> {}
}