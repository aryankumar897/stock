// components/DailyInvoiceReport.js

import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation'
import PrintIcon from '@mui/icons-material/Print';
import {
  Box, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Grid, IconButton
} from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SnapPOS from "@/components/nav/SnapPOS"

const DailyInvoiceReport = () => {

  const [creditcustomer, setCreditcustomer] = useState([]);

  const router = useRouter()
  const tableRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);







  useEffect(() => {
    fetchReport()

  }, []);



  const fetchReport = async () => {



    try {
      const response = await fetch(`${process.env.API}/user/creditcustomer`, {
        method: 'GET',

      });



      const report = await response.json();
      console.log("report", report);
      setCreditcustomer(report);


    } catch (error) {
      console.error('Error:', error);
    }

  };


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

    <>


      <Box

        ref={tableRef}
      >
        <h1
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
    Credit Customer Report
        </h1>

        <SnapPOS />
        <Table





          hover style={{
            backgroundColor: 'white',
            borderRadius: '8px',       // Optional: rounded corners for a softer look
            overflow: 'hidden',        // Optional: in case of rounded corners, this keeps content within bounds
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
          }}  >
          <TableHead>
            <TableRow>

              <TableCell>S.No</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Customer Name</TableCell>
 

  <TableCell>Total amount</TableCell>

              <TableCell>Details</TableCell>




            </TableRow>
          </TableHead>



          <TableBody>



            {



              creditcustomer && creditcustomer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                <TableRow key={customer?._id}>

                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{customer?.invoice_id?.invoice_no}

                  </TableCell>
                  <TableCell>{customer?.customer_id?.name}</TableCell>
                


                  <TableCell>{customer?.total_amount}</TableCell>
                  
                  <TableCell>
                    <IconButton onClick={() => router.push(`/dashboard/user/creditdetails?detail=${customer?._id}`)}>
                      <ViewInArIcon
                        sx={{
                          color: 'blue',
                          ':hover': {
                            color: 'darkred',
                          },
                        }}
                      />
                    </IconButton>
                   
                  </TableCell>


                  <TableCell>


                  </TableCell>

                </TableRow>


              ))

            }





          </TableBody>


        </Table>



        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PrintIcon />}

              sx={{
                p: 3,
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
                height: '100%',
              }}
            >
              Thyanks
            </Button>
          </Grid>
        </Grid>

      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={printTable}
            sx={{
              p: 3,
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

    </>


  );
};




export default DailyInvoiceReport;
