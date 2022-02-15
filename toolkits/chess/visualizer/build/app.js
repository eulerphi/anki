(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aA.W === region.aO.W)
	{
		return 'on line ' + region.aA.W;
	}
	return 'on lines ' + region.aA.W + ' through ' + region.aO.W;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bA,
		impl.bM,
		impl.bK,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		y: func(record.y),
		aD: record.aD,
		aw: record.aw
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.y;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aD;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aw) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bA,
		impl.bM,
		impl.bK,
		function(sendToApp, initialModel) {
			var view = impl.bN;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bA,
		impl.bM,
		impl.bK,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ay && impl.ay(sendToApp)
			var view = impl.bN;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bq);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bL) && (_VirtualDom_doc.title = title = doc.bL);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bE;
	var onUrlRequest = impl.bF;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ay: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a7 === next.a7
							&& curr.aV === next.aV
							&& curr.a3.a === next.a3.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bA: function(flags)
		{
			return A3(impl.bA, flags, _Browser_getUrl(), key);
		},
		bN: impl.bN,
		bM: impl.bM,
		bK: impl.bK
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { by: 'hidden', br: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { by: 'mozHidden', br: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { by: 'msHidden', br: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { by: 'webkitHidden', br: 'webkitvisibilitychange' }
		: { by: 'hidden', br: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		be: _Browser_getScene(),
		bO: {
			aG: _Browser_window.pageXOffset,
			aH: _Browser_window.pageYOffset,
			bP: _Browser_doc.documentElement.clientWidth,
			am: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bP: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		am: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			be: {
				bP: node.scrollWidth,
				am: node.scrollHeight
			},
			bO: {
				aG: node.scrollLeft,
				aH: node.scrollTop,
				bP: node.clientWidth,
				am: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			be: _Browser_getScene(),
			bO: {
				aG: x,
				aH: y,
				bP: _Browser_doc.documentElement.clientWidth,
				am: _Browser_doc.documentElement.clientHeight
			},
			bv: {
				aG: x + rect.left,
				aH: y + rect.top,
				bP: rect.width,
				am: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.d) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.g);
		} else {
			var treeLen = builder.d * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.d);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.g);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{i: nodeList, d: (len / $elm$core$Array$branchFactor) | 0, g: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aS: fragment, aV: host, a1: path, a3: port_, a7: protocol, a8: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Model$state = function (m) {
	return m.p.av;
};
var $author$project$Model$step = function (m) {
	return $author$project$Model$state(m).aB;
};
var $author$project$Model$fromModel2 = function (m) {
	return {
		R: m.R,
		S: $author$project$Model$state(m).S,
		bp: m.ag,
		an: m.an,
		a_: $author$project$Model$state(m).a_,
		ap: m.ap,
		au: m.au,
		aa: m.aa,
		ax: m.ax,
		ab: m.ab,
		aB: $elm$core$Maybe$Just(
			$author$project$Model$step(m)),
		bh: m.bh,
		bl: m.bl
	};
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Input$RawInput = F8(
	function (answer, arrows, devicePixelRatio, fen, moves, prevMoves, prompt, showAnswer) {
		return {R: answer, S: arrows, T: devicePixelRatio, U: fen, X: moves, _: prevMoves, aa: prompt, ab: showAnswer};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Input$decoder = A9(
	$elm$json$Json$Decode$map8,
	$author$project$Input$RawInput,
	A2($elm$json$Json$Decode$field, 'answer', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'arrows', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'devicePixelRatio', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'fen', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'moves', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'prevMoves', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'prompt', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'showAnswer', $elm$json$Json$Decode$bool));
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Input$parseMoves = function (str) {
	return A2(
		$elm$core$List$filter,
		A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
		A2($elm$core$String$split, ' ', str));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Input$unencode = function (str) {
	return A3($elm$core$String$replace, '\\n', '\n', str);
};
var $author$project$Input$decode = function (value) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$Input$decoder, value);
	if (!_v0.$) {
		var input = _v0.a;
		return {
			R: $author$project$Input$unencode(input.R),
			S: input.S,
			T: input.T,
			U: input.U,
			X: $author$project$Input$parseMoves(input.X),
			_: $author$project$Input$parseMoves(input._),
			aa: $author$project$Input$unencode(input.aa),
			ab: input.ab
		};
	} else {
		return {R: '', S: '', T: 1.0, U: '', X: _List_Nil, _: _List_Nil, aa: '<Input-Malformed>', ab: false};
	}
};
var $author$project$Types$Moving = 2;
var $author$project$Types$ViewCtxMsg = function (a) {
	return {$: 11, a: a};
};
var $elm_community$undo_redo$UndoList$UndoList = F3(
	function (past, present, future) {
		return {h: future, f: past, av: present};
	});
var $elm_community$undo_redo$UndoList$fresh = function (state) {
	return A3($elm_community$undo_redo$UndoList$UndoList, _List_Nil, state, _List_Nil);
};
var $romstad$elm_chess$Internal$Position$Position = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$SquareFile$SquareFile = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$BoardDimensions$fileCount = 8;
var $romstad$elm_chess$Internal$BoardDimensions$fileMin = 1;
var $romstad$elm_chess$Internal$BoardDimensions$fileMax = ($romstad$elm_chess$Internal$BoardDimensions$fileMin + $romstad$elm_chess$Internal$BoardDimensions$fileCount) - 1;
var $romstad$elm_chess$Internal$SquareFile$all = A2(
	$elm$core$List$map,
	$elm$core$Basics$identity,
	A2($elm$core$List$range, $romstad$elm_chess$Internal$BoardDimensions$fileMin, $romstad$elm_chess$Internal$BoardDimensions$fileMax));
var $romstad$elm_chess$Internal$SquareRank$SquareRank = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$BoardDimensions$rankCount = 8;
var $romstad$elm_chess$Internal$BoardDimensions$rankMin = 2;
var $romstad$elm_chess$Internal$BoardDimensions$rankMax = ($romstad$elm_chess$Internal$BoardDimensions$rankMin + $romstad$elm_chess$Internal$BoardDimensions$rankCount) - 1;
var $romstad$elm_chess$Internal$SquareRank$all = A2(
	$elm$core$List$map,
	$elm$core$Basics$identity,
	A2($elm$core$List$range, $romstad$elm_chess$Internal$BoardDimensions$rankMin, $romstad$elm_chess$Internal$BoardDimensions$rankMax));
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $romstad$elm_chess$Internal$Square$Square = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount = (2 * $romstad$elm_chess$Internal$BoardDimensions$fileCount) - 1;
var $romstad$elm_chess$Internal$SquareFile$unwrap = function (file) {
	var file_ = file;
	return file_;
};
var $romstad$elm_chess$Internal$SquareRank$unwrap = function (rank) {
	var rank_ = rank;
	return rank_;
};
var $romstad$elm_chess$Internal$Square$make = F2(
	function (file_, rank_) {
		return $romstad$elm_chess$Internal$SquareFile$unwrap(file_) + ($romstad$elm_chess$Internal$SquareRank$unwrap(rank_) * $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount);
	});
var $romstad$elm_chess$Internal$Square$all = A2(
	$elm$core$List$concatMap,
	function (f) {
		return A2(
			$elm$core$List$map,
			$romstad$elm_chess$Internal$Square$make(f),
			$romstad$elm_chess$Internal$SquareRank$all);
	},
	$romstad$elm_chess$Internal$SquareFile$all);
var $romstad$elm_chess$Internal$PieceColor$PieceColor = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$PieceColor$black = 1;
var $romstad$elm_chess$Internal$PieceType$PieceType = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$PieceType$king = 6;
var $romstad$elm_chess$Internal$Piece$Piece = $elm$core$Basics$identity;
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $romstad$elm_chess$Internal$PieceColor$unwrap = function (color) {
	var color_ = color;
	return color_;
};
var $romstad$elm_chess$Internal$PieceType$unwrap = function (kind) {
	var kind_ = kind;
	return kind_;
};
var $romstad$elm_chess$Internal$Piece$make = F2(
	function (color_, kind_) {
		return ($romstad$elm_chess$Internal$PieceColor$unwrap(color_) << 3) | $romstad$elm_chess$Internal$PieceType$unwrap(kind_);
	});
var $romstad$elm_chess$Internal$Piece$blackKing = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$king);
var $romstad$elm_chess$Internal$Board$ReadFenState = F3(
	function (board, fileIndex, rankIndex) {
		return {bp: board, D: fileIndex, ah: rankIndex};
	});
var $romstad$elm_chess$Internal$PieceColor$empty = 2;
var $romstad$elm_chess$Internal$PieceType$none = 0;
var $romstad$elm_chess$Internal$Piece$empty = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$empty, $romstad$elm_chess$Internal$PieceType$none);
var $romstad$elm_chess$Internal$BoardDimensions$extendedBoardSize = ((($romstad$elm_chess$Internal$BoardDimensions$rankCount + 3) * $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount) + $romstad$elm_chess$Internal$BoardDimensions$fileCount) + 2;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{i: nodeList, d: nodeListSize, g: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $romstad$elm_chess$Internal$PieceColor$outside = 3;
var $romstad$elm_chess$Internal$Piece$outside = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$outside, $romstad$elm_chess$Internal$PieceType$none);
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $romstad$elm_chess$Internal$Square$unwrap = function (square) {
	var square_ = square;
	return square_;
};
var $romstad$elm_chess$Internal$Board$empty = A3(
	$elm$core$List$foldl,
	F2(
		function (s, b) {
			return A3(
				$elm$core$Array$set,
				$romstad$elm_chess$Internal$Square$unwrap(s),
				$romstad$elm_chess$Internal$Piece$empty,
				b);
		}),
	$elm$core$Array$fromList(
		A2($elm$core$List$repeat, $romstad$elm_chess$Internal$BoardDimensions$extendedBoardSize, $romstad$elm_chess$Internal$Piece$outside)),
	$romstad$elm_chess$Internal$Square$all);
var $romstad$elm_chess$Internal$PieceType$bishop = 3;
var $romstad$elm_chess$Internal$PieceType$knight = 2;
var $romstad$elm_chess$Internal$PieceType$pawn = 1;
var $romstad$elm_chess$Internal$PieceType$queen = 5;
var $romstad$elm_chess$Internal$PieceType$rook = 4;
var $elm$core$Char$toUpper = _Char_toUpper;
var $romstad$elm_chess$Internal$PieceType$fromChar = function (_char) {
	var ch = $elm$core$Char$toUpper(_char);
	return (ch === 'P') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$pawn) : ((ch === 'N') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$knight) : ((ch === 'B') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$bishop) : ((ch === 'R') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$rook) : ((ch === 'Q') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$queen) : ((ch === 'K') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceType$king) : $elm$core$Maybe$Nothing)))));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $romstad$elm_chess$Internal$PieceColor$white = 0;
var $romstad$elm_chess$Internal$Piece$fromChar = function (_char) {
	return A2(
		$elm$core$Maybe$map,
		$romstad$elm_chess$Internal$Piece$make(
			$elm$core$Char$isUpper(_char) ? $romstad$elm_chess$Internal$PieceColor$white : $romstad$elm_chess$Internal$PieceColor$black),
		$romstad$elm_chess$Internal$PieceType$fromChar(_char));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $romstad$elm_chess$Internal$Square$expand = function (i) {
	var r = (i / $romstad$elm_chess$Internal$BoardDimensions$fileCount) | 0;
	var f = A2($elm$core$Basics$modBy, $romstad$elm_chess$Internal$BoardDimensions$fileCount, i);
	return (f + $romstad$elm_chess$Internal$BoardDimensions$fileMin) + ((r + $romstad$elm_chess$Internal$BoardDimensions$rankMin) * $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount);
};
var $romstad$elm_chess$Internal$Board$putPiece = F2(
	function (piece, square) {
		return A2(
			$elm$core$Array$set,
			$romstad$elm_chess$Internal$Square$unwrap(square),
			piece);
	});
var $romstad$elm_chess$Internal$Board$readFenPiece = F2(
	function (piece, state) {
		return A3(
			$romstad$elm_chess$Internal$Board$putPiece,
			piece,
			$romstad$elm_chess$Internal$Square$expand(state.D + (8 * state.ah)),
			state.bp);
	});
var $romstad$elm_chess$Internal$Board$processFenChar = F2(
	function (_char, state) {
		var _v0 = $romstad$elm_chess$Internal$Piece$fromChar(_char);
		if (!_v0.$) {
			var piece = _v0.a;
			return _Utils_update(
				state,
				{
					bp: A2($romstad$elm_chess$Internal$Board$readFenPiece, piece, state),
					D: state.D + 1
				});
		} else {
			return $elm$core$Char$isDigit(_char) ? _Utils_update(
				state,
				{
					D: (state.D + $elm$core$Char$toCode(_char)) - $elm$core$Char$toCode('0')
				}) : ((_char === '/') ? _Utils_update(
				state,
				{D: 0, ah: state.ah - 1}) : state);
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $romstad$elm_chess$Internal$Board$fromFen = function (fen) {
	return function ($) {
		return $.bp;
	}(
		A3(
			$elm$core$List$foldl,
			$romstad$elm_chess$Internal$Board$processFenChar,
			A3($romstad$elm_chess$Internal$Board$ReadFenState, $romstad$elm_chess$Internal$Board$empty, 0, $romstad$elm_chess$Internal$BoardDimensions$rankCount - 1),
			$elm$core$String$toList(fen)));
};
var $romstad$elm_chess$Internal$CastleRights$CastleRights = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$CastleRights$fromChar = function (_char) {
	return (_char === 'K') ? 1 : ((_char === 'Q') ? 2 : ((_char === 'k') ? 4 : ((_char === 'q') ? 8 : 0)));
};
var $romstad$elm_chess$Internal$CastleRights$fromString = function (string) {
	return A3(
		$elm$core$List$foldl,
		$elm$core$Bitwise$or,
		0,
		A2(
			$elm$core$List$map,
			$romstad$elm_chess$Internal$CastleRights$fromChar,
			$elm$core$String$toList(string)));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $romstad$elm_chess$Internal$PieceColor$fromChar = function (_char) {
	return (_char === 'w') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceColor$white) : ((_char === 'b') ? $elm$core$Maybe$Just($romstad$elm_chess$Internal$PieceColor$black) : $elm$core$Maybe$Nothing);
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $romstad$elm_chess$Internal$PieceColor$fromString = function (string) {
	return A2(
		$elm$core$Maybe$andThen,
		$romstad$elm_chess$Internal$PieceColor$fromChar,
		$elm$core$List$head(
			$elm$core$String$toList(string)));
};
var $romstad$elm_chess$Internal$SquareFile$fromChar = function (_char) {
	var f_ = $elm$core$Char$toCode(_char) - $elm$core$Char$toCode('a');
	return ((f_ >= 0) && (_Utils_cmp(f_, $romstad$elm_chess$Internal$BoardDimensions$fileCount) < 0)) ? $elm$core$Maybe$Just(f_ + $romstad$elm_chess$Internal$BoardDimensions$fileMin) : $elm$core$Maybe$Nothing;
};
var $romstad$elm_chess$Internal$SquareFile$fromString = function (string) {
	return A2(
		$elm$core$Maybe$andThen,
		$romstad$elm_chess$Internal$SquareFile$fromChar,
		$elm$core$List$head(
			$elm$core$String$toList(string)));
};
var $romstad$elm_chess$Internal$SquareRank$fromChar = function (_char) {
	var r = $elm$core$Char$toCode(_char) - $elm$core$Char$toCode('1');
	return ((r >= 0) && (_Utils_cmp(r, $romstad$elm_chess$Internal$BoardDimensions$rankCount) < 0)) ? $elm$core$Maybe$Just(r + $romstad$elm_chess$Internal$BoardDimensions$rankMin) : $elm$core$Maybe$Nothing;
};
var $romstad$elm_chess$Internal$SquareRank$fromString = function (string) {
	return A2(
		$elm$core$Maybe$andThen,
		$romstad$elm_chess$Internal$SquareRank$fromChar,
		$elm$core$List$head(
			$elm$core$String$toList(string)));
};
var $romstad$elm_chess$Internal$Square$fromString = function (string) {
	var r = $romstad$elm_chess$Internal$SquareRank$fromString(
		A2($elm$core$String$dropLeft, 1, string));
	var f = $romstad$elm_chess$Internal$SquareFile$fromString(string);
	if (!f.$) {
		var f_ = f.a;
		return A2(
			$elm$core$Maybe$map,
			$romstad$elm_chess$Internal$Square$make(f_),
			r);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $romstad$elm_chess$Internal$Board$pieceOn = F2(
	function (square, board) {
		return A2(
			$elm$core$Maybe$withDefault,
			$romstad$elm_chess$Internal$Piece$outside,
			A2(
				$elm$core$Array$get,
				$romstad$elm_chess$Internal$Square$unwrap(square),
				board));
	});
var $romstad$elm_chess$Internal$Piece$whiteKing = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$king);
var $romstad$elm_chess$Internal$Position$fromFen = function (fen) {
	var components = $elm$core$Array$fromList(
		A2($elm$core$String$split, ' ', fen));
	var epSquare_ = $romstad$elm_chess$Internal$Square$fromString(
		A2(
			$elm$core$Maybe$withDefault,
			'-',
			A2($elm$core$Array$get, 3, components)));
	var sideToMove_ = $romstad$elm_chess$Internal$PieceColor$fromString(
		A2(
			$elm$core$Maybe$withDefault,
			'w',
			A2($elm$core$Array$get, 1, components)));
	var castleRights = $romstad$elm_chess$Internal$CastleRights$fromString(
		A2(
			$elm$core$Maybe$withDefault,
			'-',
			A2($elm$core$Array$get, 2, components)));
	var board = $romstad$elm_chess$Internal$Board$fromFen(
		A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 0, components)));
	var whiteKingSquare = $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function (s) {
				return _Utils_eq(
					A2($romstad$elm_chess$Internal$Board$pieceOn, s, board),
					$romstad$elm_chess$Internal$Piece$whiteKing);
			},
			$romstad$elm_chess$Internal$Square$all));
	var blackKingSquare = $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function (s) {
				return _Utils_eq(
					A2($romstad$elm_chess$Internal$Board$pieceOn, s, board),
					$romstad$elm_chess$Internal$Piece$blackKing);
			},
			$romstad$elm_chess$Internal$Square$all));
	return $elm$core$Maybe$Just(
		{
			w: blackKingSquare,
			bp: board,
			x: castleRights,
			N: epSquare_,
			F: 0,
			V: $elm$core$Maybe$Nothing,
			Y: $elm$core$Maybe$Nothing,
			I: 0,
			J: A2($elm$core$Maybe$withDefault, $romstad$elm_chess$Internal$PieceColor$white, sideToMove_),
			C: whiteKingSquare
		});
};
var $romstad$elm_chess$Position$fromFen = $romstad$elm_chess$Internal$Position$fromFen;
var $romstad$elm_chess$Internal$SquareDelta$unwrap = function (delta) {
	var delta_ = delta;
	return delta_;
};
var $romstad$elm_chess$Internal$Square$add = F2(
	function (square, delta_) {
		return $romstad$elm_chess$Internal$Square$unwrap(square) + $romstad$elm_chess$Internal$SquareDelta$unwrap(delta_);
	});
