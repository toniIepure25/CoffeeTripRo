module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, name) {
        var storedItem = this.items[name];
        if(!storedItem) {
            storedItem = this.items[name] = { item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.remove = function(item, name) {
        
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.item) {
            arr.push(this.items[name]);
        }
        return arr;
    }
};