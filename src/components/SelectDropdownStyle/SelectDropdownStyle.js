// Dropdown react select styles
export const filterCustomStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            // backgroundColor: isSelected ? "#A66C22" : "null",
            // color: isSelected ? "#ffffff" : "#34373D",
            "&:hover": {
                // color: "#ffffff",
                cursor: "pointer",
                // backgroundColor: "#A66C22",
            }
        }
    },
    control: styles => ({
        ...styles,
        backgroundColor: null,
        border: 0,
        paddingLeft: 0,
        outline: 0,
        boxShadow: "none",
        // color: "#fff",
        // fontSize: "1rem",
    }),
    valueContainer: styles => ({
        ...styles,
        // fontSize: "1rem",
        paddingLeft: 0,
        lineHeight: "21px",
        cursor: "pointer",
    }),
    dropdownIndicator: styles => ({
        ...styles,
        color: "#fff",
    }),
    indicatorsContainer: styles => ({
        ...styles,
        color: "#fff",
        cursor: "pointer",
    }),
    indicatorSeparator: () => null,
    placeholder: defaultStyles => {
        return {
            ...defaultStyles,
            color: "#ffffff",
            marginLeft: 0,
        }
    },
}

export const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected ? "#A66C22" : "null",
            color: isSelected ? "#ffffff" : "#34373D",
            "&:hover": {
                color: "#ffffff",
                cursor: "pointer",
                backgroundColor: "#A66C22",
            }
        }
    },
    control: styles => ({
        ...styles,
        backgroundColor: null,
        border: 0,
        paddingLeft: 0,
        outline: 0,
        boxShadow: "none",
        // color: "#fff",
        // fontSize: "1rem",
    }),
    valueContainer: styles => ({
        ...styles,
        fontSize: "1rem",
        paddingLeft: 0,
        lineHeight: "21px",
        cursor: "pointer",
    }),
    dropdownIndicator: styles => ({
        ...styles,
        color: "#fff",
    }),
    indicatorsContainer: styles => ({
        ...styles,
        color: "#fff",
        cursor: "pointer",
    }),
    indicatorSeparator: () => null,
    placeholder: defaultStyles => {
        return {
            ...defaultStyles,
            color: "#34373D",
            marginLeft: 0,
        }
    },
}
// Dropdown react select styles