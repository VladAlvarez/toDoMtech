$(document).ready(function(){

    // adding a to do list item
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
        
    });
    
    // deleting a to do list item
    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                // can do something with the data via front-end stuff
                location.reload();
            }
        });
    });

});