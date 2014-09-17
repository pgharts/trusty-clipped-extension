$(function() {
  $('#assets_table .pagination a').click(function(e){
    e.preventDefault();
    var url = this.attr('href');
    // BELOW THIS BE PROTOTYPE
    var pagination = url.toQueryParams();
    var search_form = $('filesearchform');
    search_form.down('#p').value = pagination['p'];
    Asset.UpdateTable(false);
  });

  $('#filesearchforminput').keyup(function(){
    $.ajax({
      url: $("#filesearchform").attr('action') + "?search=" + $('#filesearchforminput').val(),
      complete: function(data, textStatus, jqXHR) {
        $("#assets_table").html(data.responseText);
      }
    });
  });

});