var $romstad$elm_chess$Internal$Piece$blackPawn = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$pawn);
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $romstad$elm_chess$Internal$Piece$unwrap = function (piece) {
	var piece_ = piece;
	return piece_;
};
var $romstad$elm_chess$Internal$Piece$color = function (piece) {
	return $romstad$elm_chess$Internal$Piece$unwrap(piece) >> 3;
};
var $romstad$elm_chess$Internal$SquareDelta$SquareDelta = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$SquareDelta$e = 1;
var $romstad$elm_chess$Internal$Square$file = function (square) {
	return A2(
		$elm$core$Basics$modBy,
		$romstad$elm_chess$Internal$BoardDimensions$extendedFileCount,
		$romstad$elm_chess$Internal$Square$unwrap(square));
};
var $romstad$elm_chess$Internal$Move$unwrap = function (move) {
	var move_ = move;
	return move_;
};
var $romstad$elm_chess$Internal$Move$from = function (move) {
	return $romstad$elm_chess$Internal$Square$expand(
		($romstad$elm_chess$Internal$Move$unwrap(move) >> 6) & 63);
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $romstad$elm_chess$Internal$Move$isEp = function (move) {
	return !(!((1 << 16) & $romstad$elm_chess$Internal$Move$unwrap(move)));
};
var $romstad$elm_chess$Internal$Move$isCastle = function (move) {
	return !(!((1 << 15) & $romstad$elm_chess$Internal$Move$unwrap(move)));
};
var $romstad$elm_chess$Internal$Move$to = function (move) {
	return $romstad$elm_chess$Internal$Square$expand(
		$romstad$elm_chess$Internal$Move$unwrap(move) & 63);
};
var $romstad$elm_chess$Internal$Move$isKingsideCastle = function (move) {
	return $romstad$elm_chess$Internal$Move$isCastle(move) && (_Utils_cmp(
		$romstad$elm_chess$Internal$Square$unwrap(
			$romstad$elm_chess$Internal$Move$from(move)),
		$romstad$elm_chess$Internal$Square$unwrap(
			$romstad$elm_chess$Internal$Move$to(move))) < 0);
};
var $romstad$elm_chess$Internal$Move$isQueensideCastle = function (move) {
	return $romstad$elm_chess$Internal$Move$isCastle(move) && (_Utils_cmp(
		$romstad$elm_chess$Internal$Square$unwrap(
			$romstad$elm_chess$Internal$Move$from(move)),
		$romstad$elm_chess$Internal$Square$unwrap(
			$romstad$elm_chess$Internal$Move$to(move))) > 0);
};
var $romstad$elm_chess$Internal$Board$removePiece = function (square) {
	return A2(
		$elm$core$Array$set,
		$romstad$elm_chess$Internal$Square$unwrap(square),
		$romstad$elm_chess$Internal$Piece$empty);
};
var $romstad$elm_chess$Internal$Board$movePiece = F3(
	function (from, to, board) {
		var piece = A2($romstad$elm_chess$Internal$Board$pieceOn, from, board);
		return A3(
			$romstad$elm_chess$Internal$Board$putPiece,
			piece,
			to,
			A2($romstad$elm_chess$Internal$Board$removePiece, from, board));
	});
var $romstad$elm_chess$Internal$SquareDelta$multiply = F2(
	function (i, delta) {
		return i * $romstad$elm_chess$Internal$SquareDelta$unwrap(delta);
	});
var $romstad$elm_chess$Internal$Move$promotion = function (move) {
	var p = ($romstad$elm_chess$Internal$Move$unwrap(move) >> 12) & 7;
	return _Utils_eq(p, $romstad$elm_chess$Internal$PieceType$none) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(p);
};
var $romstad$elm_chess$Internal$Square$rank = function (square) {
	return ($romstad$elm_chess$Internal$Square$unwrap(square) / $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount) | 0;
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $romstad$elm_chess$Internal$SquareDelta$negate = function (delta) {
	return A2($romstad$elm_chess$Internal$SquareDelta$multiply, -1, delta);
};
var $romstad$elm_chess$Internal$SquareDelta$w = $romstad$elm_chess$Internal$SquareDelta$negate($romstad$elm_chess$Internal$SquareDelta$e);
var $romstad$elm_chess$Internal$Board$doMove = F2(
	function (move, board) {
		var us = $romstad$elm_chess$Internal$Piece$color(
			A2(
				$romstad$elm_chess$Internal$Board$pieceOn,
				$romstad$elm_chess$Internal$Move$from(move),
				board));
		var to = $romstad$elm_chess$Internal$Move$to(move);
		var from = $romstad$elm_chess$Internal$Move$from(move);
		var _v0 = $romstad$elm_chess$Internal$Move$promotion(move);
		if (_v0.$ === 1) {
			if ($romstad$elm_chess$Internal$Move$isKingsideCastle(move)) {
				return A3(
					$romstad$elm_chess$Internal$Board$movePiece,
					A2($romstad$elm_chess$Internal$Square$add, to, $romstad$elm_chess$Internal$SquareDelta$e),
					A2($romstad$elm_chess$Internal$Square$add, from, $romstad$elm_chess$Internal$SquareDelta$e),
					A3($romstad$elm_chess$Internal$Board$movePiece, from, to, board));
			} else {
				if ($romstad$elm_chess$Internal$Move$isQueensideCastle(move)) {
					return A3(
						$romstad$elm_chess$Internal$Board$movePiece,
						A2(
							$romstad$elm_chess$Internal$Square$add,
							to,
							A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$w)),
						A2($romstad$elm_chess$Internal$Square$add, from, $romstad$elm_chess$Internal$SquareDelta$w),
						A3($romstad$elm_chess$Internal$Board$movePiece, from, to, board));
				} else {
					if ($romstad$elm_chess$Internal$Move$isEp(move)) {
						var toFile = $romstad$elm_chess$Internal$Square$file(to);
						var fromRank = $romstad$elm_chess$Internal$Square$rank(from);
						return A2(
							$romstad$elm_chess$Internal$Board$removePiece,
							A2($romstad$elm_chess$Internal$Square$make, toFile, fromRank),
							A3($romstad$elm_chess$Internal$Board$movePiece, from, to, board));
					} else {
						return A3($romstad$elm_chess$Internal$Board$movePiece, from, to, board);
					}
				}
			}
		} else {
			var kind = _v0.a;
			return A3(
				$romstad$elm_chess$Internal$Board$putPiece,
				A2($romstad$elm_chess$Internal$Piece$make, us, kind),
				to,
				A2($romstad$elm_chess$Internal$Board$removePiece, from, board));
		}
	});
var $romstad$elm_chess$Internal$SquareFile$a = $romstad$elm_chess$Internal$BoardDimensions$fileMin;
var $romstad$elm_chess$Internal$SquareRank$one = $romstad$elm_chess$Internal$BoardDimensions$rankMin;
var $romstad$elm_chess$Internal$Square$a1 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$a, $romstad$elm_chess$Internal$SquareRank$one);
var $romstad$elm_chess$Internal$SquareRank$eight = $romstad$elm_chess$Internal$BoardDimensions$rankMin + 7;
var $romstad$elm_chess$Internal$Square$a8 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$a, $romstad$elm_chess$Internal$SquareRank$eight);
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $romstad$elm_chess$Internal$CastleRights$unwrap = function (rights) {
	var rights_ = rights;
	return rights_;
};
var $romstad$elm_chess$Internal$CastleRights$disableKingsideCastling = F2(
	function (color, rights) {
		return $romstad$elm_chess$Internal$CastleRights$unwrap(rights) & (~(1 << (2 * $romstad$elm_chess$Internal$PieceColor$unwrap(color))));
	});
var $romstad$elm_chess$Internal$CastleRights$disableQueensideCastling = F2(
	function (color, rights) {
		return $romstad$elm_chess$Internal$CastleRights$unwrap(rights) & (~(1 << ((2 * $romstad$elm_chess$Internal$PieceColor$unwrap(color)) + 1)));
	});
var $romstad$elm_chess$Internal$CastleRights$disableAllCastling = F2(
	function (color, rights) {
		return A2(
			$romstad$elm_chess$Internal$CastleRights$disableQueensideCastling,
			color,
			A2($romstad$elm_chess$Internal$CastleRights$disableKingsideCastling, color, rights));
	});
var $romstad$elm_chess$Internal$SquareFile$e = $romstad$elm_chess$Internal$BoardDimensions$fileMin + 4;
var $romstad$elm_chess$Internal$Square$e1 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$e, $romstad$elm_chess$Internal$SquareRank$one);
var $romstad$elm_chess$Internal$Square$e8 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$e, $romstad$elm_chess$Internal$SquareRank$eight);
var $romstad$elm_chess$Internal$SquareFile$h = $romstad$elm_chess$Internal$BoardDimensions$fileMin + 7;
var $romstad$elm_chess$Internal$Square$h1 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$h, $romstad$elm_chess$Internal$SquareRank$one);
var $romstad$elm_chess$Internal$Square$h8 = A2($romstad$elm_chess$Internal$Square$make, $romstad$elm_chess$Internal$SquareFile$h, $romstad$elm_chess$Internal$SquareRank$eight);
var $romstad$elm_chess$Internal$CastleRights$doMove = F2(
	function (move, rights) {
		var to = $romstad$elm_chess$Internal$Move$to(move);
		var from = $romstad$elm_chess$Internal$Move$from(move);
		return (_Utils_eq(from, $romstad$elm_chess$Internal$Square$e8) ? $romstad$elm_chess$Internal$CastleRights$disableAllCastling($romstad$elm_chess$Internal$PieceColor$black) : $elm$core$Basics$identity)(
			(_Utils_eq(from, $romstad$elm_chess$Internal$Square$e1) ? $romstad$elm_chess$Internal$CastleRights$disableAllCastling($romstad$elm_chess$Internal$PieceColor$white) : $elm$core$Basics$identity)(
				((_Utils_eq(from, $romstad$elm_chess$Internal$Square$h8) || _Utils_eq(to, $romstad$elm_chess$Internal$Square$h8)) ? $romstad$elm_chess$Internal$CastleRights$disableKingsideCastling($romstad$elm_chess$Internal$PieceColor$black) : $elm$core$Basics$identity)(
					((_Utils_eq(from, $romstad$elm_chess$Internal$Square$h1) || _Utils_eq(to, $romstad$elm_chess$Internal$Square$h1)) ? $romstad$elm_chess$Internal$CastleRights$disableKingsideCastling($romstad$elm_chess$Internal$PieceColor$white) : $elm$core$Basics$identity)(
						((_Utils_eq(from, $romstad$elm_chess$Internal$Square$a8) || _Utils_eq(to, $romstad$elm_chess$Internal$Square$a8)) ? $romstad$elm_chess$Internal$CastleRights$disableQueensideCastling($romstad$elm_chess$Internal$PieceColor$black) : $elm$core$Basics$identity)(
							((_Utils_eq(from, $romstad$elm_chess$Internal$Square$a1) || _Utils_eq(to, $romstad$elm_chess$Internal$Square$a1)) ? $romstad$elm_chess$Internal$CastleRights$disableQueensideCastling($romstad$elm_chess$Internal$PieceColor$white) : $elm$core$Basics$identity)(rights))))));
	});
var $romstad$elm_chess$Internal$Piece$kind = function (piece) {
	return $romstad$elm_chess$Internal$Piece$unwrap(piece) & 7;
};
var $romstad$elm_chess$Internal$SquareDelta$n = $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount;
var $romstad$elm_chess$Internal$SquareDelta$add = F2(
	function (delta0, delta1) {
		return $romstad$elm_chess$Internal$SquareDelta$unwrap(delta0) + $romstad$elm_chess$Internal$SquareDelta$unwrap(delta1);
	});
var $romstad$elm_chess$Internal$SquareDelta$nn = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$n);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $romstad$elm_chess$Internal$PieceColor$opposite = A2(
	$elm$core$Basics$composeR,
	$romstad$elm_chess$Internal$PieceColor$unwrap,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$xor(1),
		$elm$core$Basics$identity));
var $romstad$elm_chess$Internal$Position$unwrap = function (pos) {
	var pos_ = pos;
	return pos_;
};
var $romstad$elm_chess$Internal$Position$pieceOn = F2(
	function (square, pos) {
		return A2(
			$romstad$elm_chess$Internal$Board$pieceOn,
			square,
			$romstad$elm_chess$Internal$Position$unwrap(pos).bp);
	});
var $romstad$elm_chess$Internal$SquareDelta$s = $romstad$elm_chess$Internal$SquareDelta$negate($romstad$elm_chess$Internal$SquareDelta$n);
var $romstad$elm_chess$Internal$SquareDelta$ss = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$s);
var $romstad$elm_chess$Internal$Square$subtract = F2(
	function (square0, square1) {
		return $romstad$elm_chess$Internal$Square$unwrap(square0) - $romstad$elm_chess$Internal$Square$unwrap(square1);
	});
var $romstad$elm_chess$Internal$Piece$whitePawn = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$pawn);
var $romstad$elm_chess$Internal$Position$doMove = F2(
	function (move, position) {
		var to = $romstad$elm_chess$Internal$Move$to(move);
		var from = $romstad$elm_chess$Internal$Move$from(move);
		var piece = A2($romstad$elm_chess$Internal$Position$pieceOn, from, position);
		var pos = position;
		return {
			w: _Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackKing) ? $elm$core$Maybe$Just(to) : pos.w,
			bp: A2($romstad$elm_chess$Internal$Board$doMove, move, pos.bp),
			x: A2($romstad$elm_chess$Internal$CastleRights$doMove, move, pos.x),
			N: (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whitePawn) && _Utils_eq(
				A2($romstad$elm_chess$Internal$Square$subtract, to, from),
				$romstad$elm_chess$Internal$SquareDelta$nn)) ? $elm$core$Maybe$Just(
				A2($romstad$elm_chess$Internal$Square$add, from, $romstad$elm_chess$Internal$SquareDelta$n)) : ((_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackPawn) && _Utils_eq(
				A2($romstad$elm_chess$Internal$Square$subtract, to, from),
				$romstad$elm_chess$Internal$SquareDelta$ss)) ? $elm$core$Maybe$Just(
				A2($romstad$elm_chess$Internal$Square$add, from, $romstad$elm_chess$Internal$SquareDelta$s)) : $elm$core$Maybe$Nothing),
			F: pos.F + 1,
			V: $elm$core$Maybe$Just(move),
			Y: $elm$core$Maybe$Just(position),
			I: (_Utils_eq(
				$romstad$elm_chess$Internal$Piece$kind(piece),
				$romstad$elm_chess$Internal$PieceType$pawn) || (!_Utils_eq(
				A2($romstad$elm_chess$Internal$Position$pieceOn, to, position),
				$romstad$elm_chess$Internal$Piece$empty))) ? 0 : (pos.I + 1),
			J: $romstad$elm_chess$Internal$PieceColor$opposite(pos.J),
			C: _Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteKing) ? $elm$core$Maybe$Just(to) : pos.C
		};
	});
var $romstad$elm_chess$Position$doMove = $romstad$elm_chess$Internal$Position$doMove;
var $elm$core$String$filter = _String_filter;
var $romstad$elm_chess$Internal$Notation$isImportantCharacter = function (ch) {
	return (ch !== 'x') && ((ch !== '=') && ((ch !== '+') && (ch !== '#')));
};
var $romstad$elm_chess$Internal$Notation$isPieceCharacter = function (ch) {
	return (ch === 'N') || ((ch === 'B') || ((ch === 'R') || ((ch === 'Q') || (ch === 'K'))));
};
var $romstad$elm_chess$Internal$Position$kingSquare = F2(
	function (color, position) {
		return _Utils_eq(color, $romstad$elm_chess$Internal$PieceColor$white) ? $romstad$elm_chess$Internal$Position$unwrap(position).C : $romstad$elm_chess$Internal$Position$unwrap(position).w;
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $romstad$elm_chess$Internal$Piece$blackBishop = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$bishop);
var $romstad$elm_chess$Internal$Piece$blackKnight = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$knight);
var $romstad$elm_chess$Internal$Piece$blackQueen = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$queen);
var $romstad$elm_chess$Internal$Piece$blackRook = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$black, $romstad$elm_chess$Internal$PieceType$rook);
var $romstad$elm_chess$Internal$SquareDelta$ne = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$e);
var $romstad$elm_chess$Internal$SquareDelta$nee = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	$romstad$elm_chess$Internal$SquareDelta$n,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$e));
var $romstad$elm_chess$Internal$SquareDelta$nne = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$n),
	$romstad$elm_chess$Internal$SquareDelta$e);
var $romstad$elm_chess$Internal$SquareDelta$nnw = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$n),
	$romstad$elm_chess$Internal$SquareDelta$w);
var $romstad$elm_chess$Internal$SquareDelta$nw = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$w);
var $romstad$elm_chess$Internal$SquareDelta$nww = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	$romstad$elm_chess$Internal$SquareDelta$n,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$w));
var $romstad$elm_chess$Internal$SquareDelta$se = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$e);
var $romstad$elm_chess$Internal$SquareDelta$see = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	$romstad$elm_chess$Internal$SquareDelta$s,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$e));
var $romstad$elm_chess$Internal$SquareDelta$sse = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$s),
	$romstad$elm_chess$Internal$SquareDelta$e);
var $romstad$elm_chess$Internal$SquareDelta$ssw = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$s),
	$romstad$elm_chess$Internal$SquareDelta$w);
var $romstad$elm_chess$Internal$SquareDelta$sw = A2($romstad$elm_chess$Internal$SquareDelta$add, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w);
var $romstad$elm_chess$Internal$SquareDelta$sww = A2(
	$romstad$elm_chess$Internal$SquareDelta$add,
	$romstad$elm_chess$Internal$SquareDelta$s,
	A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, $romstad$elm_chess$Internal$SquareDelta$w));
