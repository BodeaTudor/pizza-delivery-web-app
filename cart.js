$('.visibility-cart').on('click', function () {

    var $btn = $(this);
    var $cart = $('.cart');
    console.log($btn);

    if ($btn.hasClass('is-open')) {
        $btn.removeClass('is-open');
        $btn.text('O')
        $cart.removeClass('is-open');
        $cart.addClass('is-closed');
        $btn.addClass('is-closed');
    } else {
        $btn.addClass('is-open');
        $btn.text('X')
        $cart.addClass('is-open');
        $cart.removeClass('is-closed');
        $btn.removeClass('is-closed');
    }


});

// SHOPPING CART PLUS OR MINUS
$('a.qty-minus').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

    $input.val(value);

});

$('a.qty-plus').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
        value = value + 1;
    } else {
        value = 100;
    }

    $input.val(value);
});

// RESTRICT INPUTS TO NUMBERS ONLY WITH A MIN OF 0 AND A MAX 100
$('input').on('blur', function () {

    var input = $(this);
    var value = parseInt($(this).val());

    if (value < 0 || isNaN(value)) {
        input.val(0);
    } else if
    (value > 100) {
        input.val(100);
    }
});

window.Cart = {

    API_BASE_URL: "http://localhost:8086",

    getPizzas: function () {
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + 1,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            Cart.displayPizzas(response.pizzas);
        })
    },

    displayPizzas: function (pizzas) {

        var dynamicHtml = "";

        pizzas.forEach(pizza => dynamicHtml += Cart.getPizzaHtml(pizza));

        $(".cart .td").html(dynamicHtml);

    },

    getPizzaHtml: function (pizza) {

        return `    
                <div class="layout-inline row">
                
                <div class="col col-pro layout-inline">
                    <h2>${pizza.name}</h2>
                    <p>${pizza.ingredients}</p>
                    <h1><a href="#" class="delete-item fa fa-trash"></a></h1>
                </div>

                <div class="col col-price col-numeric align-center ">
                    <p>$${pizza.price}</p>
                </div>

                <div class="col col-qty layout-inline" >
                    <a href="#" class="qty qty-minus">-</a>
                    <input type="number" value="${pizza.quantity}"/>
                    <a href="#" class="qty qty-plus">+</a>
                </div>


                <div class="col col-total col-numeric"><p>$${pizza.price}</p>
                </div>
                </div>`

    },

};
Cart.getPizzas();
