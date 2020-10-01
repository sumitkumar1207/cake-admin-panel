import React from "react";
import TextField from '@material-ui/core/TextField';

export const makeFilterPlaceholder = ({ filter, onChange }, accessorName) => {
	return (
		<TextField
			// id="standard-full-width"
			id={accessorName}
			onChange={event => onChange(event.target.value)}
			// label="Label"
			// helperText="Full width!"
			placeholder={`Search ${accessorName}...`}
			fullWidth
			margin="normal"
			InputLabelProps={{
				shrink: true,
			}}
		/>
	)
};
// export const customFilterMethod = (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase())

export const customFilterMethod = (filter, row) => {
	if (isNaN(filter.value)) {
		return row[filter.id].toString().toLowerCase().includes(filter.value.toString().toLowerCase())
	} else {
		return row[filter.id].toString().includes(filter.value)
	}
} 