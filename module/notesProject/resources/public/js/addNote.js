function doSubmit1() {
    var name = $('#note-form-input').val();
    var noteTxt = $('#note-form-textarea').val();
    if (isNullString(name) || isNullString(noteTxt)) {
        alert('name or noteTxt is null, please enter again')
    }
        // var httpRequest = new XMLHttpRequest();
        // var name = document.getElementById("note-form-input").value;
        // var noteTxt = document.getElementById("note-form-textarea").value;
        // if (isNullString(name) || isNullString(noteTxt)) {
        //     alert('name or note is null')
        //     return;
        // }
        // //get方式请求携带数据
        // var getUrl = "/doAddNote?name=" + name + "&noteTxt=" + noteTxt
        // console.log(getUrl)
        // httpRequest.open("get", getUrl, false)
        // // httpRequest.onreadystatechange = function() {
        // //     if (httpRequest.readyState === 4 &&httpRequest.status === 200) {
        // //         alert('' + httpRequest.responseText)
        // //     }
        // // }
        //
        // // var body = new FormData();
        // // body.append('name', name)
        // // body.append('noteTxt', noteTxt)
        // httpRequest.send()
        // var data = JSON.parse(httpRequest.responseText)
        // alert(data.message)
}

function isNullString(s) {
    if (s === null || s.length === 0 || s.trim().length === 0) {
        return true;
    }
    return false;
}