var $romstad$elm_chess$Internal$Piece$whiteBishop = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$bishop);
var $romstad$elm_chess$Internal$Piece$whiteKnight = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$knight);
var $romstad$elm_chess$Internal$Piece$whiteQueen = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$queen);
var $romstad$elm_chess$Internal$Piece$whiteRook = A2($romstad$elm_chess$Internal$Piece$make, $romstad$elm_chess$Internal$PieceColor$white, $romstad$elm_chess$Internal$PieceType$rook);
var $romstad$elm_chess$Internal$Piece$attackDirections = function (piece) {
	return _Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whitePawn) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteKnight) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nnw, $romstad$elm_chess$Internal$SquareDelta$nne, $romstad$elm_chess$Internal$SquareDelta$nww, $romstad$elm_chess$Internal$SquareDelta$nee, $romstad$elm_chess$Internal$SquareDelta$ssw, $romstad$elm_chess$Internal$SquareDelta$sse, $romstad$elm_chess$Internal$SquareDelta$sww, $romstad$elm_chess$Internal$SquareDelta$see]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteBishop) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteRook) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteQueen) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$whiteKing) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackPawn) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackKnight) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nnw, $romstad$elm_chess$Internal$SquareDelta$nne, $romstad$elm_chess$Internal$SquareDelta$nww, $romstad$elm_chess$Internal$SquareDelta$nee, $romstad$elm_chess$Internal$SquareDelta$ssw, $romstad$elm_chess$Internal$SquareDelta$sse, $romstad$elm_chess$Internal$SquareDelta$sww, $romstad$elm_chess$Internal$SquareDelta$see]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackBishop) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackRook) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackQueen) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : (_Utils_eq(piece, $romstad$elm_chess$Internal$Piece$blackKing) ? _List_fromArray(
		[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne, $romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se, $romstad$elm_chess$Internal$SquareDelta$n, $romstad$elm_chess$Internal$SquareDelta$s, $romstad$elm_chess$Internal$SquareDelta$w, $romstad$elm_chess$Internal$SquareDelta$e]) : _List_Nil)))))))))));
};
var $romstad$elm_chess$Internal$PieceType$isSlider = function (kind) {
	return _Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$bishop) || (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$rook) || _Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$queen));
};
var $romstad$elm_chess$Internal$Piece$isSlider = A2($elm$core$Basics$composeR, $romstad$elm_chess$Internal$Piece$kind, $romstad$elm_chess$Internal$PieceType$isSlider);
var $romstad$elm_chess$Internal$BoardDimensions$squareMax = $romstad$elm_chess$Internal$BoardDimensions$fileMax + ($romstad$elm_chess$Internal$BoardDimensions$rankMax * $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount);
var $romstad$elm_chess$Internal$BoardDimensions$squareMin = $romstad$elm_chess$Internal$BoardDimensions$fileMin + ($romstad$elm_chess$Internal$BoardDimensions$rankMin * $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount);
var $romstad$elm_chess$Internal$SquareDelta$max = $romstad$elm_chess$Internal$BoardDimensions$squareMax - $romstad$elm_chess$Internal$BoardDimensions$squareMin;
var $romstad$elm_chess$Internal$SquareFile$isOutside = function (file) {
	return (_Utils_cmp(
		$romstad$elm_chess$Internal$SquareFile$unwrap(file),
		$romstad$elm_chess$Internal$BoardDimensions$fileMin) < 0) || (_Utils_cmp(
		$romstad$elm_chess$Internal$SquareFile$unwrap(file),
		$romstad$elm_chess$Internal$BoardDimensions$fileMax) > 0);
};
var $romstad$elm_chess$Internal$SquareRank$isOutside = function (rank) {
	return (_Utils_cmp(
		$romstad$elm_chess$Internal$SquareRank$unwrap(rank),
		$romstad$elm_chess$Internal$BoardDimensions$rankMin) < 0) || (_Utils_cmp(
		$romstad$elm_chess$Internal$SquareRank$unwrap(rank),
		$romstad$elm_chess$Internal$BoardDimensions$rankMax) > 0);
};
var $romstad$elm_chess$Internal$Square$isOutside = function (square) {
	return $romstad$elm_chess$Internal$SquareFile$isOutside(
		$romstad$elm_chess$Internal$Square$file(square)) || $romstad$elm_chess$Internal$SquareRank$isOutside(
		$romstad$elm_chess$Internal$Square$rank(square));
};
var $romstad$elm_chess$Internal$Square$squaresInDirection = F2(
	function (startSquare, delta_) {
		var squaresInDirectionInternal = F2(
			function (square, acc) {
				squaresInDirectionInternal:
				while (true) {
					if ($romstad$elm_chess$Internal$Square$isOutside(square)) {
						return acc;
					} else {
						var $temp$square = A2($romstad$elm_chess$Internal$Square$add, square, delta_),
							$temp$acc = A2($elm$core$List$cons, square, acc);
						square = $temp$square;
						acc = $temp$acc;
						continue squaresInDirectionInternal;
					}
				}
			});
		return $elm$core$List$reverse(
			A2(
				squaresInDirectionInternal,
				A2($romstad$elm_chess$Internal$Square$add, startSquare, delta_),
				_List_Nil));
	});
var $romstad$elm_chess$Internal$Square$deltasInDirection = F2(
	function (startSquare, delta_) {
		return A2(
			$elm$core$List$map,
			function (s) {
				return A2($romstad$elm_chess$Internal$Square$subtract, s, startSquare);
			},
			A2($romstad$elm_chess$Internal$Square$squaresInDirection, startSquare, delta_));
	});
var $romstad$elm_chess$Internal$Square$possibleDeltasInDirection = function (delta_) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (sq, result) {
				var deltas = A2($romstad$elm_chess$Internal$Square$deltasInDirection, sq, delta_);
				return (_Utils_cmp(
					$elm$core$List$length(deltas),
					$elm$core$List$length(result)) > 0) ? deltas : result;
			}),
		_List_Nil,
		$romstad$elm_chess$Internal$Square$all);
};
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $romstad$elm_chess$Internal$Piece$computeAttackDeltas = function (piece) {
	var deltasByDirection = A2(
		$elm$core$List$concatMap,
		function (d) {
			return $romstad$elm_chess$Internal$Piece$isSlider(piece) ? A2(
				$elm$core$List$map,
				function (d2) {
					return _Utils_Tuple2(d, d2);
				},
				$romstad$elm_chess$Internal$Square$possibleDeltasInDirection(d)) : _List_fromArray(
				[
					_Utils_Tuple2(d, d)
				]);
		},
		$romstad$elm_chess$Internal$Piece$attackDirections(piece));
	var deltaMax = $romstad$elm_chess$Internal$SquareDelta$unwrap($romstad$elm_chess$Internal$SquareDelta$max);
	return $elm$core$Array$toList(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, result) {
					var d0 = _v0.a;
					var d = _v0.b;
					return A3(
						$elm$core$Array$set,
						deltaMax + $romstad$elm_chess$Internal$SquareDelta$unwrap(d),
						$elm$core$Maybe$Just(d0),
						result);
				}),
			A2($elm$core$Array$repeat, (2 * deltaMax) + 1, $elm$core$Maybe$Nothing),
			deltasByDirection));
};
var $romstad$elm_chess$Internal$Piece$attackDeltas = $elm$core$Array$fromList(
	A2(
		$elm$core$List$concatMap,
		$romstad$elm_chess$Internal$Piece$computeAttackDeltas,
		A2(
			$elm$core$List$map,
			$elm$core$Basics$identity,
			A2(
				$elm$core$List$range,
				0,
				$romstad$elm_chess$Internal$Piece$unwrap($romstad$elm_chess$Internal$Piece$blackKing)))));
var $romstad$elm_chess$Internal$Piece$attackDelta = F3(
	function (piece, from, to) {
		var deltaMax = $romstad$elm_chess$Internal$SquareDelta$unwrap($romstad$elm_chess$Internal$SquareDelta$max);
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$core$Maybe$Nothing,
			A2(
				$elm$core$Array$get,
				((($romstad$elm_chess$Internal$Piece$unwrap(piece) * ((2 * deltaMax) + 1)) + $romstad$elm_chess$Internal$Square$unwrap(to)) - $romstad$elm_chess$Internal$Square$unwrap(from)) + deltaMax,
				$romstad$elm_chess$Internal$Piece$attackDeltas));
	});
var $romstad$elm_chess$Internal$Board$lineIsClear = F4(
	function (board, square0, square1, delta) {
		var lineIsClearInternal = F2(
			function (s0, s1) {
				return _Utils_eq(s0, square1) || (_Utils_eq(
					A2($romstad$elm_chess$Internal$Board$pieceOn, s0, board),
					$romstad$elm_chess$Internal$Piece$empty) && A2(
					lineIsClearInternal,
					A2($romstad$elm_chess$Internal$Square$add, s0, delta),
					s1));
			});
		return A2(
			lineIsClearInternal,
			A2($romstad$elm_chess$Internal$Square$add, square0, delta),
			square1);
	});
var $romstad$elm_chess$Internal$Board$pieceAttacksSquare = F3(
	function (from, to, board) {
		var piece = A2($romstad$elm_chess$Internal$Board$pieceOn, from, board);
		var _v0 = A3($romstad$elm_chess$Internal$Piece$attackDelta, piece, from, to);
		if (_v0.$ === 1) {
			return false;
		} else {
			var delta = _v0.a;
			return $romstad$elm_chess$Internal$Piece$isSlider(piece) ? A4($romstad$elm_chess$Internal$Board$lineIsClear, board, from, to, delta) : true;
		}
	});
var $romstad$elm_chess$Internal$Board$sideAttacksSquare = F3(
	function (side, square, board) {
		return A2(
			$elm$core$List$any,
			function (s) {
				return _Utils_eq(
					$romstad$elm_chess$Internal$Piece$color(
						A2($romstad$elm_chess$Internal$Board$pieceOn, s, board)),
					side) && A3($romstad$elm_chess$Internal$Board$pieceAttacksSquare, s, square, board);
			},
			$romstad$elm_chess$Internal$Square$all);
	});
var $romstad$elm_chess$Internal$Position$sideAttacksSquare = F3(
	function (side, square, position) {
		return A3(
			$romstad$elm_chess$Internal$Board$sideAttacksSquare,
			side,
			square,
			$romstad$elm_chess$Internal$Position$unwrap(position).bp);
	});
var $romstad$elm_chess$Internal$Position$isInCheck = F2(
	function (side, position) {
		var _v0 = A2($romstad$elm_chess$Internal$Position$kingSquare, side, position);
		if (_v0.$ === 1) {
			return false;
		} else {
			var kingSquare_ = _v0.a;
			return A3(
				$romstad$elm_chess$Internal$Position$sideAttacksSquare,
				$romstad$elm_chess$Internal$PieceColor$opposite(side),
				kingSquare_,
				position);
		}
	});
var $romstad$elm_chess$Internal$Position$sideToMove = function (position) {
	return $romstad$elm_chess$Internal$Position$unwrap(position).J;
};
var $romstad$elm_chess$Internal$Position$pseudoMoveIsLegal = F2(
	function (position, move) {
		return !A2(
			$romstad$elm_chess$Internal$Position$isInCheck,
			$romstad$elm_chess$Internal$Position$sideToMove(position),
			A2($romstad$elm_chess$Internal$Position$doMove, move, position));
	});
var $romstad$elm_chess$Internal$Board$isEmpty = F2(
	function (square, board) {
		return _Utils_eq(
			A2($romstad$elm_chess$Internal$Board$pieceOn, square, board),
			$romstad$elm_chess$Internal$Piece$empty);
	});
var $romstad$elm_chess$Internal$Position$isEmpty = F2(
	function (square, pos) {
		return A2(
			$romstad$elm_chess$Internal$Board$isEmpty,
			square,
			$romstad$elm_chess$Internal$Position$unwrap(pos).bp);
	});
var $romstad$elm_chess$Internal$Move$Move = $elm$core$Basics$identity;
var $romstad$elm_chess$Internal$Square$compress = function (square) {
	var r = ($romstad$elm_chess$Internal$Square$unwrap(square) / $romstad$elm_chess$Internal$BoardDimensions$extendedFileCount) | 0;
	var f = A2(
		$elm$core$Basics$modBy,
		$romstad$elm_chess$Internal$BoardDimensions$extendedFileCount,
		$romstad$elm_chess$Internal$Square$unwrap(square));
	return (f - $romstad$elm_chess$Internal$BoardDimensions$fileMin) + ($romstad$elm_chess$Internal$BoardDimensions$fileCount * (r - $romstad$elm_chess$Internal$BoardDimensions$rankMin));
};
var $romstad$elm_chess$Internal$Move$make = F2(
	function (from_, to_) {
		return $romstad$elm_chess$Internal$Square$compress(to_) | ($romstad$elm_chess$Internal$Square$compress(from_) << 6);
	});
var $romstad$elm_chess$Internal$Position$slidePseudoMovesFrom = F3(
	function (from, position, delta) {
		var us = $romstad$elm_chess$Internal$Position$sideToMove(position);
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		var slidePseudoMovesFromInternal = F2(
			function (to, result) {
				slidePseudoMovesFromInternal:
				while (true) {
					if (A2($romstad$elm_chess$Internal$Position$isEmpty, to, position)) {
						var $temp$to = A2($romstad$elm_chess$Internal$Square$add, to, delta),
							$temp$result = A2(
							$elm$core$List$cons,
							A2($romstad$elm_chess$Internal$Move$make, from, to),
							result);
						to = $temp$to;
						result = $temp$result;
						continue slidePseudoMovesFromInternal;
					} else {
						if (_Utils_eq(
							$romstad$elm_chess$Internal$Piece$color(
								A2($romstad$elm_chess$Internal$Position$pieceOn, to, position)),
							them)) {
							return A2(
								$elm$core$List$cons,
								A2($romstad$elm_chess$Internal$Move$make, from, to),
								result);
						} else {
							return result;
						}
					}
				}
			});
		return A2(
			slidePseudoMovesFromInternal,
			A2($romstad$elm_chess$Internal$Square$add, from, delta),
			_List_Nil);
	});
var $romstad$elm_chess$Internal$Position$bishopPseudoMovesFrom = F2(
	function (square, position) {
		return A2(
			$elm$core$List$concatMap,
			A2($romstad$elm_chess$Internal$Position$slidePseudoMovesFrom, square, position),
			$romstad$elm_chess$Internal$Piece$attackDirections($romstad$elm_chess$Internal$Piece$whiteBishop));
	});
var $romstad$elm_chess$Internal$CastleRights$canCastleKingside = F2(
	function (color, rights) {
		return !(!($romstad$elm_chess$Internal$CastleRights$unwrap(rights) & (1 << (2 * $romstad$elm_chess$Internal$PieceColor$unwrap(color)))));
	});
var $romstad$elm_chess$Internal$Position$canCastleKingside = F2(
	function (side, position) {
		return A2(
			$romstad$elm_chess$Internal$CastleRights$canCastleKingside,
			side,
			$romstad$elm_chess$Internal$Position$unwrap(position).x);
	});
var $romstad$elm_chess$Internal$CastleRights$canCastleQueenside = F2(
	function (color, rights) {
		return !(!($romstad$elm_chess$Internal$CastleRights$unwrap(rights) & (1 << ((2 * $romstad$elm_chess$Internal$PieceColor$unwrap(color)) + 1))));
	});
var $romstad$elm_chess$Internal$Position$canCastleQueenside = F2(
	function (side, position) {
		return A2(
			$romstad$elm_chess$Internal$CastleRights$canCastleQueenside,
			side,
			$romstad$elm_chess$Internal$Position$unwrap(position).x);
	});
var $romstad$elm_chess$Internal$Move$makeCastle = F2(
	function (from_, to_) {
		return ($romstad$elm_chess$Internal$Square$compress(to_) | ($romstad$elm_chess$Internal$Square$compress(from_) << 6)) | (1 << 15);
	});
var $romstad$elm_chess$Internal$Position$kingCastlePseudoMovesFrom = F4(
	function (us, them, square, position) {
		return _Utils_ap(
			function () {
				if (A2($romstad$elm_chess$Internal$Position$canCastleKingside, us, position)) {
					var f1 = A2($romstad$elm_chess$Internal$Square$add, square, $romstad$elm_chess$Internal$SquareDelta$e);
					var g1 = A2($romstad$elm_chess$Internal$Square$add, f1, $romstad$elm_chess$Internal$SquareDelta$e);
					return (A2($romstad$elm_chess$Internal$Position$isEmpty, f1, position) && (A2($romstad$elm_chess$Internal$Position$isEmpty, g1, position) && ((!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, square, position)) && ((!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, f1, position)) && (!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, g1, position)))))) ? _List_fromArray(
						[
							A2($romstad$elm_chess$Internal$Move$makeCastle, square, g1)
						]) : _List_Nil;
				} else {
					return _List_Nil;
				}
			}(),
			function () {
				if (A2($romstad$elm_chess$Internal$Position$canCastleQueenside, us, position)) {
					var d1 = A2($romstad$elm_chess$Internal$Square$add, square, $romstad$elm_chess$Internal$SquareDelta$w);
					var c1 = A2($romstad$elm_chess$Internal$Square$add, d1, $romstad$elm_chess$Internal$SquareDelta$w);
					var b1 = A2($romstad$elm_chess$Internal$Square$add, c1, $romstad$elm_chess$Internal$SquareDelta$w);
					return (A2($romstad$elm_chess$Internal$Position$isEmpty, d1, position) && (A2($romstad$elm_chess$Internal$Position$isEmpty, c1, position) && (A2($romstad$elm_chess$Internal$Position$isEmpty, b1, position) && ((!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, square, position)) && ((!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, d1, position)) && (!A3($romstad$elm_chess$Internal$Position$sideAttacksSquare, them, c1, position))))))) ? _List_fromArray(
						[
							A2($romstad$elm_chess$Internal$Move$makeCastle, square, c1)
						]) : _List_Nil;
				} else {
					return _List_Nil;
				}
			}());
	});
var $romstad$elm_chess$Internal$Position$kingPseudoMovesFrom = F2(
	function (square, position) {
		var us = $romstad$elm_chess$Internal$Position$sideToMove(position);
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		return _Utils_ap(
			A2(
				$elm$core$List$map,
				function (to) {
					return A2($romstad$elm_chess$Internal$Move$make, square, to);
				},
				A2(
					$elm$core$List$filter,
					function (s) {
						return A2($romstad$elm_chess$Internal$Position$isEmpty, s, position) || _Utils_eq(
							$romstad$elm_chess$Internal$Piece$color(
								A2($romstad$elm_chess$Internal$Position$pieceOn, s, position)),
							them);
					},
					A2(
						$elm$core$List$map,
						$romstad$elm_chess$Internal$Square$add(square),
						$romstad$elm_chess$Internal$Piece$attackDirections($romstad$elm_chess$Internal$Piece$whiteKing)))),
			A4($romstad$elm_chess$Internal$Position$kingCastlePseudoMovesFrom, us, them, square, position));
	});
var $romstad$elm_chess$Internal$Position$knightPseudoMovesFrom = F2(
	function (square, position) {
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(
			$romstad$elm_chess$Internal$Position$sideToMove(position));
		return A2(
			$elm$core$List$map,
			function (to) {
				return A2($romstad$elm_chess$Internal$Move$make, square, to);
			},
			A2(
				$elm$core$List$filter,
				function (s) {
					return A2($romstad$elm_chess$Internal$Position$isEmpty, s, position) || _Utils_eq(
						$romstad$elm_chess$Internal$Piece$color(
							A2($romstad$elm_chess$Internal$Position$pieceOn, s, position)),
						them);
				},
				A2(
					$elm$core$List$map,
					$romstad$elm_chess$Internal$Square$add(square),
					$romstad$elm_chess$Internal$Piece$attackDirections($romstad$elm_chess$Internal$Piece$whiteKnight))));
	});
var $romstad$elm_chess$Internal$Position$colorOn = F2(
	function (square, pos) {
		return $romstad$elm_chess$Internal$Piece$color(
			A2($romstad$elm_chess$Internal$Position$pieceOn, square, pos));
	});
