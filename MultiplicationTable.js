/**
 * Source code which drives the multiplication <table>
 */

function multiplicationTableColor(i, j) {
    var colors = ['#FFF', '#DDD', '#CCC'];
    return colors[i % 2 + j % 2];
}

function multiplicationTableRun() {
    // empty out the table
    $('#multiplication-table').html('');
    var baseVal = Baseless[$('#table-base').val()];
    
    // this error will never happen so why bother
    if (!baseVal) return;
    
    var row1 = $('<tr>');
    row1.append($('<th>'));
    for (var i = 1; i < baseVal.length; i++) {
        var bgColor = multiplicationTableColor(i, 0);
        row1.append($('<th>', {text: baseVal[i],
                               style: 'background-color: ' + bgColor}));
    }
    $('#multiplication-table').append(row1);
    
    for (var i = 1; i < baseVal.length; i++) {
        var row = $('<tr>');
        var headerBg = multiplicationTableColor(0, i);
        row.append($('<th>', {text: baseVal[i],
                              style: 'background-color: ' + headerBg}));
        for (var j = 1; j < baseVal.length; j++) {
            var product = i * j;
            var cellVal = (new Baseless(baseVal, product)).toString();
            var bgColor = multiplicationTableColor(i, j);
            row.append($('<td>', {text: cellVal, align: 'center',
                                  style: 'background-color: ' + bgColor}));
        }
        $('#multiplication-table').append(row);
    }
}

$(function() {
    multiplicationTableRun();
    $('#table-base').change(multiplicationTableRun);
})