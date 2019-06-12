function whoami(){
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            $('#cu_username').html(response['username']);
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
                f = '<div class="alert" onclick="showmessages('+response[i].id+')">';
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

function showmessages(to_id){
    $('#Enviar').empty();
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var from_id = response['id'];
            allmessages(from_id,to_id);
            $('#Enviar').append('<input type="button" class="btn btn-success-secondary" value="Send" onclick="newMessage('+from_id+','+to_id+')"/>');
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}

function allmessages(id_from,id_to){
    $('#allmessages').empty();
    $.ajax({
        url:'/messages',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var i = 0;
            $.each(response, function(){
                //alert(response[i]['user_from_id']+' '+response[i]['user_to_id']);
                if((response[i]['user_from_id']==id_from && response[i]['user_to_id']==id_to) ||
                (response[i]['user_from_id']==id_to && response[i]['user_to_id']==id_from)){
                    f = '<div>';
                    f = f + response[i]['content'];
                    f = f + '</div>';
                    $('#allmessages').append(f);
                }
                i = i+1;
            });
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}

function newMessage(from_id,to_id){
    var user_to_id = to_id;
    var content = $('#content').val();
    var user_from_id = from_id;
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
        },
        error: function(response){
            if(response['status']==401){
                alert('No se puedo enviar el mensaje');
            }else{
                $('#confirmacion').html('Mensaje enviado');
            }
        }
    });
    showmessages(to_id);
}