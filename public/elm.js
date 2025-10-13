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

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


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

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
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

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
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


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
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
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
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

	/**/
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

	/**_UNUSED/
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

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
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

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


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



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


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



/**/
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

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

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
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
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


function _Platform_export_UNUSED(exports)
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


function _Platform_export(exports)
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

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
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
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
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
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
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
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
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
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
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
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
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
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
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
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
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
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
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
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
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
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
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



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
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




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
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
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
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
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
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
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
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
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
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
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
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
	return {$: 'Leaf', a: a};
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
	return {$: 'SubTree', a: a};
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
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
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
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
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
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
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
					if (_v1.$ === 'Nothing') {
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
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
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
		var task = _v0.a;
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
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Types$ContactIdle = {$: 'ContactIdle'};
var $author$project$Types$GotNow = function (a) {
	return {$: 'GotNow', a: a};
};
var $author$project$Types$GotViewport = function (a) {
	return {$: 'GotViewport', a: a};
};
var $author$project$Types$GotZone = function (a) {
	return {$: 'GotZone', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $author$project$Main$barsCount = 10;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $author$project$Types$MarkersMeasured = function (a) {
	return {$: 'MarkersMeasured', a: a};
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
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
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $author$project$Main$measureMarkersCmd = function (ids) {
	var measureOne = function (id) {
		return A2(
			$elm$core$Task$onError,
			function (_v0) {
				return $elm$core$Task$succeed($elm$core$Maybe$Nothing);
			},
			A2(
				$elm$core$Task$map,
				function (el) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(id, el.element.y));
				},
				$elm$browser$Browser$Dom$getElement(id)));
	};
	return A2(
		$elm$core$Task$perform,
		$author$project$Types$MarkersMeasured,
		A2(
			$elm$core$Task$map,
			$elm$core$List$filterMap($elm$core$Basics$identity),
			$elm$core$Task$sequence(
				A2($elm$core$List$map, measureOne, ids))));
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
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
var $elm$core$String$trim = _String_trim;
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Constants$videoMarkerIds = _List_fromArray(
	['videoswitch-marker-1', 'videoswitch-marker-2', 'videoswitch-marker-3']);
var $author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{
			activeBgIndex: 0,
			barHeights: A2($elm$core$List$repeat, $author$project$Main$barsCount, 25.0),
			cdnBase: $elm$core$String$trim(flags.cdnBase),
			contact: {email: '', honeypot: '', message: '', name: ''},
			contactStatus: $author$project$Types$ContactIdle,
			currentSongIndex: 0,
			currentTime: 0,
			debugMarkers: true,
			draggingTestimonials: $elm$core$Maybe$Nothing,
			duration: 0,
			error: $elm$core$Maybe$Nothing,
			expandedPerf: $elm$core$Set$empty,
			isContactModalOpen: false,
			isMenuOpen: false,
			isPlaying: false,
			lightbox: $elm$core$Maybe$Nothing,
			now: $elm$time$Time$millisToPosix(0),
			scrollY: 0,
			selectedMusicVideoIndex: 0,
			videoMarkerIds: $author$project$Constants$videoMarkerIds,
			videoMarkers: _List_Nil,
			viewportH: 0,
			viewportW: 0,
			visiblePerfCount: 5,
			zone: $elm$time$Time$utc
		},
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Task$attempt, $author$project$Types$GotViewport, $elm$browser$Browser$Dom$getViewport),
					$author$project$Main$measureMarkersCmd($author$project$Constants$videoMarkerIds),
					A2($elm$core$Task$perform, $author$project$Types$GotZone, $elm$time$Time$here),
					A2($elm$core$Task$perform, $author$project$Types$GotNow, $elm$time$Time$now)
				])));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Types$AudioError = function (a) {
	return {$: 'AudioError', a: a};
};
var $author$project$Types$FrequencyData = function (a) {
	return {$: 'FrequencyData', a: a};
};
var $author$project$Types$OnScroll = function (a) {
	return {$: 'OnScroll', a: a};
};
var $author$project$Types$SongEnded = {$: 'SongEnded'};
var $author$project$Types$TimeUpdate = F2(
	function (a, b) {
		return {$: 'TimeUpdate', a: a, b: b};
	});
var $author$project$Types$ViewportResized = F2(
	function (a, b) {
		return {$: 'ViewportResized', a: a, b: b};
	});
var $author$project$Main$audioError = _Platform_incomingPort('audioError', $elm$json$Json$Decode$string);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Main$frequencyData = _Platform_incomingPort(
	'frequencyData',
	$elm$json$Json$Decode$list($elm$json$Json$Decode$float));
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
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
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
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
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
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
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
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
			if (dict.$ === 'RBEmpty_elm_builtin') {
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
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
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
			state.pids,
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
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
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
		$elm$browser$Browser$Events$Window,
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
var $author$project$Main$onScroll = _Platform_incomingPort('onScroll', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $author$project$Main$songEnded = _Platform_incomingPort(
	'songEnded',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$Main$timeUpdate = _Platform_incomingPort(
	'timeUpdate',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$float)));
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$onScroll($author$project$Types$OnScroll),
				$elm$browser$Browser$Events$onResize($author$project$Types$ViewportResized),
				$author$project$Main$timeUpdate(
				function (_v0) {
					var current = _v0.a;
					var duration = _v0.b;
					return A2($author$project$Types$TimeUpdate, current, duration);
				}),
				$author$project$Main$songEnded(
				function (_v1) {
					return $author$project$Types$SongEnded;
				}),
				$author$project$Main$audioError($author$project$Types$AudioError),
				model.isPlaying ? $author$project$Main$frequencyData($author$project$Types$FrequencyData) : $elm$core$Platform$Sub$none
			]));
};
var $author$project$Types$ContactEditing = {$: 'ContactEditing'};
var $author$project$Types$ContactError = function (a) {
	return {$: 'ContactError', a: a};
};
var $author$project$Types$ContactSending = {$: 'ContactSending'};
var $author$project$Types$ContactSuccess = {$: 'ContactSuccess'};
var $author$project$Types$NextSong = {$: 'NextSong'};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
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
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Utils$activeIndexFrom = F3(
	function (bottomY, markers, videosLen) {
		var crossed = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (_v0) {
					var y = _v0.b;
					return _Utils_cmp(y, bottomY) < 1;
				},
				A2($elm$core$List$sortBy, $elm$core$Tuple$second, markers)));
		return A3($elm$core$Basics$clamp, 0, videosLen - 1, crossed);
	});
