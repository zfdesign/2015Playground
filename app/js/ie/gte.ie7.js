/* IE7 and greater only */
var app = app || {};

/*
 * Form attribute polyfill
 */
app.formAttrPoly = (function (e) {
    $.each($('form'), function() {
        $(this).on('submit', function () {
           if ($(this).attr('id').length > 0) {
               var $form = $(this);
               var formId = $form.attr('id');
               var $inputs = $('input[form=' + formId + ']');
               if ($inputs.length > 0) {
                   $.each($inputs, function() {
                       $form.append($(this));
                   });
               }
               $form.submit();
           } else {
               $(this).submit();
           }
        });
    });
}());