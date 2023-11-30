import React, { useEffect, useState } from 'react';
import '../../styles/dashboardCommanStyle.scss';
import {
  Box,
  Card,
  Divider,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TablePagination,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFixIndex } from '../../utils/constant';
import api from '../../api/api';
import { toast } from 'react-toastify';

const OrganizationDetailsList = () => {
  const navigate = useNavigate();
  const [organizationList, setOrganizationList] = useState([]);
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getOrganizationDetails();
  }, []);

  const getOrganizationDetails = async () => {
    try {
      const res = await api.getOrganizationDetails();
      const data = res?.data?.items;
      setCount(res?.data?.total);
      setOrganizationList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addOrganization = (id) => {
    navigate(`/add-organization-details`);
  };
  const viewOrganizationDetails = (id) => {
    navigate(`/add-organization-details/${id}`);
  }
  const deleteOrganization = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this organization?");
    if (!shouldDelete) {
      return;
    }
    try {
      api.deleteOrganization(id)
        .then(() => {
          getOrganizationDetails();
        })
        .catch((err) => {
          toast.error('Error deleting organization. Please try again.');
          console.error(err);
        });
    } catch (err) {
      toast.error('Error deleting organization. Please try again.');
      console.error(err);
    }
  };
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box className="main-box">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card>
              <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: 10 }}>
                <Grid item>
                  <Typography className='sub-title' >
                    Organizations List
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton title='Update'>
                    <Button className='view-btn-amc' variant="contained" onClick={() => addOrganization()}>
                      Add Organization
                    </Button>
                  </IconButton>
                </Grid>
              </Grid>
              <Divider className='devider-item' />
              <TableContainer component={Paper} >
                <Table sx={{ minWidth:950 }} aria-label="simple table">
                  <TableHead >
                    <TableRow>
                      <TableCell align='left' className='dashboard-table'  style={{paddingLeft:20}}>
                        Sr. No
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                        Organization Name
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                        User Name
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                        Address
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                        Contact No
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                        Email Address
                      </TableCell>
                      <TableCell align='left' className='dashboard-table'>
                       Host
                      </TableCell>
                      <TableCell align='center' className='dashboard-table'>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(organizationList || []).length <= 0 ? (
                      <TableRow>
                        <TableCell align='center' colSpan={6}>
                          <Typography align='center' className='dashboard-empty-msg'>
                            No Record Found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      (organizationList || []).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align='left' className='sub-table' style={{paddingLeft:20}}>
                            {getFixIndex(index + 1, page, rowsPerPage)}
                          </TableCell>
                          <TableCell align='left'>{item?.organizationName}</TableCell>
                          <TableCell align='left'>{item?.userName}</TableCell>
                          <TableCell align='left'>{item?.address}</TableCell>
                          <TableCell align='left'>{item?.contactNo}</TableCell>
                          <TableCell align='left'>{item?.email}</TableCell>
                          <TableCell align='left'>{item?.host}</TableCell>
                          <TableCell align='center'>
                            <IconButton title='View'>
                              <VisibilityIcon className='view-btn' onClick={() => viewOrganizationDetails(item?.id)} />
                            </IconButton>
                            <IconButton title='View'>
                              <DeleteIcon className='view-btn' onClick={() => deleteOrganization(item?.id)} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {count > rowsPerPage ? (
                <TablePagination
                  component={'div'}
                  count={count || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              ) : null}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrganizationDetailsList;