var $author$project$Constants$bandEmail = 'mortremofficial@gmail.com';
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$copyToClipboard = _Platform_outgoingPort('copyToClipboard', $elm$json$Json$Encode$string);
var $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$DateTime = function (a) {
	return {$: 'DateTime', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Date = function (a) {
	return {$: 'Date', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day = function (a) {
	return {$: 'Day', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Year = function (a) {
	return {$: 'Year', a: a};
};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromPosix = function (posix) {
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Date(
		{
			day: $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(
				A2($elm$time$Time$toDay, $elm$time$Time$utc, posix)),
			month: A2($elm$time$Time$toMonth, $elm$time$Time$utc, posix),
			year: $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Year(
				A2($elm$time$Time$toYear, $elm$time$Time$utc, posix))
		});
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Hour = function (a) {
	return {$: 'Hour', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Millisecond = function (a) {
	return {$: 'Millisecond', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Minute = function (a) {
	return {$: 'Minute', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Second = function (a) {
	return {$: 'Second', a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$fromPosix = function (posix) {
	return $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Time(
		{
			hours: $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Hour(
				A2($elm$time$Time$toHour, $elm$time$Time$utc, posix)),
			milliseconds: $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Millisecond(
				A2($elm$time$Time$toMillis, $elm$time$Time$utc, posix)),
			minutes: $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Minute(
				A2($elm$time$Time$toMinute, $elm$time$Time$utc, posix)),
			seconds: $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$Second(
				A2($elm$time$Time$toSecond, $elm$time$Time$utc, posix))
		});
};
var $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$fromPosix = function (timePosix) {
	return $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$DateTime(
		{
			date: $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromPosix(timePosix),
			time: $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$fromPosix(timePosix)
		});
};
var $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix = $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$fromPosix;
var $author$project$Constants$defaultDateTime = $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
	$elm$time$Time$millisToPosix(0));
var $author$project$Constants$defaultSong = {artwork: $elm$core$Maybe$Nothing, duration: 0, releaseDate: $author$project$Constants$defaultDateTime, released: false, src: '', title: ''};
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Main$drawWaveform = _Platform_outgoingPort(
	'drawWaveform',
	$elm$json$Json$Encode$list($elm$json$Json$Encode$float));
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Constants$numVideoBgs = 4;
var $author$project$Update$OnScroll$handle = F3(
	function (y, model, setActiveBgCmd) {
		var bottom = y + model.viewportH;
		var idx = A3($author$project$Utils$activeIndexFrom, bottom, model.videoMarkers, $author$project$Constants$numVideoBgs);
		var swapCmd = (!_Utils_eq(idx, model.activeBgIndex)) ? setActiveBgCmd(idx) : $elm$core$Platform$Cmd$none;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{activeBgIndex: idx, scrollY: y}),
			swapCmd);
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Update$PlayPause$handle = F4(
	function (currentSong, model, playAudio, pauseAudio) {
		var cmd = model.isPlaying ? pauseAudio('audioPlayer') : playAudio(
			_Utils_Tuple2('audioPlayer', currentSong.src));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{error: $elm$core$Maybe$Nothing, isPlaying: !model.isPlaying}),
			cmd);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$httpErrorToString = function (err) {
	switch (err.$) {
		case 'BadUrl':
			return 'Bad URL.';
		case 'Timeout':
			return 'Request timed out.';
		case 'NetworkError':
			return 'Network error.';
		case 'BadStatus':
			return 'Server returned an error.';
		default:
			return 'Could not read server response.';
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
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
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Constants$mobileThreshold = 768.0;
var $author$project$Main$pauseAudio = _Platform_outgoingPort('pauseAudio', $elm$json$Json$Encode$string);
var $author$project$Main$playAudio = _Platform_outgoingPort(
	'playAudio',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$string(b)
				]));
	});
var $author$project$Types$ContactSent = function (a) {
	return {$: 'ContactSent', a: a};
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Constants$web3formsAccessKey = '9e3f19e3-d569-4576-8f47-1d96a511ae15';
var $author$project$Main$encodeContact = function (c) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'access_key',
				$elm$json$Json$Encode$string($author$project$Constants$web3formsAccessKey)),
				_Utils_Tuple2(
				'from_name',
				$elm$json$Json$Encode$string(c.name)),
				_Utils_Tuple2(
				'from_email',
				$elm$json$Json$Encode$string(c.email)),
				_Utils_Tuple2(
				'subject',
				$elm$json$Json$Encode$string('New EPK message from ' + c.name)),
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(c.message)),
				_Utils_Tuple2(
				'botcheck',
				$elm$json$Json$Encode$string(c.honeypot))
			]));
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
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
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
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
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
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
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
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
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
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
				if (_v4.$ === 'RBNode_elm_builtin') {
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
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
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
						if (_v7.$ === 'RBNode_elm_builtin') {
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
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
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
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{body: r.body, expect: r.expect, headers: _List_Nil, method: 'POST', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Types$Web3Resp = F2(
	function (success, message) {
		return {message: message, success: success};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Main$web3RespDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Types$Web3Resp,
	A2($elm$json$Json$Decode$field, 'success', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string));
var $author$project$Constants$web3formsEndpoint = 'https://api.web3forms.com/submit';
var $author$project$Main$postContact = function (c) {
	return $elm$http$Http$post(
		{
			body: $elm$http$Http$jsonBody(
				$author$project$Main$encodeContact(c)),
			expect: A2($elm$http$Http$expectJson, $author$project$Types$ContactSent, $author$project$Main$web3RespDecoder),
			url: $author$project$Constants$web3formsEndpoint
		});
};
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Main$scrollReel = _Platform_outgoingPort(
	'scrollReel',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$int(b)
				]));
	});
var $author$project$Main$scrollToId = _Platform_outgoingPort('scrollToId', $elm$json$Json$Encode$string);
var $author$project$Main$seekAudio = _Platform_outgoingPort(
	'seekAudio',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$float(b)
				]));
	});
var $author$project$Main$setActiveBg = _Platform_outgoingPort('setActiveBg', $elm$json$Json$Encode$int);
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$Main$setBodyScroll = _Platform_outgoingPort('setBodyScroll', $elm$json$Json$Encode$bool);
var $author$project$Utils$cdnUrl = F2(
	function (cdnBase, path) {
		if (A2($elm$core$String$startsWith, 'http://', path) || A2($elm$core$String$startsWith, 'https://', path)) {
			return path;
		} else {
			if ($elm$core$String$isEmpty(
				$elm$core$String$trim(cdnBase))) {
				return path;
			} else {
				var p = A2($elm$core$String$startsWith, '/', path) ? path : ('/' + path);
				return _Utils_ap(cdnBase, p);
			}
		}
	});
var $author$project$Main$songs = function (model) {
	return _List_fromArray(
		[
			{
			artwork: $elm$core$Maybe$Just(
				A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/coverart/mortrem-bigblue.png')),
			duration: 322,
			releaseDate: $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
				$elm$time$Time$millisToPosix(1726871480000)),
			released: true,
			src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/audio/mortrem-bigblue.wav'),
			title: 'Big Blue'
		},
			{
			artwork: $elm$core$Maybe$Just(
				A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/coverart/mortrem-nonfiction.png')),
			duration: 275,
			releaseDate: $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
				$elm$time$Time$millisToPosix(1705102280000)),
			released: true,
			src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/audio/mortrem-nonfiction.wav'),
			title: 'Nonfiction'
		},
			{
			artwork: $elm$core$Maybe$Just(
				A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/coverart/mortrem-betterforyou.png')),
			duration: 198,
			releaseDate: $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
				$elm$time$Time$millisToPosix(1712961080000)),
			released: true,
			src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/audio/mortrem-betterforyou.wav'),
			title: 'Better for You'
		}
		]);
};
var $author$project$Main$updateWaveform = _Platform_outgoingPort('updateWaveform', $elm$json$Json$Encode$bool);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$startSong = F2(
	function (idx, model) {
		var total = $elm$core$List$length(
			$author$project$Main$songs(model));
		var boundedIndex = (!total) ? 0 : ((idx < 0) ? (total - 1) : ((_Utils_cmp(idx, total) > -1) ? 0 : idx));
		var nextSong = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Constants$defaultSong,
			$elm$core$List$head(
				A2(
					$elm$core$List$drop,
					boundedIndex,
					$author$project$Main$songs(model))));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{currentSongIndex: boundedIndex, currentTime: 0, error: $elm$core$Maybe$Nothing, isPlaying: true}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Main$playAudio(
						_Utils_Tuple2('audioPlayer', nextSong.src)),
						$author$project$Main$updateWaveform(true)
					])));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			var validEmail = function (e) {
				return A2($elm$core$String$contains, '@', e) && (A2($elm$core$String$contains, '.', e) && ($elm$core$String$length(e) > 5));
			};
			var currentSong = A2(
				$elm$core$Maybe$withDefault,
				$author$project$Constants$defaultSong,
				$elm$core$List$head(
					A2(
						$elm$core$List$drop,
						model.currentSongIndex,
						$author$project$Main$songs(model))));
			switch (msg.$) {
				case 'OnScroll':
					var y = msg.a;
					return A3($author$project$Update$OnScroll$handle, y, model, $author$project$Main$setActiveBg);
				case 'OpenLightbox':
					var payload = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								lightbox: $elm$core$Maybe$Just(payload)
							}),
						$author$project$Main$setBodyScroll(true));
				case 'CloseLightbox':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{lightbox: $elm$core$Maybe$Nothing}),
						$author$project$Main$setBodyScroll(false));
				case 'GotViewport':
					if (msg.a.$ === 'Ok') {
						var vp = msg.a.a;
						var y = vp.viewport.y;
						var w = vp.viewport.width;
						var initCount = ((model.visiblePerfCount === 10) && (_Utils_cmp(w, $author$project$Constants$mobileThreshold) < 0)) ? 5 : model.visiblePerfCount;
						var h = vp.viewport.height;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{scrollY: y, viewportH: h, viewportW: w, visiblePerfCount: initCount}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 'ViewportResized':
					var newW = msg.a;
					var newH = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{viewportH: newH, viewportW: newW}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2($elm$core$Task$attempt, $author$project$Types$GotViewport, $elm$browser$Browser$Dom$getViewport),
									$author$project$Main$measureMarkersCmd($author$project$Constants$videoMarkerIds)
								])));
				case 'MarkersMeasured':
					var pairs = msg.a;
					var sorted = A2($elm$core$List$sortBy, $elm$core$Tuple$second, pairs);
					var bottom = model.scrollY + model.viewportH;
					var idx = A3($author$project$Utils$activeIndexFrom, bottom, sorted, $author$project$Constants$numVideoBgs);
					var swapCmd = (!_Utils_eq(idx, model.activeBgIndex)) ? $author$project$Main$setActiveBg(idx) : $elm$core$Platform$Cmd$none;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{activeBgIndex: idx, videoMarkers: sorted}),
						swapCmd);
				case 'PlayPause':
					return A4($author$project$Update$PlayPause$handle, currentSong, model, $author$project$Main$playAudio, $author$project$Main$pauseAudio);
				case 'NextSong':
					return A2($author$project$Main$startSong, model.currentSongIndex + 1, model);
				case 'PreviousSong':
					return A2($author$project$Main$startSong, model.currentSongIndex - 1, model);
				case 'SelectSong':
					var idx = msg.a;
					return A2($author$project$Main$startSong, idx, model);
				case 'ToggleMenu':
					var newOpen = !model.isMenuOpen;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isMenuOpen: newOpen}),
						$author$project$Main$setBodyScroll(newOpen));
				case 'CloseMenu':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isMenuOpen: false}),
						$author$project$Main$setBodyScroll(false));
				case 'ScrollTo':
					var idStr = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isMenuOpen: false}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$scrollToId(idStr),
									$author$project$Main$setBodyScroll(false)
								])));
				case 'SelectMusicVideo':
					var idx = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{selectedMusicVideoIndex: idx}),
						$elm$core$Platform$Cmd$none);
				case 'ScrollVideoReelLeft':
					return _Utils_Tuple2(
						model,
						$author$project$Main$scrollReel(
							_Utils_Tuple2('video-reel', -1)));
				case 'ScrollVideoReelRight':
					return _Utils_Tuple2(
						model,
						$author$project$Main$scrollReel(
							_Utils_Tuple2('video-reel', 1)));
				case 'TimeUpdate':
					var current = msg.a;
					var duration = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentTime: current, duration: duration}),
						$elm$core$Platform$Cmd$none);
				case 'SongEnded':
					var $temp$msg = $author$project$Types$NextSong,
						$temp$model = model;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 'Seek':
					var time = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentTime: time, error: $elm$core$Maybe$Nothing}),
						$author$project$Main$seekAudio(
							_Utils_Tuple2('audioPlayer', time)));
				case 'SeekProgress':
					var progress = msg.a;
					var seekTime = progress * model.duration;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentTime: seekTime, error: $elm$core$Maybe$Nothing}),
						$author$project$Main$seekAudio(
							_Utils_Tuple2('audioPlayer', seekTime)));
				case 'AudioError':
					var error = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just('Failed to play \'' + (currentSong.title + ('\': ' + error))),
								isPlaying: false
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$updateWaveform(false)
								])));
				case 'FrequencyData':
					var freqData = msg.a;
					var sampleRate = 44100;
					var minFreq = 100;
					var maxFreqNyquist = sampleRate / 2;
					var maxFreq = 10000;
					var bins = 1024;
					var freqPerBin = maxFreqNyquist / bins;
					var maxBin = maxFreq / freqPerBin;
					var minBin = minFreq / freqPerBin;
					var binsPerBar = (maxBin - minBin) / $author$project$Main$barsCount;
					var barHeights = model.isPlaying ? A2(
						$elm$core$List$map,
						function (i) {
							var startBin = $elm$core$Basics$floor(minBin + (i * binsPerBar));
							var endBin = $elm$core$Basics$floor(minBin + ((i + 1) * binsPerBar));
							var width = A2($elm$core$Basics$max, 0, endBin - startBin);
							var binValues = A2(
								$elm$core$List$take,
								width,
								A2($elm$core$List$drop, startBin, freqData));
							var count = $elm$core$List$length(binValues);
							var sum = $elm$core$List$sum(binValues);
							var avg = (count > 0) ? (sum / count) : 0;
							return ((avg / 255) * 100) * 0.8;
						},
						A2($elm$core$List$range, 0, $author$project$Main$barsCount - 1)) : A2($elm$core$List$repeat, $author$project$Main$barsCount, 25.0);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{barHeights: barHeights}),
						$author$project$Main$drawWaveform(barHeights));
				case 'UpdateContactName':
					var v = msg.a;
					var c = model.contact;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								contact: _Utils_update(
									c,
									{name: v}),
								contactStatus: $author$project$Types$ContactEditing
							}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateContactEmail':
					var v = msg.a;
					var c = model.contact;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								contact: _Utils_update(
									c,
									{email: v}),
								contactStatus: $author$project$Types$ContactEditing
							}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateContactMessage':
					var v = msg.a;
					var c = model.contact;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								contact: _Utils_update(
									c,
									{message: v}),
								contactStatus: $author$project$Types$ContactEditing
							}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateContactHoneypot':
					var v = msg.a;
					var c = model.contact;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								contact: _Utils_update(
									c,
									{honeypot: v})
							}),
						$elm$core$Platform$Cmd$none);
				case 'SubmitContact':
					var c = model.contact;
					var valid = ($elm$core$String$length(c.name) >= 2) && (A2($elm$core$String$contains, '@', c.email) && (($elm$core$String$length(c.message) >= 5) && (!$elm$core$String$length(c.honeypot))));
					return (!valid) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								contactStatus: $author$project$Types$ContactError('Please complete all fields correctly.')
							}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{contactStatus: $author$project$Types$ContactSending}),
						$author$project$Main$postContact(c));
				case 'ContactSent':
					if (msg.a.$ === 'Ok') {
						var resp = msg.a.a;
						return resp.success ? _Utils_Tuple2(
							_Utils_update(
								model,
								{contactStatus: $author$project$Types$ContactSuccess}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									contactStatus: $author$project$Types$ContactError(resp.message)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var httpErr = msg.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									contactStatus: $author$project$Types$ContactError(
										$author$project$Main$httpErrorToString(httpErr))
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'DismissContactModal':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{contactStatus: $author$project$Types$ContactIdle}),
						$elm$core$Platform$Cmd$none);
				case 'CopyBandEmail':
					return _Utils_Tuple2(
						model,
						$author$project$Main$copyToClipboard($author$project$Constants$bandEmail));
				case 'GotZone':
					var z = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{zone: z}),
						$elm$core$Platform$Cmd$none);
				case 'GotNow':
					var p = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{now: p}),
						$elm$core$Platform$Cmd$none);
				case 'TogglePerformance':
					var i = msg.a;
					var exp = A2($elm$core$Set$member, i, model.expandedPerf) ? A2($elm$core$Set$remove, i, model.expandedPerf) : A2($elm$core$Set$insert, i, model.expandedPerf);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{expandedPerf: exp}),
						$elm$core$Platform$Cmd$none);
				case 'LoadMorePerformances':
					var step = (_Utils_cmp(model.viewportW, $author$project$Constants$mobileThreshold) < 0) ? 3 : 5;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{visiblePerfCount: model.visiblePerfCount + step}),
						$elm$core$Platform$Cmd$none);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Main$bioText1 = 'Mortrem is the result of raw energy, fearless experimentation, and an obsession with crafting unforgettable live shows. A Waterloo, Ontario-based band determined to reshape the future of alternative metal. With songs that balance intensity and creativity, Mortrem has built a reputation of making audiences feel every emotion of their music.\nMortrem is a band driven to create the ultimate live experience for their fans. In an ever-evolving online world, their ability to engage their fans in a raw and energetic sets them apart from competing acts. From programming their own light shows to writing music that keeps listeners hooked from the first riff to the last note, Mortrem thrives on building moments that linger long after the amps fade. Whether in a packed venue or an intimate club, Mortrem ensures every performance feels immersive, inclusive, and unforgettable.';
var $author$project$Main$bioText2 = 'Born during the pandemic, Mortrem began as a recording project between founding members Kyle Jensen, Sammy Romeo, and Charlie Romeo. What started as a basement experiment quickly grew into something bigger as their catalogue started to take shape into a full album. Drawing on their childhood and modern inspirations in metal and hard rock, the trio carved out Mortrem\'s distinct sound — heavy, experimental, and engaging. With the addition of Samuel George on vocals and Zak Stulla on bass, the band became a fully realized project, united by a shared vision to push musical and live show boundaries.';
var $author$project$Main$bioText3 = 'Mortrem is currently rounding out their first live show cycle that began in September 2024, steadily building a loyal local following while refining a full-scale production show. Their next chapter starts in early 2026 with the release of their debut album One With The Earth — a record designed to set the standard for the band\'s evolution and mark their entry onto the national stage. Backed by a Canadian tour and a consistent social media presence, this release is positioned to be a foundational blueprint for Mortrem\'s future.';
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Types$LbImage = function (a) {
	return {$: 'LbImage', a: a};
};
var $author$project$Types$OpenLightbox = function (a) {
	return {$: 'OpenLightbox', a: a};
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
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
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Main$clickableImage = function (cfg) {
	return A2(
		$elm$html$Html$img,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$src(cfg.src),
				$elm$html$Html$Attributes$alt(cfg.alt),
				$elm$html$Html$Attributes$class(cfg.classes + ' cursor-zoom-in transition hover:opacity-90'),
				$elm$html$Html$Events$onClick(
				$author$project$Types$OpenLightbox(
					{
						caption: cfg.caption,
						extraText: cfg.extraText,
						media: $author$project$Types$LbImage(
							{alt: cfg.alt, src: cfg.src})
					}))
			]),
		_List_Nil);
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$bioPanel = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('bio'),
				$elm$html$Html$Attributes$class('flex flex-col pt-6 md:pt-12 pb-16')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lg:w-2/5')
							]),
						_List_fromArray(
							[
								$author$project$Main$clickableImage(
								{
									alt: 'Zak and Charlie dancing in the crowd during Four Leaf Paradise',
									caption: $elm$core$Maybe$Nothing,
									classes: 'w-full h-full object-cover',
									extraText: $elm$core$Maybe$Nothing,
									src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/zak-charlie-fourleaf.png')
								})
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pt-4 md:pt-6 lg:pt-0 lg:w-3/5 text-white text-md leading-relaxed')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text($author$project$Main$bioText1)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lg:w-3/5 text-white text-md leading-relaxed hidden lg:block')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text($author$project$Main$bioText2)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lg:w-2/5')
							]),
						_List_fromArray(
							[
								$author$project$Main$clickableImage(
								{
									alt: 'A portrait photo of Mortrem in a dark setting',
									caption: $elm$core$Maybe$Nothing,
									classes: 'w-full h-full object-cover',
									extraText: $elm$core$Maybe$Nothing,
									src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/mortrem-profile.jpg')
								})
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pt-4 md:pt-6 lg:pt-0 text-white text-md leading-relaxed visible lg:hidden')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text($author$project$Main$bioText2)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lg:w-2/5')
							]),
						_List_fromArray(
							[
								$author$project$Main$clickableImage(
								{
									alt: 'Mortrem playing music on stage at Club Absinthe in Hamilton',
									caption: $elm$core$Maybe$Nothing,
									classes: 'w-full h-full object-cover',
									extraText: $elm$core$Maybe$Nothing,
									src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/band-absinthe-gig.png')
								})
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pt-4 md:pt-6 lg:pt-0 lg:w-3/5 text-white text-md leading-relaxed')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text($author$project$Main$bioText3)
							]))
					]))
			]));
};
var $author$project$Main$contentPanel = F2(
	function (model, children) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('bg-black w-full px-8 sm:px-16 md:px-24')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mx-auto max-w-[60rem]')
						]),
					children)
				]));
	});
