import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Modal, Snackbar, Alert, Grid
} from '@mui/material';

import PrintIcon from '@mui/icons-material/Print';

import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const PurchaseTable = ({ search }) => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [payments, setPayments] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [payment, setPayment] = useState('');




  const tableRef = useRef();


  useEffect(() => {

    fetchInvoice()
  }, []);



  const fetchInvoice = async () => {

    try {
      const response = await fetch(`${process.env.API}/user/paiddetails/${search}`, {
        method: 'GET',
      });

      const details = await response.json();
      const { payment } = details;
      console.log("invoicedetails", details);

      setPayment(payment)


    } catch (error) {
      console.error('Error:', error);
    }

  };







  const printTable = () => {
    const printContent = tableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // Replace body content with the table content for printing
    document.body.innerHTML = printContent;
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContent;
  };


  return (
    <Box sx={{ p: 2 }}>


      <Box

        ref={tableRef}
      >





        <Typography variant="h4" sx={{ mb: 2 }}

          style={{
            fontSize: '3rem',
            color: '#0073e6',       // A nice blue color
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
            padding: '10px',
            borderBottom: '2px solid #0073e6', // Underline effect
            letterSpacing: '1px',
          }}


        >
          Print Paid List


        </Typography>



        <TableContainer


          component={Paper} sx={{ overflowX: 'auto', my: "25px" }}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl</TableCell>
                <TableCell align="center">  Invoice No     </TableCell>
                <TableCell align="center"> Customer Name  </TableCell>
                <TableCell align="center">Due Amount</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {payment && payment.map((details, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{details?.
                    invoice_id?.invoice_no}</TableCell>
                  <TableCell align="center">{details?.customer_id?.name}</TableCell>
                  <TableCell align="center">{details?.due_amount}</TableCell>

                </TableRow>
              ))}




            </TableBody>



          </Table>



        </TableContainer>


        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PrintIcon />}

              sx={{
                p: 5,
                width: "100%",
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
                height: '100%',
              }}
            >
              thanks
            </Button>
          </Grid>
        </Grid>

      </Box>








      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={printTable}
            sx={{
              p: 5,
              width: "100%",
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
              height: '100%',
            }}
          >
            Print
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};









const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid blue',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

const modalBackdropStyle = {
  backdropFilter: 'blur(5px)', // For blurring the background
  WebkitBackdropFilter: 'blur(5px)' // For Safari support
};

export default PurchaseTable;
