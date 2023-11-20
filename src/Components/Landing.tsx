import { Box, Button, Card, CardContent, Checkbox, Collapse, FormControlLabel, IconButton, InputAdornment, ListItem, TextField } from '@mui/material';
import Header from './Header.tsx';
import { DataGrid, GridRowSpacingParams } from '@mui/x-data-grid';
import './Landing.css'
import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { handleOpenFile } from '../Data/IPC/IPCMessages';
// import SearchIcon from '@material-ui/icons/Search';
import clsx from "clsx";
import React from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Landing() {
    // usestate for results
    const [results, setResults] = useState([])
    const [searchText, setSearchText] = useState('') 
    const [filters, setFilters] = useState({filetypes: new Set(), checkedFileTypes: new Set()})

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
      };

    const handleSearch = async () => {
        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Target-URL': 'http://raln99'
            },
            body: JSON.stringify({query: searchText, useOrOperator: true})
        }).then(response => {
            if (!(response.ok)) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setResults(data.results)
            let filetypes = new Set()
            data.results.map((result: { resultType: String; }) => {
                filetypes.add(result.resultType)
            })
            setFilters({ filetypes: (filetypes) , checkedFileTypes: (filetypes)});
        })
        .catch(error => console.log(error))
    }

    const handleFileTypeChange = (event, filetype: string) => {
        const updatedFileTypes = new Set(filters.filetypes)
        if (event.target.checked) {
            updatedFileTypes.add(filetype)
        }
        else {
            updatedFileTypes.delete(filetype)
        }
        setFilters({...filters, filetypes: filters.filetypes, checkedFileTypes: updatedFileTypes})
    }

    const filteredResults = results.filter((result) => {
        if (filters.checkedFileTypes.size === 0) {
        return true; // No filters selected, show all results
        }
        return filters.checkedFileTypes.has(result.resultType);
    });   

    return (
        <div>
            <Header />
            <div style={{display: 'flex'}}>
                <div style={{width: '60%'}}>
                    <TextField id="outlined-required" label="Search" variant="outlined" className='search-box'
                    style={{marginTop: '32px', marginLeft: '32px', height: '50px', width: '80%'}}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            {/* <SearchIcon /> */}
                        </InputAdornment>
                        ),
                    }}
                    ></TextField>
                    <Button className='search' variant='contained' onClick={handleSearch}
                    style={{marginTop: '32px', marginLeft: '32px', backgroundColor: '#009B91', height: '56px'}}
                    >Search</Button>
                    <br/>
                    <BasicGrid results={filteredResults} />
                </div>
                <FilterCard filters={filters} onFiletypeChange={handleFileTypeChange}/>
                {/* <DemoCard rows={Array.from(filters.filetypes)} onFiletypeChange={handleFileTypeChange}/> */}
            </div>
        </div>
    )
}

type Result = {
    titleSubject: string;
    score: number;
    sizeKB: number;
    filenameSender: string;
    resultType: string;
    path: string;
    mappedPath: string;
    authorsSender: string;
    lastModifiedSendDate: string;
    image: string;
    parserName: string;
    configIndex: number;
};

        // each object has a titleSubject, score, sizeKB, filenameSender, resultType,
        // resultType, path, mappedPath, authorSender, lastModifiedSendDate, image, 
        // parserName, configIndex

        // relevant fields: filenameSender, path, lastModifiedSendDate, sizeKB, authorsSender
        // can store all filetypes in a set using resultType

function BasicGrid(props: {results: Result[]}) {
    const columns = [
        { field: 'file', headerName: 'File Name', width: 130 },
        { field: 'location', headerName: 'Location', width: 130 },
        { field: 'lastModified', headerName: 'Last Modified', width: 130 },
        { field: 'size', headerName: 'Size', width: 130},
        { field: 'author', headerName: 'Author', width: 130},
        { field: 'filetype', headerName: 'File Type', width: 130}
    ];
    const results = props.results.map((result) => {
        const date = new Date(Number (result.lastModifiedSendDate))

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}`;
        // add time as well 

        let size = '0 KB'
        // convert size to gb/mb/kb
        if (result.sizeKB > 1024) {
            size = String ((result.sizeKB / 1024).toFixed(2) + ' MB')
        }
        else if (result.sizeKB > 1024 * 1024) {
            size = String ((result.sizeKB / (1024 * 1024)).toFixed(2) + ' GB')
        }
        else {
            size = String (result.sizeKB + ' KB')
        }

        return {id: Math.random(), file: result.filenameSender, location: result.path, lastModified: formattedDateTime, size: size, author: result.authorsSender, filetype: result.resultType}
    })
    const rows = results.map((result) => (
        {id: Math.random(), file: result.file, location: result.location, lastModified: result.lastModified, size: result.size, author: result.author, filetype: result.filetype}
    ))

    const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
        return {
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        };
      }, []);

    const handleRowClick = (params) => {
        let location = params.row.location
        console.log(location)
        location = location.slice(7)
        location = '\\\\RALN99\\Vol3' + location
        console.log(location)
        handleOpenFile(location)
    }

    return (
        <div>
            <DataGrid
                className='data-grid'
                rows={rows}
                columns={columns}
                rowSpacingType="border"
                // getRowSpacing={getRowSpacing}
                onRowClick={handleRowClick}
            />
        </div>
    )
}

function FilterCard(props: {filters: any, onFiletypeChange: (event: ChangeEvent<HTMLInputElement>, filetype: string) => void }) {
    return <Card sx={{ minWidth: 275, marginTop: '32px', marginLeft: '32px'}}>
    <CardContent>
        filetype
        {
            props.filters.filetypes && Array.from(props.filters.filetypes).map((filetype) => (
                <div>
                    <FormControlLabel control={<Checkbox defaultChecked />} label={String(filetype)} 
                    onChange={(event) => props.onFiletypeChange(event, filetype)}
                    />
                </div>
            ))
        }
    </CardContent>
  </Card>
}

function DemoCard (props) {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <div className="card" style={{width: '400px', marginTop: '32px', marginLeft: '32px'}}>
          <Card className={'root'}>
            <div style={{display: 'flex'}}>
            <div style={{display:'flex', marginLeft: '32px', marginTop: '10px',
                        fontFamily: "'Roboto', sans-serif", fontSize: '16px'
        }}>Filetypes</div>
                <IconButton
                    className={clsx('expand', {
                        ['expandOpen']: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
              {
                props.rows && Array.from(props.rows).map((filetype) => (
                    <div>
                        <FormControlLabel control={<Checkbox defaultChecked />} label={String(filetype)} 
                        onChange={(event) => props.onFiletypeChange(event, filetype)}
                        />
                    </div>
                ))
              }
              </CardContent>
          </Collapse>
          </Card>
      </div>
    );
  };

export default Landing