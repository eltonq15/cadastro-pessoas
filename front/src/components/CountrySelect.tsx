/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export default function CountrySelect(props: any) {
    const classes = useStyles();

    return (
        <Autocomplete
            id="country-select-demo"
            style={{ width: 300 }}
            disabled={props.disabled}
            autoComplete={props.autoComplete}

            options={countries as CountryType[]}
            classes={{
                option: classes.option,
            }}
            onChange={props.onChange}
            autoHighlight
            getOptionLabel={(option: any) => option.label}
            renderOption={(option: any) => (
                <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label}
                </React.Fragment>
            )}
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    style={props.style}
                    label="Nacionalidade"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: props.autoComplete,
                    }}
                />
            )}
        />
    );
}

interface CountryType {
    code: string;
    label: string;
    phone: string;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
    { code: 'AD', label: 'Andorra' },
    { code: 'AE', label: 'Emirados Árabes' },
    { code: 'AL', label: 'Albânia' },
    { code: 'AM', label: 'Armênia' },
    { code: 'AO', label: 'Angola' },
    { code: 'AQ', label: 'Antartica' },
    { code: 'AR', label: 'Argentina' },
    { code: 'AT', label: 'Austria' },
    { code: 'AU', label: 'Australia' },
    { code: 'AW', label: 'Aruba' },
    { code: 'BB', label: 'Barbados' },
    { code: 'BD', label: 'Bangladesh' },
    { code: 'BF', label: 'Burkina Faso' },
    { code: 'BG', label: 'Bulgaria' },
    { code: 'BM', label: 'Bermuda' },
    { code: 'BO', label: 'Bolivia' },
    { code: 'BR', label: 'Brasil' },
    { code: 'BS', label: 'Bahamas' },
    { code: 'BW', label: 'Botswana' },
    { code: 'BZ', label: 'Belize' },
    { code: 'CA', label: 'Canada' },
    { code: 'CL', label: 'Chile' },
    { code: 'CN', label: 'China' },
    { code: 'CO', label: 'Colombia' },
    { code: 'CR', label: 'Costa Rica' },
    { code: 'CU', label: 'Cuba' },
    { code: 'DE', label: 'Alemanha' },
    { code: 'FI', label: 'Finlandia' },
    { code: 'GE', label: 'Georgia' },
    { code: 'GM', label: 'Gambia' },
    { code: 'GN', label: 'Guinea' },
    { code: 'GT', label: 'Guatemala' },
    { code: 'HK', label: 'Hong Kong' },
    { code: 'HN', label: 'Honduras' },
    { code: 'HT', label: 'Haiti' },
    { code: 'ID', label: 'Indonesia' },
    { code: 'IL', label: 'Israel' },
    { code: 'IN', label: 'India' },
    { code: 'JE', label: 'Jersey' },
    { code: 'JM', label: 'Jamaica' },
    { code: 'JP', label: 'Japan' },
    { code: 'KH', label: 'Cambodia' },
    { code: 'LI', label: 'Liechtenstein' },
    { code: 'LK', label: 'Sri Lanka' },
    { code: 'LR', label: 'Liberia' },
    { code: 'MC', label: 'Monaco' },
    { code: 'ME', label: 'Montenegro' },
    { code: 'MG', label: 'Madagascar' },
    { code: 'MM', label: 'Myanmar' },
    { code: 'MN', label: 'Mongolia' },
    { code: 'MO', label: 'Macau' },
    { code: 'MT', label: 'Malta' },
    { code: 'MX', label: 'Mexico' },
    { code: 'NA', label: 'Namibia' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'NI', label: 'Nicaragua' },
    { code: 'NP', label: 'Nepal' },
    { code: 'PA', label: 'Panama' },
    { code: 'PE', label: 'Peru' },
    { code: 'PT', label: 'Portugal' },
    { code: 'QA', label: 'Qatar' },
    { code: 'SM', label: 'San Marino' },
    { code: 'SN', label: 'Senegal' },
    { code: 'SO', label: 'Somalia' },
    { code: 'SR', label: 'Suriname' },
    { code: 'SV', label: 'El Salvador' },
    { code: 'TN', label: 'Tunisia' },
    { code: 'US', label: 'Estados Unidos' },
    { code: 'VE', label: 'Venezuela' },
    { code: 'XK', label: 'Kosovo' },
    { code: 'ZM', label: 'Zambia' },
    { code: 'ZW', label: 'Zimbabue' },
];
