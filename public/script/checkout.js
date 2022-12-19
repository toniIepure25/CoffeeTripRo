Stripe.setPublishableKey('sk_test_51MGjHSAlBECR2BsEbsm4TfHLXDF9wSqxFneFW0Cbgmdl6rf3mrWAIqEaOiiqmRFtoJBPbM1eTsZMttkBYbP7rHnR00lMdAsud0');

var $form = $('#checkout-form');

$form.submit(function(event) {
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-nr').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expm').val(),
        exp_year: $('#card-expy').val(),
        name: $('#card-name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if(response.error) {
        console.log(response.error);
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    } else {
        var token = response.id;

        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        $form.get(0).submit();
    }

}