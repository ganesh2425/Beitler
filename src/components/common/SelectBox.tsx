import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectBox = ({ options, name, onChange, defaultval, disabled }: any): JSX.Element => {
    const [optionSelected, setSelectedOptions] = useState([]);

    const handleChange = (selected: any) => {
        onChange({ name, id: selected.value });
        setSelectedOptions(selected);
    };

    useEffect(() => {
        setSelectedOptions(defaultval)
    }, [defaultval])

    return (
        <Select
            options={options}
            isLoading={!options}
            closeMenuOnSelect={true}
            onChange={handleChange}
            value={optionSelected}
            name={name}
            defaultValue={defaultval}
            isDisabled={disabled}
        />
    );
};

export default SelectBox;