var $author$project$Types$PlayPause = {$: 'PlayPause'};
var $author$project$Types$PreviousSong = {$: 'PreviousSong'};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$audio = _VirtualDom_node('audio');
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Utils$monthAbbrev = function (m) {
	switch (m.$) {
		case 'Jan':
			return 'Jan';
		case 'Feb':
			return 'Feb';
		case 'Mar':
			return 'Mar';
		case 'Apr':
			return 'Apr';
		case 'May':
			return 'May';
		case 'Jun':
			return 'Jun';
		case 'Jul':
			return 'Jul';
		case 'Aug':
			return 'Aug';
		case 'Sep':
			return 'Sep';
		case 'Oct':
			return 'Oct';
		case 'Nov':
			return 'Nov';
		default:
			return 'Dec';
	}
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear = function (_v0) {
	var _int = _v0.a;
	return (!A2($elm$core$Basics$modBy, 4, _int)) && ((!A2($elm$core$Basics$modBy, 400, _int)) || (!(!A2($elm$core$Basics$modBy, 100, _int))));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay = ((1000 * 60) * 60) * 24;
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear = function (year) {
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 366) : ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 365);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt = function (year) {
	return (year > 0) ? $elm$core$Maybe$Just(
		$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Year(year)) : $elm$core$Maybe$Nothing;
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch = function (_v0) {
	var year = _v0.a;
	var getTotalMillis = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$elm$core$List$sum,
			$elm$core$List$map($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear)),
		$elm$core$List$filterMap($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt));
	var epochYear = 1970;
	return (year >= 1970) ? getTotalMillis(
		A2($elm$core$List$range, epochYear, year - 1)) : (-getTotalMillis(
		A2($elm$core$List$range, year, epochYear - 1)));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt = function (_v0) {
	var day = _v0.a;
	return day;
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth = function (day) {
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(day) - 1);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt = function (month) {
	switch (month.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
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
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
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
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months = $elm$core$Array$fromList(
	_List_fromArray(
		[$elm$time$Time$Jan, $elm$time$Time$Feb, $elm$time$Time$Mar, $elm$time$Time$Apr, $elm$time$Time$May, $elm$time$Time$Jun, $elm$time$Time$Jul, $elm$time$Time$Aug, $elm$time$Time$Sep, $elm$time$Time$Oct, $elm$time$Time$Nov, $elm$time$Time$Dec]));
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths = function (month) {
	return $elm$core$Array$toList(
		A3(
			$elm$core$Array$slice,
			0,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt(month) - 1,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf = F2(
	function (year, month) {
		switch (month.$) {
			case 'Jan':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Feb':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(29) : $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(28);
			case 'Mar':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Apr':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(30);
			case 'May':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Jun':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(30);
			case 'Jul':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Aug':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Sep':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(30);
			case 'Oct':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
			case 'Nov':
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(30);
			default:
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day(31);
		}
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear = F2(
	function (year, month) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (m, res) {
					return res + ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(
						A2($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf, year, m)));
				}),
			0,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths(month));
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis = function (_v0) {
	var year = _v0.a.year;
	var month = _v0.a.month;
	var day = _v0.a.day;
	return ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch(year) + A2($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear, year, month)) + $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth(day);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$toMillis = $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis;
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$hoursToInt = function (_v0) {
	var hours = _v0.a;
	return hours;
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$millisecondsToInt = function (_v0) {
	var milliseconds = _v0.a;
	return milliseconds;
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$minutesToInt = function (_v0) {
	var minutes = _v0.a;
	return minutes;
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$secondsToInt = function (_v0) {
	var seconds = _v0.a;
	return seconds;
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$toMillis = function (_v0) {
	var hours = _v0.a.hours;
	var minutes = _v0.a.minutes;
	var seconds = _v0.a.seconds;
	var milliseconds = _v0.a.milliseconds;
	return $elm$core$List$sum(
		_List_fromArray(
			[
				$PanagiotisGeorgiadis$elm_datetime$Clock$Internal$hoursToInt(hours) * 3600000,
				$PanagiotisGeorgiadis$elm_datetime$Clock$Internal$minutesToInt(minutes) * 60000,
				$PanagiotisGeorgiadis$elm_datetime$Clock$Internal$secondsToInt(seconds) * 1000,
				$PanagiotisGeorgiadis$elm_datetime$Clock$Internal$millisecondsToInt(milliseconds)
			]));
};
var $PanagiotisGeorgiadis$elm_datetime$Clock$toMillis = $PanagiotisGeorgiadis$elm_datetime$Clock$Internal$toMillis;
var $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$toMillis = function (_v0) {
	var date = _v0.a.date;
	var time = _v0.a.time;
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$toMillis(date) + $PanagiotisGeorgiadis$elm_datetime$Clock$toMillis(time);
};
var $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$toPosix = A2($elm$core$Basics$composeL, $elm$time$Time$millisToPosix, $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$toMillis);
var $PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix = $PanagiotisGeorgiadis$elm_datetime$DateTime$Internal$toPosix;
var $author$project$Utils$formatMonthYearLocal = F2(
	function (zone, dt) {
		var p = $PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix(dt);
		return $author$project$Utils$monthAbbrev(
			A2($elm$time$Time$toMonth, zone, p)) + (' ' + $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, p)));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Main$formatTime = function (secs) {
	var total = $elm$core$Basics$round(secs);
	var s = A2($elm$core$Basics$modBy, 60, total);
	var pad = function (n) {
		return (n < 10) ? ('0' + $elm$core$String$fromInt(n)) : $elm$core$String$fromInt(n);
	};
	var m = (total / 60) | 0;
	return $elm$core$String$fromInt(m) + (':' + pad(s));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$i = _VirtualDom_node('i');
var $author$project$Types$SeekProgress = function (a) {
	return {$: 'SeekProgress', a: a};
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $author$project$Main$onClickSeek = function () {
	var decodeWidth = A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['currentTarget', 'offsetWidth']),
		$elm$json$Json$Decode$float);
	var decodeOffsetX = A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$float);
	return A2(
		$elm$html$Html$Events$on,
		'click',
		A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (offsetX, width) {
					var frac = (width > 0) ? (offsetX / width) : 0;
					return $author$project$Types$SeekProgress(
						A3($elm$core$Basics$clamp, 0, 1, frac));
				}),
			decodeOffsetX,
			decodeWidth));
}();
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Types$SelectSong = function (a) {
	return {$: 'SelectSong', a: a};
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Main$playlistTableRedesigned = function (model) {
	var releaseDateFor = function (song) {
		return song.released ? A2($author$project$Utils$formatMonthYearLocal, model.zone, song.releaseDate) : '—';
	};
	var durationFor = function (idx) {
		return (_Utils_eq(idx, model.currentSongIndex) && (model.duration > 0)) ? $author$project$Main$formatTime(model.duration) : '--:--';
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('playlist'),
				$elm$html$Html$Attributes$class('mt-6 rounded-2xl bg-slate-900/50 text-white shadow-2xl px-4 py-5 sm:px-6 sm:py-6')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xl font-semibold mb-4')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Playlist')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('overflow-hidden rounded-xl')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full table-auto text-sm')
							]),
						_List_fromArray(
							[
								A3(
								$elm$html$Html$node,
								'colgroup',
								_List_Nil,
								_List_fromArray(
									[
										A3(
										$elm$html$Html$node,
										'col',
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-12')
											]),
										_List_Nil),
										A3($elm$html$Html$node, 'col', _List_Nil, _List_Nil),
										A3(
										$elm$html$Html$node,
										'col',
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-24')
											]),
										_List_Nil),
										A3(
										$elm$html$Html$node,
										'col',
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-40')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$thead,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$tr,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-left uppercase text-[11px] tracking-wide text-white/60 border-b border-white/10')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('py-2 pl-3 pr-2')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('#')
													])),
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('py-2 pr-2')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Song Title')
													])),
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('py-2 pr-2')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Duration')
													])),
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('py-2 pr-3 text-right')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Release Date')
													]))
											]))
									])),
								A2(
								$elm$html$Html$tbody,
								_List_Nil,
								A2(
									$elm$core$List$indexedMap,
									F2(
										function (idx, song) {
											var rowBase = 'cursor-pointer border-b border-white/5';
											var isCurrent = _Utils_eq(idx, model.currentSongIndex);
											var rowState = isCurrent ? ' bg-white/10' : ' hover:bg-white/5';
											return A2(
												$elm$html$Html$tr,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class(
														_Utils_ap(rowBase, rowState)),
														$elm$html$Html$Events$onClick(
														$author$project$Types$SelectSong(idx))
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$td,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('py-2 pl-3 pr-2 opacity-70 whitespace-nowrap')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$elm$core$String$fromInt(idx + 1))
															])),
														A2(
														$elm$html$Html$td,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('py-2 pr-4')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('truncate')
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(song.title)
																	]))
															])),
														A2(
														$elm$html$Html$td,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('py-2 pr-2 whitespace-nowrap')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$author$project$Main$formatTime(song.duration))
															])),
														A2(
														$elm$html$Html$td,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('py-2 pr-3 text-right whitespace-nowrap')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																releaseDateFor(song))
															]))
													]));
										}),
									$author$project$Main$songs(model)))
							]))
					]))
			]));
};
var $elm$html$Html$Attributes$preload = $elm$html$Html$Attributes$stringProperty('preload');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Main$discographyPanel = function (model) {
	var progressPct = (model.duration > 0) ? ((model.currentTime / model.duration) * 100) : 0;
	var currentSong = A2(
		$elm$core$Maybe$withDefault,
		$author$project$Constants$defaultSong,
		$elm$core$List$head(
			A2(
				$elm$core$List$drop,
				model.currentSongIndex,
				$author$project$Main$songs(model))));
	var releaseDateText = currentSong.released ? ('Released ' + A2($author$project$Utils$formatMonthYearLocal, model.zone, currentSong.releaseDate)) : 'Unreleased';
	var artistName = 'Mortrem';
	var artSrc = function () {
		var _v0 = currentSong.artwork;
		if (_v0.$ === 'Just') {
			var url = _v0.a;
			return url;
		} else {
			return A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/coverart/default.png');
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('discography'),
				$elm$html$Html$Attributes$class('pt-16 md:pt-28 lg:px-16 md:max-w-5xl lg:max-w-8xl mx-auto text-white')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$audio,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('audioPlayer'),
						A2($elm$html$Html$Attributes$attribute, 'crossorigin', 'anonymous'),
						$elm$html$Html$Attributes$src(currentSong.src),
						$elm$html$Html$Attributes$preload('auto'),
						$elm$html$Html$Attributes$class('hidden')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						A2(
							$elm$core$String$join,
							' ',
							_List_fromArray(
								['rounded-2xl bg-slate-900/50 text-white shadow 2xl', 'px-4 py-5 sm:px-6 sm:py-6'])))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('grid grid-cols-12 gap-4 sm:gap-6 items-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-span-4 sm:col-span-3 md:col-span-3 flex justify-center')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$src(artSrc),
												$elm$html$Html$Attributes$alt('Album cover art'),
												$elm$html$Html$Attributes$class('w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl object-cover shadow-md')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-span-8 sm:col-span-9 md:col-span-9')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-start justify-between gap-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$h2,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-2xl sm:text-3xl font-bold leading-tight')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(currentSong.title)
															])),
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('mt-1 text-sm sm:text-base text-white/70')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(artistName)
															]))
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class(
														A2(
															$elm$core$String$join,
															' ',
															_List_fromArray(
																[
																	'hidden sm:inline-flex items-center text-xs px-2 py-1',
																	'rounded-full border border-white/20',
																	currentSong.released ? 'bg-white/10' : 'bg-amber-500/10 text-amber-200'
																])))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(releaseDateText)
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-4 relative')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-full h-2 rounded-full bg-slate-700/70 overflow-hidden')
													]),
												_List_Nil),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('absolute left-0 top-0 h-2 rounded-full bg-sky-400/80'),
														A2(
														$elm$html$Html$Attributes$style,
														'width',
														$elm$core$String$fromFloat(progressPct) + '%')
													]),
												_List_Nil),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('absolute inset-0 cursor-pointer'),
														$author$project$Main$onClickSeek
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-1 flex justify-between text-xs text-white/60')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														$author$project$Main$formatTime(model.currentTime))
													])),
												A2(
												$elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														(model.duration > 0) ? $author$project$Main$formatTime(model.duration) : '--:--')
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-6 flex justify-center gap-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md'),
										$elm$html$Html$Events$onClick($author$project$Types$PreviousSong),
										$elm$html$Html$Attributes$title('Previous')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$i,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('fa-solid fa-backward-step text-xl'),
												A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('sr-only')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Previous')
											]))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md'),
										$elm$html$Html$Events$onClick($author$project$Types$PlayPause),
										$elm$html$Html$Attributes$title(
										model.isPlaying ? 'Pause' : 'Play')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$i,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class(
												'fa-solid ' + ((model.isPlaying ? 'fa-pause' : 'fa-play') + ' text-xl')),
												A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('sr-only')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												model.isPlaying ? 'Pause' : 'Play')
											]))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md'),
										$elm$html$Html$Events$onClick($author$project$Types$NextSong),
										$elm$html$Html$Attributes$title('Next')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$i,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('fa-solid fa-forward-step text-xl'),
												A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('sr-only')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Next')
											]))
									]))
							]))
					])),
				$author$project$Main$playlistTableRedesigned(model)
			]));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $author$project$Types$CopyBandEmail = {$: 'CopyBandEmail'};
