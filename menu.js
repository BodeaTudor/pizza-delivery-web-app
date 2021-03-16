window.Delivery = {
    API_BASE_URL: "http://localhost:8086",

    getPizzas: function () {
        $.ajax({
            url: Delivery.API_BASE_URL + "/pizzas",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Delivery.displayPizzas(response.content);
        })
    },

    displayPizzas: function (pizzas) {

        var dynamicHtml = "";

        pizzas.forEach(pizza => dynamicHtml += Delivery.getPizzaHtml(pizza));

        $(".tab-content .row").html(dynamicHtml);

    },

    getPizzaHtml: function (pizza) {
        return `<div class="col-md-4 text-center">
                                        <div class="menu-wrap">
                                            <a class="menu-img img mb-4"
                                               style="background-image: url(${pizza.imagePath});"></a>
                                            <div class="text">
                                                <h3>${pizza.name}</h3>
                                                <p>${pizza.ingredients}</p>
                                                <p class="price"><span>$${pizza.price}.00</span></p>
                                                <p><a href="#" class="btn btn-white btn-outline-white" data-pizza_id="${pizza.id}">Add to cart</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>`
    },

};
Delivery.getPizzas();