var $romstad$elm_chess$Internal$Square$isRankTwo = F2(
	function (square, color) {
		return _Utils_eq(color, $romstad$elm_chess$Internal$PieceColor$white) ? _Utils_eq(
			$romstad$elm_chess$Internal$SquareRank$unwrap(
				$romstad$elm_chess$Internal$Square$rank(square)),
			$romstad$elm_chess$Internal$BoardDimensions$rankMin + 1) : _Utils_eq(
			$romstad$elm_chess$Internal$SquareRank$unwrap(
				$romstad$elm_chess$Internal$Square$rank(square)),
			$romstad$elm_chess$Internal$BoardDimensions$rankMax - 1);
	});
var $romstad$elm_chess$Internal$Move$makePromotion = F3(
	function (from_, to_, promotion_) {
		return ($romstad$elm_chess$Internal$Square$compress(to_) | ($romstad$elm_chess$Internal$Square$compress(from_) << 6)) | ($romstad$elm_chess$Internal$PieceType$unwrap(promotion_) << 12);
	});
var $romstad$elm_chess$Internal$Position$pawnCaptures = F4(
	function (us, them, square, position) {
		var ds = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? _List_fromArray(
			[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne]) : _List_fromArray(
			[$romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]);
		var toSqs = A2(
			$elm$core$List$filter,
			function (s) {
				return _Utils_eq(
					A2($romstad$elm_chess$Internal$Position$colorOn, s, position),
					them);
			},
			A2(
				$elm$core$List$map,
				$romstad$elm_chess$Internal$Square$add(square),
				ds));
		return A2($romstad$elm_chess$Internal$Square$isRankTwo, square, them) ? A2(
			$elm$core$List$concatMap,
			function (to) {
				return A2(
					$elm$core$List$map,
					A2($romstad$elm_chess$Internal$Move$makePromotion, square, to),
					_List_fromArray(
						[$romstad$elm_chess$Internal$PieceType$queen, $romstad$elm_chess$Internal$PieceType$rook, $romstad$elm_chess$Internal$PieceType$bishop, $romstad$elm_chess$Internal$PieceType$knight]));
			},
			toSqs) : A2(
			$elm$core$List$map,
			$romstad$elm_chess$Internal$Move$make(square),
			toSqs);
	});
var $romstad$elm_chess$Internal$Position$epSquare = function (position) {
	return $romstad$elm_chess$Internal$Position$unwrap(position).N;
};
var $romstad$elm_chess$Internal$Move$makeEp = F2(
	function (from_, to_) {
		return ($romstad$elm_chess$Internal$Square$compress(to_) | ($romstad$elm_chess$Internal$Square$compress(from_) << 6)) | (1 << 16);
	});
var $romstad$elm_chess$Internal$Position$pawnEpCaptures = F4(
	function (us, them, square, position) {
		var _v0 = $romstad$elm_chess$Internal$Position$epSquare(position);
		if (_v0.$ === 1) {
			return _List_Nil;
		} else {
			var epSquare_ = _v0.a;
			var ds = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? _List_fromArray(
				[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne]) : _List_fromArray(
				[$romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]);
			return A2(
				$elm$core$List$map,
				$romstad$elm_chess$Internal$Move$makeEp(square),
				A2(
					$elm$core$List$filter,
					$elm$core$Basics$eq(epSquare_),
					A2(
						$elm$core$List$map,
						$romstad$elm_chess$Internal$Square$add(square),
						ds)));
		}
	});
var $romstad$elm_chess$Internal$Position$pawnPushes = F4(
	function (us, them, square, position) {
		var push = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? $romstad$elm_chess$Internal$SquareDelta$n : $romstad$elm_chess$Internal$SquareDelta$s;
		var doublePush = A2($romstad$elm_chess$Internal$SquareDelta$multiply, 2, push);
		return (!A2(
			$romstad$elm_chess$Internal$Position$isEmpty,
			A2($romstad$elm_chess$Internal$Square$add, square, push),
			position)) ? _List_Nil : (A2($romstad$elm_chess$Internal$Square$isRankTwo, square, them) ? A2(
			$elm$core$List$map,
			A2(
				$romstad$elm_chess$Internal$Move$makePromotion,
				square,
				A2($romstad$elm_chess$Internal$Square$add, square, push)),
			_List_fromArray(
				[$romstad$elm_chess$Internal$PieceType$queen, $romstad$elm_chess$Internal$PieceType$rook, $romstad$elm_chess$Internal$PieceType$bishop, $romstad$elm_chess$Internal$PieceType$knight])) : (A2($romstad$elm_chess$Internal$Square$isRankTwo, square, us) ? _Utils_ap(
			_List_fromArray(
				[
					A2(
					$romstad$elm_chess$Internal$Move$make,
					square,
					A2($romstad$elm_chess$Internal$Square$add, square, push))
				]),
			(!A2(
				$romstad$elm_chess$Internal$Position$isEmpty,
				A2($romstad$elm_chess$Internal$Square$add, square, doublePush),
				position)) ? _List_Nil : _List_fromArray(
				[
					A2(
					$romstad$elm_chess$Internal$Move$make,
					square,
					A2($romstad$elm_chess$Internal$Square$add, square, doublePush))
				])) : _List_fromArray(
			[
				A2(
				$romstad$elm_chess$Internal$Move$make,
				square,
				A2($romstad$elm_chess$Internal$Square$add, square, push))
			])));
	});
var $romstad$elm_chess$Internal$Position$pawnPseudoMovesFrom = F2(
	function (square, position) {
		var us = $romstad$elm_chess$Internal$Position$sideToMove(position);
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		return _Utils_ap(
			A4($romstad$elm_chess$Internal$Position$pawnPushes, us, them, square, position),
			_Utils_ap(
				A4($romstad$elm_chess$Internal$Position$pawnCaptures, us, them, square, position),
				A4($romstad$elm_chess$Internal$Position$pawnEpCaptures, us, them, square, position)));
	});
var $romstad$elm_chess$Internal$Position$queenPseudoMovesFrom = F2(
	function (square, position) {
		return A2(
			$elm$core$List$concatMap,
			A2($romstad$elm_chess$Internal$Position$slidePseudoMovesFrom, square, position),
			$romstad$elm_chess$Internal$Piece$attackDirections($romstad$elm_chess$Internal$Piece$whiteQueen));
	});
var $romstad$elm_chess$Internal$Position$rookPseudoMovesFrom = F2(
	function (square, position) {
		return A2(
			$elm$core$List$concatMap,
			A2($romstad$elm_chess$Internal$Position$slidePseudoMovesFrom, square, position),
			$romstad$elm_chess$Internal$Piece$attackDirections($romstad$elm_chess$Internal$Piece$whiteRook));
	});
var $romstad$elm_chess$Internal$Position$pseudoMovesFrom = F2(
	function (square, position) {
		var piece = A2($romstad$elm_chess$Internal$Position$pieceOn, square, position);
		return (!_Utils_eq(
			$romstad$elm_chess$Internal$Piece$color(piece),
			$romstad$elm_chess$Internal$Position$sideToMove(position))) ? _List_Nil : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$pawn) ? A2($romstad$elm_chess$Internal$Position$pawnPseudoMovesFrom, square, position) : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$knight) ? A2($romstad$elm_chess$Internal$Position$knightPseudoMovesFrom, square, position) : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$bishop) ? A2($romstad$elm_chess$Internal$Position$bishopPseudoMovesFrom, square, position) : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$rook) ? A2($romstad$elm_chess$Internal$Position$rookPseudoMovesFrom, square, position) : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$queen) ? A2($romstad$elm_chess$Internal$Position$queenPseudoMovesFrom, square, position) : (_Utils_eq(
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$PieceType$king) ? A2($romstad$elm_chess$Internal$Position$kingPseudoMovesFrom, square, position) : _List_Nil))))));
	});
var $romstad$elm_chess$Internal$Position$movesFrom = F2(
	function (square, position) {
		return A2(
			$elm$core$List$filter,
			$romstad$elm_chess$Internal$Position$pseudoMoveIsLegal(position),
			A2($romstad$elm_chess$Internal$Position$pseudoMovesFrom, square, position));
	});
var $romstad$elm_chess$Internal$Position$moves = function (position) {
	return A2(
		$elm$core$List$concatMap,
		function (s) {
			return A2($romstad$elm_chess$Internal$Position$movesFrom, s, position);
		},
		$romstad$elm_chess$Internal$Square$all);
};
var $romstad$elm_chess$Internal$Notation$kingsideCastlingFromSan = function (position) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			$romstad$elm_chess$Internal$Move$isKingsideCastle,
			$romstad$elm_chess$Internal$Position$moves(position)));
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $romstad$elm_chess$Internal$Position$pawnCapturePseudoMovesTo = F3(
	function (us, to, position) {
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		var ourPawn = A2($romstad$elm_chess$Internal$Piece$make, us, $romstad$elm_chess$Internal$PieceType$pawn);
		var ds = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? _List_fromArray(
			[$romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]) : _List_fromArray(
			[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne]);
		return A2(
			$elm$core$List$concatMap,
			function (from) {
				return A2($romstad$elm_chess$Internal$Square$isRankTwo, from, them) ? A2(
					$elm$core$List$map,
					A2($romstad$elm_chess$Internal$Move$makePromotion, from, to),
					_List_fromArray(
						[$romstad$elm_chess$Internal$PieceType$queen, $romstad$elm_chess$Internal$PieceType$rook, $romstad$elm_chess$Internal$PieceType$bishop, $romstad$elm_chess$Internal$PieceType$knight])) : _List_fromArray(
					[
						A2($romstad$elm_chess$Internal$Move$make, from, to)
					]);
			},
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(
						A2($romstad$elm_chess$Internal$Position$pieceOn, s, position),
						ourPawn);
				},
				A2(
					$elm$core$List$map,
					$romstad$elm_chess$Internal$Square$add(to),
					ds)));
	});
var $romstad$elm_chess$Internal$Position$pawnEpCapturePseudoMoves = F3(
	function (us, to, position) {
		var _v0 = $romstad$elm_chess$Internal$Position$epSquare(position);
		if (_v0.$ === 1) {
			return _List_Nil;
		} else {
			var epSquare_ = _v0.a;
			if (!_Utils_eq(epSquare_, to)) {
				return _List_Nil;
			} else {
				var ourPawn = A2($romstad$elm_chess$Internal$Piece$make, us, $romstad$elm_chess$Internal$PieceType$pawn);
				var ds = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? _List_fromArray(
					[$romstad$elm_chess$Internal$SquareDelta$sw, $romstad$elm_chess$Internal$SquareDelta$se]) : _List_fromArray(
					[$romstad$elm_chess$Internal$SquareDelta$nw, $romstad$elm_chess$Internal$SquareDelta$ne]);
				return A2(
					$elm$core$List$map,
					function (from) {
						return A2($romstad$elm_chess$Internal$Move$makeEp, from, to);
					},
					A2(
						$elm$core$List$filter,
						function (s) {
							return _Utils_eq(
								A2($romstad$elm_chess$Internal$Position$pieceOn, s, position),
								ourPawn);
						},
						A2(
							$elm$core$List$map,
							$romstad$elm_chess$Internal$Square$add(to),
							ds)));
			}
		}
	});
var $romstad$elm_chess$Internal$Position$pawnPushPseudoMovesTo = F3(
	function (us, to, position) {
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		var push = _Utils_eq(us, $romstad$elm_chess$Internal$PieceColor$white) ? $romstad$elm_chess$Internal$SquareDelta$s : $romstad$elm_chess$Internal$SquareDelta$n;
		var ourPawn = A2($romstad$elm_chess$Internal$Piece$make, us, $romstad$elm_chess$Internal$PieceType$pawn);
		var from = A2($romstad$elm_chess$Internal$Square$add, to, push);
		if (_Utils_eq(
			A2($romstad$elm_chess$Internal$Position$pieceOn, from, position),
			ourPawn)) {
			return A2($romstad$elm_chess$Internal$Square$isRankTwo, from, them) ? A2(
				$elm$core$List$map,
				A2($romstad$elm_chess$Internal$Move$makePromotion, from, to),
				_List_fromArray(
					[$romstad$elm_chess$Internal$PieceType$queen, $romstad$elm_chess$Internal$PieceType$rook, $romstad$elm_chess$Internal$PieceType$bishop, $romstad$elm_chess$Internal$PieceType$knight])) : _List_fromArray(
				[
					A2($romstad$elm_chess$Internal$Move$make, from, to)
				]);
		} else {
			if (A2($romstad$elm_chess$Internal$Position$isEmpty, from, position)) {
				var from2 = A2($romstad$elm_chess$Internal$Square$add, from, push);
				return (A2($romstad$elm_chess$Internal$Square$isRankTwo, from2, us) && _Utils_eq(
					A2($romstad$elm_chess$Internal$Position$pieceOn, from2, position),
					ourPawn)) ? _List_fromArray(
					[
						A2($romstad$elm_chess$Internal$Move$make, from2, to)
					]) : _List_Nil;
			} else {
				return _List_Nil;
			}
		}
	});
var $romstad$elm_chess$Internal$Position$pawnPseudoMovesTo = F3(
	function (us, to, position) {
		return _Utils_ap(
			A3($romstad$elm_chess$Internal$Position$pawnEpCapturePseudoMoves, us, to, position),
			A2($romstad$elm_chess$Internal$Position$isEmpty, to, position) ? A3($romstad$elm_chess$Internal$Position$pawnPushPseudoMovesTo, us, to, position) : A3($romstad$elm_chess$Internal$Position$pawnCapturePseudoMovesTo, us, to, position));
	});
var $romstad$elm_chess$Internal$Board$scan = F3(
	function (board, square, delta) {
		var scanInternal = function (s) {
			scanInternal:
			while (true) {
				if (!_Utils_eq(
					A2($romstad$elm_chess$Internal$Board$pieceOn, s, board),
					$romstad$elm_chess$Internal$Piece$empty)) {
					return s;
				} else {
					var $temp$s = A2($romstad$elm_chess$Internal$Square$add, s, delta);
					s = $temp$s;
					continue scanInternal;
				}
			}
		};
		return scanInternal(
			A2($romstad$elm_chess$Internal$Square$add, square, delta));
	});
var $romstad$elm_chess$Internal$Position$scan = F3(
	function (position, square, delta) {
		return A3(
			$romstad$elm_chess$Internal$Board$scan,
			$romstad$elm_chess$Internal$Position$unwrap(position).bp,
			square,
			delta);
	});
var $romstad$elm_chess$Internal$Position$piecePseudoMovesTo = F4(
	function (us, pieceType, to, position) {
		var ourPiece = A2($romstad$elm_chess$Internal$Piece$make, us, pieceType);
		return A2(
			$elm$core$List$map,
			function (from) {
				return A2($romstad$elm_chess$Internal$Move$make, from, to);
			},
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(
						A2($romstad$elm_chess$Internal$Position$pieceOn, s, position),
						ourPiece);
				},
				A2(
					$elm$core$List$map,
					$romstad$elm_chess$Internal$Piece$isSlider(ourPiece) ? A2($romstad$elm_chess$Internal$Position$scan, position, to) : $romstad$elm_chess$Internal$Square$add(to),
					$romstad$elm_chess$Internal$Piece$attackDirections(ourPiece))));
	});
var $romstad$elm_chess$Internal$Position$pseudoMovesTo = F3(
	function (piece, square, position) {
		var us = $romstad$elm_chess$Internal$Position$sideToMove(position);
		var them = $romstad$elm_chess$Internal$PieceColor$opposite(us);
		var capturedPiece = A2($romstad$elm_chess$Internal$Position$pieceOn, square, position);
		return (!(_Utils_eq(capturedPiece, $romstad$elm_chess$Internal$Piece$empty) || _Utils_eq(
			$romstad$elm_chess$Internal$Piece$color(capturedPiece),
			them))) ? _List_Nil : (_Utils_eq(piece, $romstad$elm_chess$Internal$PieceType$pawn) ? A3($romstad$elm_chess$Internal$Position$pawnPseudoMovesTo, us, square, position) : A4($romstad$elm_chess$Internal$Position$piecePseudoMovesTo, us, piece, square, position));
	});
var $romstad$elm_chess$Internal$Position$movesTo = F3(
	function (piece, square, position) {
		return A2(
			$elm$core$List$filter,
			$romstad$elm_chess$Internal$Position$pseudoMoveIsLegal(position),
			A3($romstad$elm_chess$Internal$Position$pseudoMovesTo, piece, square, position));
	});
var $romstad$elm_chess$Internal$Notation$pawnMatch = F3(
	function (promotion, fromFile, move) {
		if (promotion.$ === 1) {
			if (fromFile.$ === 1) {
				return true;
			} else {
				var file = fromFile.a;
				return _Utils_eq(
					$romstad$elm_chess$Internal$Square$file(
						$romstad$elm_chess$Internal$Move$from(move)),
					file);
			}
		} else {
			var promotion_ = promotion.a;
			if (fromFile.$ === 1) {
				return _Utils_eq(
					$romstad$elm_chess$Internal$Move$promotion(move),
					$elm$core$Maybe$Just(promotion_));
			} else {
				var file = fromFile.a;
				return _Utils_eq(
					$romstad$elm_chess$Internal$Move$promotion(move),
					$elm$core$Maybe$Just(promotion_)) && _Utils_eq(
					$romstad$elm_chess$Internal$Square$file(
						$romstad$elm_chess$Internal$Move$from(move)),
					file);
			}
		}
	});
var $romstad$elm_chess$Internal$Notation$findPawnMove = F4(
	function (to, promotion, fromFile, position) {
		var candidates = A2(
			$elm$core$List$filter,
			A2($romstad$elm_chess$Internal$Notation$pawnMatch, promotion, fromFile),
			A3($romstad$elm_chess$Internal$Position$movesTo, $romstad$elm_chess$Internal$PieceType$pawn, to, position));
		return ($elm$core$List$length(candidates) === 1) ? $elm$core$List$head(candidates) : $elm$core$Maybe$Nothing;
	});
