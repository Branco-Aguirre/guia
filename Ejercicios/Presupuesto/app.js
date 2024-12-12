import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    res.render('index', { products });
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).send('Error al obtener los productos.');
  }
});

app.get('/budget', async (req, res) => {
  const selectedIds = req.query.products || [];
  const selectedIdsArray = Array.isArray(selectedIds) ? selectedIds.map(Number) : [Number(selectedIds)];

  try {
    const response = await axios.get('https://dummyjson.com/products');
    const allProducts = response.data.products;

    const selectedProducts = allProducts.filter(product => selectedIdsArray.includes(product.id));

    const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);

    res.render('budget', { selectedProducts, total });
  } catch (error) {
    console.error('Error al generar el presupuesto:', error.message);
    res.status(500).send('Error al generar el presupuesto.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
