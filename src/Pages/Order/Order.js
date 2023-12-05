import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Order = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetch(`https://67-genius-car-server.vercel.app/orders?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logOut();
                }
                return res.json()
            })
            .then(data => setOrders(data))


    }, [user?.email])

    const handleDelete = _id => {
        const confirm = window.confirm('Are you sure want to delete this service')
        if (confirm) {
            fetch(`https://67-genius-car-server.vercel.app/orders/${_id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('delete successfully ')
                        const remaining = orders.filter(order => order._id !== _id)
                        setOrders(remaining);
                    }
                })
        }
    }

    const handleStatusUpdate = _id => {
        fetch(`https://67-genius-car-server.vercel.app/orders/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'appoved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== _id)
                    const approving = orders.find(odr => odr._id === _id)
                    approving.status = 'approve'
                    const newOrder = [...remaining, approving]
                    setOrders(newOrder);
                }
            })
    }

    return (
        <div>
            <h3>you have {orders.length}</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;