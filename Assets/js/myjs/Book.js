
var uri = 'http://localhost:29864/api/BOOKs/';

$(document).ready(function () {
    // Send an AJAX request
    var uri_ = 'http://localhost:29864/api/BOOKs/ListBook/';
    $.getJSON(uri_)
        .done(function (data) {
            $('#ListBook').html('<thead><tr><th>ID</th><th>Tên Sách</th><th>Tác Giả</th><th>Nhà xuất bản</th><th>Tác Vụ</th></tr></thead><tbody></tbody>')
            $.each(data, function (key, item) {
                $('#ListBook tbody').append('<tr id=row' + item.ID + '><td>' + item.ID + '</td><td>' + item.Name + '</td><td>' + ((item.Author == null) ? "" : item.Author) + '</td><td>' + ((item.Publish == null) ? "" : item.Publish) + '</td><td><button class="btn" data-toggle="modal" data-target="#myModal" data-id=' + item.ID + ' onclick="detail(' + item.ID + ')">Chi Tiết</buton><button class="btn" onclick="Delete(' + item.ID + ')">Xóa</buton></tr>')
            });
        });
});


//Tao model

function insert() {
    $('#modal-body').html(`<input type="Text" id="name"/><button onclick="insert_()" class="btn">Thêm mới</button>`);
    $('#myModal').modal('show');
}
function insert_() {
    var para = {
        Name: $('#Name').val(),
        Author: $('#Author').val(),
        Price: $('#Price').val(),
        NumberPage: $('#NumberPage').val(),
        CategoryID: $('#CategoryID').val(),
        Note: $('#Note').val(),
        PublishID: $('#PublishID').val()
    };

    $.ajax({
        url: uri,
        type: `POST`,
        datatype: `JSON`,
        data: JSON.stringify(para),
        contentType: "application/json; charset=utf-8",
        success: function () {
            alert("Done")
        },
        error: function (error) {
            alert(error.responseJSON.ExceptionMessage);
        }
    })
}

//Chi tiet
function detail(id) {
    $.getJSON('http://localhost:29864/api/BOOKs/BookDetail/' + id)
        .done(function (data) {
            $("#modal-title").html("Chi tiết sách")
            $('#modal-body').html(`<div class="table-responsive">` +
                                `<table class="table table-striped table-bordered table-hover">` +
                                    `<tbody>` +
                                        `<tr><td>ID</td><td>` + data.ID + `</td></tr>` +
                                        `<tr><td>Tên</td><td>` + data.Name + `</td></tr>` +
                                        `<tr><td>Loại Sách</td><td>` + data.Category + `</td></tr>` +
                                        `<tr><td>Tác giả</td><td>` + data.Author + `</td></tr>` +
                                        `<tr><td>Nhà xuất bản</td><td>` + data.Publish + `</td></tr>` +
                                        `<tr><td>Giá</td><td>` + data.Price + `</td></tr>` +
                                        `<tr><td>Số trang</td><td>` + data.NumberPage + `</td></tr>` +
                                        `<tr><td>Ghi chú</td><td>` + data.Note + `</td></tr>` +
                                    `</tbody></table> </div>`);
            $('#myModal').modal('show');
        })
}
//End function

function Del(id) {
    $.ajax({
        url: uri + "DeleteBOOK/" + id,
        contentType: "application/json; charset=utf-8",
        type: 'DELETE',
        success: function (data) {
            if (data.status == true) {
                $('#row' + id).hide();
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}
//Function Xoa model
function Delete(id) {
    $('#modal-body_del').html('bạn có muốn xóa sách ID =  ' + id + '?');
    $('#modal_del').modal('show');
    $('#modal_del').on('shown.bs.modal', function () {
        Del(id);
    });
}

//End Xoa model


//Function Sua model
function modify(id) {
    var para = {
        ID: id,
        Name: $('#name' + id).val(),
        PublishID: 1
    };


    $.ajax({
        url: uri + id,
        type: 'PUT',
        datatype: 'json',
        cache: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(para),
        success: function () {
            window.location.reload();
        }
    })
}
//End sua model



function find() {
    var id = $('#prodId').val();
    $.getJSON(uri + '/' + id)
        .done(function (data) {
            $('#product').text(formatItem(data));
        })
        .fail(function (jqXHR, textStatus, err) {
            $('#product').text('Error: ' + err);
        });
}