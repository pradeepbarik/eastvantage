import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#356ba1',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const Users = () => {
    const [rows, setRows] = useState([]);
    const [loadershow, setLoaderShow] = useState(false);
    const getUsers = () => {
        setLoaderShow(true);
        axios.get("https://randomuser.me/api").then((response) => {
            setLoaderShow(false);
            if (response.data.results) {
                let randomusers = response.data.results.map((user) => {
                    return {
                        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                        email: user.email,
                        gender: user.gender,
                        state: user.location.state,
                        city: user.location.city,
                        location: `${user.location.street.number} ${user.location.street.name} ${user.location.city},${user.location.state} ${user.location.country} ${user.location.postcode}`
                    }
                })
                setRows(randomusers);
                localStorage.setItem("RANDOM_USERS", JSON.stringify(randomusers));
            }
        })
    }
    useEffect(() => {
        let randomusers = localStorage.getItem("RANDOM_USERS");
        if (randomusers) {
            randomusers = JSON.parse(randomusers);
            setRows(randomusers.map((user) => {
                return { name: user.name, email: user.email, gender: user.gender, state: user.state, city: user.city, location: user.location };
            }))
        } else {
            getUsers();
        }
    }, [])
    return (
        <div style={{ position: "relative" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Gender</StyledTableCell>
                            <StyledTableCell align="right">State</StyledTableCell>
                            <StyledTableCell align="right">city</StyledTableCell>
                            <StyledTableCell align="right">Location</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.gender}</StyledTableCell>
                                <StyledTableCell align="right">{row.state}</StyledTableCell>
                                <StyledTableCell align="right">{row.city}</StyledTableCell>
                                <StyledTableCell align="right">{row.location}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
                <Button variant="outlined" onClick={getUsers} >Reload</Button>
            </div>
            {loadershow === true &&
                <div style={{
                    position: "absolute", height: '100%', width: '100%',
                    top: 0, left: 0, background: "#160e0e8f",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ background: "white", padding: "10px 40px", borderRadius: "5px" }}>
                        <CircularProgress />
                    </div>
                </div>
            }
        </div>
    )
}
export default Users;