import { withTheme } from '@emotion/react';
import { Theme } from '@mui/material';

interface Props {
  theme: Theme;
  // ... other props
}

const YourComponent = ({ theme, ...props }: Props) => {
  return <div {...props} />;
};

export default withTheme(YourComponent);