var $romstad$elm_chess$Internal$PieceType$fromString = function (string) {
	return A2(
		$elm$core$Maybe$andThen,
		$romstad$elm_chess$Internal$PieceType$fromChar,
		$elm$core$List$head(
			$elm$core$String$toList(string)));
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $romstad$elm_chess$Internal$Notation$pawnMoveFromSan = F2(
	function (string, position) {
		var promotion = $romstad$elm_chess$Internal$PieceType$fromString(
			A2($elm$core$String$right, 1, string));
		var str = _Utils_eq(promotion, $elm$core$Maybe$Nothing) ? string : A2($elm$core$String$dropRight, 1, string);
		var to = $romstad$elm_chess$Internal$Square$fromString(
			A2($elm$core$String$right, 2, str));
		var file = $elm$core$List$head(
			A2(
				$elm$core$List$filterMap,
				$romstad$elm_chess$Internal$SquareFile$fromChar,
				$elm$core$String$toList(
					A2($elm$core$String$dropRight, 2, str))));
		if (to.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var to_ = to.a;
			return A4($romstad$elm_chess$Internal$Notation$findPawnMove, to_, promotion, file, position);
		}
	});
var $romstad$elm_chess$Internal$Notation$match = F5(
	function (kind, to, fromFile, fromRank, move) {
		if (fromFile.$ === 1) {
			if (fromRank.$ === 1) {
				return true;
			} else {
				var rank = fromRank.a;
				return _Utils_eq(
					rank,
					$romstad$elm_chess$Internal$Square$rank(
						$romstad$elm_chess$Internal$Move$from(move)));
			}
		} else {
			var file = fromFile.a;
			if (fromRank.$ === 1) {
				return _Utils_eq(
					file,
					$romstad$elm_chess$Internal$Square$file(
						$romstad$elm_chess$Internal$Move$from(move)));
			} else {
				var rank = fromRank.a;
				return _Utils_eq(
					file,
					$romstad$elm_chess$Internal$Square$file(
						$romstad$elm_chess$Internal$Move$from(move))) && _Utils_eq(
					rank,
					$romstad$elm_chess$Internal$Square$rank(
						$romstad$elm_chess$Internal$Move$to(move)));
			}
		}
	});
var $romstad$elm_chess$Internal$Notation$findPieceMove = F4(
	function (kind, to, disambig, position) {
		var dis = $elm$core$String$toList(disambig);
		var files = A2($elm$core$List$filterMap, $romstad$elm_chess$Internal$SquareFile$fromChar, dis);
		var ranks = A2($elm$core$List$filterMap, $romstad$elm_chess$Internal$SquareRank$fromChar, dis);
		if (($elm$core$List$length(files) > 1) || ($elm$core$List$length(ranks) > 1)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var rank = $elm$core$List$head(ranks);
			var file = $elm$core$List$head(files);
			var candidates = A2(
				$elm$core$List$filter,
				A4($romstad$elm_chess$Internal$Notation$match, kind, to, file, rank),
				A3($romstad$elm_chess$Internal$Position$movesTo, kind, to, position));
			return ($elm$core$List$length(candidates) === 1) ? $elm$core$List$head(candidates) : $elm$core$Maybe$Nothing;
		}
	});
var $romstad$elm_chess$Internal$Notation$pieceMoveFromSan = F2(
	function (str, position) {
		var to = $romstad$elm_chess$Internal$Square$fromString(
			A2($elm$core$String$right, 2, str));
		var kind = $romstad$elm_chess$Internal$PieceType$fromString(str);
		var disambig = A2(
			$elm$core$String$dropRight,
			2,
			A2($elm$core$String$dropLeft, 1, str));
		if (kind.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var kind_ = kind.a;
			if (to.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var to_ = to.a;
				return A4($romstad$elm_chess$Internal$Notation$findPieceMove, kind_, to_, disambig, position);
			}
		}
	});
var $romstad$elm_chess$Internal$Notation$queensideCastlingFromSan = function (position) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			$romstad$elm_chess$Internal$Move$isQueensideCastle,
			$romstad$elm_chess$Internal$Position$moves(position)));
};
var $romstad$elm_chess$Internal$Notation$fromSan = F2(
	function (string, position) {
		var str = A2($elm$core$String$filter, $romstad$elm_chess$Internal$Notation$isImportantCharacter, string);
		return (str === 'O-O') ? $romstad$elm_chess$Internal$Notation$kingsideCastlingFromSan(position) : ((str === 'O-O-O') ? $romstad$elm_chess$Internal$Notation$queensideCastlingFromSan(position) : ($romstad$elm_chess$Internal$Notation$isPieceCharacter(
			A2($elm$core$String$left, 1, str)) ? A2($romstad$elm_chess$Internal$Notation$pieceMoveFromSan, str, position) : A2($romstad$elm_chess$Internal$Notation$pawnMoveFromSan, str, position)));
	});
var $romstad$elm_chess$Notation$fromSan = $romstad$elm_chess$Internal$Notation$fromSan;
var $author$project$Step$makeSteps = F3(
	function (position, prevMove, sans) {
		if (!sans.b) {
			return _List_fromArray(
				[
					{bC: $elm$core$Maybe$Nothing, bH: position, Z: prevMove}
				]);
		} else {
			var x = sans.a;
			var xs = sans.b;
			var move = A2($romstad$elm_chess$Notation$fromSan, x, position);
			var step = {bC: move, bH: position, Z: prevMove};
			var tail = A2(
				$elm$core$Maybe$map,
				function (p) {
					return A3($author$project$Step$makeSteps, p, move, xs);
				},
				A2(
					$elm$core$Maybe$map,
					function (mv) {
						return A2($romstad$elm_chess$Position$doMove, mv, position);
					},
					move));
			return A2(
				$elm$core$Maybe$withDefault,
				_List_fromArray(
					[step]),
				A2(
					$elm$core$Maybe$map,
					function (t) {
						return A2($elm$core$List$cons, step, t);
					},
					tail));
		}
	});
var $author$project$Step$fromInput = function (input) {
	return $elm$core$Array$fromList(
		A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				function (p) {
					return A3(
						$author$project$Step$makeSteps,
						p,
						$elm$core$Maybe$Nothing,
						_Utils_ap(input._, input.X));
				},
				$romstad$elm_chess$Position$fromFen(input.U))));
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$State$fromStep = function (step) {
	return {S: _List_Nil, a_: $elm$core$Dict$empty, aB: step};
};
var $author$project$ViewContext$ViewContext = F3(
	function (devicePixelRatio, envelope, size) {
		return {T: devicePixelRatio, bw: envelope, ai: size};
	});
var $author$project$Size$Size = F2(
	function (width, height) {
		return {am: height, bP: width};
	});
var $author$project$Size$none = A2($author$project$Size$Size, 0, 0);
var $author$project$ViewContext$init = function (input) {
	return A3($author$project$ViewContext$ViewContext, input.T, input.bw, $author$project$Size$none);
};
var $romstad$elm_chess$Internal$CastleRights$empty = 0;
var $romstad$elm_chess$Internal$Position$empty = {w: $elm$core$Maybe$Nothing, bp: $romstad$elm_chess$Internal$Board$empty, x: $romstad$elm_chess$Internal$CastleRights$empty, N: $elm$core$Maybe$Nothing, F: 0, V: $elm$core$Maybe$Nothing, Y: $elm$core$Maybe$Nothing, I: 0, J: $romstad$elm_chess$Internal$PieceColor$white, C: $elm$core$Maybe$Nothing};
var $romstad$elm_chess$Internal$Position$initial = A2(
	$elm$core$Maybe$withDefault,
	$romstad$elm_chess$Internal$Position$empty,
	$romstad$elm_chess$Internal$Position$fromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
var $romstad$elm_chess$Position$initial = $romstad$elm_chess$Internal$Position$initial;
var $author$project$Step$initial = {bC: $elm$core$Maybe$Nothing, bH: $romstad$elm_chess$Position$initial, Z: $elm$core$Maybe$Nothing};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Board$none = {aj: 0, ak: 0, al: 0, as: 0, at: 0, az: 0, aE: ''};
var $romstad$elm_chess$Square$fromString = $romstad$elm_chess$Internal$Square$fromString;
var $author$project$Model$parseArrow = function (_v0) {
	var src = _v0.a;
	var dst = _v0.b;
	var squares = _Utils_Tuple2(
		$romstad$elm_chess$Square$fromString(src),
		$romstad$elm_chess$Square$fromString(dst));
	if ((!squares.a.$) && (!squares.b.$)) {
		var src_ = squares.a.a;
		var dst_ = squares.b.a;
		return $elm$core$Maybe$Just(
			{bu: dst_, bJ: src_});
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$parseArrows = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$author$project$Model$parseArrow,
		A2(
			$elm$core$List$map,
			function (s) {
				return _Utils_Tuple2(
					A2($elm$core$String$left, 2, s),
					A2($elm$core$String$right, 2, s));
			},
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				A2($elm$core$String$split, ' ', str))));
};
var $romstad$elm_chess$Position$sideToMove = $romstad$elm_chess$Internal$Position$sideToMove;
var $author$project$State$updateArrows = F2(
	function (s, arrows) {
		return _Utils_update(
			s,
			{S: arrows});
	});
var $author$project$Model$fromInput = function (input) {
	var steps = $author$project$Step$fromInput(input);
	var idx = A2(
		$elm$core$Basics$min,
		$elm$core$Array$length(steps) - 1,
		$elm$core$List$length(input._));
	var s = function (fn) {
		return fn(
			$author$project$Model$parseArrows(input.S));
	}(
		$author$project$State$updateArrows(
			$author$project$State$fromStep(
				A2(
					$elm$core$Maybe$withDefault,
					$author$project$Step$initial,
					A2($elm$core$Array$get, idx, steps)))));
	var playerColor = $romstad$elm_chess$Position$sideToMove(s.aB.bH);
	return {
		R: input.R,
		an: idx,
		ag: $author$project$Board$none,
		ap: 2,
		au: playerColor,
		aa: input.aa,
		ax: $elm$core$Maybe$Nothing,
		ab: input.ab,
		p: $elm_community$undo_redo$UndoList$fresh(s),
		bh: steps,
		bl: $author$project$ViewContext$init(
			{T: input.T, bw: $author$project$Types$ViewCtxMsg})
	};
};
var $author$project$ViewContext$ViewportChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$ViewContext$makeGetViewportCmd = function (vc) {
	return A2(
		$elm$core$Task$perform,
		A2($elm$core$Basics$composeL, vc.bw, $author$project$ViewContext$ViewportChanged),
		$elm$browser$Browser$Dom$getViewport);
};
var $author$project$ViewContext$initCmd = function (vc) {
	return $author$project$ViewContext$makeGetViewportCmd(vc);
};
var $author$project$Main$init = function (flags) {
	var m = $author$project$Model$fromInput(
		$author$project$Input$decode(flags));
	return _Utils_Tuple2(
		m,
		$author$project$ViewContext$initCmd(m.bl));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$ViewContext$WindowResized = {$: 2};
var $elm$browser$Browser$Events$Window = 1;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {a2: pids, bi: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {aP: event, aZ: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.a2,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.aZ;
		var event = _v0.aP;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.bi);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$ViewContext$subscriptions = function (vc) {
	return $elm$browser$Browser$Events$onResize(
		F2(
			function (_v0, _v1) {
				return vc.bw($author$project$ViewContext$WindowResized);
			}));
};
var $author$project$Main$subscriptions = function (m) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$ViewContext$subscriptions(m.bl)
			]));
};
var $author$project$Types$Arrow = F2(
	function (src, dst) {
		return {bu: dst, bJ: src};
	});
var $author$project$Model$clearSelection = function (m) {
	return _Utils_update(
		m,
		{ax: $elm$core$Maybe$Nothing});
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $author$project$State$updateArrow = F2(
	function (s, arrow) {
		var _v0 = A2(
			$elm$core$List$partition,
			function (a) {
				return _Utils_eq(a, arrow);
			},
			s.S);
		var haves = _v0.a;
		var havenots = _v0.b;
		var arrows_ = ($elm$core$List$length(haves) > 0) ? havenots : A2($elm$core$List$cons, arrow, s.S);
		return _Utils_update(
			s,
			{S: arrows_});
	});
var $author$project$Model$updateSelection = F3(
	function (m, sq, canSelect) {
		return canSelect ? _Utils_update(
			m,
			{
				ax: $elm$core$Maybe$Just(sq)
			}) : m;
	});
var $elm_community$undo_redo$UndoList$new = F2(
	function (event, _v0) {
		var past = _v0.f;
		var present = _v0.av;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			event,
			_List_Nil);
	});
var $author$project$Model$updateState = F2(
	function (m, state_) {
		return (!_Utils_eq(m.p.av, state_)) ? _Utils_update(
			m,
			{
				p: A2($elm_community$undo_redo$UndoList$new, state_, m.p)
			}) : m;
	});
var $author$project$Update$clickArrow = F2(
	function (m, sq) {
		var _v0 = m.ax;
		if (_v0.$ === 1) {
			return A3($author$project$Model$updateSelection, m, sq, true);
		} else {
			var src = _v0.a;
			return _Utils_eq(sq, src) ? $author$project$Model$clearSelection(m) : $author$project$Model$clearSelection(
				A2(
					$author$project$Model$updateState,
					m,
					A2(
						$author$project$State$updateArrow,
						$author$project$Model$state(m),
						A2($author$project$Types$Arrow, src, sq))));
		}
	});
var $author$project$Types$NoMark = 0;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Types$Green = 1;
var $author$project$Types$Red = 2;
var $author$project$Mark$next = function (current) {
	switch (current) {
		case 0:
			return 1;
		case 1:
			return 2;
		default:
			return 0;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $romstad$elm_chess$Square$toInt = $romstad$elm_chess$Internal$Square$compress;
var $author$project$State$updateMark = F2(
	function (state, sq) {
		var key = $romstad$elm_chess$Square$toInt(sq);
		var val = $author$project$Mark$next(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Dict$get, key, state.a_)));
		var marks_ = (!(!val)) ? A3($elm$core$Dict$insert, key, val, state.a_) : A2($elm$core$Dict$remove, key, state.a_);
		return _Utils_update(
			state,
			{a_: marks_});
	});
var $author$project$Update$clickMark = F2(
	function (m, sq) {
		return A2(
			$author$project$Model$updateState,
			m,
			A2(
				$author$project$State$updateMark,
				$author$project$Model$state(m),
				sq));
	});
var $romstad$elm_chess$Piece$color = $romstad$elm_chess$Internal$Piece$color;
var $romstad$elm_chess$Position$pieceOn = F2(
	function (square, pos) {
		var p = A2($romstad$elm_chess$Internal$Position$pieceOn, square, pos);
		return (_Utils_eq(p, $romstad$elm_chess$Internal$Piece$empty) || _Utils_eq(p, $romstad$elm_chess$Internal$Piece$outside)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(p);
	});
var $author$project$Model$position = function (m) {
	return $author$project$Model$step(m).bH;
};
var $author$project$Model$canSelectPiece = F2(
	function (m, sq) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (p) {
					return _Utils_eq(
						$romstad$elm_chess$Piece$color(p),
						$romstad$elm_chess$Position$sideToMove(
							$author$project$Model$position(m)));
				},
				A2(
					$romstad$elm_chess$Position$pieceOn,
					sq,
					$author$project$Model$position(m))));
	});
var $author$project$Step$doMove = F2(
	function (step, mv) {
		return {
			bC: $elm$core$Maybe$Nothing,
			bH: A2($romstad$elm_chess$Position$doMove, mv, step.bH),
			Z: $elm$core$Maybe$Just(mv)
		};
	});
var $romstad$elm_chess$Position$movesFrom = $romstad$elm_chess$Internal$Position$movesFrom;
var $romstad$elm_chess$Move$to = $romstad$elm_chess$Internal$Move$to;
var $author$project$State$updateStep = F2(
	function (s, step_) {
		return _Utils_update(
			s,
			{aB: step_});
	});
var $author$project$Update$clickMove = F2(
	function (m, sq) {
		var _v0 = m.ax;
		if (_v0.$ === 1) {
			return A3(
				$author$project$Model$updateSelection,
				m,
				sq,
				A2($author$project$Model$canSelectPiece, m, sq));
		} else {
			var src = _v0.a;
			return _Utils_eq(src, sq) ? $author$project$Model$clearSelection(m) : $author$project$Model$clearSelection(
				A2(
					$author$project$Model$updateState,
					m,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Model$state(m),
						A2(
							$elm$core$Maybe$map,
							$author$project$State$updateStep(
								$author$project$Model$state(m)),
							A2(
								$elm$core$Maybe$map,
								$author$project$Step$doMove(
									$author$project$Model$step(m)),
								$elm$core$List$head(
									A2(
										$elm$core$List$filter,
										function (mv) {
											return _Utils_eq(
												$romstad$elm_chess$Move$to(mv),
												sq);
										},
										A2(
											$romstad$elm_chess$Position$movesFrom,
											src,
											$author$project$Model$position(m)))))))));
		}
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm_community$undo_redo$UndoList$redo = function (_v0) {
	var past = _v0.f;
	var present = _v0.av;
	var future = _v0.h;
	if (!future.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = future.a;
		var xs = future.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			x,
			xs);
	}
};
var $author$project$Model$redo = function (m) {
	return _Utils_update(
		m,
		{
			p: $elm_community$undo_redo$UndoList$redo(m.p)
		});
};
var $elm_community$undo_redo$UndoList$undo = function (_v0) {
	var past = _v0.f;
	var present = _v0.av;
	var future = _v0.h;
	if (!past.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = past.a;
		var xs = past.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			xs,
			x,
			A2($elm$core$List$cons, present, future));
	}
};
var $author$project$Model$undo = function (m) {
	return _Utils_update(
		m,
		{
			p: $elm_community$undo_redo$UndoList$undo(m.p)
		});
};
var $author$project$ViewContext$magic = 30;
var $author$project$ViewContext$updateOnSizeChanged = F2(
	function (_v0, vc) {
		var viewport = _v0.bO;
		return _Utils_update(
			vc,
			{
				ai: A2($author$project$Size$Size, viewport.bP - $author$project$ViewContext$magic, viewport.am - $author$project$ViewContext$magic)
			});
	});
var $author$project$ViewContext$update = F2(
	function (msg, vc) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(vc, $elm$core$Platform$Cmd$none);
			case 1:
				var e = msg.a;
				return _Utils_Tuple2(
					A2($author$project$ViewContext$updateOnSizeChanged, e, vc),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					vc,
					$author$project$ViewContext$makeGetViewportCmd(vc));
		}
	});
var $author$project$State$clearAnnotations = function (s) {
	return _Utils_update(
		s,
		{S: _List_Nil, a_: $elm$core$Dict$empty});
};
var $author$project$Model$updateIndex = F2(
	function (m, idx_) {
		var _v0 = A2($elm$core$Array$get, idx_, m.bh);
		if (_v0.$ === 1) {
			return m;
		} else {
			var step_ = _v0.a;
			return function (m_) {
				return _Utils_update(
					m_,
					{an: idx_});
			}(
				A2(
					$author$project$Model$updateState,
					m,
					$author$project$State$clearAnnotations(
						A2(
							$author$project$State$updateStep,
							$author$project$Model$state(m),
							step_))));
		}
	});
var $author$project$Board$fromViewContext = F2(
	function (_v0, vc) {
		var minMarginWidths = 100.0;
		var headerHeight = 0.1 * vc.ai.am;
		var footerHeight = 0.1 * vc.ai.am;
		var contentWidth = vc.ai.bP - minMarginWidths;
		var boardSize = A2($elm$core$Basics$min, (vc.ai.am - headerHeight) - footerHeight, 0.6 * contentWidth);
		var panelHeight = boardSize;
		var panelWidth = A2($elm$core$Basics$min, 0.4 * contentWidth, boardSize / 1.5);
		var squareSize = boardSize / 8;
		return {aj: boardSize, ak: 0.8 * squareSize, al: headerHeight, as: panelHeight, at: panelWidth, az: squareSize, aE: ''};
	});
var $author$project$Model$updateViewContext = F2(
	function (m, vc_) {
		return function (b_) {
			return _Utils_update(
				m,
				{ag: b_, bl: vc_});
		}(
			A2($author$project$Board$fromViewContext, m.ag, vc_));
	});
