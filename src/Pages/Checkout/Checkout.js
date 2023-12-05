import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        console.log('click')
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        console.log(name, email, phone, message)

        const order = {
            service: _id,
            servicName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        console.log(order)

        fetch('https://67-genius-car-server.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('succesfully placed')
                    form.reset();
                }
            })
            .catch(error => console.log(error))
    }



    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h3 className=' text-4xl'>your order {title}</h3>
                <h4 className=' text-xl'>{price}</h4>
                <div className=' grid grid-col-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First name" className=" input-bordered input input-ghost w-full" />
                    <input name='lastName' type="text" placeholder="last name" className="input     input-bordered input-ghost w-full " />
                    <input name='phone' type="text" placeholder="your phone" className="input  input-bordered input-ghost w-full " />
                    <input name='email' type="text" defaultValue={user?.email} placeholder="your email" readOnly className="input  input-bordered input-ghost w-full " />
                </div>
                <textarea name='message' className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                <input type="submit" className='btn' value='Place your order' />
            </form>
        </div>
    );
};

export default Checkout;