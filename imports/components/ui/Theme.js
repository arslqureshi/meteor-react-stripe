import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = "#0B72B9"
const arcOrange = "#FFBA60"
const arcRed = "#f44336"

export default createMuiTheme({
    palette: {
        common: {
            blue: `${arcBlue}`,
            orange: `${arcOrange}`
        },
        primary: {
            main: `${arcBlue}`
        },
        secondary: {
            main: `${arcRed}`
        }
     },
     typography: {
         tab: {
           fontFamily: "Raleway",
           textTransform: "none",
           fontWeight: 700,
           fontSize: "1rem" 
         },
         
     }
})