var $author$project$Update$update = F2(
	function (msg, m) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					$author$project$Model$redo(m),
					$elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					$author$project$Model$undo(m),
					$elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					A2($author$project$Model$updateIndex, m, m.an),
					$elm$core$Platform$Cmd$none);
			case 9:
				var sq = msg.a;
				var _v1 = m.ap;
				switch (_v1) {
					case 0:
						return _Utils_Tuple2(
							A2($author$project$Update$clickArrow, m, sq),
							$elm$core$Platform$Cmd$none);
					case 1:
						return _Utils_Tuple2(
							A2($author$project$Update$clickMark, m, sq),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(
							A2($author$project$Update$clickMove, m, sq),
							$elm$core$Platform$Cmd$none);
				}
			case 4:
				return function (m_) {
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				}(
					A2($author$project$Model$updateIndex, m, 0));
			case 5:
				return function (m_) {
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				}(
					A2(
						$author$project$Model$updateIndex,
						m,
						$elm$core$Array$length(m.bh) - 1));
			case 6:
				return function (m_) {
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				}(
					A2(
						$author$project$Model$updateIndex,
						m,
						A2(
							$elm$core$Basics$min,
							m.an + 1,
							$elm$core$Array$length(m.bh) - 1)));
			case 7:
				return function (m_) {
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				}(
					A2(
						$author$project$Model$updateIndex,
						m,
						A2($elm$core$Basics$max, 0, m.an - 1)));
			case 8:
				var idx = msg.a;
				return function (m_) {
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				}(
					A2($author$project$Model$updateIndex, m, idx));
			case 10:
				var mode = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						m,
						{ap: mode}),
					$elm$core$Platform$Cmd$none);
			default:
				var subMsg = msg.a;
				return A2(
					$elm$core$Tuple$mapFirst,
					$author$project$Model$updateViewContext(m),
					A2($author$project$ViewContext$update, subMsg, m.bl));
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$View$arrowColor = '#003088';
var $author$project$Point$center = function (p) {
	return {aG: p.aG + 0.5, aH: p.aH + 0.5};
};
var $author$project$Types$Point = F2(
	function (x, y) {
		return {aG: x, aH: y};
	});
var $romstad$elm_chess$Square$file = $romstad$elm_chess$Internal$Square$file;
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $romstad$elm_chess$Square$rank = $romstad$elm_chess$Internal$Square$rank;
var $romstad$elm_chess$Internal$SquareFile$toIndex = function (file) {
	return $romstad$elm_chess$Internal$SquareFile$unwrap(file) - $romstad$elm_chess$Internal$BoardDimensions$fileMin;
};
var $romstad$elm_chess$SquareFile$toIndex = $romstad$elm_chess$Internal$SquareFile$toIndex;
var $romstad$elm_chess$Internal$SquareRank$toIndex = function (rank) {
	return $romstad$elm_chess$Internal$SquareRank$unwrap(rank) - $romstad$elm_chess$Internal$BoardDimensions$rankMin;
};
var $romstad$elm_chess$SquareRank$toIndex = $romstad$elm_chess$Internal$SquareRank$toIndex;
var $romstad$elm_chess$PieceColor$white = $romstad$elm_chess$Internal$PieceColor$white;
var $author$project$Point$forSquare = F2(
	function (m, sq) {
		var _v0 = _Utils_Tuple2(
			$romstad$elm_chess$SquareRank$toIndex(
				$romstad$elm_chess$Square$rank(sq)),
			$romstad$elm_chess$SquareFile$toIndex(
				$romstad$elm_chess$Square$file(sq)));
		var rank = _v0.a;
		var file = _v0.b;
		var xy = _Utils_eq(m.au, $romstad$elm_chess$PieceColor$white) ? _Utils_Tuple2(file, 7 - rank) : _Utils_Tuple2(7 - file, rank);
		return function (_v1) {
			var x = _v1.a;
			var y = _v1.b;
			return A2($author$project$Types$Point, x, y);
		}(
			A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, xy));
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$markerEnd = _VirtualDom_attribute('marker-end');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$View$arrow_ = F2(
	function (m, arrow) {
		var src = $author$project$Point$center(
			A2($author$project$Point$forSquare, m, arrow.bJ));
		var dst = $author$project$Point$center(
			A2($author$project$Point$forSquare, m, arrow.bu));
		return A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1(
					$elm$core$String$fromFloat(src.aG)),
					$elm$svg$Svg$Attributes$y1(
					$elm$core$String$fromFloat(src.aH)),
					$elm$svg$Svg$Attributes$x2(
					$elm$core$String$fromFloat(dst.aG)),
					$elm$svg$Svg$Attributes$y2(
					$elm$core$String$fromFloat(dst.aH)),
					$elm$svg$Svg$Attributes$stroke($author$project$View$arrowColor),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeWidth('0.15625'),
					$elm$svg$Svg$Attributes$markerEnd('url(#arrowhead)')
				]),
			_List_Nil);
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$marker = $elm$svg$Svg$trustedNode('marker');
var $elm$svg$Svg$Attributes$markerHeight = _VirtualDom_attribute('markerHeight');
var $elm$svg$Svg$Attributes$markerWidth = _VirtualDom_attribute('markerWidth');
var $elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var $elm$svg$Svg$Attributes$orient = _VirtualDom_attribute('orient');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$pointerEvents = _VirtualDom_attribute('pointer-events');
var $elm$svg$Svg$Attributes$refX = _VirtualDom_attribute('refX');
var $elm$svg$Svg$Attributes$refY = _VirtualDom_attribute('refY');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$z = _VirtualDom_attribute('z');
var $author$project$View$arrows = function (m) {
	var defs = A2(
		$elm$svg$Svg$defs,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$marker,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$id('arrowhead'),
						$elm$svg$Svg$Attributes$markerWidth('4'),
						$elm$svg$Svg$Attributes$markerHeight('8'),
						$elm$svg$Svg$Attributes$refX('2.05'),
						$elm$svg$Svg$Attributes$refY('2.01'),
						$elm$svg$Svg$Attributes$orient('auto')
					]),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d('M0,0 V4 L3,2 Z'),
								$elm$svg$Svg$Attributes$fill($author$project$View$arrowColor)
							]),
						_List_Nil)
					]))
			]));
	var attrs = _List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 8 8'),
			$elm$svg$Svg$Attributes$pointerEvents('none'),
			$elm$svg$Svg$Attributes$opacity('0.6'),
			$elm$svg$Svg$Attributes$z('2')
		]);
	return function (xs) {
		return A2(
			$elm$svg$Svg$svg,
			attrs,
			A2($elm$core$List$cons, defs, xs));
	}(
		A2(
			$elm$core$List$map,
			$author$project$View$arrow_(m),
			m.S));
};
var $author$project$Images$boardUri = function (name) {
	switch (name) {
		case 'blue':
			return 'url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+CjxnIGlkPSJicm93bi1ib2FyZCI+CjxnIGlkPSJMaWdodCIgZmlsbD0iI2RlZTNlNiI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIi8+CjwvZz4KPGcgaWQ9IkZyYW1lIiBmaWxsPSJub25lIj4KPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiLz4KPC9nPgo8ZyBpZD0iRGFyayIgZmlsbD0iIzhjYTJhZCI+CjxnIGlkPSJyYXoiPgo8ZyBpZD0iZHZhIj4KPGcgaWQ9InRyaSI+CjxyZWN0IHg9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPHJlY3QgeD0iMzAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPgo8cmVjdCB4PSI1MDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+CjxyZWN0IHg9IjcwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPC9nPgo8dXNlIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDAsMTAwKSIgeGxpbms6aHJlZj0iI3RyaSIvPgo8L2c+Cjx1c2UgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwyMDApIiB4bGluazpocmVmPSIjZHZhIi8+CjwvZz4KPHVzZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDQwMCkiIHhsaW5rOmhyZWY9IiNyYXoiLz4KPC9nPgo8L2c+Cjwvc3ZnPg==\')';
		case 'green':
			return 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZmZkZCIgaWQ9ImUiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9IjEiIGhyZWY9IiNlIiB4OmhyZWY9IiNlIi8+CiAgICAgICAgPHJlY3QgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzg2YTY2NiIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)';
		default:
			return 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiIGlkPSJlIi8+CiAgICAgICAgPHVzZSB4PSIxIiB5PSIxIiBocmVmPSIjZSIgeDpocmVmPSIjZSIvPgogICAgICAgIDxyZWN0IHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImxpZ2h0Z3JheSIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)';
	}
};
var $romstad$elm_chess$SquareFile$all = $romstad$elm_chess$Internal$SquareFile$all;
var $romstad$elm_chess$SquareRank$all = $romstad$elm_chess$Internal$SquareRank$all;
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$CssEx$px = function (length) {
	return $elm$core$String$fromFloat(length) + 'px';
};
var $author$project$Point$translate = F2(
	function (m, p) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'translate(',
					$author$project$CssEx$px(p.aG * m.bp.az),
					', ',
					$author$project$CssEx$px(p.aH * m.bp.az),
					')'
				]));
	});
var $author$project$View$coord = F3(
	function (m, attrs, _v0) {
		var text = _v0.a;
		var p = _v0.b;
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				attrs,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'height', '12.5%'),
						A2($elm$html$Html$Attributes$style, 'width', '12.5%'),
						A2(
						$elm$html$Html$Attributes$style,
						'transform',
						A2($author$project$Point$translate, m, p)),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '0'),
						A2($elm$html$Html$Attributes$style, 'left', '0'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px')
					])),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'margin', '15%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(text)
						]))
				]));
	});
var $author$project$Point$forFileCoord = F2(
	function (m, file) {
		var file_ = _Utils_eq(m.au, $romstad$elm_chess$PieceColor$white) ? file : (7 - file);
		return A2($author$project$Types$Point, file_, 8);
	});
var $author$project$Point$forRankCoord = F2(
	function (m, rank) {
		var rank_ = _Utils_eq(m.au, $romstad$elm_chess$PieceColor$white) ? (7 - rank) : rank;
		return A2($author$project$Types$Point, -1, rank_);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $romstad$elm_chess$Internal$SquareFile$toChar = function (file) {
	return $elm$core$Char$fromCode(
		($romstad$elm_chess$Internal$SquareFile$unwrap(file) - $romstad$elm_chess$Internal$BoardDimensions$fileMin) + $elm$core$Char$toCode('a'));
};
var $romstad$elm_chess$Internal$SquareFile$toString = A2($elm$core$Basics$composeR, $romstad$elm_chess$Internal$SquareFile$toChar, $elm$core$String$fromChar);
var $romstad$elm_chess$SquareFile$toString = $romstad$elm_chess$Internal$SquareFile$toString;
var $romstad$elm_chess$Internal$SquareRank$toChar = function (rank) {
	return $elm$core$Char$fromCode(
		($romstad$elm_chess$Internal$SquareRank$unwrap(rank) - $romstad$elm_chess$Internal$BoardDimensions$rankMin) + $elm$core$Char$toCode('1'));
};
var $romstad$elm_chess$Internal$SquareRank$toString = A2($elm$core$Basics$composeR, $romstad$elm_chess$Internal$SquareRank$toChar, $elm$core$String$fromChar);
var $romstad$elm_chess$SquareRank$toString = $romstad$elm_chess$Internal$SquareRank$toString;
var $author$project$View$coords = function (m) {
	var ranks = A2(
		$elm$core$List$map,
		A2(
			$author$project$View$coord,
			m,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'justify-content', 'right'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center')
				])),
		A2(
			$elm$core$List$map,
			$elm$core$Tuple$mapSecond(
				$author$project$Point$forRankCoord(m)),
			A2(
				$elm$core$List$map,
				A2($elm$core$Tuple$mapBoth, $romstad$elm_chess$SquareRank$toString, $romstad$elm_chess$SquareRank$toIndex),
				A2(
					$elm$core$List$map,
					function (r) {
						return _Utils_Tuple2(r, r);
					},
					$romstad$elm_chess$SquareRank$all))));
	var files = A2(
		$elm$core$List$map,
		A2(
			$author$project$View$coord,
			m,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'top')
				])),
		A2(
			$elm$core$List$map,
			$elm$core$Tuple$mapSecond(
				$author$project$Point$forFileCoord(m)),
			A2(
				$elm$core$List$map,
				A2($elm$core$Tuple$mapBoth, $romstad$elm_chess$SquareFile$toString, $romstad$elm_chess$SquareFile$toIndex),
				A2(
					$elm$core$List$map,
					function (f) {
						return _Utils_Tuple2(f, f);
					},
					$romstad$elm_chess$SquareFile$all))));
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_Utils_ap(ranks, files));
};
var $romstad$elm_chess$Square$all = $romstad$elm_chess$Internal$Square$all;
var $author$project$Point$translateSquare = F2(
	function (m, sq) {
		return A2(
			$author$project$Point$translate,
			m,
			A2($author$project$Point$forSquare, m, sq));
	});
var $author$project$View$mark_ = F2(
	function (m, sq) {
		var mark = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Dict$get,
				$romstad$elm_chess$Square$toInt(sq),
				m.a_));
		var color = function () {
			switch (mark) {
				case 0:
					return '';
				case 1:
					return 'green';
				default:
					return 'red';
			}
		}();
		return (color === '') ? _List_Nil : _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'height', '12.5%'),
						A2($elm$html$Html$Attributes$style, 'width', '12.5%'),
						A2(
						$elm$html$Html$Attributes$style,
						'transform',
						A2($author$project$Point$translateSquare, m, sq)),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '0'),
						A2($elm$html$Html$Attributes$style, 'left', '0'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '50%'),
								A2($elm$html$Html$Attributes$style, 'border', '4px solid ' + color),
								A2($elm$html$Html$Attributes$style, 'height', '80%'),
								A2($elm$html$Html$Attributes$style, 'width', '80%')
							]),
						_List_Nil)
					]))
			]);
	});
var $author$project$View$marks = function (m) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		A3(
			$elm$core$List$foldr,
			$elm$core$Basics$append,
			_List_Nil,
			A2(
				$elm$core$List$map,
				$author$project$View$mark_(m),
				$romstad$elm_chess$Square$all)));
};
var $author$project$Images$pieceUri = function (code) {
	switch (code) {
		case 'b':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9zdmc+\')';
		case 'k':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjYiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBmaWxsPSIjMDAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0xMS41IDM3YzUuNSAzLjUgMTUuNSAzLjUgMjEgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDRWMjd2LTMuNWMtMy41LTcuNS0xMy0xMC41LTE2LTQtMyA2IDUgMTAgNSAxMFYzN3oiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMyIDI5LjVzOC41LTQgNi4wMy05LjY1QzM0LjE1IDE0IDI1IDE4IDIyLjUgMjQuNWwuMDEgMi4xLS4wMS0yLjFDMjAgMTggOS45MDYgMTQgNi45OTcgMTkuODVjLTIuNDk3IDUuNjUgNC44NTMgOSA0Ljg1MyA5IiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMTEuNSAzMGM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwbS0yMSAzLjVjNS41LTMgMTUuNS0zIDIxIDAiIHN0cm9rZT0iI2VjZWNlYyIvPjwvZz48L3N2Zz4=\')';
		case 'n':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMjQuNTUgMTAuNGwtLjQ1IDEuNDUuNS4xNWMzLjE1IDEgNS42NSAyLjQ5IDcuOSA2Ljc1UzM1Ljc1IDI5LjA2IDM1LjI1IDM5bC0uMDUuNWgyLjI1bC4wNS0uNWMuNS0xMC4wNi0uODgtMTYuODUtMy4yNS0yMS4zNC0yLjM3LTQuNDktNS43OS02LjY0LTkuMTktNy4xNmwtLjUxLS4xeiIgZmlsbD0iI2VjZWNlYyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvc3ZnPg==\')';
		case 'p':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==\')';
		case 'q':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIHN0cm9rZT0ibm9uZSI+PGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSI5IiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjgiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzMSIgY3k9IjkiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzOSIgY3k9IjEyIiByPSIyLjc1Ii8+PC9nPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi41LTEyLjVMMzEgMjVsLS4zLTE0LjEtNS4yIDEzLjYtMy0xNC41LTMgMTQuNS01LjItMTMuNkwxNCAyNSA2LjUgMTMuNSA5IDI2eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNOSAyNmMwIDIgMS41IDIgMi41IDQgMSAxLjUgMSAxIC41IDMuNS0xLjUgMS0xLjUgMi41LTEuNSAyLjUtMS41IDEuNS41IDIuNS41IDIuNSA2LjUgMSAxNi41IDEgMjMgMCAwIDAgMS41LTEgMC0yLjUgMCAwIC41LTEuNS0xLTIuNS0uNS0yLjUtLjUtMiAuNS0zLjUgMS0yIDIuNS0yIDIuNS00LTguNS0xLjUtMTguNS0xLjUtMjcgMHoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTExIDM4LjVhMzUgMzUgMSAwIDAgMjMgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTEgMjlhMzUgMzUgMSAwIDEgMjMgMG0tMjEuNSAyLjVoMjBtLTIxIDNhMzUgMzUgMSAwIDAgMjIgMG0tMjMgM2EzNSAzNSAxIDAgMCAyNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiLz48L2c+PC9zdmc+\')';
		case 'r':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy41LTdsMS41LTIuNWgxN2wxLjUgMi41aC0yMHptLS41IDR2LTRoMjF2NEgxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE0IDI5LjV2LTEzaDE3djEzSDE0eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTQgMTYuNUwxMSAxNGgyM2wtMyAyLjVIMTR6TTExIDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEyIDM1LjVoMjFtLTIwLTRoMTltLTE4LTJoMTdtLTE3LTEzaDE3TTExIDE0aDIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=\')';
		case 'B':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvc3ZnPg==\')';
		case 'K':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjZNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTEuNSAzN2M1LjUgMy41IDE1LjUgMy41IDIxIDB2LTdzOS00LjUgNi0xMC41Yy00LTYuNS0xMy41LTMuNS0xNiA0VjI3di0zLjVjLTMuNS03LjUtMTMtMTAuNS0xNi00LTMgNiA1IDEwIDUgMTBWMzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjUgMzBjNS41LTMgMTUuNS0zIDIxIDBtLTIxIDMuNWM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwIi8+PC9nPjwvc3ZnPg==\')';
		case 'N':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==\')';
		case 'P':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==\')';
		case 'Q':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMS00IDAgMiAyIDAgMSAxIDQgMHptMTYuNS00LjVhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAwek00MSAxMmEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTE2IDguNWEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTMzIDlhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAweiIvPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi0xMi03IDExVjExbC01LjUgMTMuNS0zLTE1LTMgMTUtNS41LTE0VjI1TDcgMTRsMiAxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTkgMjZjMCAyIDEuNSAyIDIuNSA0IDEgMS41IDEgMSAuNSAzLjUtMS41IDEtMS41IDIuNS0xLjUgMi41LTEuNSAxLjUuNSAyLjUuNSAyLjUgNi41IDEgMTYuNSAxIDIzIDAgMCAwIDEuNS0xIDAtMi41IDAgMCAuNS0xLjUtMS0yLjUtLjUtMi41LS41LTIgLjUtMy41IDEtMiAyLjUtMiAyLjUtNC04LjUtMS41LTE4LjUtMS41LTI3IDB6IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xMS41IDMwYzMuNS0xIDE4LjUtMSAyMiAwTTEyIDMzLjVjNi0xIDE1LTEgMjEgMCIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=\')';
		case 'R':
			return 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy0zdi00aDIxdjRIMTJ6bS0xLTIyVjloNHYyaDVWOWg1djJoNVY5aDR2NSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMzQgMTRsLTMgM0gxNGwtMy0zIi8+PHBhdGggZD0iTTMxIDE3djEyLjVIMTRWMTciIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMxIDI5LjVsMS41IDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGQ9Ik0xMSAxNGgyMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=\')';
		default:
			return '';
	}
};
var $romstad$elm_chess$Internal$PieceType$toChar = function (kind) {
	return _Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$pawn) ? 'P' : (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$knight) ? 'N' : (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$bishop) ? 'B' : (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$rook) ? 'R' : (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$queen) ? 'Q' : (_Utils_eq(kind, $romstad$elm_chess$Internal$PieceType$king) ? 'K' : '?')))));
};
var $elm$core$Char$toLower = _Char_toLower;
var $romstad$elm_chess$Internal$Piece$toChar = function (piece) {
	return _Utils_eq(
		$romstad$elm_chess$Internal$Piece$color(piece),
		$romstad$elm_chess$Internal$PieceColor$white) ? $elm$core$Char$toUpper(
		$romstad$elm_chess$Internal$PieceType$toChar(
			$romstad$elm_chess$Internal$Piece$kind(piece))) : $elm$core$Char$toLower(
		$romstad$elm_chess$Internal$PieceType$toChar(
			$romstad$elm_chess$Internal$Piece$kind(piece)));
};
var $romstad$elm_chess$Piece$toChar = $romstad$elm_chess$Internal$Piece$toChar;
var $author$project$View$piece_ = F3(
	function (step, m, sq) {
		var _v0 = A2($romstad$elm_chess$Position$pieceOn, sq, step.bH);
		if (_v0.$ === 1) {
			return _List_Nil;
		} else {
			var p = _v0.a;
			var div = A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'height', '12.5%'),
						A2($elm$html$Html$Attributes$style, 'width', '12.5%'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '0'),
						A2($elm$html$Html$Attributes$style, 'left', '0'),
						A2(
						$elm$html$Html$Attributes$style,
						'transform',
						A2($author$project$Point$translateSquare, m, sq)),
						A2(
						$elm$html$Html$Attributes$style,
						'background-image',
						$author$project$Images$pieceUri(
							$romstad$elm_chess$Piece$toChar(p))),
						A2($elm$html$Html$Attributes$style, 'background-repeat', 'no-repeat'),
						A2($elm$html$Html$Attributes$style, 'background-size', 'cover')
					]),
				_List_Nil);
			return _List_fromArray(
				[div]);
		}
	});