var $author$project$Types$DismissContactModal = {$: 'DismissContactModal'};
var $author$project$Types$SubmitContact = {$: 'SubmitContact'};
var $author$project$Types$UpdateContactEmail = function (a) {
	return {$: 'UpdateContactEmail', a: a};
};
var $author$project$Types$UpdateContactHoneypot = function (a) {
	return {$: 'UpdateContactHoneypot', a: a};
};
var $author$project$Types$UpdateContactMessage = function (a) {
	return {$: 'UpdateContactMessage', a: a};
};
var $author$project$Types$UpdateContactName = function (a) {
	return {$: 'UpdateContactName', a: a};
};
var $elm$html$Html$Attributes$autocomplete = function (bool) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$readonly = $elm$html$Html$Attributes$boolProperty('readOnly');
var $elm$html$Html$small = _VirtualDom_node('small');
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$contactForm = function (model) {
	var successNote = function () {
		var _v5 = model.contactStatus;
		if (_v5.$ === 'ContactSuccess') {
			return $elm$core$Maybe$Just(
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 p-3 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30 text-emerald-200')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Thanks! We received your message and will reply soon.')
						])));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	var inputBase = 'w-full px-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 outline-none ring-1 ring-white/10 focus:ring-white/30';
	var failureModal = function () {
		var _v4 = model.contactStatus;
		if (_v4.$ === 'ContactError') {
			var msg = _v4.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 p-3 rounded-md bg-red-500/10 ring-1 ring-red-400/30 text-red-200')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('We couldn\'t send your message: ' + (msg + ' Try again or email us directly: '))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-3 flex items-stretch gap-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(inputBase + ' flex-1 bg-black/20'),
											$elm$html$Html$Attributes$value($author$project$Constants$bandEmail),
											$elm$html$Html$Attributes$readonly(true)
										]),
									_List_Nil),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('px-3 rounded-md bg-white/15 hover:bg-white/25'),
											$elm$html$Html$Events$onClick($author$project$Types$CopyBandEmail)
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$i,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('fa-regular fa-copy')
												]),
											_List_Nil)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-3')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20'),
											$elm$html$Html$Events$onClick($author$project$Types$DismissContactModal)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Close')
										]))
								]))
						])));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2 gap-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(inputBase),
									$elm$html$Html$Attributes$placeholder('Your name'),
									$elm$html$Html$Events$onInput($author$project$Types$UpdateContactName),
									$elm$html$Html$Attributes$value(model.contact.name)
								]),
							_List_Nil),
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(inputBase),
									$elm$html$Html$Attributes$placeholder('you@example.com'),
									$elm$html$Html$Events$onInput($author$project$Types$UpdateContactEmail),
									$elm$html$Html$Attributes$type_('email'),
									$elm$html$Html$Attributes$value(model.contact.email)
								]),
							_List_Nil),
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(inputBase + ' md:col-span-2 min-h-[120px]'),
									$elm$html$Html$Attributes$placeholder('Tell us about the show, date, etc.'),
									$elm$html$Html$Events$onInput($author$project$Types$UpdateContactMessage),
									$elm$html$Html$Attributes$value(model.contact.message)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(model.contact.message)
								])),
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('hidden'),
									$elm$html$Html$Attributes$placeholder('Leave empty'),
									$elm$html$Html$Events$onInput($author$project$Types$UpdateContactHoneypot),
									$elm$html$Html$Attributes$value(model.contact.honeypot),
									$elm$html$Html$Attributes$autocomplete(false)
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-3 flex items-center gap-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									function () {
										var _v0 = model.contactStatus;
										if (_v0.$ === 'ContactSending') {
											return 'px-4 py-2 rounded-md bg-white/20 cursor-wait';
										} else {
											return 'px-4 py-2 rounded-md bg-white/10 hover:bg-white/20';
										}
									}()),
									$elm$html$Html$Events$onClick($author$project$Types$SubmitContact)
								]),
							_List_fromArray(
								[
									function () {
									var _v1 = model.contactStatus;
									if (_v1.$ === 'ContactSending') {
										return $elm$html$Html$text('Sending…');
									} else {
										return $elm$html$Html$text('Send');
									}
								}()
								])),
							A2(
							$elm$html$Html$small,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-white/60')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('We’ll never share your info.')
								]))
						]))
				]),
			_Utils_ap(
				function () {
					if (successNote.$ === 'Just') {
						var n = successNote.a;
						return _List_fromArray(
							[n]);
					} else {
						return _List_Nil;
					}
				}(),
				function () {
					if (failureModal.$ === 'Just') {
						var m = failureModal.a;
						return _List_fromArray(
							[m]);
					} else {
						return _List_Nil;
					}
				}())));
};
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Main$footer = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('footer'),
				$elm$html$Html$Attributes$class('relative w-full py-10 md:py-14 px-6 md:px-12 backdrop-blur-xl bg-black/60 ring-1 ring-white/10')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 text-white')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('uppercase text-sm tracking-wider text-white/70 mb-3')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Follow us')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-4 text-2xl')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://open.spotify.com/artist/1z9AQTlfG5SjjDtKf1r2Mt'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('hover:text-white/70')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$i,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('fa-brands fa-spotify')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://music.apple.com/ca/artist/mortrem/1723532370'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('hover:text-white/70')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$i,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('fa-brands fa-apple')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://www.youtube.com/channel/UCLaZTiER4UOVGzsCV50tbfA'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('hover:text-white/70')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$i,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('fa-brands fa-youtube')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://instagram.com/mortremband'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('hover:text-white/70')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$i,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('fa-brands fa-instagram')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://tiktok.com/@mortremband'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('hover:text-white/70')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$i,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('fa-brands fa-tiktok')
													]),
												_List_Nil)
											]))
									])),
								A2(
								$elm$html$Html$hr,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('my-6 border-white/10')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$h3,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('uppercase text-sm tracking-wider text-white/70 mb-3')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Contact')
									])),
								$author$project$Main$contactForm(model)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('md:ml-auto md:justify-self-end md:text-right')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('uppercase text-sm tracking-wider text-white/70 mb-3 md:text-right')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Resources')
									])),
								A2(
								$elm$html$Html$ul,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('space-y-2 md:text-right')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href(
														A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/docs/mortrem-tech-rider.pdf')),
														$elm$html$Html$Attributes$class('hover:underline'),
														$elm$html$Html$Attributes$target('_blank')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Tech Rider')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href(
														A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/docs/mortrem-stage-plot.pdf')),
														$elm$html$Html$Attributes$class('hover:underline'),
														$elm$html$Html$Attributes$target('_blank')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Stage Plot')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://www.dropbox.com/scl/fo/xeyfda3ze6e1bo7652ihh/AGQQTbgnvYnVpSY6QtlaOjc?rlkey=51qn09u8p20c9qugqykwb9m2q&st=ctn73jvi&dl=0'),
														$elm$html$Html$Attributes$class('hover:underline'),
														$elm$html$Html$Attributes$target('_blank')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Press Materials')
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Main$galleryImages = function (model) {
	return _List_fromArray(
		[
			{
			colSpan: 4,
			image: {
				alt: 'Samuel George. Lead Singer. Walking on stage in red light.',
				src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/gallery/samuel-george-lees.png')
			},
			rowSpan: 6
		},
			{
			colSpan: 4,
			image: {
				alt: 'Charlie Romeo. Guitar. Playing guitar in green light.',
				src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/gallery/charlie-romeo-lees.png')
			},
			rowSpan: 4
		},
			{
			colSpan: 6,
			image: {
				alt: 'Kyle Jensen. Guitar & Vocals. Playing guitar and singing with a blue light.',
				src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/gallery/kyle-jensen-lees.png')
			},
			rowSpan: 4
		},
			{
			colSpan: 4,
			image: {
				alt: 'Sammy Romeo. Drums. Playing drums on stage.',
				src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/gallery/sammy-romeo-lees.png')
			},
			rowSpan: 6
		},
			{
			colSpan: 4,
			image: {
				alt: 'Zak Stulla. Bass Guitar. Holding a black bass guitar.',
				src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/gallery/zak-stulla-lees.png')
			},
			rowSpan: 6
		}
		]);
};
var $author$project$Main$bottomUpBlackGradientSpan = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('absolute bottom-0 h-[2%] w-full bg-gradient-to-t from-black to-black/0 z-10')
		]),
	_List_Nil);
var $author$project$Main$heroBannerContent = function (model) {
	var scale = A2($elm$core$Basics$max, 0, 1 - (model.scrollY / 300));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('h-[100dvh] flex items-center justify-center text-white relative'),
				A2($elm$html$Html$Attributes$style, 'z-index', '10')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative z-20 flex items-center justify-center h-full')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(
								A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/Mortrem-logo-white-transparent.png')),
								$elm$html$Html$Attributes$alt('Mortrem Logo'),
								$elm$html$Html$Attributes$class('w-[60%] transition-transform duration-100'),
								A2(
								$elm$html$Html$Attributes$style,
								'transform',
								'scale(' + ($elm$core$String$fromFloat(scale) + ')'))
							]),
						_List_Nil)
					])),
				$author$project$Main$bottomUpBlackGradientSpan
			]));
};
var $author$project$Types$LightboxDetails = F3(
	function (media, caption, extraText) {
		return {caption: caption, extraText: extraText, media: media};
	});
var $author$project$Main$galleryImageComponent = function (g) {
	var rs = g.rowSpan;
	var i = g.image;
	var cs = g.colSpan;
	return A2(
		$elm$html$Html$img,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$src(i.src),
				$elm$html$Html$Attributes$alt(i.alt),
				$elm$html$Html$Attributes$class(
				'col-span-12 sm:col-span-' + ($elm$core$String$fromInt(cs) + (' row-span-12 sm:row-span-' + ($elm$core$String$fromInt(rs) + ' cursor-pointer object-cover transform hover:scale-[1.03] transition')))),
				$elm$html$Html$Events$onClick(
				$author$project$Types$OpenLightbox(
					A3(
						$author$project$Types$LightboxDetails,
						$author$project$Types$LbImage(
							{alt: i.alt, src: i.src}),
						$elm$core$Maybe$Nothing,
						$elm$core$Maybe$Nothing)))
			]),
		_List_Nil);
};
var $author$project$Main$imageGallery = function (images) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('gallery'),
				$elm$html$Html$Attributes$class('w-full py-8 md:py-16 overflow-hidden')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-cols-12 overflow-hidden')
					]),
				A2($elm$core$List$map, $author$project$Main$galleryImageComponent, images))
			]));
};
var $author$project$Types$ScrollTo = function (a) {
	return {$: 'ScrollTo', a: a};
};
var $author$project$Main$albumArtwork = F2(
	function (model, song) {
		return A2(
			$elm$core$Maybe$withDefault,
			A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/coverart/default.png'),
			song.artwork);
	});
var $author$project$Main$miniPlayer = function (model) {
	var playLabel = model.isPlaying ? 'Pause' : 'Play';
	var currentSong = A2(
		$elm$core$Maybe$withDefault,
		$author$project$Constants$defaultSong,
		$elm$core$List$head(
			A2(
				$elm$core$List$drop,
				model.currentSongIndex,
				$author$project$Main$songs(model))));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('w-full flex items-center gap-3 text-white py-2')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center gap-2 cursor-pointer'),
						$elm$html$Html$Events$onClick(
						$author$project$Types$ScrollTo('playlist'))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(
								A2($author$project$Main$albumArtwork, model, currentSong)),
								$elm$html$Html$Attributes$alt('Cover'),
								$elm$html$Html$Attributes$class('w-10 h-10 rounded object-cover')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-base truncate')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(currentSong.title)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('ml-auto flex items-center gap-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-3 py-2 rounded hover:bg-white/10'),
								$elm$html$Html$Events$onClick($author$project$Types$PreviousSong),
								$elm$html$Html$Attributes$title('Previous')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fa-solid fa-backward-step text-xl'),
										A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sr-only')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Previous')
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-3 py-2 rounded hover:bg-white/10'),
								$elm$html$Html$Events$onClick($author$project$Types$PlayPause),
								$elm$html$Html$Attributes$title(playLabel)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										'fa-solid ' + ((model.isPlaying ? 'fa-pause' : 'fa-play') + ' text-xl')),
										A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sr-only')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(playLabel)
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-3 py-2 rounded hover:bg-white/10'),
								$elm$html$Html$Events$onClick($author$project$Types$NextSong),
								$elm$html$Html$Attributes$title('Next')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fa-solid fa-forward-step text-xl'),
										A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sr-only')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Next')
									]))
							]))
					]))
			]));
};
var $author$project$Main$socialMediaLinks = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('uppercase text-sm tracking-wider text-white/70 mb-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Follow us')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex items-center gap-4 text-2xl')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://open.spotify.com/artist/1z9AQTlfG5SjjDtKf1r2Mt'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('hover:text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-brands fa-spotify')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://music.apple.com/ca/artist/mortrem/1723532370'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('hover:text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-brands fa-apple')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://www.youtube.com/channel/UCLaZTiER4UOVGzsCV50tbfA'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('hover:text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-brands fa-youtube')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://instagram.com/mortremband'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('hover:text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-brands fa-instagram')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://tiktok.com/@mortremband'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('hover:text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-brands fa-tiktok')
								]),
							_List_Nil)
						]))
				])),
			A2(
			$elm$html$Html$hr,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-6 border-white/10')
				]),
			_List_Nil)
		]));
var $author$project$Main$mobileSidePanel = function (model) {
	var translateClass = model.isMenuOpen ? ' translate-x-0' : ' -translate-x-full';
	var panelClasses = 'fixed left-0 top-16 h-[calc(100vh-4rem)] z-[900] w-full ' + ('transform will-change-transform ' + ('backdrop-blur-xl backdrop-saturate-150 bg-black/95 ' + ('ring-1 ring-white/10 shadow-2xl text-white overflow-y-auto no-scrollbar ' + 'data-[ready=true]:transition-transform data-[ready=true]:duration-300')));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('sidepanel'),
				$elm$html$Html$Attributes$class(
				_Utils_ap(panelClasses, translateClass))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-4 space-y-6')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm uppercase tracking-wider opacity-80')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Media Player')
							])),
						$author$project$Main$miniPlayer(model),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('space-y-2')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm uppercase tracking-wider opacity-80')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Quick Links')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-full text-left px-3 py-2 rounded hover:bg-white/10'),
										$elm$html$Html$Events$onClick(
										$author$project$Types$ScrollTo('bio'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Who We Are')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-full text-left px-3 py-2 rounded hover:bg-white/10'),
										$elm$html$Html$Events$onClick(
										$author$project$Types$ScrollTo('discography'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Music & Videos')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-full text-left px-3 py-2 rounded hover:bg-white/10'),
										$elm$html$Html$Events$onClick(
										$author$project$Types$ScrollTo('performance-history'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Performance Metrics')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-full text-left px-3 py-2 rounded hover:bg-white/10'),
										$elm$html$Html$Events$onClick(
										$author$project$Types$ScrollTo('gallery'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Gallery')
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-4 space-y-2 text-white')
					]),
				_List_fromArray(
					[$author$project$Main$socialMediaLinks]))
			]));
};
var $author$project$Types$ScrollVideoReelLeft = {$: 'ScrollVideoReelLeft'};
var $author$project$Types$ScrollVideoReelRight = {$: 'ScrollVideoReelRight'};
var $author$project$Types$SelectMusicVideo = function (a) {
	return {$: 'SelectMusicVideo', a: a};
};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Main$musicVideos = _List_fromArray(
	[
		{thumbnail: '', title: 'WATCH: Mortrem\'s Epic Performance at the Whiskey Pit Will Leave You Speechless!', youtubeId: 'BBLWe1Go59E'},
		{thumbnail: '', title: 'Mortrem - Nonfiction (Music Video)', youtubeId: 'pGWly6GZbs4'},
		{thumbnail: '', title: 'Mortrem - Big Blue (Official Lyric Video)', youtubeId: 'tsgr0ryIGAY'},
		{thumbnail: '', title: 'Nonfiction | Drum Playthrough', youtubeId: 'CWaf0PVKbb8'}
	]);
