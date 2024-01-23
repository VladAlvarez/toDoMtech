$(document).ready(function(){

    $('form').on('submit', function(){

        // grabbing what todo item was entered and turning it into a value
        var item = $('form input');
        var todo = {item: item.val()};

        // jquery ajax request to server
        $.ajax({
            type: 'POST',
            url: '/todo',
            // passing through todo which has users added item value
            data: todo,
            success: function(data){
                // can do something with the data via front-end stuff
                location.reload();
            }
        });

        return false;

    })
})