import { Autocomplete, Checkbox, TextField } from '@mui/material'
import React from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const CustomMultiSelect = ({ placeHolder, sx, className, id, ...props }) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            fullWidth
            multiple
            id={id}
            className={className}
            // options={[].map((option) => option.title)}
            sx={{
                "& .MuiPopper-root": {
                    backgroundColor: "green"
                },
                "& .MuiAutocomplete-listbox": {
                    backgroundColor: "green"
                },
                ...sx,
                // height: "1rem"
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}

                // style={{ background: "#08172f", color: "white", padding: "0px !important", margin: "0 !important", paddingTop: "0px !important" }}
                >
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, color: "#8E97A4" }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}

            renderInput={(params) => <TextField {...params} variant="filled" placeholder={placeHolder} />}
            {...props}
        />
    )
}

export default CustomMultiSelect
