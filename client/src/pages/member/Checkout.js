import React, { useEffect, useState, useContext } from 'react';
import payment from 'assets/payment.svg';
import { useSelector } from 'react-redux';
import { AiFillPlayCircle } from 'react-icons/ai';

import { formatMoney } from 'ultils/helpers';
import { Congrat, InputForm, Paypal } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import { getCurrent } from 'store/user/asyncActions';
import { TransactionContext } from './TransactionContext';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Loader = () => (
    <div className="flex justify-center items-center py-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-700" />
    </div>
);

const Checkout = ({ dispatch, navigate }) => {
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } =
        useContext(TransactionContext);
    const { currentCart, current } = useSelector((state) => state.user);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) dispatch(getCurrent());
    }, [isSuccess]);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    };

    return (
        <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
            {isSuccess && <Congrat />}
            <div className="w-full flex justify-center items-center col-span-4">
                <img src={payment} alt="payment" className="h-[70%] object-contain" />
            </div>
            <div className="flex w-full flex-col justify-center col-span-6 gap-6">
                <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
                <div className="flex w-full gap-6">
                    <div className="flex-1">
                        <table className="w-full table-auto h-fit">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="p-2 text-left">Products</th>
                                    <th className="text-center p-2">Quantity</th>
                                    <th className="text-right p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart?.map((el) => (
                                    <tr className="border" key={el._id}>
                                        <td className="text-left p-2">{el.title}</td>
                                        <td className="text-center p-2">{el.quantity}</td>
                                        <td className="text-right p-2">{formatMoney(el.price) + ' ETH'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism mt-5">
                            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    Send now
                                </button>
                            )}
                        </div>
                        {!currentAccount && (
                            <button
                                type="button"
                                onClick={connectWallet}
                                className="w-full flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                            >
                                <AiFillPlayCircle className="text-white mr-2" />
                                <p className="text-white text-base font-semibold">Connect Wallet</p>
                            </button>
                        )}
                    </div>
                    {/* <div className="flex flex-col gap-6">
                        <span className="flex items-center gap-8 text-sm">
                            <span className="font-medium">Subtotal:</span>
                            <span className="text-main font-bold">{`${formatMoney(
                                currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
                            )} ETH`}</span>
                        </span>
                        <span className="flex items-center gap-8 text-sm">
                            <span className="font-medium">Address:</span>
                            <span className="text-main font-bold">{current?.address}</span>
                        </span>
                    </div> */}
                    <div className="flex-1 flex flex-col gap-6">
                        <span className="flex items-center gap-8 text-sm">
                            <span className="font-medium">Subtotal:</span>
                            <span className="text-main font-bold">{`${formatMoney(
                                currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
                            )} ETH`}</span>
                        </span>
                        <span className="flex items-center gap-8 text-sm">
                            <span className="font-medium">Address:</span>
                            <span className="text-main font-bold">{current?.address}</span>
                        </span>
                        <div className="w-full mx-auto mt-4">
                            <Paypal
                                payload={{
                                    products: currentCart,
                                    total: Math.round(
                                        +currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500,
                                    ),
                                    address: current?.address,
                                }}
                                setIsSuccess={setIsSuccess}
                                amount={Math.round(
                                    +currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500,
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(Checkout);
