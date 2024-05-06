import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"


type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number)=> number
    increaseItemQuantity: (id: number)=> void
    decreaseItemQuantity: (id: number)=> void
    removeFromCart: (id: number)=> void
    cartQuantity: number
    cartItems: CartItem[]
}
type CartItem = {
    id: number,
    quantity: number
  }

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppiongCart(){
    return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
      )
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function increaseItemQuantity(id: number){
        setCartItems(curritems => {
               if(curritems.find(item => item.id === id) == null ){
                    return [...curritems, { id: id, quantity: 1 }]
               }else {
                    return curritems.map(item => {
                        if(item.id === id) {
                            return { ...item, quantity: item.quantity + 1 }
                        }else {
                            return item;
                        }
                    })
               }
            } 
        )
    }

    function decreaseItemQuantity(id: number){
        setCartItems(curritems => {
               if(curritems.find(item => item.id === id)?.quantity === 1 ){
                    return curritems.filter(item => item.id !== id )
               }else {
                    return curritems.map(item => {
                        if(item.id === id) {
                            return { ...item, quantity: item.quantity - 1 }
                        }else {
                            return item;
                        }
                    })
               }
            } 
        )
    }
    function removeFromCart(id: number) {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
      }


    return (
        <ShoppingCartContext.Provider 
            
            value={{ 
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}