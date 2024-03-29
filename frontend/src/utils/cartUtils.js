export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2); // 5.123 => "5.12" => 5.12
};

export const updateCart = (state) => {
    // Calculate products price
    state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * +item.qty, 0)
    );

    // Calculate shipping price
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

    // Calculate tax price
    state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};
