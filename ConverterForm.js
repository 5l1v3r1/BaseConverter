/**
 * Source code for driving the HTML base converter.
 */

function converterFormError(errorStr) {
    $('#conversion-result').html('<span class="error">' + errorStr + '</span>');
}

function converterFormNumber(result) {
    $('#conversion-result').html('<span class="answer">Result: ' + result + '</span>');
}

function converterFormRun() {
    var inputStr = $('#number-input').val();
    var sourceBase = Baseless[$('#source-base').val()];
    var destBase = Baseless[$('#dest-base').val()];
    var decimalCount = parseInt($('#decimal-count').val());
    
    // this error should never happen, but we check nonetheless
    if (!sourceBase || !destBase) {
        return converterFormError('Invalid source or destination base');
    }
    
    // this should never happen either: NaN decimal count
    if (isNaN(decimalCount)) {
        return converterFormError('Invalid decimal count type');
    }
    
    try {
        // input base str -> number object -> output base str
        var number = Baseless.parse(inputStr, sourceBase);
        var converter = new Baseless(destBase, number, decimalCount);
        var result = converter.toString();
        converterFormNumber(result);
    } catch (e) {
        converterFormError(e);
    }
}

function converterFormSwap() {
    var sourceVal = $('#source-base').val();
    $('#source-base').val($('#dest-base').val());
    $('#dest-base').val(sourceVal);
    converterFormRun();
}

$(function() {
    $('#number-input').change(converterFormRun);
    $('#number-input').on('input', converterFormRun);
    $('#source-base').change(converterFormRun);
    $('#dest-base').change(converterFormRun);
    $('#decimal-count').change(converterFormRun);
});
