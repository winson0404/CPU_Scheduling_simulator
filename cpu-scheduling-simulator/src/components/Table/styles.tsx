import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    header:{
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
	table: {
		minWidth: 650,
	},
	headCell: {
		fontWeight: "bolder",
		textAlign: "center",
		borderRight: "1px solid black",
	},
	bodyCell: {
		fontWeight: 100,
		textAlign: "center",
		borderRight: "1px solid black",
	},
}));

export default useStyles;