var $author$project$Main$youtubeEmbedUrl = function (ytId) {
	return 'https://www.youtube.com/embed/' + (ytId + '?rel=0&modestbranding=1&playsinline=1');
};
var $author$project$Main$youtubeThumb = function (mv) {
	return ($elm$core$String$length(mv.thumbnail) > 0) ? mv.thumbnail : ('https://img.youtube.com/vi/' + (mv.youtubeId + '/hqdefault.jpg'));
};
var $author$project$Main$musicVideosPanel = function (model) {
	var videos = $author$project$Main$musicVideos;
	var currentVideo = A2(
		$elm$core$Maybe$withDefault,
		{thumbnail: '', title: '', youtubeId: ''},
		$elm$core$List$head(
			A2($elm$core$List$drop, model.selectedMusicVideoIndex, videos)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('pt-8 py-16 md:py-24 md:pt-16 lg:px-16 xl:px-32')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg md:text-xl text-white font-bold mb-4 md:mb-6')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Videos')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pt-[56.25%]')
							]),
						_List_Nil),
						A3(
						$elm$html$Html$node,
						'iframe',
						_List_fromArray(
							[
								A2(
								$elm$html$Html$Attributes$attribute,
								'src',
								$author$project$Main$youtubeEmbedUrl(currentVideo.youtubeId)),
								A2($elm$html$Html$Attributes$attribute, 'title', currentVideo.title),
								$elm$html$Html$Attributes$class('absolute inset-0 w-full h-full'),
								A2($elm$html$Html$Attributes$attribute, 'frameborder', '0'),
								A2($elm$html$Html$Attributes$attribute, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'),
								A2($elm$html$Html$Attributes$attribute, 'allowfullscreen', ''),
								A2($elm$html$Html$Attributes$attribute, 'referrerpolicy', 'strict-origin-when-cross-origin')
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative mt-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 shadow'),
								$elm$html$Html$Events$onClick($author$project$Types$ScrollVideoReelLeft),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Scroll left')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fa-solid fa-chevron-left text-white')
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('video-reel'),
								$elm$html$Html$Attributes$class(
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['mx-10 px-4 md:px-6 py-2', 'flex gap-3 overflow-x-auto no-scrollbar scroll-smooth', 'snap-x snap-mandatory', '[scroll-padding-left:1rem] [scroll-padding-right:1rem]'])))
							]),
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (idx, mv) {
									var isCurrent = _Utils_eq(idx, model.selectedMusicVideoIndex);
									var ringCls = isCurrent ? 'ring-2 ring-gray-400' : 'ring-1 ring-white/15 hover:ring-white/30';
									return A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('relative flex-shrink-0 snap-start ' + ('rounded-xl overflow-hidden bg-black/60 ' + ('w-40 sm:w-52 md:w-60 aspect-video ' + ringCls))),
												$elm$html$Html$Events$onClick(
												$author$project$Types$SelectMusicVideo(idx)),
												A2($elm$html$Html$Attributes$attribute, 'title', mv.title)
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$img,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$src(
														$author$project$Main$youtubeThumb(mv)),
														$elm$html$Html$Attributes$alt(mv.title),
														$elm$html$Html$Attributes$class('absolute inset-0 w-full h-full object-cover opacity-90')
													]),
												_List_Nil),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('absolute inset-0 flex items-center justify-center')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class(
																'rounded-full p-3 bg-black/50 ' + (isCurrent ? 'text-gray-300' : 'text-white'))
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$i,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('fa-solid fa-play')
																	]),
																_List_Nil)
															]))
													]))
											]));
								}),
							videos)),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 shadow'),
								$elm$html$Html$Events$onClick($author$project$Types$ScrollVideoReelRight),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Scroll right')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fa-solid fa-chevron-right text-white')
									]),
								_List_Nil)
							]))
					]))
			]));
};
var $author$project$Types$ToggleMenu = {$: 'ToggleMenu'};
var $author$project$Main$topDownBlackGradientSpan = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('relative top-0 h-[10%] w-full bg-gradient-to-b from-black to-black/0 z-10')
		]),
	_List_Nil);
var $author$project$Main$navbar = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('navbar'),
				A2($elm$html$Html$Attributes$attribute, 'data-ready', 'false'),
				$elm$html$Html$Attributes$class('fixed top-0 left-0 w-full h-18 z-[1000] transform -translate-y-full' + 'data-[ready=true]:transition-transform data-[ready=true]:duration-300 data-[ready=true]:ease-in-out ')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('h-16 bg-black text-white flex items-center justify-center relative')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(
								A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/Mortrem-logo-white-transparent.png')),
								$elm$html$Html$Attributes$alt('Mortrem Logo'),
								$elm$html$Html$Attributes$class('h-12')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute right-4 top-1/2 -translate-y-1/2 py-1 px-2.5 rounded-md border border-black bg-white/10 hover:bg-white/15 shadow-md'),
								$elm$html$Html$Events$onClick($author$project$Types$ToggleMenu),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Menu'),
								A2(
								$elm$html$Html$Attributes$attribute,
								'aria-expanded',
								model.isMenuOpen ? 'true' : 'false')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										'fa-solid ' + ((model.isMenuOpen ? 'fa-xmark' : 'fa-bars') + ' text-lg'))
									]),
								_List_Nil)
							]))
					])),
				$author$project$Main$topDownBlackGradientSpan
			]));
};
var $author$project$Main$navbarMarker = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$id('navbar-marker'),
			$elm$html$Html$Attributes$class('h-[0px] bg-black block')
		]),
	_List_Nil);
var $author$project$Types$LoadMorePerformances = {$: 'LoadMorePerformances'};
var $author$project$Types$TogglePerformance = function (a) {
	return {$: 'TogglePerformance', a: a};
};
var $author$project$Utils$formatDateLocal = F2(
	function (zone, dt) {
		var p = $PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix(dt);
		return $author$project$Utils$monthAbbrev(
			A2($elm$time$Time$toMonth, zone, p)) + (' ' + ($elm$core$String$fromInt(
			A2($elm$time$Time$toDay, zone, p)) + (', ' + $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, p)))));
	});
var $author$project$Utils$pad2 = function (n) {
	return (n < 10) ? ('0' + $elm$core$String$fromInt(n)) : $elm$core$String$fromInt(n);
};
var $author$project$Utils$formatTimeLocalHHMM = F2(
	function (zone, dt) {
		var p = $PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix(dt);
		return $author$project$Utils$pad2(
			A2($elm$time$Time$toHour, zone, p)) + (':' + $author$project$Utils$pad2(
			A2($elm$time$Time$toMinute, zone, p)));
	});