var $author$project$View$pieces = F2(
	function (step, m) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
				]),
			A3(
				$elm$core$List$foldr,
				$elm$core$Basics$append,
				_List_Nil,
				A2(
					$elm$core$List$map,
					A2($author$project$View$piece_, step, m),
					$romstad$elm_chess$Square$all)));
	});
var $author$project$View$moveColor = '#e68f00';
var $author$project$View$modeColor = function (m) {
	var _v0 = m.ap;
	switch (_v0) {
		case 0:
			return $elm$core$Maybe$Just($author$project$View$arrowColor);
		case 2:
			return $elm$core$Maybe$Just($author$project$View$moveColor);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$View$selected_ = F3(
	function (m, sq, color) {
		var _v0 = A2($author$project$Point$forSquare, m, sq);
		var x = _v0.aG;
		var y = _v0.aH;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$viewBox('0 0 8 8'),
							$elm$svg$Svg$Attributes$opacity('0.6'),
							$elm$svg$Svg$Attributes$z('3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$rect,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$author$project$CssEx$px(x)),
									$elm$svg$Svg$Attributes$y(
									$author$project$CssEx$px(y)),
									$elm$svg$Svg$Attributes$width('1'),
									$elm$svg$Svg$Attributes$height('1'),
									$elm$svg$Svg$Attributes$fill(color)
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$View$selected = function (m) {
	var _v0 = m.ax;
	if (_v0.$ === 1) {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	} else {
		var sq = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			A2($elm$html$Html$div, _List_Nil, _List_Nil),
			A2(
				$elm$core$Maybe$map,
				A2($author$project$View$selected_, m, sq),
				$author$project$View$modeColor(m)));
	}
};
var $author$project$Types$ClickSquare = function (a) {
	return {$: 9, a: a};
};
var $author$project$Types$NoOp = {$: 0};
var $elm$html$Html$button = _VirtualDom_node('button');
var $romstad$elm_chess$Move$from = $romstad$elm_chess$Internal$Move$from;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onDoubleClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'dblclick',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$View$square_ = F3(
	function (step, m, sq) {
		var moveAttrs = function () {
			var _v0 = step.Z;
			if (_v0.$ === 1) {
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'opacity', '0')
					]);
			} else {
				var pm = _v0.a;
				return (_Utils_eq(
					$romstad$elm_chess$Move$from(pm),
					sq) || _Utils_eq(
					$romstad$elm_chess$Move$to(pm),
					sq)) ? _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', 'yellow'),
						A2($elm$html$Html$Attributes$style, 'opacity', '0.3')
					]) : _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'opacity', '0')
					]);
			}
		}();
		var btnAttrs = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '12.5%'),
				A2($elm$html$Html$Attributes$style, 'width', '12.5%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'transform',
				A2($author$project$Point$translateSquare, m, sq)),
				A2($elm$html$Html$Attributes$style, 'border', 'none'),
				$elm$html$Html$Events$onClick(
				$author$project$Types$ClickSquare(sq)),
				$elm$html$Html$Events$onDoubleClick($author$project$Types$NoOp)
			]);
		return A2(
			$elm$html$Html$button,
			_Utils_ap(btnAttrs, moveAttrs),
			_List_Nil);
	});
var $author$project$View$squares = F2(
	function (step, m) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			A2(
				$elm$core$List$map,
				A2($author$project$View$square_, step, m),
				$romstad$elm_chess$Square$all));
	});
var $author$project$View$board_ = function (m) {
	var _v0 = m.aB;
	if (_v0.$ === 1) {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	} else {
		var s = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$author$project$CssEx$px(m.bp.aj)),
					A2(
					$elm$html$Html$Attributes$style,
					'height',
					$author$project$CssEx$px(m.bp.aj)),
					A2(
					$elm$html$Html$Attributes$style,
					'margin-left',
					$author$project$CssEx$px(m.bp.az)),
					A2($elm$html$Html$Attributes$style, 'border', '2px solid gray'),
					A2($elm$html$Html$Attributes$style, 'background-size', 'cover'),
					A2(
					$elm$html$Html$Attributes$style,
					'background-image',
					$author$project$Images$boardUri(m.bp.aE)),
					A2($elm$html$Html$Attributes$style, 'background-repeat', 'no-repeat')
				]),
			A2(
				$elm$core$List$map,
				function (fn) {
					return fn(m);
				},
				_List_fromArray(
					[
						$author$project$View$coords,
						$author$project$View$squares(s),
						$author$project$View$marks,
						$author$project$View$pieces(s),
						$author$project$View$arrows,
						$author$project$View$selected
					])));
	}
};
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $author$project$View$header = function (m) {
	var answer = $elm$core$String$isEmpty(m.R) ? '' : (m.ab ? m.R : '[...]');
	var cloze = $elm$core$String$isEmpty(answer) ? _List_Nil : _List_fromArray(
		[
			A2($elm$html$Html$hr, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'color', 'blue')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(answer)
				]))
		]);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '0.5em'),
				A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
				A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
			]),
		A2(
			$elm$core$List$cons,
			$elm$html$Html$text(m.aa),
			cloze));
};
var $author$project$Types$FirstMove = {$: 4};
var $author$project$Types$LastMove = {$: 5};
var $author$project$Types$NextMove = {$: 6};
var $author$project$Types$PrevMove = {$: 7};
var $author$project$View$logButton = F2(
	function (attrs, text) {
		var attrs_ = _Utils_ap(
			attrs,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', 'none'),
					A2($elm$html$Html$Attributes$style, 'border', 'none'),
					$elm$html$Html$Events$onDoubleClick($author$project$Types$NoOp)
				]));
		return A2(
			$elm$html$Html$button,
			attrs_,
			_List_fromArray(
				[
					$elm$html$Html$text(text)
				]));
	});
var $author$project$View$logButtons = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'display', 'flex'),
			A2($elm$html$Html$Attributes$style, 'height', '3.5rem'),
			A2($elm$html$Html$Attributes$style, 'border-top', '1px solid rgb(217, 217, 217)')
		]),
	_List_fromArray(
		[
			A2(
			$author$project$View$logButton,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'flex', '1 1 20%'),
					$elm$html$Html$Events$onClick($author$project$Types$FirstMove)
				]),
			'<<'),
			A2(
			$author$project$View$logButton,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'flex', '1 1 30%'),
					$elm$html$Html$Events$onClick($author$project$Types$PrevMove)
				]),
			'<'),
			A2(
			$author$project$View$logButton,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'flex', '1 1 30%'),
					$elm$html$Html$Events$onClick($author$project$Types$NextMove)
				]),
			'>'),
			A2(
			$author$project$View$logButton,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'flex', '1 1 20%'),
					$elm$html$Html$Events$onClick($author$project$Types$LastMove)
				]),
			'>>')
		]));
var $author$project$Types$SetMove = function (a) {
	return {$: 8, a: a};
};
var $author$project$View$logItem = function (item) {
	var clickAttrs = function () {
		var _v0 = item.aC;
		if (!_v0.$) {
			var idx = _v0.a;
			return _List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(
					$author$project$Types$SetMove(idx))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var backgroundColor = item.ax ? 'rgb(198, 221, 243)' : 'transparent';
	var attrs = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'display', 'flex'),
			A2($elm$html$Html$Attributes$style, 'flex', '0 0 43%'),
			A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1.185em'),
			A2($elm$html$Html$Attributes$style, 'line-height', '2.07em'),
			A2($elm$html$Html$Attributes$style, 'color', '#4d4d4d'),
			A2($elm$html$Html$Attributes$style, 'background-color', backgroundColor),
			$elm$html$Html$Events$onDoubleClick($author$project$Types$NoOp)
		]);
	return A2(
		$elm$html$Html$div,
		_Utils_ap(attrs, clickAttrs),
		_List_fromArray(
			[
				$elm$html$Html$text(
				A2($elm$core$Maybe$withDefault, '', item.aF))
			]));
};
var $author$project$View$logLine = F2(
	function (idx, line) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex', '0 0 13%'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'line-height', '2.07em'),
						A2($elm$html$Html$Attributes$style, 'background-color', '#f7f6f5'),
						A2($elm$html$Html$Attributes$style, 'color', '#b3b3b3'),
						A2($elm$html$Html$Attributes$style, 'border-right', '1px solid #d9d9d9')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(idx + 1))
					])),
				$author$project$View$logItem(line.bm),
				$author$project$View$logItem(line.aK)
			]);
	});
var $author$project$Log$dummyLastItem = {ax: false, aC: $elm$core$Maybe$Nothing, aF: $elm$core$Maybe$Nothing};
var $author$project$Log$makeLines = function (sans) {
	if (!sans.b) {
		return _List_Nil;
	} else {
		if (!sans.b.b) {
			var x1 = sans.a;
			return _List_fromArray(
				[
					{aK: $author$project$Log$dummyLastItem, bm: x1}
				]);
		} else {
			var x1 = sans.a;
			var _v1 = sans.b;
			var x2 = _v1.a;
			var xs = _v1.b;
			return A2(
				$elm$core$List$cons,
				{aK: x2, bm: x1},
				$author$project$Log$makeLines(xs));
		}
	}
};
var $author$project$Log$dummyFirstItem = function (m) {
	return {
		ax: !m.an,
		aC: $elm$core$Maybe$Just(0),
		aF: $elm$core$Maybe$Just('...')
	};
};
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$ListEx$popBack = function (xs) {
	var sx = $elm$core$List$reverse(xs);
	var tail = A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		$elm$core$List$tail(sx));
	return _Utils_Tuple2(
		$elm$core$List$head(sx),
		$elm$core$List$reverse(tail));
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Model$startColor = function (m) {
	return A2(
		$elm$core$Maybe$withDefault,
		$romstad$elm_chess$PieceColor$white,
		A2(
			$elm$core$Maybe$map,
			function (s) {
				return $romstad$elm_chess$Position$sideToMove(s.bH);
			},
			A2($elm$core$Array$get, 0, m.bh)));
};
var $romstad$elm_chess$Internal$Position$isCheck = function (position) {
	return A2(
		$romstad$elm_chess$Internal$Position$isInCheck,
		$romstad$elm_chess$Internal$Position$sideToMove(position),
		position);
};
var $romstad$elm_chess$Internal$Position$moveGivesCheck = F2(
	function (move, position) {
		return $romstad$elm_chess$Internal$Position$isCheck(
			A2($romstad$elm_chess$Internal$Position$doMove, move, position));
	});
var $romstad$elm_chess$Internal$Position$isCheckmate = function (position) {
	return $romstad$elm_chess$Internal$Position$isCheck(position) && (!$elm$core$List$length(
		$romstad$elm_chess$Internal$Position$moves(position)));
};
var $romstad$elm_chess$Internal$Position$moveGivesCheckmate = F2(
	function (move, position) {
		return $romstad$elm_chess$Internal$Position$isCheckmate(
			A2($romstad$elm_chess$Internal$Position$doMove, move, position));
	});
