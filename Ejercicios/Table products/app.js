import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('https://dummyjson.com/products');
    const products = data.products.map(({ title, description, price }) => ({
      title,
      description,
      price,
    }));
    res.render('index', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching product data.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
