import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
		}
	},
    generateButton: {
        margin: theme.spacing(1),
    },
	formContainer:{
		display: "flex",
		flexDirection: "row"
	}
}));

export default useStyles;
