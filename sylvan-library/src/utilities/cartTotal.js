export default function cartTotal(cart) {
    //this should take the cart and generate a rounded sum of all of the values that are currently in the cart.

    let total = 0

    let expandedCart = [...cart]

    //loop through the basket and total up all of the prices
    expandedCart.forEach((item) => {
        total += item.current_price
    })

    //then round the prices to actual pennies because javascript
    //I am intentionally rounding here so low value items are never free to steal.
    let roundedTotal = Math.round(total * 100) /100

    return roundedTotal
}