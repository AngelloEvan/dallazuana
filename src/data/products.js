// src/data/products.js

// --- Importe suas imagens locais aqui ---
import briagadeiro from '../assets/img/brigadeiro.jpeg'; 
import brigadeiroBranco from '../assets/img/brigadeiroBranco.jpeg';  
import camarao from '../assets/img/camarao.jpeg'; 
import calabresa from '../assets/img/calabresa.jpeg'; 
import carneSeca from '../assets/img/carneSeca.jpeg';
import frangoPalmito from '../assets/img/frangoPalmito.jpeg';

// Adicione mais imports para cada imagem de produto que você tiver!

const products = [
  {
    id: 1,
    name: 'Empadinha de Brigadeiro',
    price: 'R$ 5,00',
    imageUrl: briagadeiro,
    description: 'feita com cacau.',
    featured: true,
    category: 'doce',
  },
  {
    id: 2,
    name: 'Empadinha de Brigadeiro Branco',
    price: 'R$ 5,00',
    imageUrl: brigadeiroBranco,
    description: 'feita com chocolate branco.',
    featured: true,
    category: 'doce',
  },
  {
    id: 3,
    name: 'Empadinha de camarão',
    price: 'R$ 5,00',
    imageUrl: camarao,
    description: 'feita com camarão rose.',
    featured: true,
    category: 'salgado',
  },
  {
    id: 4,
    name: 'Empadinha de calabresa',
    price: 'R$ 5,00',
    imageUrl: calabresa,
    description: 'feita com camarão rose.',
    category: 'salgado',
  },
  {
    id: 5,
    name: 'Empadinha de carneSeca',
    price: 'R$ 5,00',
    imageUrl: carneSeca,
    description: 'feita com carne seca desfiada.',
    category: 'salgado',
  },
  {
    id: 6,
    name: 'Empadinha de frangoPalmito',
    price: 'R$ 5,00',
    imageUrl: frangoPalmito,
    description: 'feita com palmitos selecionados.',
    category: 'salgado',
  },
  
  // Adicione mais produtos conforme necessário
];

export default products;