var $author$project$Types$Headline = {$: 'Headline'};
var $author$project$Types$Open = {$: 'Open'};
var $author$project$Types$Support = {$: 'Support'};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (_v0.$ === 'Just') {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$core$String$append = _String_append;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	var helper = function (str) {
		if (_Utils_eq(
			$elm$core$String$length(str),
			quantity)) {
			var _v0 = $elm$core$String$toInt(str);
			if (_v0.$ === 'Just') {
				var intVal = _v0.a;
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$Done,
					$elm$parser$Parser$succeed(intVal));
			} else {
				return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
			}
		} else {
			return A2(
				$elm$parser$Parser$map,
				function (nextChar) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$String$append, str, nextChar));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
		}
	};
	return A2($elm$parser$Parser$loop, '', helper);
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$symbol('-')),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('-')),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
				]))));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
	var utcOffsetMinutesFromParts = F3(
		function (multiplier, hours, minutes) {
			return (multiplier * (hours * 60)) + minutes;
		});
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return 0;
					},
					$elm$parser$Parser$symbol('Z')),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(utcOffsetMinutesFromParts),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										function (_v1) {
											return 1;
										},
										$elm$parser$Parser$symbol('+')),
										A2(
										$elm$parser$Parser$map,
										function (_v2) {
											return -1;
										},
										$elm$parser$Parser$symbol('-'))
									]))),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol(':')),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
								$elm$parser$Parser$succeed(0)
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$end)
				])));
}();
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol(':')),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
										]))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$keeper,
										A2(
											$elm$parser$Parser$ignorer,
											$elm$parser$Parser$succeed($elm$core$Basics$identity),
											$elm$parser$Parser$symbol(':')),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$succeed(0)
									]))),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					A2($elm$parser$Parser$ignorer, $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $author$project$Utils$posixFromIso = function (s) {
	return A2(
		$elm$core$Result$mapError,
		function (_v0) {
			return 'Invalid ISO-8601 timestamp';
		},
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(s));
};
var $author$project$Utils$dateTimeResult = function (s) {
	return A2(
		$elm$core$Result$map,
		$PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix,
		$author$project$Utils$posixFromIso(s));
};
var $author$project$Utils$dateTime = function (s) {
	var _v0 = $author$project$Utils$dateTimeResult(s);
	if (_v0.$ === 'Ok') {
		var dt = _v0.a;
		return dt;
	} else {
		return $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
			$elm$time$Time$millisToPosix(0));
	}
};
var $author$project$Constants$venue_absinthe = {capacity: 150, city: 'Hamilton', distanceFromHomeKm: 68, name: 'Club Absinthe'};
var $author$project$Constants$venue_duffysTavern = {capacity: 200, city: 'Toronto', distanceFromHomeKm: 110, name: 'Duffy\'s Tavern'};
var $author$project$Constants$venue_hardLuck = {capacity: 200, city: 'Toronto', distanceFromHomeKm: 113, name: 'Hard Luck'};
var $author$project$Constants$venue_jimmyJazz = {capacity: 180, city: 'Guelph', distanceFromHomeKm: 27, name: 'Jimmy Jazz'};
var $author$project$Constants$venue_leesPalace = {capacity: 450, city: 'Toronto', distanceFromHomeKm: 113, name: 'Lee\'s Palace'};
var $author$project$Constants$venue_redPapaya = {capacity: 200, city: 'Guelph', distanceFromHomeKm: 28, name: 'Red Papaya'};
var $author$project$Constants$venue_sneakyDees = {capacity: 220, city: 'Toronto', distanceFromHomeKm: 114, name: 'Sneaky Dees'};
var $author$project$Constants$venue_tailOfTheJunction = {capacity: 120, city: 'Toronto', distanceFromHomeKm: 94, name: 'Tail of the Junction'};
var $author$project$Constants$venue_theCasbah = {capacity: 160, city: 'Hamilton', distanceFromHomeKm: 65, name: 'The Casbah'};
var $author$project$Constants$venue_theUnion = {capacity: 200, city: 'Kitchener', distanceFromHomeKm: 9, name: 'The Union'};
var $author$project$Main$performances = _List_fromArray(
	[
		{
		datetime: $author$project$Utils$dateTime('2024-09-26T02:45:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 400.0,
		merchSold: {shirts: 26, stickers: 9},
		newFollowers: 3,
		organicDraw: 0,
		ourDraw: 32,
		position: $author$project$Types$Support,
		ticketPrice: 15.0,
		totalDraw: 53,
		venue: $author$project$Constants$venue_theCasbah
	},
		{
		datetime: $author$project$Utils$dateTime('2024-11-09T03:00:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 10.0,
		merchSold: {shirts: 1, stickers: 2},
		newFollowers: 1,
		organicDraw: 0,
		ourDraw: 11,
		position: $author$project$Types$Headline,
		ticketPrice: 15.0,
		totalDraw: 18,
		venue: $author$project$Constants$venue_tailOfTheJunction
	},
		{
		datetime: $author$project$Utils$dateTime('2024-12-28T03:45:00.000Z'),
		durationMinutes: 40,
		hide: false,
		merchSales: 40.0,
		merchSold: {shirts: 3, stickers: 6},
		newFollowers: 8,
		organicDraw: 0,
		ourDraw: 14,
		position: $author$project$Types$Support,
		ticketPrice: 0.0,
		totalDraw: 43,
		venue: $author$project$Constants$venue_jimmyJazz
	},
		{
		datetime: $author$project$Utils$dateTime('2025-02-09T01:00:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 7, stickers: 4},
		newFollowers: 3,
		organicDraw: 0,
		ourDraw: 13,
		position: $author$project$Types$Headline,
		ticketPrice: 15.0,
		totalDraw: 26,
		venue: $author$project$Constants$venue_theUnion
	},
		{
		datetime: $author$project$Utils$dateTime('2025-04-11T02:15:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 10, stickers: 7},
		newFollowers: 6,
		organicDraw: 4,
		ourDraw: 27,
		position: $author$project$Types$Support,
		ticketPrice: 20.0,
		totalDraw: 63,
		venue: $author$project$Constants$venue_leesPalace
	},
		{
		datetime: $author$project$Utils$dateTime('2025-05-08T01:30:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 3, stickers: 2},
		newFollowers: 2,
		organicDraw: 0,
		ourDraw: 16,
		position: $author$project$Types$Open,
		ticketPrice: 15.0,
		totalDraw: 33,
		venue: $author$project$Constants$venue_theUnion
	},
		{
		datetime: $author$project$Utils$dateTime('2025-06-07T02:45:00.000Z'),
		durationMinutes: 45,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 5, stickers: 1},
		newFollowers: 12,
		organicDraw: 3,
		ourDraw: 17,
		position: $author$project$Types$Headline,
		ticketPrice: 20.0,
		totalDraw: 67,
		venue: $author$project$Constants$venue_sneakyDees
	},
		{
		datetime: $author$project$Utils$dateTime('2025-06-08T03:00:00.000Z'),
		durationMinutes: 40,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 5, stickers: 0},
		newFollowers: 4,
		organicDraw: 2,
		ourDraw: 17,
		position: $author$project$Types$Headline,
		ticketPrice: 20.0,
		totalDraw: 42,
		venue: $author$project$Constants$venue_absinthe
	},
		{
		datetime: $author$project$Utils$dateTime('2025-06-16T01:30:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 0.0,
		merchSold: {shirts: 0, stickers: 2},
		newFollowers: 8,
		organicDraw: 1,
		ourDraw: 6,
		position: $author$project$Types$Support,
		ticketPrice: 20.0,
		totalDraw: 18,
		venue: $author$project$Constants$venue_duffysTavern
	},
		{
		datetime: $author$project$Utils$dateTime('2025-06-22T01:45:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 90.0,
		merchSold: {shirts: 6, stickers: 1},
		newFollowers: 6,
		organicDraw: 0,
		ourDraw: 10,
		position: $author$project$Types$Open,
		ticketPrice: 20.0,
		totalDraw: 38,
		venue: $author$project$Constants$venue_redPapaya
	},
		{
		datetime: $author$project$Utils$dateTime('2025-08-09T02:30:00.000Z'),
		durationMinutes: 30,
		hide: false,
		merchSales: 30.0,
		merchSold: {shirts: 2, stickers: 2},
		newFollowers: 3,
		organicDraw: 0,
		ourDraw: 7,
		position: $author$project$Types$Support,
		ticketPrice: 20.0,
		totalDraw: 23,
		venue: $author$project$Constants$venue_hardLuck
	},
		{
		datetime: $author$project$Utils$dateTime('2025-09-13T02:15:00.000Z'),
		durationMinutes: 45,
		hide: false,
		merchSales: 30.0,
		merchSold: {shirts: 0, stickers: 1},
		newFollowers: 5,
		organicDraw: 2,
		ourDraw: 9,
		position: $author$project$Types$Headline,
		ticketPrice: 20.0,
		totalDraw: 16,
		venue: $author$project$Constants$venue_sneakyDees
	},
		{
		datetime: $author$project$Utils$dateTime('2025-10-03T01:30:00.000Z'),
		durationMinutes: 45,
		hide: false,
		merchSales: 30.0,
		merchSold: {shirts: 2, stickers: 0},
		newFollowers: 4,
		organicDraw: 2,
		ourDraw: 6,
		position: $author$project$Types$Open,
		ticketPrice: 20.0,
		totalDraw: 37,
		venue: $author$project$Constants$venue_absinthe
	}
	]);
var $author$project$Main$pillClassForAmount = function (amt) {
	return (amt > 0) ? 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/20' : ((amt < 0) ? 'bg-red-500/15 text-red-200 ring-1 ring-red-500/20' : 'bg-white/10 text-white/80 ring-1 ring-white/10');
};
var $author$project$Utils$totalUnits = function (m) {
	return m.shirts + m.stickers;
};
var $author$project$Main$visiblePerformances = function (model) {
	return A2(
		$elm$core$List$take,
		model.visiblePerfCount,
		A2(
			$elm$core$List$sortBy,
			function (p) {
				return -$elm$time$Time$posixToMillis(
					$PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix(p.datetime));
			},
			A2(
				$elm$core$List$filter,
				function (p) {
					return !p.hide;
				},
				$author$project$Main$performances)));
};
var $author$project$Main$performanceHistoryPanel = function (model) {
	var totalAvailable = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (p) {
				return !p.hide;
			},
			$author$project$Main$performances));
	var row = F2(
		function (label, value) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-baseline gap-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-40 text-white/60')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(label)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex-1 font-medium')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(value)
							]))
					]));
		});
	var items = $author$project$Main$visiblePerformances(model);
	var card = F2(
		function (idx, perf) {
			var venueTitle = perf.venue.name + (' — ' + (perf.venue.city + (' • cap ' + ($elm$core$String$fromInt(perf.venue.capacity) + (' • ' + ($elm$core$String$fromInt(perf.venue.distanceFromHomeKm) + ' km'))))));
			var unitsSuffix = function (units) {
				return (units === 1) ? 'unit' : 'units';
			};
			var timeStr = A2($author$project$Utils$formatTimeLocalHHMM, model.zone, perf.datetime);
			var pill = F2(
				function (cls, txt) {
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-2 py-0.5 rounded-full text-xs ' + cls)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(txt)
							]));
				});
			var merchUnitsSold = $author$project$Utils$totalUnits(perf.merchSold);
			var merchSoldPill = function (p) {
				var units = merchUnitsSold;
				var suffix = unitsSuffix(units);
				var label = 'Merch Sold: ' + ($elm$core$String$fromInt(units) + (' ' + suffix));
				var _class = $author$project$Main$pillClassForAmount(units);
				return ($author$project$Utils$totalUnits(p.merchSold) <= 0) ? $elm$html$Html$text('') : A2(pill, _class, label);
			};
			var isOpen = A2($elm$core$Set$member, idx, model.expandedPerf);
			var dateStr = A2($author$project$Utils$formatDateLocal, model.zone, perf.datetime);
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						A2(
							$elm$core$String$join,
							' ',
							_List_fromArray(
								['rounded-2xl bg-slate-900/60 ring-1 ring-white/10 text-white', 'shadow-xl overflow-hidden mb-4 md:mb-3'])))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['w-full flex items-center gap-4 px-4 py-3 cursor-pointer select-none', 'hover:bg-white/5']))),
								$elm$html$Html$Events$onClick(
								$author$project$Types$TogglePerformance(idx))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('min-w-[5rem]')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-white/80')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(dateStr)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs text-white/60')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(timeStr)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex-1')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('font-medium flex items-center gap-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$title(venueTitle)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(perf.venue.name)
													])),
												A2(
												pill,
												'ml-3 bg-white/10 text-white/80',
												function () {
													var _v0 = perf.position;
													switch (_v0.$) {
														case 'Open':
															return 'Open';
														case 'Support':
															return 'Support';
														default:
															return 'Headline';
													}
												}())
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-1 text-xs text-white/60')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(perf.venue.city)
											]))
									])),
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										A2(
											$elm$core$String$join,
											' ',
											_List_fromArray(
												[
													'fa-solid',
													isOpen ? 'fa-chevron-up' : 'fa-chevron-down',
													'text-white/70'
												])))
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-4 pb-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-wrap gap-2 text-xs text-white/80')
									]),
								_List_fromArray(
									[
										A2(
										pill,
										'bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/20',
										'Total Draw: ' + $elm$core$String$fromInt(perf.totalDraw)),
										A2(
										pill,
										'bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/20',
										'Our Draw: ' + $elm$core$String$fromInt(perf.ourDraw)),
										merchSoldPill(perf)
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[
											'transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden',
											isOpen ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0'
										])))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('px-4 pb-4 pt-1 text-sm text-white/85 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2')
									]),
								_List_fromArray(
									[
										A2(row, 'Date', dateStr),
										A2(row, 'Time', timeStr),
										A2(row, 'Venue', perf.venue.name + (' (' + (perf.venue.city + ')'))),
										A2(
										row,
										'Distance From Home',
										$elm$core$String$fromInt(perf.venue.distanceFromHomeKm) + ' km'),
										A2(
										row,
										'Total Draw',
										$elm$core$String$fromInt(perf.totalDraw)),
										A2(
										row,
										'Venue Capacity',
										$elm$core$String$fromInt(perf.venue.capacity)),
										A2(
										row,
										'Our Draw',
										$elm$core$String$fromInt(perf.ourDraw)),
										A2(
										row,
										'Lineup Position',
										function () {
											var _v1 = perf.position;
											switch (_v1.$) {
												case 'Open':
													return 'Open';
												case 'Support':
													return 'Support';
												default:
													return 'Headline';
											}
										}()),
										A2(
										row,
										'Set Length',
										$elm$core$String$fromInt(perf.durationMinutes) + ' min'),
										A2(
										row,
										'Merch Sold',
										$elm$core$String$fromInt(merchUnitsSold) + (' ' + unitsSuffix(merchUnitsSold))),
										A2(
										row,
										'Shirts Sold',
										$elm$core$String$fromInt(perf.merchSold.shirts)),
										A2(
										row,
										'Stickers Sold',
										$elm$core$String$fromInt(perf.merchSold.stickers))
									]))
							]))
					]));
		});
	var canLoadMore = _Utils_cmp(model.visiblePerfCount, totalAvailable) < 0;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('performance-history'),
				$elm$html$Html$Attributes$class('pt-8 md:pt-16 lg:px-16 xl:px-32')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg md:text-xl text-white font-bold mb-4 md:mb-6')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Performance History')
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				A2($elm$core$List$indexedMap, card, items)),
				function () {
				if (canLoadMore) {
					var step = (model.viewportW < 768) ? 3 : 5;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-6 flex justify-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/15'),
										$elm$html$Html$Events$onClick($author$project$Types$LoadMorePerformances)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Load ' + ($elm$core$String$fromInt(step) + ' more'))
									]))
							]));
				} else {
					return $elm$html$Html$text('');
				}
			}()
			]));
};
var $author$project$Statistics$percent = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 100)) + '%';
};
var $author$project$Statistics$safeDiv = F2(
	function (num, den) {
		return (!den) ? 0 : (num / den);
	});
var $author$project$Types$LbNone = {$: 'LbNone'};
var $author$project$Components$helpHint = F2(
	function (model, cfg) {
		var mobileButton = A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('inline-flex items-center justify-center rounded-full ' + 'bg-white/10 ring-1 ring-white/15 text-white/80'),
					$elm$html$Html$Events$onClick(
					$author$project$Types$OpenLightbox(
						{
							caption: $elm$core$Maybe$Just(cfg.title),
							extraText: $elm$core$Maybe$Just(cfg.body),
							media: $author$project$Types$LbNone
						})),
					A2($elm$html$Html$Attributes$attribute, 'type', 'button'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', 'More info')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$i,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fa-solid fa-circle-info text-[1em] leading-none')
						]),
					_List_Nil)
				]));
		var isMobile = _Utils_cmp(model.viewportW, $author$project$Constants$mobileThreshold) < 0;
		var desktopPopover = A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative inline-block group align-middle')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline-flex items-center justify-center rounded-full ' + ('bg-white/10 ring-1 ring-white/15 text-white/80 ' + 'focus:outline-none focus:ring-2 focus:ring-white/30')),
							A2($elm$html$Html$Attributes$attribute, 'type', 'button'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'More info')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fa-solid fa-circle-info text-[1em] leading-none')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute top-full right-0 mt-2 min-w-[14rem] max-w-[20rem] ' + ('rounded-md bg-black/90 text-white p-3 text-xs ring-1 ring-white/10 shadow-xl z-50 ' + ('opacity-0 pointer-events-none transition ' + ('group-hover:opacity-100 group-hover:pointer-events-auto ' + 'group-focus-within:opacity-100 group-focus-within:pointer-events-auto'))))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('font-semibold mb-1 text-white/90')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(cfg.title)
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(cfg.body)
								]))
						]))
				]));
		return isMobile ? mobileButton : desktopPopover;
	});
var $author$project$Statistics$statCard = F2(
	function (args, model) {
		var surfaceCls = A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				['rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-xl', 'hover:ring-white/20 hover:shadow-2xl', 'transition p-4 flex flex-col w-full', 'min-h-[180px] overflow-hidden']));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative w-full overflow-visible')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(surfaceCls)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-2 pr-8')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-md font-semibold tracking-wide text-white/80')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(args.title)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex-1 flex items-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-5xl font-semibold tracking-tight text-white')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(args.primary)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('pt-2 text-white/70')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xl font-semibold text-white/80')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(args.secondaryMain)
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('ml-2 text-sm')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(args.secondarySuffix)
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute right-3 top-3 z-30')
						]),
					_List_fromArray(
						[
							A2(
							$author$project$Components$helpHint,
							model,
							{body: args.info, title: args.title})
						]))
				]));
	});
var $author$project$Statistics$audienceCaptureCard = F2(
	function (model, perfs) {
		var visible = A2(
			$elm$core$List$filter,
			function (p) {
				return !p.hide;
			},
			perfs);
		var totalNew = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function (p) {
					return p.newFollowers;
				},
				visible));
		var totalAudience = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function (p) {
					return p.totalDraw;
				},
				visible));
		var pct = $author$project$Statistics$percent(
			A2($author$project$Statistics$safeDiv, totalNew, totalAudience));
		var fansPerShow = $elm$core$String$fromInt(
			$elm$core$Basics$round(
				A2(
					$author$project$Statistics$safeDiv,
					totalNew,
					$elm$core$List$length(visible))));
		return A2(
			$author$project$Statistics$statCard,
			{info: 'New followers captured per audience member across all shows.', primary: pct, secondaryMain: '~' + fansPerShow, secondarySuffix: 'new fans per show', title: 'Audience Capture'},
			model);
	});
var $author$project$Statistics$avgFloat = function (xs) {
	if (!xs.b) {
		return 0;
	} else {
		return $elm$core$List$sum(xs) / $elm$core$List$length(xs);
	}
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Statistics$formatInt = function (n) {
	var s = $elm$core$String$fromInt(n);
	var go = F2(
		function (acc, rest) {
			go:
			while (true) {
				if ($elm$core$String$length(rest) <= 3) {
					return A2($elm$core$List$cons, rest, acc);
				} else {
					var len = $elm$core$String$length(rest);
					var $temp$acc = A2(
						$elm$core$List$cons,
						A2($elm$core$String$right, 3, rest),
						acc),
						$temp$rest = A2($elm$core$String$left, len - 3, rest);
					acc = $temp$acc;
					rest = $temp$rest;
					continue go;
				}
			}
		});
	return A2(
		$elm$core$String$join,
		',',
		A2(go, _List_Nil, s));
};
var $author$project$Statistics$averageDrawCard = F2(
	function (model, perfs) {
		var visible = A2(
			$elm$core$List$filter,
			function (p) {
				return !p.hide;
			},
			perfs);
		var avgDraw = $elm$core$String$fromInt(
			$elm$core$Basics$round(
				$author$project$Statistics$avgFloat(
					A2(
						$elm$core$List$map,
						function (p) {
							return p.totalDraw;
						},
						visible))));
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Average total audience per show (includes your draw + organic walk-ins).',
				primary: avgDraw,
				secondaryMain: $author$project$Statistics$formatInt(
					$elm$core$List$length(visible)),
				secondarySuffix: 'shows included',
				title: 'Average Draw'
			},
			model);
	});
var $author$project$Statistics$avgStreamsPerListenerCard = F2(
	function (model, tracks) {
		return A2(
			$author$project$Statistics$statCard,
			{info: 'The average streams per listener is counted from most recent release (September 2024) until now. This calculation purposely leaves out the surge of listeners on release day, and looks at retention over time.', primary: '4.1', secondaryMain: '64%', secondarySuffix: 'higher than industry average', title: 'Average Streams Per Listener'},
			model);
	});