var $romstad$elm_chess$Internal$PieceType$toString = A2($elm$core$Basics$composeR, $romstad$elm_chess$Internal$PieceType$toChar, $elm$core$String$fromChar);
var $romstad$elm_chess$Internal$Square$toString = function (square) {
	return _Utils_ap(
		$romstad$elm_chess$Internal$SquareFile$toString(
			$romstad$elm_chess$Internal$Square$file(square)),
		$romstad$elm_chess$Internal$SquareRank$toString(
			$romstad$elm_chess$Internal$Square$rank(square)));
};
var $elm$core$String$toUpper = _String_toUpper;
var $romstad$elm_chess$Internal$Notation$pawnMoveToSan = F2(
	function (move, position) {
		var to = $romstad$elm_chess$Internal$Move$to(move);
		var promotion = $romstad$elm_chess$Internal$Move$promotion(move);
		var from = $romstad$elm_chess$Internal$Move$from(move);
		return _Utils_ap(
			(!_Utils_eq(
				$romstad$elm_chess$Internal$Square$file(from),
				$romstad$elm_chess$Internal$Square$file(to))) ? ($romstad$elm_chess$Internal$SquareFile$toString(
				$romstad$elm_chess$Internal$Square$file(from)) + 'x') : '',
			_Utils_ap(
				$romstad$elm_chess$Internal$Square$toString(to),
				function () {
					if (promotion.$ === 1) {
						return '';
					} else {
						var promotion_ = promotion.a;
						return '=' + $elm$core$String$toUpper(
							$romstad$elm_chess$Internal$PieceType$toString(promotion_));
					}
				}()));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $romstad$elm_chess$Internal$Notation$differentFileFrom = F2(
	function (m1, m2) {
		return _Utils_eq(m1, m2) || (!_Utils_eq(
			$romstad$elm_chess$Internal$Square$file(
				$romstad$elm_chess$Internal$Move$from(m1)),
			$romstad$elm_chess$Internal$Square$file(
				$romstad$elm_chess$Internal$Move$from(m2))));
	});
var $romstad$elm_chess$Internal$Notation$differentRankFrom = F2(
	function (m1, m2) {
		return _Utils_eq(m1, m2) || (!_Utils_eq(
			$romstad$elm_chess$Internal$Square$rank(
				$romstad$elm_chess$Internal$Move$from(m1)),
			$romstad$elm_chess$Internal$Square$rank(
				$romstad$elm_chess$Internal$Move$from(m2))));
	});
var $romstad$elm_chess$Internal$Notation$disambiguation = F3(
	function (piece, move, position) {
		var moves = A3(
			$romstad$elm_chess$Internal$Position$movesTo,
			$romstad$elm_chess$Internal$Piece$kind(piece),
			$romstad$elm_chess$Internal$Move$to(move),
			position);
		return ($elm$core$List$length(moves) <= 1) ? '' : (A2(
			$elm$core$List$all,
			$romstad$elm_chess$Internal$Notation$differentFileFrom(move),
			moves) ? $romstad$elm_chess$Internal$SquareFile$toString(
			$romstad$elm_chess$Internal$Square$file(
				$romstad$elm_chess$Internal$Move$from(move))) : (A2(
			$elm$core$List$all,
			$romstad$elm_chess$Internal$Notation$differentRankFrom(move),
			moves) ? $romstad$elm_chess$Internal$SquareRank$toString(
			$romstad$elm_chess$Internal$Square$rank(
				$romstad$elm_chess$Internal$Move$from(move))) : $romstad$elm_chess$Internal$Square$toString(
			$romstad$elm_chess$Internal$Move$from(move))));
	});
var $romstad$elm_chess$Internal$Piece$toString = A2($elm$core$Basics$composeR, $romstad$elm_chess$Internal$Piece$toChar, $elm$core$String$fromChar);
var $romstad$elm_chess$Internal$Notation$pieceMoveToSan = F2(
	function (move, position) {
		var piece = A2(
			$romstad$elm_chess$Internal$Position$pieceOn,
			$romstad$elm_chess$Internal$Move$from(move),
			position);
		return _Utils_ap(
			$elm$core$String$toUpper(
				$romstad$elm_chess$Internal$Piece$toString(piece)),
			_Utils_ap(
				A3($romstad$elm_chess$Internal$Notation$disambiguation, piece, move, position),
				_Utils_ap(
					A2(
						$romstad$elm_chess$Internal$Position$isEmpty,
						$romstad$elm_chess$Internal$Move$to(move),
						position) ? '' : 'x',
					$romstad$elm_chess$Internal$Square$toString(
						$romstad$elm_chess$Internal$Move$to(move)))));
	});
var $romstad$elm_chess$Internal$Notation$toSan = F2(
	function (move, position) {
		return _Utils_ap(
			function () {
				if ($romstad$elm_chess$Internal$Move$isKingsideCastle(move)) {
					return 'O-O';
				} else {
					if ($romstad$elm_chess$Internal$Move$isQueensideCastle(move)) {
						return 'O-O-O';
					} else {
						var piece = A2(
							$romstad$elm_chess$Internal$Position$pieceOn,
							$romstad$elm_chess$Internal$Move$from(move),
							position);
						return _Utils_eq(
							$romstad$elm_chess$Internal$Piece$kind(piece),
							$romstad$elm_chess$Internal$PieceType$pawn) ? A2($romstad$elm_chess$Internal$Notation$pawnMoveToSan, move, position) : A2($romstad$elm_chess$Internal$Notation$pieceMoveToSan, move, position);
					}
				}
			}(),
			A2($romstad$elm_chess$Internal$Position$moveGivesCheckmate, move, position) ? '#' : (A2($romstad$elm_chess$Internal$Position$moveGivesCheck, move, position) ? '+' : ''));
	});
var $romstad$elm_chess$Notation$toSan = $romstad$elm_chess$Internal$Notation$toSan;
var $author$project$Log$toItem = F3(
	function (m, idx, s) {
		var stepIdx = idx + 1;
		var isLastItem = _Utils_eq(
			$elm$core$Array$length(m.bh),
			stepIdx);
		return {
			ax: _Utils_eq(m.an, stepIdx),
			aC: isLastItem ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(stepIdx),
			aF: isLastItem ? $elm$core$Maybe$Nothing : ((_Utils_cmp(m.an, stepIdx) > -1) ? A2(
				$elm$core$Maybe$map,
				function (mv) {
					return A2($romstad$elm_chess$Notation$toSan, mv, s.bH);
				},
				s.bC) : $elm$core$Maybe$Just('???'))
		};
	});
var $author$project$Log$toItems = function (m) {
	var lines = A2(
		$elm$core$List$indexedMap,
		$author$project$Log$toItem(m),
		$elm$core$Array$toList(m.bh));
	return _Utils_eq(
		$author$project$Model$startColor(m),
		$romstad$elm_chess$PieceColor$white) ? lines : $author$project$ListEx$popBack(
		A2(
			$elm$core$List$cons,
			$author$project$Log$dummyFirstItem(m),
			lines)).b;
};
var $author$project$Log$toLines = function (m) {
	return $author$project$Log$makeLines(
		$author$project$Log$toItems(m));
};
var $author$project$View$log = function (m) {
	var moves = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-flow', 'row wrap')
			]),
		A3(
			$elm$core$List$foldr,
			$elm$core$Basics$append,
			_List_Nil,
			A2(
				$elm$core$List$indexedMap,
				$author$project$View$logLine,
				$author$project$Log$toLines(m))));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'flex', '1 0 auto')
					]),
				_List_fromArray(
					[moves])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'flex', '0 1 auto')
					]),
				_List_fromArray(
					[$author$project$View$logButtons]))
			]));
};
var $author$project$View$panel = function (m) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$author$project$CssEx$px(m.bp.as)),
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$author$project$CssEx$px(m.bp.at)),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'gap', '1rem')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'flex', '0 1 auto'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid gray'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
					]),
				_List_fromArray(
					[
						$author$project$View$header(m)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'flex', '1 0 auto'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid gray'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
					]),
				_List_fromArray(
					[
						$author$project$View$log(m)
					]))
			]));
};
var $author$project$View$center = function (m) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$author$project$CssEx$px(m.bl.ai.am)),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
			]),
		A2(
			$elm$core$List$map,
			function (fn) {
				return fn(m);
			},
			_List_fromArray(
				[$author$project$View$panel, $author$project$View$board_])));
};
var $author$project$Types$Arrowing = 0;
var $author$project$Types$Clear = {$: 1};
var $author$project$Types$Marking = 1;
var $author$project$Types$Redo = {$: 2};
var $author$project$Types$SelectMode = function (a) {
	return {$: 10, a: a};
};
var $author$project$Types$Undo = {$: 3};
var $author$project$Images$arrowsUri = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iQ2FwYV8xIgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI4LjU3NyAyOC41NzciCiAgIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4LjU3NyAyOC41Nzc7IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBzb2RpcG9kaTpkb2NuYW1lPSI0YXJyb3dzLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICBpZD0iZGVmczQwIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgaWQ9Im5hbWVkdmlldzM4IgogICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgIHNob3dncmlkPSJmYWxzZSIKICAgaW5rc2NhcGU6em9vbT0iMzAuNTQ5MDQzIgogICBpbmtzY2FwZTpjeD0iMTQuMjcyMTMzIgogICBpbmtzY2FwZTpjeT0iMTQuMTI0ODI5IgogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjIwODAiCiAgIGlua3NjYXBlOndpbmRvdy14PSIyOTg5IgogICBpbmtzY2FwZTp3aW5kb3cteT0iLTExIgogICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJDYXBhXzEiIC8+CjxnCiAgIGlkPSJnNSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgoJPGcKICAgaWQ9ImMxMTdfYXJyb3dzIj4KCQk8cGF0aAogICBzdHlsZT0iZmlsbDojMDMwMTA0IgogICBkPSJNIDI4LjE5LDEzLjU4OCAyNC4zODQsOS43ODIgQyAyMy44OSw5LjI5IDIzLjExMyw5LjI2MyAyMi42NTEsOS43MjggYyAtMC40NjIsMC40NjIgLTAuNDM5LDEuMjM3IDAuMDU3LDEuNzMyIGwgMS44MjEsMS44MjEgSCAxNS40ODIgViA0LjExOCBsIDEuODIsMS44MiBjIDAuNDk1LDAuNDkzIDEuMjcxLDAuNTIxIDEuNzMyLDAuMDU1IEMgMTkuNDk4LDUuNTI5IDE5LjQ3Niw0Ljc1NSAxOC45NzksNC4yNiBMIDE1LjE3NCwwLjQ1MyBDIDE0LjY3OSwtMC4wNCAxMy45MDMsLTAuMDY0IDEzLjQ0MSwwLjM5OSAxMy40MjgsMC40MTEgMTMuNDIsMC40MjMgMTMuNDEsMC40MzcgMTMuMzkzLDAuNDUgMTMuMzc0LDAuNDYyIDEzLjM1NiwwLjQ4MSBMIDkuNjA2LDQuMjM1IEMgOS4xMTgsNC43MjQgOS4wOTcsNS40OTMgOS41NjIsNS45NTcgMTAuMDI1LDYuNDE4IDEwLjc5NSw2LjQgMTEuMjg1LDUuOTEzIEwgMTMuMTEsNC4wODUgdiA5LjE5NiBIIDQuMDE3IGwgMS44MywtMS44MjcgQyA2LjMzNSwxMC45NjUgNi4zNTIsMTAuMTk0IDUuODg4LDkuNzMzIDUuNDI2LDkuMjY4IDQuNjU2LDkuMjg5IDQuMTY5LDkuNzc2IGwgLTMuNzU2LDMuNzUyIGMgLTAuMDE3LDAuMDIgLTAuMDI4LDAuMDM3IC0wLjA0MywwLjA1MyAtMC4wMTIsMC4wMTIgLTAuMDI2LDAuMDIxIC0wLjAzNywwLjAzIC0wLjQ2NSwwLjQ2NyAtMC40NCwxLjI0MSAwLjA1NywxLjczNCBsIDMuODA0LDMuODA3IGMgMC40OTQsMC40OTUgMS4yNzEsMC41MiAxLjczMywwLjA1NiAwLjQ2MiwtMC40NjQgMC40MzgsLTEuMjQgLTAuMDU2LC0xLjczMyBsIC0xLjgyLC0xLjgyIGggOS4wNTkgdiA4LjgwMyBsIC0xLjgxNywtMS44MiBjIC0wLjQ5NSwtMC40OTQgLTEuMjcxLC0wLjUxOSAtMS43MzQsLTAuMDU0IC0wLjQ2MywwLjQ2MyAtMC40MzksMS4yMzcgMC4wNTYsMS43MyBsIDMuODA1LDMuODA3IGMgMC40OTUsMC40OTYgMS4yNzEsMC41MiAxLjczNCwwLjA1NyAwLjAxMywtMC4wMTMgMC4wMjEsLTAuMDI0IDAuMDI5LC0wLjA0IDAuMDE4LC0wLjAxMyAwLjAzNiwtMC4wMjYgMC4wNTYsLTAuMDQyIEwgMTguOTksMjQuMzQgYyAwLjQ4OSwtMC40ODQgMC41MSwtMS4yNTYgMC4wNDUsLTEuNzIxIC0wLjQ2NSwtMC40NiAtMS4yMzQsLTAuNDQyIC0xLjcyMiwwLjA0MiBsIC0xLjgyOSwxLjgyOSAxMGUtNCwtOC44MzUgaCA5LjA3OCBsIC0xLjgzLDEuODMgYyAtMC40ODgsMC40ODUgLTAuNTA2LDEuMjU1IC0wLjA0MywxLjcyMiAwLjQ2MiwwLjQ2MiAxLjIzMiwwLjQ0MyAxLjcyMSwtMC4wNDYgbCAzLjc1NCwtMy43NTQgYyAwLjAxNywtMC4wMTYgMC4wMjksLTAuMDM2IDAuMDQ1LC0wLjA1MyAwLjAxMywtMC4wMTIgMC4wMjcsLTAuMDE5IDAuMDM5LC0wLjAzIDAuNDU5LC0wLjQ2NSAwLjQzNSwtMS4yNCAtMC4wNTksLTEuNzM2IHoiCiAgIGlkPSJwYXRoMiIgLz4KCTwvZz4KPC9nPgo8ZwogICBpZD0iZzciCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzkiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzExIgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcxMyIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMTUiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzE3IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcxOSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMjEiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzIzIgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcyNSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMjciCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzI5IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImczMSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMzMiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzM1IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPC9zdmc+Cg==)';
var $author$project$Images$circlesUri = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBpZD0iRmxhdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTgwLDY4YTUyLDUyLDAsMSwwLTUyLDUyQTUyLjA1OSw1Mi4wNTksMCwwLDAsMTgwLDY4Wk0xMjgsOTZhMjgsMjgsMCwxLDEsMjgtMjhBMjguMDMxNDYsMjguMDMxNDYsMCwwLDEsMTI4LDk2Wm02MCwyNGE1Miw1MiwwLDEsMCw1Miw1MkE1Mi4wNTksNTIuMDU5LDAsMCwwLDE4OCwxMjBabTAsODBhMjgsMjgsMCwxLDEsMjgtMjhBMjguMDMxNDYsMjguMDMxNDYsMCwwLDEsMTg4LDIwMFpNNjgsMTIwYTUyLDUyLDAsMSwwLDUyLDUyQTUyLjA1OSw1Mi4wNTksMCwwLDAsNjgsMTIwWm0wLDgwYTI4LDI4LDAsMSwxLDI4LTI4QTI4LjAzMTQ2LDI4LjAzMTQ2LDAsMCwxLDY4LDIwMFoiLz4KPC9zdmc+Cg==)';
var $author$project$Images$clearUri = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ0MyA0NDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MyA0NDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxyZWN0IHg9IjYxLjc4NSIgeT0iMTI4IiB3aWR0aD0iNjAiIGhlaWdodD0iMjkwIi8+DQoJPHBhdGggZD0iTTIxMS43ODUsMjUwLjY1VjEyOGgtNjB2MjkwaDQ0LjE3MmMtMTQuODYxLTIxLjA2Ny0yMy42MDItNDYuNzQ2LTIzLjYwMi03NC40Mw0KCQlDMTcyLjM1NiwzMDcuMTQ1LDE4Ny40ODYsMjc0LjE5MywyMTEuNzg1LDI1MC42NXoiLz4NCgk8cGF0aCBkPSJNMzAxLjc4NSwyMTQuMTQxbDAtODYuMTQxaC02MHYxMDAuOTE4QzI1OS43MzEsMjE5LjQ4OCwyODAuMTQ0LDIxNC4xNDEsMzAxLjc4NSwyMTQuMTQxeiIvPg0KCTxwYXRoIGQ9Ik0zMjEuNzg1LDM4aC04My4zODRWMEgxMjUuMTY5djM4SDQxLjc4NXY2MGgyODBWMzh6IE0xNTUuMTY5LDMwaDUzLjIzMnY4aC01My4yMzJWMzB6Ii8+DQoJPHBhdGggZD0iTTMwMS43ODUsMjQ0LjE0MWMtNTQuODI2LDAtOTkuNDI5LDQ0LjYwNC05OS40MjksOTkuNDI5UzI0Ni45NTksNDQzLDMwMS43ODUsNDQzczk5LjQzLTQ0LjYwNCw5OS40My05OS40Mw0KCQlTMzU2LjYxMSwyNDQuMTQxLDMwMS43ODUsMjQ0LjE0MXogTTM1NS45NjEsMzc2LjUzM2wtMjEuMjEzLDIxLjIxM2wtMzIuOTYzLTMyLjk2M2wtMzIuOTYzLDMyLjk2M2wtMjEuMjEzLTIxLjIxM2wzMi45NjMtMzIuOTYzDQoJCWwtMzIuOTYzLTMyLjk2M2wyMS4yMTMtMjEuMjEzbDMyLjk2MywzMi45NjNsMzIuOTYzLTMyLjk2M2wyMS4yMTMsMjEuMjEzbC0zMi45NjMsMzIuOTYzTDM1NS45NjEsMzc2LjUzM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K)';
var $author$project$Images$redoUri = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPgo8cGF0aCBkPSJNMzYuNzI3OSAzNi43Mjc5QzMzLjQ3MDYgMzkuOTg1MyAyOC45NzA2IDQyIDI0IDQyQzE0LjA1ODkgNDIgNiAzMy45NDExIDYgMjRDNiAxNC4wNTg5IDE0LjA1ODkgNiAyNCA2QzI4Ljk3MDYgNiAzMy40NzA2IDguMDE0NzIgMzYuNzI3OSAxMS4yNzIxQzM4LjM4NTkgMTIuOTMwMSA0MiAxNyA0MiAxNyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTQyIDhWMTdIMzMiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=)';
var $author$project$View$sidebar = F3(
	function (m, attrs, child) {
		return function (a) {
			return A2(
				$elm$html$Html$div,
				a,
				_List_fromArray(
					[child]));
		}(
			_Utils_ap(
				attrs,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
						A2($elm$html$Html$Attributes$style, 'top', '0px'),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$CssEx$px(m.bl.ai.am)),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					])));
	});
var $author$project$View$sidebarButton = F4(
	function (size, msg, imageUri, isSelected) {
		var css = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
				A2($elm$html$Html$Attributes$style, 'border-width', '4px'),
				A2($elm$html$Html$Attributes$style, 'margin', '10px 0px'),
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$author$project$CssEx$px(size)),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$author$project$CssEx$px(size)),
				A2($elm$html$Html$Attributes$style, 'border-radius', '50%'),
				A2($elm$html$Html$Attributes$style, 'padding', '4px'),
				$elm$html$Html$Events$onClick(msg),
				$elm$html$Html$Events$onDoubleClick($author$project$Types$NoOp)
			]);
		var css_ = isSelected ? A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'border-color', 'orange'),
			css) : A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'border-color', 'gray'),
			css);
		return A2(
			$elm$html$Html$button,
			css_,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'width', '80%'),
							A2($elm$html$Html$Attributes$style, 'height', '80%'),
							A2($elm$html$Html$Attributes$style, 'margin', 'auto'),
							A2($elm$html$Html$Attributes$style, 'background-image', imageUri),
							A2($elm$html$Html$Attributes$style, 'background-size', 'cover')
						]),
					_List_Nil)
				]));
	});
var $author$project$Images$undoUri = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjQ4cHgiCiAgIGhlaWdodD0iNDhweCIKICAgdmlld0JveD0iMCAwIDQ4IDQ4IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc4IgogICBzb2RpcG9kaTpkb2NuYW1lPSJ1bmRvLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTIiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxMCIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOC4xODc1IgogICAgIGlua3NjYXBlOmN4PSIyMy45NzI1MDkiCiAgICAgaW5rc2NhcGU6Y3k9IjIzLjk3MjUwOSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMjA4MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjk4OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnOCIgLz4KICA8cmVjdAogICAgIHdpZHRoPSI0OCIKICAgICBoZWlnaHQ9IjQ4IgogICAgIGZpbGw9IiNmZmZmZmYiCiAgICAgZmlsbC1vcGFjaXR5PSIwLjAxIgogICAgIGlkPSJyZWN0MiIKICAgICB4PSIwIgogICAgIHk9IjAiIC8+CiAgPHBhdGgKICAgICBkPSJNIDExLjI3MjEsMzYuNzI3OSBDIDE0LjUyOTQsMzkuOTg1MyAxOS4wMjk0LDQyIDI0LDQyIDMzLjk0MTEsNDIgNDIsMzMuOTQxMSA0MiwyNCA0MiwxNC4wNTg5IDMzLjk0MTEsNiAyNCw2IDE5LjAyOTQsNiAxNC41Mjk0LDguMDE0NzIgMTEuMjcyMSwxMS4yNzIxIDkuNjE0MSwxMi45MzAxIDYsMTcgNiwxNyIKICAgICBzdHJva2U9IiMwMDAwMDAiCiAgICAgc3Ryb2tlLXdpZHRoPSI0IgogICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgICBzdHJva2UtbGluZWpvaW49InJvdW5kIgogICAgIGlkPSJwYXRoNCIgLz4KICA8cGF0aAogICAgIGQ9Im0gNiw4IHYgOSBoIDkiCiAgICAgc3Ryb2tlPSIjMDAwMDAwIgogICAgIHN0cm9rZS13aWR0aD0iNCIKICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAgICBpZD0icGF0aDYiIC8+Cjwvc3ZnPgo=)';
var $author$project$View$rightBar = function (m) {
	var moveUri = function (c) {
		return _Utils_eq(c, $romstad$elm_chess$PieceColor$white) ? $author$project$Images$pieceUri('K') : $author$project$Images$pieceUri('k');
	}(
		A2(
			$elm$core$Maybe$withDefault,
			$romstad$elm_chess$PieceColor$white,
			A2(
				$elm$core$Maybe$map,
				function (s) {
					return $romstad$elm_chess$Position$sideToMove(s.bH);
				},
				m.aB)));
	var hr = A2(
		$elm$html$Html$hr,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin', '20px 0px')
			]),
		_List_Nil);
	var btnFn = $author$project$View$sidebarButton(m.bp.ak);
	var top = _List_fromArray(
		[
			A3(btnFn, $author$project$Types$Undo, $author$project$Images$undoUri, false),
			A3(btnFn, $author$project$Types$Redo, $author$project$Images$redoUri, false),
			A3(btnFn, $author$project$Types$Clear, $author$project$Images$clearUri, false)
		]);
	var bot = A2(
		$elm$core$List$map,
		function (_v0) {
			var text = _v0.a;
			var mode = _v0.b;
			return A3(
				btnFn,
				$author$project$Types$SelectMode(mode),
				text,
				_Utils_eq(m.ap, mode));
		},
		_List_fromArray(
			[
				_Utils_Tuple2(moveUri, 2),
				_Utils_Tuple2($author$project$Images$arrowsUri, 0),
				_Utils_Tuple2($author$project$Images$circlesUri, 1)
			]));
	return A3(
		$author$project$View$sidebar,
		m,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'right', '5px')
			]),
		A2(
			$elm$html$Html$div,
			_List_Nil,
			_Utils_ap(
				top,
				A2($elm$core$List$cons, hr, bot))));
};
var $author$project$View$view = function (m) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (fn) {
				return fn(m);
			},
			_List_fromArray(
				[$author$project$View$center, $author$project$View$rightBar])));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		bA: $author$project$Main$init,
		bK: $author$project$Main$subscriptions,
		bM: $author$project$Update$update,
		bN: A2($elm$core$Basics$composeL, $author$project$View$view, $author$project$Model$fromModel2)
	});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));