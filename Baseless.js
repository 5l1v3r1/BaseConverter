function Baseless(digits, number, decimals) {
    if (typeof digits != 'object' || typeof number != 'number') {
        throw 'Invalid argument types';
    }
    if (!(digits instanceof Array)) {
        throw 'Invalid digits argument';
    }
    if (decimals && typeof decimals != 'number') {
        throw 'Invalid decimals argument';
    }
    this.digits = digits;
    this.number = number;
    this.decimals = typeof decimals == 'number' ? decimals : 5;
}

Baseless.prototype.toString = function() {
    // create a string out of the number
    if (Math.round(this.number) == this.number) {
        return this.toIntString();
    } else {
        return this.toFloatString();
    }
}

Baseless.prototype.toFloatString = function() {
    if (!this.decimals) return this.toIntString(true);
    
    var value = this.toIntString();
    var smallValue = this.number - Math.floor(this.number);
    smallValue *= Math.pow(this.digits.length, this.decimals);
    smallValue = Math.round(smallValue);
    var nextBaseless = new Baseless(this.digits, smallValue);
    var smallString = nextBaseless.toIntString();
    
    while (smallString.length < this.decimals) {
        smallString = this.digits[0] + smallString;
    }
    
    return value + '.' + smallString;
}

Baseless.prototype.toIntString = function(round) {
    var value = '';
    var base = this.digits.length;
    var number = round ? Math.round(this.number) : Math.floor(this.number);
    
    // keep appending significant digits
    while (number > 0) {
        var nextDig = number % base;
        number = Math.floor(number / base);
        value = this.digits[nextDig] + value;
    }
    
    return value ? value : this.digits[0];
}

Baseless.BIN_PLACES = ['0', '1'];
Baseless.OCT_PLACES = ['0', '1', '2', '3', '4', '5', '6', '7'];
Baseless.DEC_PLACES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
Baseless.HEX_PLACES = Baseless.DEC_PLACES.concat(['a', 'b', 'c', 'd', 'e', 'f']);

Baseless.parse = function(str, digits) {
    if (typeof str != 'string') throw 'Invalid type for str';
    if (typeof digits != 'object') throw 'Invalid type for digits';
    if (!(digits instanceof Array)) throw 'Invalid type for digits';
    
    // parse the string here
    var components = str.split('.');
    if (components.length == 1) {
        return Baseless.parseInt(str, digits);
    } else if (components.length == 2) {
        return Baseless.parseFloat(components, digits);
    } else {
        throw 'Too many decimals';
    }
}

Baseless.parseInt = function(str, digits) {
    var place = 1;
    var value = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        var aChar = str[i];
        var indexValue = digits.indexOf(aChar);
        if (indexValue < 0) throw 'Invalid character: ' + aChar;
        value += place * indexValue;
        place *= digits.length;
    }
    return value;
}

Baseless.parseFloat = function(comps, digits) {
    var intValue = Baseless.parseInt(comps[0], digits);
    var decValue = Baseless.parseInt(comps[1], digits);
    // divide decValue accordingly
    decValue /= Math.pow(digits.length, comps[1].length);
    return intValue + decValue;
}
