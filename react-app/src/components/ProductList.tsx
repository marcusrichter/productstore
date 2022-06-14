import React from 'react';
import { makeStyles } from '@mui/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useGet } from 'restful-react';
import useAwaitData from '../hooks/useAwaitData';
import { Products } from '../models/product';
import { Box } from '@mui/material';

const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 1000,
      margin: `0 auto`
    },
    loginBtn: {
      marginTop: 2,
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: 10
    }
  }
);

const formatPrice = (priceCent: number): string => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceCent * 0.01);

const ProductList = () => {
  const classes = useStyles();
  const {data: dataRequest, loading} = useGet({path: '/products'});
  const products: Products | null = useAwaitData(dataRequest);

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title="Produkte"/>
      <CardContent>
        {loading && <span>wird geladen</span>}

        {!loading && <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Artikel Nummer</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Beschreibung</TableCell>
                <TableCell>Preis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.items.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell align="center">
                    <Box
                      component="img"
                      sx={{
                        height: 96,
                        width: 96,
                      }}
                      alt={product.name}
                      src={`${process.env.REACT_APP_ASSETS_URL ?? ''}/${product.image}`}
                    />
                  </TableCell>
                  <TableCell>{product.articleNumber}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </CardContent>
    </Card>
  );
}

export default ProductList;