var $author$project$Statistics$engagementRateCard = F2(
	function (model, samples) {
		var totalReach = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.reach;
				},
				samples));
		var totalInteractions = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.interactions;
				},
				samples));
		var rate = A2($author$project$Statistics$safeDiv, totalInteractions, totalReach);
		var avgDailyInteractions = $elm$core$String$fromInt(
			$elm$core$Basics$round(
				A2(
					$author$project$Statistics$safeDiv,
					totalInteractions,
					$elm$core$List$length(samples))));
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Interactions divided by reach across recent posts.',
				primary: $author$project$Statistics$percent(rate),
				secondaryMain: avgDailyInteractions,
				secondarySuffix: 'avg daily interactions',
				title: 'Engagement Rate'
			},
			model);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Statistics$quarterGains = function (cumulVals) {
	var diffs = function (xs) {
		if (xs.b && xs.b.b) {
			var a = xs.a;
			var _v1 = xs.b;
			var b = _v1.a;
			var rest = _v1.b;
			return A2(
				$elm$core$List$cons,
				b - a,
				diffs(
					A2($elm$core$List$cons, b, rest)));
		} else {
			return _List_Nil;
		}
	};
	return diffs(cumulVals);
};
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $elm$svg$Svg$Attributes$preserveAspectRatio = _VirtualDom_attribute('preserveAspectRatio');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$title = $elm$svg$Svg$trustedNode('title');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Statistics$sparkline = F2(
	function (dims, series) {
		var w = dims.w;
		var values = A2($elm$core$List$map, $elm$core$Tuple$second, series);
		var p = dims.pad;
		var xs = function () {
			var n = A2(
				$elm$core$Basics$max,
				1,
				$elm$core$List$length(series) - 1);
			var step = (w - (2 * p)) / n;
			return A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, _v5) {
						return p + (step * i);
					}),
				series);
		}();
		var h = dims.h;
		var _v0 = function () {
			if (!values.b) {
				return _Utils_Tuple2(0, 1);
			} else {
				var lo = A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$minimum(values));
				var hi = A2(
					$elm$core$Maybe$withDefault,
					lo,
					$elm$core$List$maximum(values));
				return _Utils_eq(hi, lo) ? _Utils_Tuple2(lo - 1, hi + 1) : _Utils_Tuple2(lo, hi);
			}
		}();
		var minV = _v0.a;
		var maxV = _v0.b;
		var scaleY = function (v) {
			var t = (v - minV) / (maxV - minV);
			return p + ((h - (2 * p)) * (1 - t));
		};
		var ys = A2($elm$core$List$map, scaleY, values);
		var points = A3($elm$core$List$map2, $elm$core$Tuple$pair, xs, ys);
		var polyStr = A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				function (_v4) {
					var x = _v4.a;
					var y = _v4.b;
					return $elm$core$String$fromFloat(x) + (',' + $elm$core$String$fromFloat(y));
				},
				points));
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$viewBox(
					'0 0 ' + ($elm$core$String$fromFloat(w) + (' ' + $elm$core$String$fromFloat(h)))),
					$elm$svg$Svg$Attributes$preserveAspectRatio('xMidYMid meet'),
					$elm$svg$Svg$Attributes$width('100%'),
					$elm$svg$Svg$Attributes$height('100%'),
					$elm$svg$Svg$Attributes$class('w-full h-24')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$polyline,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points(polyStr),
							$elm$svg$Svg$Attributes$fill('none'),
							$elm$svg$Svg$Attributes$stroke('currentColor'),
							A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke'),
							$elm$svg$Svg$Attributes$strokeWidth('2'),
							$elm$svg$Svg$Attributes$class('text-sky-300')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					A3(
						$elm$core$List$map2,
						F2(
							function (_v2, _v3) {
								var lbl = _v2.a;
								var v = _v2.b;
								var x = _v3.a;
								var y = _v3.b;
								return A2(
									$elm$svg$Svg$g,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$title,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(
													lbl + (' — ' + ($elm$core$String$fromInt(v) + ' followers')))
												])),
											A2(
											$elm$svg$Svg$circle,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$cx(
													$elm$core$String$fromFloat(x)),
													$elm$svg$Svg$Attributes$cy(
													$elm$core$String$fromFloat(y)),
													$elm$svg$Svg$Attributes$r('10'),
													$elm$svg$Svg$Attributes$fill('transparent')
												]),
											_List_Nil),
											A2(
											$elm$svg$Svg$circle,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$cx(
													$elm$core$String$fromFloat(x)),
													$elm$svg$Svg$Attributes$cy(
													$elm$core$String$fromFloat(y)),
													$elm$svg$Svg$Attributes$r('3.5'),
													$elm$svg$Svg$Attributes$class('text-sky-200 hover:text-white'),
													$elm$svg$Svg$Attributes$fill('currentColor')
												]),
											_List_Nil)
										]));
							}),
						series,
						points))
				]));
	});
var $author$project$Statistics$followerGrowthCard = F2(
	function (model, cfg) {
		var series = _List_fromArray(
			[
				_Utils_Tuple2('Q3 23', 41),
				_Utils_Tuple2('Q4 23', 67),
				_Utils_Tuple2('Q1 24', 159),
				_Utils_Tuple2('Q2 24', 202),
				_Utils_Tuple2('Q3 24', 236),
				_Utils_Tuple2('Q4 24', 287),
				_Utils_Tuple2('Q1 25', 424),
				_Utils_Tuple2('Q2 25', 528),
				_Utils_Tuple2('Q3 25', 555)
			]);
		var spark = A2(
			$author$project$Statistics$sparkline,
			{h: 96, pad: 10, w: 260},
			series);
		var avgGainPerQ = function () {
			var gains = $author$project$Statistics$quarterGains(
				A2($elm$core$List$map, $elm$core$Tuple$second, series));
			return $elm$core$List$isEmpty(gains) ? 0 : (($elm$core$List$sum(gains) / $elm$core$List$length(gains)) | 0);
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							['relative rounded-2xl bg-slate-900/60', 'ring-1 ring-white/10 shadow-xl', 'hover:ring-white/20 hover:shadow-2xl', 'transition p-4 flex flex-col w-full', 'min-h-[180px] overflow-visible'])))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-start justify-between mb-2 overflow-visible')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-md font-semibold tracking-wide text-white/80')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Follower Growth')
								])),
							A2(
							$author$project$Components$helpHint,
							model,
							{body: 'Each point is the follower count at the END of the quarter (Q1–Q4) ' + ('in your local time. Gains per quarter are computed from summed ' + 'performance \'newFollowers\' plus your starting seed.'), title: 'Follower Growth'})
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-3 h-24 w-full')
						]),
					_List_fromArray(
						[spark])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pt-2 text-white/70')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-xl font-semibold text-white/80')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(avgGainPerQ))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('ml-2 text-sm')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('avg per quarter')
								]))
						]))
				]));
	});
var $author$project$Utils$sumUnits = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map($author$project$Utils$totalUnits),
	$elm$core$List$sum);
var $author$project$Statistics$merchUnitsCard = F2(
	function (model, perfs) {
		var total = $author$project$Utils$sumUnits(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.merchSold;
				},
				perfs));
		var showCount = $elm$core$List$length(perfs);
		var avgPerShow = (!showCount) ? 0 : ((total / showCount) | 0);
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Sum of all physical units (shirts, stickers). Avg is per show.',
				primary: $elm$core$String$fromInt(total),
				secondaryMain: $elm$core$String$fromInt(avgPerShow),
				secondarySuffix: 'avg / show',
				title: 'Merch Units Sold'
			},
			model);
	});
var $author$project$Statistics$yearOf = F2(
	function (zone, dt) {
		return A2(
			$elm$time$Time$toYear,
			zone,
			$PanagiotisGeorgiadis$elm_datetime$DateTime$toPosix(dt));
	});
var $author$project$Statistics$showsPlayedCard = F3(
	function (model, zone, perfs) {
		var visible = A2(
			$elm$core$List$filter,
			function (p) {
				return !p.hide;
			},
			perfs);
		var totalShows = $elm$core$List$length(visible);
		var latestYear = A2(
			$elm$core$Maybe$withDefault,
			1970,
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					function (p) {
						return A2($author$project$Statistics$yearOf, zone, p.datetime);
					},
					visible)));
		var showsThisYear = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (p) {
					return _Utils_eq(
						A2($author$project$Statistics$yearOf, zone, p.datetime),
						latestYear);
				},
				visible));
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Total shows played (all time) and how many in the most recent calendar year present in your data.',
				primary: $author$project$Statistics$formatInt(totalShows),
				secondaryMain: $author$project$Statistics$formatInt(showsThisYear),
				secondarySuffix: 'played in ' + $elm$core$String$fromInt(latestYear),
				title: 'Shows Played'
			},
			model);
	});
var $author$project$Statistics$socialFollowerCountCard = F2(
	function (model, profiles) {
		var total = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.followers;
				},
				profiles));
		var topPlatform = $elm$core$List$head(
			A2(
				$elm$core$List$sortBy,
				function (p) {
					return -p.followers;
				},
				profiles));
		var suffix = function () {
			if (topPlatform.$ === 'Just') {
				var p = topPlatform.a;
				return 'follow on ' + p.platform;
			} else {
				return 'no platforms connected';
			}
		}();
		var secondary = function () {
			if (topPlatform.$ === 'Just') {
				var p = topPlatform.a;
				var pct = A2($author$project$Statistics$safeDiv, p.followers, total);
				return $elm$core$String$fromInt(
					$elm$core$Basics$round(pct * 100)) + '%';
			} else {
				return '';
			}
		}();
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Sum of followers across connected social profiles. Secondary shows where most followers are.',
				primary: $author$project$Statistics$formatInt(total),
				secondaryMain: secondary,
				secondarySuffix: suffix,
				title: 'Follower Count'
			},
			model);
	});
var $elm$core$String$toLower = _String_toLower;
var $author$project$Statistics$spotifyFollowersCard = F2(
	function (model, profiles) {
		var spotify = $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (p) {
					return $elm$core$String$toLower(p.platform) === 'spotify';
				},
				profiles));
		var total = function () {
			if (spotify.$ === 'Just') {
				var s = spotify.a;
				return s.followers;
			} else {
				return 0;
			}
		}();
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Current followers on Spotify artist profile.',
				primary: $author$project$Statistics$formatInt(total),
				secondaryMain: '~8',
				secondarySuffix: 'per month',
				title: 'Spotify Followers'
			},
			model);
	});
var $author$project$Statistics$ticketsSoldCard = F2(
	function (model, perfs) {
		var shows = A2(
			$elm$core$List$filter,
			function (p) {
				return !p.hide;
			},
			perfs);
		var totalTickets = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.totalDraw;
				},
				shows));
		var avgPerShow = function () {
			var _v0 = $elm$core$List$length(shows);
			if (!_v0) {
				return 0;
			} else {
				var n = _v0;
				return (totalTickets / n) | 0;
			}
		}();
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Total attendees across shows (Total Draw). Avg is per show.',
				primary: $elm$core$String$fromInt(totalTickets),
				secondaryMain: $elm$core$String$fromInt(avgPerShow),
				secondarySuffix: 'avg / show',
				title: 'Tickets Sold'
			},
			model);
	});
var $author$project$Statistics$totalStreamsCard = F2(
	function (model, tracks) {
		var total = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.streams;
				},
				tracks));
		var avgPerTrack = A2(
			$author$project$Statistics$safeDiv,
			total,
			$elm$core$List$length(tracks));
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Sum of streams across all tracks',
				primary: $author$project$Statistics$formatInt(total),
				secondaryMain: $author$project$Statistics$formatInt(
					$elm$core$Basics$round(avgPerTrack)),
				secondarySuffix: 'avg streams per track',
				title: 'Total Streams'
			},
			model);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Utils$roundTo = F2(
	function (places, n) {
		var f = A2($elm$core$Basics$pow, 10, places);
		return $elm$core$Basics$round(n * f) / f;
	});
var $author$project$Statistics$unitsPerAttendeeCard = F2(
	function (model, perfs) {
		var totalUnits_ = $author$project$Utils$sumUnits(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.merchSold;
				},
				perfs));
		var totalAudience = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.totalDraw;
				},
				A2(
					$elm$core$List$filter,
					function (p) {
						return !p.hide;
					},
					perfs)));
		var ratio = (totalAudience <= 0) ? 0 : (totalUnits_ / totalAudience);
		var ratioStr = $elm$core$String$fromFloat(
			A2($author$project$Utils$roundTo, 2, ratio));
		return A2(
			$author$project$Statistics$statCard,
			{
				info: 'Total merch units divided by total audience across the same period.',
				primary: ratioStr,
				secondaryMain: $elm$core$String$fromInt(totalUnits_),
				secondarySuffix: 'total units',
				title: 'Units per Attendee'
			},
			model);
	});
