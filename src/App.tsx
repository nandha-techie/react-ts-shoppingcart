import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {

  const Layout = ()=>{
    return(
        <ShoppingCartProvider>
          <Navbar />
          <Outlet></Outlet>
        </ShoppingCartProvider>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children : [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/store',
          element: <Store />
        },
        {
          path: '/about',
          element: <About />
        }
      ]
    }     
  ],
  {
    basename: "/react-ts-shoppingcart",
  }
  );

    return <RouterProvider router={router} />
}

export default App
