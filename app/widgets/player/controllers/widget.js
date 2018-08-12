var args = $.args;

$.lbl_name.text = args.name;

if (args.backgroundColor){
	$.view_all.backgroundColor =  args.backgroundColor
}

$.view_all.getName = function(){
	return $.lbl_name.text
}

exports.addEventListener = function(evt, clb){
	$.view_all.addEventListener(evt,clb);
}