var $author$project$Main$statisticsPanel = function (model) {
	var tracks = _List_fromArray(
		[
			{listeners: 110, repeatListeners: 180, saves: 27, streams: 557},
			{listeners: 852, repeatListeners: 140, saves: 43, streams: 2648},
			{listeners: 4550, repeatListeners: 360, saves: 220, streams: 8372}
		]);
	var streamingMetrics = _List_fromArray(
		[
			{month: 1, numFollowers: 50, numListeners: 3710, numPlaylistAdds: 189, numSaves: 191, numStreams: 5142, pctActiveSources: 4, pctProgrammedSources: 79, platform: 'Spotify', year: 2024},
			{month: 2, numFollowers: 56, numListeners: 355, numPlaylistAdds: 51, numSaves: 8, numStreams: 807, pctActiveSources: 26, pctProgrammedSources: 54, platform: 'Spotify', year: 2024},
			{month: 3, numFollowers: 61, numListeners: 87, numPlaylistAdds: 6, numSaves: 1, numStreams: 186, pctActiveSources: 73, pctProgrammedSources: 15, platform: 'Spotify', year: 2024},
			{month: 4, numFollowers: 64, numListeners: 501, numPlaylistAdds: 23, numSaves: 25, numStreams: 747, pctActiveSources: 17, pctProgrammedSources: 81, platform: 'Spotify', year: 2024},
			{month: 5, numFollowers: 64, numListeners: 65, numPlaylistAdds: 23, numSaves: 25, numStreams: 170, pctActiveSources: 79, pctProgrammedSources: 13, platform: 'Spotify', year: 2024}
		]);
	var socials = _List_fromArray(
		[
			{followers: 555, platform: 'Instagram'},
			{followers: 125, platform: 'Spotify'},
			{followers: 67, platform: 'YouTube'}
		]);
	var perfs = A2(
		$elm$core$List$filter,
		function (p) {
			return !p.hide;
		},
		$author$project$Main$performances);
	var growthSeries = _List_fromArray(
		[520, 540, 535, 560, 588, 604, 612]);
	var followerCard = A2(
		$author$project$Statistics$followerGrowthCard,
		model,
		{now: model.now, performances: $author$project$Main$performances, quarters: 8, seedFollowers: 0, zone: model.zone});
	var engagement = _List_fromArray(
		[
			{interactions: 18, reach: 450},
			{interactions: 22, reach: 520},
			{interactions: 15, reach: 360},
			{interactions: 28, reach: 640},
			{interactions: 19, reach: 410},
			{interactions: 25, reach: 580},
			{interactions: 13, reach: 300}
		]);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('statistics'),
				$elm$html$Html$Attributes$class('pt-8 md:pt-16 lg:px-16 xl:px-32')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xl md:text-2xl text-white font-bold mb-4 md:mb-6')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Statistics')
					])),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-2 mb-2 text-lg md:text-xl text-white/80 font-semibold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Live Performance')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4')
					]),
				_List_fromArray(
					[
						A3($author$project$Statistics$showsPlayedCard, model, model.zone, perfs),
						A2($author$project$Statistics$averageDrawCard, model, perfs),
						A2($author$project$Statistics$audienceCaptureCard, model, perfs)
					])),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Merchandising')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4')
					]),
				_List_fromArray(
					[
						A2($author$project$Statistics$ticketsSoldCard, model, perfs),
						A2($author$project$Statistics$merchUnitsCard, model, perfs),
						A2($author$project$Statistics$unitsPerAttendeeCard, model, perfs)
					])),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Streaming & Digital')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4')
					]),
				_List_fromArray(
					[
						A2($author$project$Statistics$spotifyFollowersCard, model, socials),
						A2($author$project$Statistics$totalStreamsCard, model, tracks),
						A2($author$project$Statistics$avgStreamsPerListenerCard, model, tracks)
					])),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Social Media & Fan Growth')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4')
					]),
				_List_fromArray(
					[
						A2($author$project$Statistics$socialFollowerCountCard, model, socials),
						A2($author$project$Statistics$engagementRateCard, model, engagement),
						followerCard
					]))
			]));
};
var $author$project$Main$globalStyles = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('\r\n@keyframes testimonials-scroll {\r\n  from { transform: translateX(0); }\r\n  to   { transform: translateX(-50%); }\r\n}\r\n.animate-testimonials { animation: testimonials-scroll 45s linear infinite; }\r\n.animate-testimonials:hover { animation-play-state: paused; }\r\n.paused { animation-play-state: paused !important; }\r\n.testimonials-hover-pause:hover .animate-testimonials { animation-play-state: paused; }\r\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .animate-testimonials { animation: none; }\r\n}\r\n')
		]));
var $author$project$Types$CloseLightbox = {$: 'CloseLightbox'};
var $author$project$Types$NoOp = {$: 'NoOp'};
var $author$project$Main$lightboxView = function (model) {
	var _v0 = model.lightbox;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var lb = _v0.a;
		var stopClick = A2(
			$elm$html$Html$Events$stopPropagationOn,
			'click',
			$elm$json$Json$Decode$succeed(
				_Utils_Tuple2($author$project$Types$NoOp, true)));
		var textView = function () {
			var _v4 = lb.extraText;
			if (_v4.$ === 'Nothing') {
				return $elm$html$Html$text('');
			} else {
				var s = _v4.a;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-3 max-h-[24vh] overflow-y-auto text-sm leading-relaxed text-white/85 pr-1'),
							stopClick
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(s)
						]));
			}
		}();
		var mediaView = function () {
			var _v3 = lb.media;
			switch (_v3.$) {
				case 'LbImage':
					var imgData = _v3.a;
					return A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(imgData.src),
								$elm$html$Html$Attributes$alt(imgData.alt),
								$elm$html$Html$Attributes$class('w-full max-h-[70vh] object-contain rounded-xl'),
								stopClick
							]),
						_List_Nil);
				case 'LbYoutube':
					var yt = _v3.a;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full aspect-video'),
								stopClick
							]),
						_List_fromArray(
							[
								A3(
								$elm$html$Html$node,
								'iframe',
								_List_fromArray(
									[
										A2(
										$elm$html$Html$Attributes$attribute,
										'src',
										$author$project$Main$youtubeEmbedUrl(yt.youtubeId)),
										A2($elm$html$Html$Attributes$attribute, 'title', yt.title),
										$elm$html$Html$Attributes$class('w-full h-full rounded-xl'),
										A2($elm$html$Html$Attributes$attribute, 'frameborder', '0'),
										A2($elm$html$Html$Attributes$attribute, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'),
										A2($elm$html$Html$Attributes$attribute, 'allowfullscreen', ''),
										A2($elm$html$Html$Attributes$attribute, 'referrerpolicy', 'strict-origin-when-cross-origin')
									]),
								_List_Nil)
							]));
				default:
					return $elm$html$Html$text('');
			}
		}();
		var captionView = function () {
			var _v2 = lb.caption;
			if (_v2.$ === 'Nothing') {
				return $elm$html$Html$text('');
			} else {
				var c = _v2.a;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2 text-white/70 text-sm'),
							stopClick
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(c)
						]));
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed inset-0 z-[2000] bg-black/90 p-4 flex items-center justify-center'),
					$elm$html$Html$Events$onClick($author$project$Types$CloseLightbox)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('w-[92vw] max-w-5xl'),
							stopClick
						]),
					_List_fromArray(
						[
							function () {
							var _v1 = lb.media;
							if (_v1.$ === 'LbNone') {
								return $elm$html$Html$text('');
							} else {
								return mediaView;
							}
						}(),
							captionView,
							textView
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute top-4 right-4 w-10 h-10 rounded-full bg-black hover:bg-black ring-1 ring-white/20 hover:ring-white/35 text-white text-2xl leading-none'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Types$CloseLightbox, true))),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Close lightbox')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('×')
						]))
				]));
	}
};
var $author$project$Main$testimonialCard = F2(
	function (model, t) {
		var thumb = function () {
			var _v0 = t.media;
			switch (_v0.$) {
				case 'LbImage':
					var i = _v0.a;
					return {alt: i.alt, url: i.src};
				case 'LbYoutube':
					var mv = _v0.a;
					return {
						alt: mv.title,
						url: $author$project$Main$youtubeThumb(mv)
					};
				default:
					return {alt: '', url: ''};
			}
		}();
		var openLb = function (payload) {
			return $author$project$Types$OpenLightbox(payload);
		};
		var fullText = function () {
			var dateStr = A2($author$project$Utils$formatDateLocal, model.zone, t.quotedAt);
			var meta = '— ' + (t.author + (' • ' + dateStr));
			return t.quote + ('\n\n' + meta);
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('min-w-[18rem] max-w-[22rem] rounded-2xl bg-slate-900/60 ring-1 ring-white/10 text-white shadow-xl overflow-hidden')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block relative w-full'),
							$elm$html$Html$Events$onClick(
							openLb(
								{
									caption: $elm$core$Maybe$Just(t.author),
									extraText: $elm$core$Maybe$Just(fullText),
									media: t.media
								}))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$src(thumb.url),
									$elm$html$Html$Attributes$alt(thumb.alt),
									$elm$html$Html$Attributes$class('w-full h-48 md:h-56 object-cover transition hover:opacity-90'),
									A2($elm$html$Html$Attributes$attribute, 'draggable', 'false')
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block italic text-left p-3 w-full'),
							$elm$html$Html$Events$onClick(
							openLb(
								{
									caption: $elm$core$Maybe$Just(t.author),
									extraText: $elm$core$Maybe$Just(fullText),
									media: t.media
								}))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm leading-relaxed'),
									A2($elm$html$Html$Attributes$style, 'display', '-webkit-box'),
									A2($elm$html$Html$Attributes$style, '-webkit-line-clamp', '5'),
									A2($elm$html$Html$Attributes$style, '-webkit-box-orient', 'vertical'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(t.quote)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2 text-xs text-white/60')
								]),
							_List_fromArray(
								[
									function () {
									var dateStr = A2($author$project$Utils$formatDateLocal, model.zone, t.quotedAt);
									return $elm$html$Html$text(dateStr);
								}()
								]))
						]))
				]));
	});
var $author$project$Types$LbYoutube = function (a) {
	return {$: 'LbYoutube', a: a};
};
var $author$project$Main$testimonials = function (model) {
	return _List_fromArray(
		[
			{
			author: 'Shane & Ben @ Rye Field Studios',
			id: 1,
			media: $author$project$Types$LbYoutube(
				{thumbnail: '', title: 'Inside the Mind of Mortrem: Exclusive Chat on Their Origin and What\'s Next on the Podcouch!', youtubeId: '4EzaFS2c0l4'}),
			quote: 'These guys ripped an absolutely  insane set! Each song is totally different, the timing changes and break downs are mind blowing! They are super talented musicians that are very dedicated to their band! We had a wicked time with them and  we suggest that you get out to their next show and experience it your self! Give them a follow, stream their music and don\'t miss out!',
			quotedAt: $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
				$elm$time$Time$millisToPosix(1747368000000))
		},
			{
			author: '@sunset_destruction_poetry',
			id: 2,
			media: $author$project$Types$LbImage(
				{
					alt: 'Fan from Instagram taking a photo with Mortrem outside of Sneaky Dees',
					src: A2($author$project$Utils$cdnUrl, model.cdnBase, 'assets/images/testimonials/sunset.jpg')
				}),
			quote: 'Tonight I had the distinct pleasure of meeting these fine gentlemen. This is a band called Mortrem. For those of you who know me, you know that I go to a lot of shows. Usually local shows in downtown Toronto. I mean this city has got so much talent, so why wouldn’t I?. We Canadians are feisty. We have to be. And we hustle hard. When I do go out to shows, I don’t always wait until the band has dismantled their equipment and loaded their truck just so I can get a photo and have them sign the merch I just bought, but when I do, it’s only because something struck a chord in me. Mortrem’s performance tonight was stellar. And it was worth every second of the wait. Thank you @mortremband for making my night. #toronto #rock #torontorocks #sneakydees',
			quotedAt: $PanagiotisGeorgiadis$elm_datetime$DateTime$fromPosix(
				$elm$time$Time$millisToPosix(1749182400000))
		}
		]);
};
var $author$project$Main$testimonialsPanel = function (model) {
	var pausedCls = (!_Utils_eq(model.lightbox, $elm$core$Maybe$Nothing)) ? 'paused' : '';
	var cards = A2(
		$elm$core$List$map,
		$author$project$Main$testimonialCard(model),
		$author$project$Main$testimonials(model));
	var track = _Utils_ap(cards, cards);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('testimonials'),
				$elm$html$Html$Attributes$class('py-8 md:py-16 lg:px-16 xl:px-32 text-white')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg md:text-xl font-bold mb-4 md:mb-6')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Testimonials')
					])),
				$author$project$Main$globalStyles,
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative overflow-hidden testimonials-hover-pause')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pointer-events-none absolute inset-y-0 left-0 w-12 z-10'),
								A2($elm$html$Html$Attributes$style, 'background', 'linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0))')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pointer-events-none absolute inset-y-0 right-0 w-12 z-10'),
								A2($elm$html$Html$Attributes$style, 'background', 'linear-gradient(270deg, rgba(0,0,0,1), rgba(0,0,0,0))')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['flex gap-4 items-stretch will-change-transform', 'min-w-max', 'animate-testimonials ' + pausedCls])))
							]),
						track)
					])),
				$author$project$Main$lightboxView(model)
			]));
};
var $author$project$Main$videoBanner = function (title) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('h-screen flex items-center justify-center text-white relative'),
				A2($elm$html$Html$Attributes$style, 'z-index', '10')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative z-20 flex items-center justify-center h-full font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl breathe')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(title)
					])),
				$author$project$Main$bottomUpBlackGradientSpan
			]));
};
var $author$project$Main$videoSwitchMarker1 = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$id('videoswitch-marker-1'),
			$elm$html$Html$Attributes$class('h-[0px] bg-black block')
		]),
	_List_Nil);
var $author$project$Main$videoSwitchMarker2 = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$id('videoswitch-marker-2'),
			$elm$html$Html$Attributes$class('h-[0px] bg-black block')
		]),
	_List_Nil);
var $author$project$Main$videoSwitchMarker3 = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$id('videoswitch-marker-3'),
			$elm$html$Html$Attributes$class('h-[0px] bg-black block')
		]),
	_List_Nil);
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Main$navbar(model),
				$author$project$Main$mobileSidePanel(model),
				$author$project$Main$heroBannerContent(model),
				$author$project$Main$navbarMarker,
				A2(
				$author$project$Main$contentPanel,
				model,
				_List_fromArray(
					[
						$author$project$Main$bioPanel(model),
						$author$project$Main$videoSwitchMarker1
					])),
				$author$project$Main$videoBanner('Music & Videos'),
				A2(
				$author$project$Main$contentPanel,
				model,
				_List_fromArray(
					[
						$author$project$Main$discographyPanel(model),
						$author$project$Main$musicVideosPanel(model),
						$author$project$Main$videoSwitchMarker2
					])),
				$author$project$Main$videoBanner('Performance Metrics'),
				A2(
				$author$project$Main$contentPanel,
				model,
				_List_fromArray(
					[
						$author$project$Main$performanceHistoryPanel(model),
						$author$project$Main$statisticsPanel(model),
						$author$project$Main$testimonialsPanel(model),
						$author$project$Main$videoSwitchMarker3
					])),
				$author$project$Main$videoBanner('Gallery'),
				A2(
				$author$project$Main$contentPanel,
				model,
				_List_fromArray(
					[
						$author$project$Main$imageGallery(
						$author$project$Main$galleryImages(model))
					])),
				$author$project$Main$footer(model)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (cdnBase) {
			return $elm$json$Json$Decode$succeed(
				{cdnBase: cdnBase});
		},
		A2($elm$json$Json$Decode$field, 'cdnBase', $elm$json$Json$Decode$string)))(0)}});}(this));