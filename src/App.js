import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Demo</h1>
        <AddProductForm />
        <ProductList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
