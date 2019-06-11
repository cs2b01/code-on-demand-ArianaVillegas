function whoami(){
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            $('#cu_username').html(response['username'])
            var name = response['name']+" "+response['fullname'];
            $('#cu_name').html(name);
        },
        error: function(response){
            //alert(JSON.stringify(response));
        }
    });
}

function allusers(){
    $.ajax({
        url:'/users',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var i = 0;
            $.each(response, function(){
                f = '<div class="alert"  >';
                f = f + response[i]['username'];
                f = f + '</div>';
                i = i+1;
                $('#allusers').append(f);
            });
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}

function allmessages(){
    $.ajax({
        url:'/messages',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var i = 0;
            $.each(response, function(){
                f = '<div>';
                f = f + response[i]['content'];
                f = f + '</div>';
                i = i+1;
                $('#allmessages').append(f);
            });
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}

function newmessage(){
    var user_to_id = 1;
    var content = $('#send').val();
    var user_to_id = 2;
    var message = JSON.stringify({
        "user_from_id": user_from_id,
        "user_to_id": user_to_id,
        "content": content
    });
    $.ajax({
        url:'/messages',
        type:'POST',
        contentType: 'application/json',
        data : message,
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}