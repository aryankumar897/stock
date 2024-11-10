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
  const { invoices, loading, error } = useSelector((state) => state.invoices);
  const [payments, setPayments] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Step 2: Set up initial states
  const [invoice, setInvoice] = useState([]);

  const [invoiceDetails, setInvoiceDetails] = useState([
  ]);

  const [payment, setPayment] = useState('');

  const [paymentDetails, setPaymentDetails] = useState('');


  const tableRef = useRef();


  useEffect(() => {
    fetchpayment()
    fetchInvoice()
  }, []);

  const fetchpayment = async () => {

    try {
      const response = await fetch(`${process.env.API}/user/payment`, {
        method: 'GET',

      });

      const allpayment = await response.json();
      console.log("allpayment", allpayment);
      setPayments(allpayment)


    } catch (error) {
      console.error('Error:', error);
    }

  };


  const fetchInvoice = async () => {

    try {
      const response = await fetch(`${process.env.API}/user/invoicedetails/${search}`, {
        method: 'GET',
      });

      const details = await response.json();
      const { invoice, invoicedetails, payment, paymentDetails } = details;
      console.log("invoicedetails", details);
      setInvoice(invoice)
      setInvoiceDetails(invoicedetails)
      setPayment(payment)
      setPaymentDetails(paymentDetails)

    } catch (error) {
      console.error('Error:', error);
    }

  };






  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const subtotal = invoiceDetails && invoiceDetails?.reduce((acc, item) => acc + item.selling_price, 0);

  // Function to print the table
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
        Print Invoice List


      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={printTable}
            sx={{
              p: 1,
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
      <Box

        ref={tableRef}
      >


      

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', mb: "20px" }}>
          {invoice &&
            invoice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => {
              // Find the matching payment for this invoice
              const matchingPayment = Array.isArray(payments)
                ? payments.find(payment => payment?.invoice_id?.toString() === invoice?._id?.toString())
                : null;

              return (
                <div
                  key={invoice?._id}
                  style={{
                    backgroundColor: '#ffffff',      // Set background color to white
                    color: '#333333',   
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    width: '100%',
                    marginBottom: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h3>Invoice #{invoice?.invoice_no}</h3>
                  <p><strong>Date:</strong> {new Date(invoice?.date).toLocaleDateString()}</p>
                
                  <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                    <h4>Customer Details</h4>
                    <p><strong>Name:</strong> {matchingPayment ? matchingPayment?.customer_id?.name : "N/A"}</p>
                    <p><strong>Email:</strong> {matchingPayment ? matchingPayment?.customer_id?.email : "N/A"}</p>
                    <p><strong>Phone:</strong> {matchingPayment ? matchingPayment?.customer_id?.phone : "N/A"}</p>
                  </div>

                  
                </div>
              );
            })}
        </div>







        <TableContainer


          component={Paper} sx={{ overflowX: 'auto',mt:"2px" }}>
          <Table hover>
            <TableHead>
              <TableRow>

                <TableCell>S.No</TableCell>
                <TableCell>Purchase No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {

                invoice && invoice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => (
                  <TableRow key={invoice?._id}>

                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{invoice?.invoice_no}

                    </TableCell>
                    <TableCell>{new Date(invoice?.date).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice?.description}</TableCell>



                    {/* Find the matching payment for this invoice */}
                    {(() => {
                      const matchingPayment = Array.isArray(payments)
                        ? payments.find(payment => payment?.invoice_id?.toString() === invoice?._id?.toString())
                        : null;

                      return (
                        <>
                          <TableCell>{matchingPayment ? matchingPayment?.customer_id?.name : "N/A"}</TableCell>
                          <TableCell>${matchingPayment ? matchingPayment?.total_amount : "N/A"}</TableCell>
                        </>
                      );
                    })()}













                  </TableRow>


                ))

              }


            </TableBody>

          </Table>


        </TableContainer>
        <TableContainer


          component={Paper} sx={{ overflowX: 'auto', my: "25px" }}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Current Stock</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceDetails && invoiceDetails.map((details, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{details?.category_id?.name}</TableCell>
                  <TableCell align="center">{details?.product_id?.productName}</TableCell>
                  <TableCell align="center">{details?.product_id?.quantity}</TableCell>
                  <TableCell align="center">{details?.selling_qty}</TableCell>
                  <TableCell align="center">{details?.unit_price}</TableCell>
                  <TableCell align="center">{details?.selling_price}</TableCell>
                </TableRow>
              ))}

              {/* Subtotal row */}
              <TableRow>
                <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                  Subtotal
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  ${subtotal}
                </TableCell>
              </TableRow>

              {payment && payment.map((invoice) => (
                <React.Fragment key={invoice._id}>
                  <TableRow>
                    <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                      Discount
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      ${invoice.discount_amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                      Paid Amount
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      ${invoice.paid_amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                      Due Amount
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      ${invoice.due_amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                      Grand Amount
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      ${invoice.total_amount}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}



            

            </TableBody>



          </Table>



        </TableContainer>

      </Box>

    


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
