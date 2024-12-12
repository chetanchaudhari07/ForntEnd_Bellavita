import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../store/action';
import { useForm } from 'react-hook-form';


function UserProfile() {
    const dispatch = useDispatch();
    const { addresses = [] } = useSelector((state) => state.root.addressReducer);
    const [editAddress, setEditAddress] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    const handleAddAddress = (data) => {
        if (!data) {
            console.error('Address data is undefined');
            return;
        }
        dispatch(addAddress(data));
        reset();
    };

    const handleEditAddress = (address) => {
        setEditAddress(address);
        reset(address); // Pre-fill form with the existing address data
    };

    const handleUpdateAddress = (data) => {
        dispatch(updateAddress(editAddress._id, data));
        setEditAddress(null); // Clear the editing mode
        reset();
    };



    const handleDeleteAddress = (addressId) => {
        dispatch(deleteAddress(addressId));
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">User Profile</h1>

            <div className="border-b pb-5 mb-5">
                <h2 className="text-xl font-semibold mb-3">Manage Addresses</h2>
                <form
                    onSubmit={editAddress ? handleSubmit(handleUpdateAddress) : handleSubmit(handleAddAddress)}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        {...register("address_line", { required: true })}
                        placeholder="Address Line"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("city", { required: true })}
                        placeholder="City"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("state", { required: true })}
                        placeholder="State"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("pincode", { required: true })}
                        placeholder="Pincode"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("country", { required: true })}
                        placeholder="Country"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("mobile", { required: true })}
                        placeholder="Mobile"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded"
                    >
                        {editAddress ? "Update Address" : "Add Address"}
                    </button>
                </form>
            </div>

            <div>
                <h3 className="text-xl font-semibold">Your Addresses</h3>
                <div className="space-y-4">
                    { Array.isArray(addresses) &&  addresses.map((address) => (
                        <div key={address._id} className="border p-4 rounded">
                            <p>{address.address_line}, {address.city}, {address.state}, {address.pincode}, {address.country}</p>
                            <p>Mobile: {address.mobile}</p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => handleEditAddress(address)}
                                    className="text-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteAddress(address._id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;