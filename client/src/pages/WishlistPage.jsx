import React from 'react';
import { useCart } from '../context/wishlist';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const WishlistPage = ({sidebar}) => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // total price
    

    // DELETE ITEMS FROM CART
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem(`cart-${auth?.user?.id}`, JSON.stringify(myCart)); // Use user ID as part of the key
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Sidebar sidebar={sidebar}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length ? `You Have ${cart.length} Places in your Wishlist ${auth?.token ? "" : "Please login  to edit"}` : "Your wishlist is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            {cart?.map((p, index) => (
                                <div key={p._id} className="col-md-6 mb-2" style={{ width: '50%' }}>
                                    <div className="card" style={{ border: '1px solid #ccc', borderRadius: '5px',  padding: '10px', height: '100%', backgroundColor: 'white' }}>
                                        <div className="card-body">
                                            <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} alt={p.name} style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                                            <h5 className="card-title" style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' }}>{p.name}</h5>
                                            <p className="card-text" style={{ fontSize: '14px', marginBottom: '10px' }}>{p.description.substring(0, 300)}</p>
                                            <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishlistPage;
