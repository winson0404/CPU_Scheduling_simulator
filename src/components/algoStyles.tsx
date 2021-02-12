import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	header: {
		paddingBottom: theme.spacing(2),
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
	heroContent: {
		padding: theme.spacing(8, 0, 6),
		paddingTop: "30px",
	},
	contentContainer: {
		paddingLeft: "10px",
	},
	algoDivider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

export default useStyles;
