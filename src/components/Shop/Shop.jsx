import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

  const [currentPage,setCurrentPges]=useState(0)
    const [iteamsPerPage,setIteamPerpage]=useState(10)
    const {count}=useLoaderData() 
    const iteamPerPage=10;
    const numberOfPages=Math.ceil(count/iteamsPerPage);

    /**1
     * dy vabe kora jabe 1step 
     * */
    // const pages=[];
    // for(let i=0;i<numberOfPages;i++){
    //     pages.push(i)
    // }

    const pages=[...Array(numberOfPages).keys()]
    console.log(pages)
    /**
     * 1.Done 1: get the total number of products
     * 2.Done 2: number of iteams perpage
     * Toop 3:get the currient page
     */
    useEffect(() => {
        fetch(`http://localhost:5000/products?pages=${currentPage}&size=${iteamPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage,iteamPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handeliteamPerPage=e=>{
        console.log(e.target.value)
        const val=parseInt(e.target.value)
        setIteamPerpage(val)
        setCurrentPges(0)
    }

    const handelprevious=()=>{
        if(currentPage>0){
            setCurrentPges(currentPage-1)
        }
    }

    const handelNaext=()=>{
        if(currentPage<pages.length -1){
            setCurrentPges(currentPage + 1)
        }
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className='pagenation text-center '>
                <p>currentPage: {currentPage}</p>
                <button onClick={handelprevious}>previous</button>
                {
                    pages.map(page=><button
                        className={currentPage === page? ' bg-yellow-500':undefined}
                        onClick={()=>setCurrentPges(page)}
                        key={page}>{page}</button>)
                }
                <button onClick={handelNaext}>Next</button>
                <select value={iteamPerPage}  onChange={handeliteamPerPage} name="" id="">

                    <option value="5">5</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;