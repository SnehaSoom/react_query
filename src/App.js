import React, {useState} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const queryClient = new QueryClient();

function App() {

  const [addProduct, setAddProduct] = useState([])
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Demo</h1>
        <AddProductForm responseData={(data)=> setAddProduct([data])}/>
        <ProductList addProduct={addProduct} />
        
      </div>
    </QueryClientProvider>
  );
}

export default App;
