import useRazorpay from "react-razorpay";
import { useDispatch } from "react-redux";
import { createOrder, verifyPayment } from "../../features/payments/paymentActions";


const Checkout = () => {
    const [Razorpay] = useRazorpay();
    const dispatch = useDispatch();

    const handleRazorpayPayment = async () => {
        const order = await dispatch(createOrder(['seminar', 'sector_assessment'])).unwrap();
        const options: RazorpayOptions = {
            key: "rzp_test_Gdv3pkoaEb6qHc",
            amount: "3000",
            currency: "INR",
            name: "Career Voyager",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.razorpay_order_id,
            handler: (res) => {
                dispatch(verifyPayment(res));
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    };

    return (
        <button id="RazorPay_Payment" onClick={handleRazorpayPayment}>Pay</button>
    );
}

export default Checkout;