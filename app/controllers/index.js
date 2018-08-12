// function onClickDice(e) {
//     var w = Alloy.createController("/dice").getView();
//     w.open();
// 	w = null;
// }

function onClickDiary(e) {
	var w = Alloy.createController("/diary",{
		onOpen: onOpen,
		onClose: onClose
	}).getView();
	w.open();
	w = null;
}

function onOpen(e){
	$.videoPlayer.autoplay = false;
	$.videoPlayer.pause();
}

function onClose(e){
	$.videoPlayer.play();
}

$.btn_diary.addEventListener("click" ,onClickDiary);
// $.btn_dice.addEventListener("click" ,onClickDice);
$.index.open();
